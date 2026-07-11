import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getCategoriesWithCounts } from '../../services/marketplaceSearch'

export class BrowseHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    try {
      const categories = await getCategoriesWithCounts()

      if (categories.length === 0) {
        return this.getFallbackResponse(role)
      }

      return {
        sections: [
          { type: 'heading', content: 'Browse Categories', level: 2 },
          { type: 'subheading', content: `${categories.length} categories are available. Pick one to start exploring.` },
          { type: 'info_section', title: 'All Categories', items: categories.map(
            c => `${c.name} (${c.activeCount} listing${c.activeCount !== 1 ? 's' : ''})`
          )},
        ],
        suggestedActions: [
          { label: 'Search Specific', value: 'search' },
          { label: 'Popular Items', value: 'popular items' },
        ],
        intent: 'BROWSE_CATEGORIES',
        role,
      }
    } catch {
      return this.getFallbackResponse(role)
    }
  }

  private getFallbackResponse(role: ChatbotRole): StructuredResponse {
    return {
      sections: [
        { type: 'heading', content: 'Browse Categories', level: 2 },
        { type: 'subheading', content: 'Explore our marketplace categories' },
        { type: 'info_section', title: 'Popular Categories', items: [
          'Vehicles — Cars, Bikes, Scooters',
          'Mobiles & Tablets — Phones, Tablets, Accessories',
          'Electronics — Laptops, TVs, Cameras, Gaming',
          'Property — Rent, Buy, Commercial',
          'Jobs — Full-time, Part-time, Freelance',
          'Services — Home, Tech, Education, Events',
          'Home & Furniture — Sofas, Beds, Decor',
          'Fashion — Clothing, Shoes, Watches',
          'Pets — Dogs, Cats, Supplies',
          'Kids & Baby — Toys, Gear, Clothing',
          'Sports & Hobbies — Fitness, Outdoor, Music',
        ]},
      ],
      suggestedActions: [
        { label: 'Search Specific', value: 'search' },
        { label: 'Popular Items', value: 'popular items' },
      ],
      intent: 'BROWSE_CATEGORIES',
      role,
    }
  }
}
