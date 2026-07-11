import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings, type ListingWithRelations } from '../../services/marketplaceSearch'
import { formatPrice } from '../../services/responseUtils'
import { getNearbyCategories } from '../../services/categoryFlows'
import { matchCategory } from '../../services/canonicalCategories'
import { selectSearchArticle } from '../../knowledge/search'

export class SearchHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const { entities } = classification

    const categories = entities.category ? [entities.category] : undefined
    const location = entities.location
    const minPrice = entities.budget?.min
    const maxPrice = entities.budget?.max ?? entities.price
    const rawCondition = entities.condition
    const condition: 'new' | 'used' | undefined =
      rawCondition === 'new' || rawCondition === 'used' ? rawCondition : undefined
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

      const listings: ListingData[] = result.listings.map((l) => this.toListingData(l))

      if (listings.length === 0) {
        return this.handleZeroResults(classification, role)
      }

      const article = selectSearchArticle(classification, 'result')
      return this.buildResultResponse(article, listings, result.total, entities, role)
    } catch (error) {
      console.error('[SearchHandler] Search failed:', error)
      return this.buildErrorResponse(classification, role)
    }
  }

  private async handleZeroResults(
    classification: IntentClassification,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const { entities } = classification
    const categories = entities.category ? [entities.category] : undefined
    const location = entities.location
    const minPrice = entities.budget?.min
    const maxPrice = entities.budget?.max ?? entities.price
    const rawCondition = entities.condition
    const condition: 'new' | 'used' | undefined =
      rawCondition === 'new' || rawCondition === 'used' ? rawCondition : undefined
    const query = entities.query

    const trySearch = (opts: Record<string, unknown>) =>
      searchListings({ ...opts, status: 'active', sort: 'newest', limit: 4, page: 1 }).catch(
        () => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false })
      )

    let alternativeListings: ListingWithRelations[] = []
    let label = 'Popular listings you might like:'

    if (maxPrice || minPrice) {
      const r = await trySearch({ categories, location, condition, query })
      if (r.listings.length > 0) {
        alternativeListings = r.listings
        label = 'A few options to consider:'
      }
    }

    if (alternativeListings.length === 0 && entities.category) {
      const catSlug = matchCategory(entities.category) ?? entities.category
      const nearby = getNearbyCategories(catSlug).filter((c) => c !== catSlug)
      for (const nearbyCat of nearby) {
        const r = await trySearch({ categories: [nearbyCat], location, minPrice, maxPrice, condition, query })
        if (r.listings.length > 0) {
          alternativeListings = r.listings
          label = `Listings from ${nearbyCat}:`
          break
        }
      }
    }

    if (alternativeListings.length === 0 && location) {
      const r = await trySearch({ categories, minPrice, maxPrice, condition, query })
      if (r.listings.length > 0) {
        alternativeListings = r.listings
        label = 'Listings from other areas:'
      }
    }

    if (alternativeListings.length === 0) {
      const r = await trySearch({})
      alternativeListings = r.listings
      label = 'Popular listings you might like:'
    }

    const article = selectSearchArticle(classification, 'zero')
    const sections: StructuredResponse['sections'] = [...article.response]
    const descParts = this.buildDescriptionParts(entities)
    if (descParts.length > 0) {
      sections.push({ type: 'subheading', content: descParts.join(' • ') })
    }
    if (alternativeListings.length > 0) {
      sections.push({
        type: 'listing_grid',
        listings: alternativeListings.map((l) => this.toListingData(l)),
        title: label,
      })
    }

    return {
      sections,
      suggestedActions: article.actions,
      intent: 'SEARCH_LISTINGS',
      role,
    }
  }

  private buildResultResponse(
    article: ReturnType<typeof selectSearchArticle>,
    listings: ListingData[],
    total: number,
    entities: IntentClassification['entities'],
    role: ChatbotRole
  ): StructuredResponse {
    const descParts = this.buildDescriptionParts(entities)
    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: `Found ${total} listing${total !== 1 ? 's' : ''}`, level: 2 },
    ]
    if (descParts.length > 0) {
      sections.push({ type: 'subheading', content: descParts.join(' • ') })
    }
    for (const s of article.response) {
      sections.push(s)
    }
    sections.push({ type: 'listing_grid', listings, title: 'Matching Listings' })

    return {
      sections,
      suggestedActions: article.actions,
      intent: 'SEARCH_LISTINGS',
      role,
    }
  }

  private buildErrorResponse(
    classification: IntentClassification,
    role: ChatbotRole
  ): StructuredResponse {
    const article = selectSearchArticle(classification, 'error')
    return {
      sections: article.response,
      suggestedActions: article.actions,
      intent: 'SEARCH_LISTINGS',
      role,
    }
  }

  private toListingData(l: ListingWithRelations): ListingData {
    return {
      id: l.id,
      title: l.title,
      price: l.price,
      location: l.city ?? undefined,
      category: l.category?.name,
      condition: l.condition ?? undefined,
      seller: l.profile?.full_name ?? undefined,
      thumbnail: l.images?.[0]?.url,
      url: `/listing/${l.id}`,
    }
  }

  private buildDescriptionParts(entities: IntentClassification['entities']): string[] {
    const parts: string[] = []
    if (entities.category) parts.push(entities.category)
    if (entities.brand) parts.push(`from ${entities.brand}`)
    if (entities.location) parts.push(`in ${entities.location}`)
    if (entities.budget?.max) parts.push(`under ${formatPrice(entities.budget.max)}`)
    return parts
  }
}
