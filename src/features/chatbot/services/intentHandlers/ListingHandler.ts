import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { getListingById, getSimilarListings, getSellerInfo } from '../../services/marketplaceSearch'
import { getSupportTopic } from '../../services/supportContent'

export class ListingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const { entities } = classification

    if (!entities.listingId) {
      const topic = getSupportTopic('listing details fallback')
      return topic
        ? {
            ...topic,
            intent: 'LISTING_DETAILS',
            role,
          }
        : {
            sections: [
              {
                type: 'text' as const,
                content: 'Which listing would you like to know more about? You can share the listing ID or name.',
              },
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
            {
              type: 'empty_state' as const,
              variant: 'no_results',
              title: 'Listing not found',
              description: `No listing found with ID "${entities.listingId}".`,
              action: { label: 'Search Listings', value: 'search' },
            },
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

      // Get similar listings and seller info
      const [similarListingsRaw, seller] = await Promise.all([
        getSimilarListings(listing.id, 4),
        getSellerInfo(listing.user_id),
      ])

      const similarListings: ListingData[] = similarListingsRaw.map(l => ({
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
          {
            type: 'listing_card' as const,
            listing: listingData,
          },
          {
            type: 'info_section' as const,
            title: 'Seller Information',
            items: [
              `Name: ${sellerName}`,
              sellerListingCount > 0 ? `Listings: ${sellerListingCount}` : 'Contact via platform messaging',
              listing.profile?.phone ? `Phone: ${listing.profile.phone}` : 'Contact via platform messaging',
            ],
          },
          ...(similarListings.length > 0 ? [{
            type: 'listing_grid' as const,
            listings: similarListings,
            title: 'Similar Listings',
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
      console.error('[ListingHandler] Failed to fetch listing:', error)
      return this.getStaticResponse(entities.listingId, role)
    }
  }

  private getStaticResponse(listingId: string | undefined, role: ChatbotRole): StructuredResponse {
    const topic = getSupportTopic('listing details fallback')
    return topic
      ? {
          ...topic,
          intent: 'LISTING_DETAILS',
          role,
        }
      : {
          sections: [
            {
              type: 'heading' as const,
              content: listingId ? `Listing ${listingId}` : 'Listing Details',
              level: 2,
            },
            {
              type: 'text' as const,
              content: listingId
                ? `I can help you with listing ${listingId}. You can view the full details, contact the seller, or ask about pricing and condition.`
                : 'Which listing would you like to know more about? You can share the listing ID or tell me more about which specific item you mean.',
            },
          ],
          suggestedActions: [
            { label: 'Contact Seller', value: 'contact seller' },
            { label: 'Similar Items', value: 'similar items' },
            { label: 'Safety Tips', value: 'safety tips' },
          ],
          intent: 'LISTING_DETAILS',
          role,
        }
  }
}