import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings } from '../../services/marketplaceSearch'
import { getSupportTopic } from '../../services/supportContent'

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
          categories: [category],
          status: 'active',
          sort: 'newest',
          limit: 4,
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

    const topic = getSupportTopic('comparison fallback')
    const sections = topic?.sections ?? [
      { type: 'heading', content: 'Comparing Listings', level: 2 },
      { type: 'text', content: 'Comparing similar items helps you find the best value. Here\'s what to look for:' },
      { type: 'info_section', title: 'Comparison Checklist', items: [
        'Price — is it competitive for the condition?',
        'Condition — new, like new, good, fair, poor',
        'Location — closer means easier inspection',
        'Seller reputation — check ratings and response time',
        'Photos — clear, multiple angles, honest about defects',
      ]},
    ]

    if (listings.length >= 2) {
      sections.push({
        type: 'subheading',
        content: `Comparing ${category} listings:`,
      })
      // Build comparison table
      const headers = ['Item', 'Price', 'Condition', 'Location']
      const rows = listings.map(l => [
        l.title,
        `₹${(l.price ?? 0).toLocaleString()}`,
        l.condition ?? 'Not specified',
        l.location ?? 'Not specified',
      ])
      sections.push({
        type: 'comparison_table',
        headers,
        rows: rows.map(r => ({ label: r[0], values: r.slice(1) })),
        title: `${category} Comparison`,
      })
    }

    return {
      sections,
      suggestedActions: topic?.suggestedActions ?? [
        { label: 'Refine Search', value: 'refine search' },
        { label: 'Buying Tips', value: 'buying tips' },
      ],
      intent: 'COMPARISON',
      role,
    }
  }
}