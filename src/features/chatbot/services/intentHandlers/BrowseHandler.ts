import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getCategoriesWithCounts } from '../../services/marketplaceSearch'
import { getSupportTopic } from '../../services/supportContent'

export class BrowseHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    try {
      const categories = await getCategoriesWithCounts()

      if (categories.length === 0) {
        return this.getStaticResponse(role)
      }

      return {
        sections: [
          {
            type: 'heading' as const,
            content: 'Browse Categories',
            level: 2,
          },
          {
            type: 'subheading' as const,
            content: `${categories.length} categories available — tap one to explore`,
          },
          {
            type: 'info_section' as const,
            title: 'All Categories',
            items: categories.map(c => `${c.name} (${c.activeCount} listing${c.activeCount !== 1 ? 's' : ''})`),
          },
        ],
        suggestedActions: [
          { label: 'Search Specific', value: 'search' },
          { label: 'Popular Items', value: 'popular items' },
        ],
        intent: 'BROWSE_CATEGORIES',
        role,
      }
    } catch (error) {
      console.error('[BrowseHandler] Failed to load categories:', error)
      return this.getStaticResponse(role)
    }
  }

  private getStaticResponse(role: ChatbotRole): StructuredResponse {
    const topic = getSupportTopic('browse categories fallback')
    return topic
      ? {
          ...topic,
          intent: 'BROWSE_CATEGORIES',
          role,
        }
      : {
          sections: [
            {
              type: 'heading' as const,
              content: 'Browse Categories',
              level: 2,
            },
            {
              type: 'subheading' as const,
              content: 'Explore our marketplace categories',
            },
            {
              type: 'info_section' as const,
              title: 'Popular Categories',
              items: [
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
              ],
            },
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