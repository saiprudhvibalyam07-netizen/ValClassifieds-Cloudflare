import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { getFeaturedListings, getLatestListings } from '../../services/marketplaceSearch'
import { pickAcknowledgement, qualifyRecommendation, pickNextActionIntro } from '../../services/responseQuality'

export class RecommendationHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const category = classification.entities.category
    let listings: ListingData[] = []

    try {
      if (category) {
        const featured = await getFeaturedListings(6)
        listings = featured
          .filter(l => l.category?.slug === category)
          .map(l => ({
            id: l.id, title: l.title, price: l.price, location: l.city ?? undefined,
            category: l.category?.name, condition: l.condition ?? undefined,
            seller: l.profile?.full_name ?? undefined, thumbnail: l.images?.[0]?.url, url: `/listing/${l.id}`,
          }))
          .slice(0, 4)
      } else {
        const featured = await getFeaturedListings(4)
        listings = featured.map(l => ({
          id: l.id, title: l.title, price: l.price, location: l.city ?? undefined,
          category: l.category?.name, condition: l.condition ?? undefined,
          seller: l.profile?.full_name ?? undefined, thumbnail: l.images?.[0]?.url, url: `/listing/${l.id}`,
        }))
      }
    } catch {
      try {
        const latest = await getLatestListings(4)
        listings = latest.map(l => ({
          id: l.id, title: l.title, price: l.price, location: l.city ?? undefined,
          category: l.category?.name, condition: l.condition ?? undefined,
          seller: l.profile?.full_name ?? undefined, thumbnail: l.images?.[0]?.url, url: `/listing/${l.id}`,
        }))
      } catch { /* ignore */ }
    }

    if (listings.length > 0) {
      return {
        sections: [
          { type: 'heading', content: category ? `Recommended ${category} Listings` : 'Recommended for You', level: 2 },
          { type: 'subheading', content: qualifyRecommendation(`here are some ${category ? category : 'popular'} listings you might find interesting.`) },
          { type: 'listing_grid', listings, title: 'Recommended Listings' },
        ],
        suggestedActions: [
          { label: 'View Listing', value: 'view listing' },
          { label: 'Search More', value: 'search' },
        ],
        intent: 'RECOMMENDATION',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Recommendations', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} I could not find specific recommendations at this time. Try browsing categories or searching for something specific.` },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Browse Categories', value: 'show categories' },
        { label: 'Search Listings', value: 'search' },
      ],
      intent: 'RECOMMENDATION',
      role,
    }
  }
}
