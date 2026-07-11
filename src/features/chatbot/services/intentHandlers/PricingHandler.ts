import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings } from '../../services/marketplaceSearch'
import { pickAcknowledgement, pickGuidancePhrase } from '../../services/responseQuality'

export class PricingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const category = classification.entities.category
    let listings: ListingData[] = []

    if (category) {
      try {
        const result = await searchListings({
          categories: [category], status: 'active', sort: 'newest', limit: 5, page: 1,
        })
        listings = result.listings.map(l => ({
          id: l.id, title: l.title, price: l.price, location: l.city ?? undefined,
          category: l.category?.name, condition: l.condition ?? undefined,
          seller: l.profile?.full_name ?? undefined, thumbnail: l.images?.[0]?.url, url: `/listing/${l.id}`,
        }))
      } catch { /* fall back to static */ }
    }

    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: 'Pricing Guide', level: 2 },
      { type: 'text', content: `${pickAcknowledgement()} ${pickGuidancePhrase()}\n\n• New or unused: 80-100% of the original price\n• Like new or gently used: 60-80%\n• Good condition with some wear: 40-60%\n• Fair condition or well-used: 20-40%\n\nThese are general guidelines. Checking similar listings can give you a more accurate sense of the current market.` },
    ]

    if (category) {
      sections.splice(1, 0, { type: 'subheading', content: `Current market prices for ${category}` })
    }

    if (listings.length > 0) {
      sections.push({ type: 'listing_grid', listings, title: 'Sample Listings for Reference' })
    }

    return {
      sections,
      suggestedActions: [
        { label: 'Browse Similar Items', value: 'similar items' },
        { label: 'Listing Tips', value: 'listing tips' },
      ],
      intent: classification.intent,
      role,
    }
  }
}
