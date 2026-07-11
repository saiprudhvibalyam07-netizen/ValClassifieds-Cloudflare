import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'
import { searchListings, type ListingWithRelations } from '../../services/marketplaceSearch'
import { formatPrice } from '../../services/responseUtils'
import { getNearbyCategories } from '../../services/categoryFlows'
import { matchCategory } from '../../services/canonicalCategories'
import { pickEmpathyPhrase, pickNoResultPhrase, isFrustratedQuery, gracefulError } from '../../services/responseQuality'

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

      const listings: ListingData[] = result.listings.map((l): ListingData => ({
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
        return this.handleZeroResults(entities, categories, location, minPrice, maxPrice, condition, query, role)
      }

      if (listings.length <= 3) {
        return this.handleFewResults(listings, result.total, entities, role)
      }

      return this.buildSuccessResponse(listings, result.total, entities, role)
    } catch (error) {
      console.error('[SearchHandler] Search failed:', error)
      return this.handleSearchError(entities, role)
    }
  }

  private async handleZeroResults(
    entities: IntentClassification['entities'],
    categories: string[] | undefined,
    location: string | undefined,
    minPrice: number | undefined,
    maxPrice: number | undefined,
    condition: 'new' | 'used' | undefined,
    query: string | undefined,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const userText = entities.query ?? ''
    const frustrated = userText ? isFrustratedQuery(userText) : false
    const desc = this.buildDescriptionParts(entities).join(', ') || 'listings'

    if (frustrated) {
      const empathy = pickEmpathyPhrase()
      if (maxPrice || minPrice) {
        const result = await searchListings({
          categories, location, condition, query,
          status: 'active', sort: 'newest', limit: 4, page: 1,
        }).catch(() => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false }))
        if (result.listings.length > 0) {
          return this.buildAlternativesResponse(
            entities, result.listings,
            `${empathy} I couldn't find an exact match within your price range. Here are some options at different price points.`,
            role, 'A few options to consider:'
          )
        }
      }
    }

    if (maxPrice || minPrice) {
      const result = await searchListings({
        categories, location, condition, query,
        status: 'active', sort: 'newest', limit: 4, page: 1,
      }).catch(() => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false }))

      if (result.listings.length > 0) {
        const msg = frustrated
          ? `${pickEmpathyPhrase()} I couldn't find an exact match within your price range. Here are some options at different price points.`
          : `${pickNoResultPhrase(desc)} Let me show you options at different price points.`
        return this.buildAlternativesResponse(entities, result.listings, msg, role, 'A few options to consider:')
      }
    }

    if (entities.category) {
      const catSlug = matchCategory(entities.category) ?? entities.category
      const nearby = getNearbyCategories(catSlug).filter(c => c !== catSlug)
      for (const nearbyCat of nearby) {
        const result = await searchListings({
          categories: [nearbyCat], location, minPrice, maxPrice, condition, query,
          status: 'active', sort: 'newest', limit: 4, page: 1,
        }).catch(() => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false }))
        if (result.listings.length > 0) {
          const msg = frustrated
            ? `${pickEmpathyPhrase()} I couldn't find results in ${entities.category}. Let me show you what's available in ${nearbyCat} instead.`
            : `${pickNoResultPhrase(entities.category)} Let's check the ${nearbyCat} category.`
          return this.buildAlternativesResponse(entities, result.listings, msg, role, `Listings from ${nearbyCat}:`)
        }
      }
    }

    if (location) {
      const result = await searchListings({
        categories, minPrice, maxPrice, condition, query,
        status: 'active', sort: 'newest', limit: 4, page: 1,
      }).catch(() => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false }))
      if (result.listings.length > 0) {
        const msg = frustrated
          ? `${pickEmpathyPhrase()} I couldn't find results in ${location}. Here are options from other areas.`
          : `${pickNoResultPhrase(desc)} Here are options from other locations.`
        return this.buildAlternativesResponse(entities, result.listings, msg, role, 'Listings from other areas:')
      }
    }

    const openResult = await searchListings({
      status: 'active', sort: 'newest', limit: 4, page: 1,
    }).catch(() => ({ listings: [], total: 0, page: 1, limit: 4, hasMore: false }))

    const finalMsg = frustrated
      ? `${pickEmpathyPhrase()} Let me show you what's currently available on the marketplace.`
      : `${pickNoResultPhrase(desc)} Here's what's available right now.`
    return this.buildAlternativesResponse(
      entities, openResult.listings,
      finalMsg,
      role, 'Popular listings you might like:'
    )
  }

  private handleFewResults(
    listings: ListingData[],
    total: number,
    entities: IntentClassification['entities'],
    role: ChatbotRole
  ): StructuredResponse {
    const desc = this.buildDescriptionParts(entities).join(' • ') || 'listings'
    return {
      sections: [
        { type: 'heading', content: `Found ${total} listing${total !== 1 ? 's' : ''}`, level: 2 },
        ...(desc.length > 0 ? [{ type: 'subheading' as const, content: desc }] : []),
        { type: 'text', content: 'There are only a few results matching your criteria. You can compare these options, refine your search, or contact a seller directly.' },
        { type: 'listing_grid', listings, title: 'Matching Listings' },
      ],
      suggestedActions: [
        { label: 'Compare Items', value: 'compare' },
        { label: 'Widen Search', value: 'refine search' },
        { label: 'Contact Seller', value: 'contact seller' },
        { label: 'Save Search', value: 'save search' },
      ],
      intent: 'SEARCH_LISTINGS',
      role,
    }
  }

  private buildSuccessResponse(
    listings: ListingData[],
    total: number,
    entities: IntentClassification['entities'],
    role: ChatbotRole
  ): StructuredResponse {
    const descParts = this.buildDescriptionParts(entities)
    return {
      sections: [
        { type: 'heading', content: `Found ${total} listing${total !== 1 ? 's' : ''}`, level: 2 },
        ...(descParts.length > 0 ? [{ type: 'subheading' as const, content: descParts.join(' • ') }] : []),
        { type: 'text', content: 'Here are the listings that match your criteria. You can compare similar items, refine your search, or reach out to any seller directly.' },
        { type: 'listing_grid', listings, title: 'Matching Listings' },
      ],
      suggestedActions: [
        { label: 'Compare Items', value: 'compare' },
        { label: 'Refine Search', value: 'refine search' },
        { label: 'Contact Seller', value: 'contact seller' },
        { label: 'Save Search', value: 'save search' },
      ],
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

  private buildAlternativesResponse(
    _entities: IntentClassification['entities'],
    alternativeListings: ListingWithRelations[],
    message: string,
    role: ChatbotRole,
    label: string
  ): StructuredResponse {
    const listings = alternativeListings.map(l => this.toListingData(l))
    const sections: StructuredResponse['sections'] = [
      { type: 'text', content: message },
    ]
    if (listings.length > 0) {
      sections.push({ type: 'text', content: label })
      sections.push({ type: 'listing_grid', listings, title: 'You Might Like' })
    }
    return {
      sections,
      suggestedActions: [
        { label: 'Browse Categories', value: 'show categories' },
        { label: 'Refine Search', value: 'refine search' },
        { label: 'Contact Seller', value: 'contact seller' },
      ],
      intent: 'SEARCH_LISTINGS',
      role,
    }
  }

  private handleSearchError(_entities: IntentClassification['entities'], role: ChatbotRole): StructuredResponse {
    return {
      sections: [
        { type: 'text', content: gracefulError() },
      ],
      suggestedActions: [
        { label: 'Refine Search', value: 'refine search' },
        { label: 'Browse Categories', value: 'show categories' },
        { label: 'Contact Seller', value: 'contact seller' },
      ],
      intent: 'SEARCH_LISTINGS',
      role,
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
