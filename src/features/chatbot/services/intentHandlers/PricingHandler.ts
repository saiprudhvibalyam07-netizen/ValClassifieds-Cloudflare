import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'
import { searchListings } from '../../services/marketplaceSearch'

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
          categories: [category],
          status: 'active',
          sort: 'newest',
          limit: 5,
          page: 1,
        })
        listings = result.listings.map(l => ({
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
      } catch {
        // Ignore errors, fall back to static content
      }
    }

    const topic = getSupportTopic('pricing help')
    const sections = topic?.sections ?? [
      { type: 'heading', content: 'Pricing Guide', level: 2 },
      { type: 'text', content: 'Good pricing is key to selling quickly. Here are some benchmarks:' },
      { type: 'info_section', title: 'Price Ranges by Condition', items: [
        'New (unused): 80–100% of original price',
        'Like New (< 1 month): 70–85%',
        'Good (3–12 months): 50–70%',
        'Fair (1+ years): 30–50%',
        'Poor/Well-used: 15–30%',
      ]},
    ]

    if (listings.length > 0) {
      sections.unshift({
        type: 'subheading',
        content: `Recent ${category} listings for reference:`,
      })
      sections.push({
        type: 'listing_grid',
        title: 'Sample Listings',
        listings,
      })
    }

    return {
      sections,
      suggestedActions: topic?.suggestedActions ?? [
        { label: 'Browse Similar Items', value: 'similar items' },
        { label: 'Listing Tips', value: 'listing tips' },
      ],
      intent: classification.intent,
      role,
    }
  }
}