import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings } from '../../services/marketplaceSearch'
import { pickAcknowledgement, pickGuidancePhrase } from '../../services/responseQuality'

export class ComparisonHandler implements IntentHandler {
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
          categories: [category], status: 'active', sort: 'newest', limit: 4, page: 1,
        })
        listings = result.listings.map(l => ({
          id: l.id, title: l.title, price: l.price, location: l.city ?? undefined,
          category: l.category?.name, condition: l.condition ?? undefined,
          seller: l.profile?.full_name ?? undefined, thumbnail: l.images?.[0]?.url, url: `/listing/${l.id}`,
        }))
      } catch { /* fall back */ }
    }

    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: 'Comparing Listings', level: 2 },
      { type: 'text', content: `${pickAcknowledgement()} ${pickGuidancePhrase()}\n\n• Price relative to the item's condition and age\n• Location and whether pickup or delivery is available\n• Seller reputation and responsiveness\n• Photo quality and honesty of the description\n\nComparing these factors can help you find the best value.` },
    ]

    if (listings.length >= 2) {
      const headers = ['Item', 'Price', 'Condition', 'Location']
      sections.push({
        type: 'comparison_table',
        headers,
        rows: listings.map(l => ({
          label: l.title,
          values: [
            `₹${(l.price ?? 0).toLocaleString()}`,
            l.condition ?? 'Not specified',
            l.location ?? 'Not specified',
          ],
        })),
        title: category ? `${category} Comparison` : 'Listings Comparison',
      })
    }

    return {
      sections,
      suggestedActions: [
        { label: 'Refine Search', value: 'refine search' },
        { label: 'Buying Tips', value: 'buying tips' },
      ],
      intent: 'COMPARISON',
      role,
    }
  }
}
