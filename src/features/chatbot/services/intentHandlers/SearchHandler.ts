import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings } from '../../services/marketplaceSearch'
import { formatPrice } from '../../services/responseUtils'
import { getSupportTopic } from '../../services/supportContent'

export class SearchHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const { entities } = classification

    // Build search params from entities
    const categories = entities.category ? [entities.category] : undefined
    const location = entities.location
    const minPrice = entities.budget?.min
    const maxPrice = entities.budget?.max ?? entities.price
    const condition = entities.condition as 'new' | 'used' | undefined
    const query = entities.query

    try {
      const result = await searchListings({
        categories,
        location,
        minPrice,
        maxPrice,
        condition,
        query,
        status: 'active',
        sort: 'newest',
        limit: 6,
        page: 1,
      })

      const listings: ListingData[] = result.listings.map(l => ({
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

      if (listings.length === 0) {
        const desc = [
          entities.category,
          entities.location,
          maxPrice ? `under ${formatPrice(maxPrice)}` : null,
        ].filter(Boolean).join(', ')

        return {
          sections: [
            {
              type: 'empty_state' as const,
              variant: 'no_results',
              title: 'No listings found',
              description: desc ? `No ${desc} found. Try broadening your search.` : 'No matching listings found.',
              action: { label: 'Browse Categories', value: 'show categories' },
            },
          ],
          suggestedActions: [
            { label: 'Browse Categories', value: 'show categories' },
            { label: 'Search Again', value: 'search' },
          ],
          intent: 'SEARCH_LISTINGS',
          role,
        }
      }

      // Build human-readable description
      const descParts = [
        entities.category,
        entities.brand ? `from ${entities.brand}` : null,
        entities.location ? `in ${entities.location}` : null,
        maxPrice ? `under ${formatPrice(maxPrice)}` : null,
      ].filter(Boolean)

      return {
        sections: [
          {
            type: 'heading' as const,
            content: `Found ${result.total} listing${result.total !== 1 ? 's' : ''}`,
            level: 2,
          },
          ...(descParts.length > 0 ? [{
            type: 'subheading' as const,
            content: descParts.join(' • '),
          }] : []),
          {
            type: 'listing_grid' as const,
            listings,
            title: 'Matching Listings',
          },
        ],
        suggestedActions: [
          { label: 'Refine Search', value: 'refine search' },
          { label: 'Browse Categories', value: 'show categories' },
          { label: 'Sort by Price', value: 'sort price' },
        ],
        intent: 'SEARCH_LISTINGS',
        role,
      }
    } catch (error) {
      console.error('[SearchHandler] Search failed:', error)
      // Fallback to static content when Supabase is unavailable
      return this.getStaticResponse(entities, role)
    }
  }

  private getStaticResponse(_entities: any, role: ChatbotRole): StructuredResponse {
    const topic = getSupportTopic('search fallback')
    return topic
      ? {
          ...topic,
          intent: 'SEARCH_LISTINGS',
          role,
        }
      : {
          sections: [
            { type: 'text' as const, content: "I'd be happy to help you search. What type of item are you looking for, and do you have a budget in mind?" },
          ],
          suggestedActions: [
            { label: 'Refine Search', value: 'refine search' },
            { label: 'Browse Categories', value: 'show categories' },
            { label: 'Sort by Price', value: 'sort price' },
          ],
          intent: 'SEARCH_LISTINGS',
          role,
        }
  }
}