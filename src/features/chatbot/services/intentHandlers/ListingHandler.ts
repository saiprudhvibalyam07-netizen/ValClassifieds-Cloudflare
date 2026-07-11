import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { getListingById, getSimilarListings, getSellerInfo } from '../../services/marketplaceSearch'
import { gracefulError } from '../../services/responseQuality'

export class ListingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const { entities } = classification

    if (!entities.listingId) {
      return {
        sections: [
          { type: 'text', content: 'I would be happy to look up a listing for you. Could you share the listing ID or a bit more detail about which item you are interested in?' },
        ],
        suggestedActions: [
          { label: 'Search Listings', value: 'search' },
          { label: 'Browse Categories', value: 'show categories' },
        ],
        intent: 'LISTING_DETAILS',
        role,
      }
    }

    try {
      const listing = await getListingById(entities.listingId)

      if (!listing) {
        return {
          sections: [
            { type: 'text', content: `I could not find a listing with the ID "${entities.listingId}". It may have been removed or the ID may be incorrect. Would you like to search for something specific instead?` },
          ],
          suggestedActions: [
            { label: 'Search Listings', value: 'search' },
            { label: 'Browse Categories', value: 'show categories' },
          ],
          intent: 'LISTING_DETAILS',
          role,
        }
      }

      const listingData: ListingData = {
        id: listing.id,
        title: listing.title,
        price: listing.price,
        location: listing.city ?? undefined,
        category: listing.category?.name,
        condition: listing.condition ?? undefined,
        seller: listing.profile?.full_name ?? undefined,
        thumbnail: listing.images?.[0]?.url,
        url: `/listing/${listing.id}`,
      }

      const [similarListingsRaw, seller] = await Promise.all([
        getSimilarListings(listing.id, 4).catch(() => []),
        getSellerInfo(listing.user_id).catch(() => null),
      ])

      const similarListings: ListingData[] = (similarListingsRaw ?? []).map(l => ({
        id: l.id,
        title: l.title,
        price: l.price,
        location: l.city ?? undefined,
        category: l.category?.name,
        condition: l.condition ?? undefined,
        seller: l.profile?.full_name ?? undefined,
        thumbnail: l.images?.[0]?.url,
        url: `/listing/${l.id}`,
      }))

      const sellerName = seller?.name ?? listing.profile?.full_name ?? 'Seller'
      const sellerListingCount = seller?.listingCount ?? 0

      return {
        sections: [
          { type: 'listing_card', listing: listingData },
          {
            type: 'info_section',
            title: 'Seller Information',
            items: [
              `Name: ${sellerName}`,
              sellerListingCount > 0 ? `Listings: ${sellerListingCount}` : 'Contact via platform messaging',
              listing.profile?.phone ? `Phone: ${listing.profile.phone}` : 'Contact via platform messaging',
            ],
          },
          ...(similarListings.length > 0 ? [{
            type: 'listing_grid' as const, listings: similarListings, title: 'Similar Listings',
          }] : []),
        ],
        suggestedActions: [
          { label: 'Contact Seller', value: 'contact seller' },
          { label: 'Similar Items', value: 'similar items' },
          { label: 'Safety Tips', value: 'safety tips' },
        ],
        intent: 'LISTING_DETAILS',
        role,
      }
    } catch (error) {
      console.error('[ListingHandler] Failed:', error)
      return {
        sections: [
          { type: 'text', content: gracefulError() },
        ],
        suggestedActions: [
          { label: 'Search Listings', value: 'search' },
          { label: 'Browse Categories', value: 'show categories' },
        ],
        intent: 'LISTING_DETAILS',
        role,
      }
    }
  }
}
