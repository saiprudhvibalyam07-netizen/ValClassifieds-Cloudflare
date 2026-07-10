import type { IntentClassification, ConversationContextState } from '../types'
import type { MarketplaceSearchParams } from './marketplaceSearch'
import { matchCategory } from './canonicalCategories'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface SearchPlan {
  /** The search parameters to pass to marketplaceSearch */
  params: MarketplaceSearchParams
  /** Human-readable description of what we're searching for */
  description: string
  /** Fallback strategy if no results are found */
  fallback: FallbackStrategy
  /** Confidence that this plan will find relevant results */
  confidence: number
}

export interface FallbackStrategy {
  type: 'broaden_category' | 'expand_location' | 'widen_price' | 'remove_filters' | 'suggest_alternatives'
  description: string
  /** Modified search params for the fallback */
  modifiedParams?: Partial<MarketplaceSearchParams>
}

// ─── Query Planner ─────────────────────────────────────────────────────────────

/**
 * Build a search plan from intent classification and conversation context.
 * This is the ONLY place where intent entities are converted to search params.
 */
export function buildSearchPlan(
  classification: IntentClassification,
  _context: ConversationContextState
): SearchPlan {
  const { entities, intent } = classification

  // Base params from entities
  const params: MarketplaceSearchParams = {
    status: 'active',
    page: 1,
    limit: 12,
    sort: 'newest',
  }

  const descriptionParts: string[] = []

  // Category mapping using canonical categories
  if (entities.category) {
    const slug = matchCategory(entities.category)
    if (slug) {
      params.categories = [slug]
      descriptionParts.push(entities.category)
    }
  }

  // Budget / Price
  if (entities.budget) {
    if (entities.budget.max) {
      params.maxPrice = entities.budget.max
      descriptionParts.push(`under ₹${entities.budget.max.toLocaleString()}`)
    }
    if (entities.budget.min) {
      params.minPrice = entities.budget.min
      descriptionParts.push(`above ₹${entities.budget.min.toLocaleString()}`)
    }
  } else if (entities.price) {
    params.maxPrice = entities.price
    descriptionParts.push(`under ₹${entities.price.toLocaleString()}`)
  }

  // Location
  if (entities.location) {
    params.location = entities.location
    descriptionParts.push(`in ${entities.location}`)
  }

  // Condition
  if (entities.condition) {
    const cond = entities.condition.toLowerCase()
    if (cond === 'new' || cond === 'used') {
      params.condition = cond
      descriptionParts.push(`(${entities.condition})`)
    }
  }

  // Query text
  if (entities.query) {
    params.query = entities.query
    descriptionParts.push(`matching "${entities.query}"`)
  }

  // Intent-specific adjustments
  if (intent === 'LISTING_DETAILS' && entities.listingId) {
    // For listing details, we don't do a search — we do a lookup
    // The handler should call getListingById directly
    return {
      params: { ...params, limit: 1 },
      description: `listing ${entities.listingId}`,
      fallback: { type: 'suggest_alternatives', description: 'Try searching for similar items' },
      confidence: 1.0,
    }
  }

  if (intent === 'RECOMMENDATION') {
    params.sort = 'newest'
    params.limit = 5
  }

  if (intent === 'COMPARISON') {
    params.limit = 4
  }

  const description = descriptionParts.length > 0
    ? `Finding ${descriptionParts.join(' ')}`
    : 'Searching all listings'

  // Build fallback strategy
  const fallback = buildFallbackStrategy(params, classification)

  // Calculate confidence based on how many filters we have
  const filterCount = [
    params.categories?.length,
    params.minPrice,
    params.maxPrice,
    params.location,
    params.condition,
    params.query,
  ].filter(Boolean).length

  const confidence = Math.min(0.95, 0.5 + filterCount * 0.1)

  return {
    params,
    description,
    fallback,
    confidence,
  }
}

/**
 * Build a fallback strategy based on the current search params.
 */
function buildFallbackStrategy(
  params: MarketplaceSearchParams,
  _classification: IntentClassification
): FallbackStrategy {
  // If we have very specific filters, plan to broaden them
  if (params.categories?.length && params.location && params.maxPrice) {
    return {
      type: 'widen_price',
      description: 'Expanding price range to find more options',
      modifiedParams: {
        ...params,
        maxPrice: params.maxPrice ? params.maxPrice * 1.5 : undefined,
      },
    }
  }

  if (params.categories?.length && params.location) {
    return {
      type: 'expand_location',
      description: 'Searching in nearby areas',
      modifiedParams: {
        ...params,
        location: undefined,
      },
    }
  }

  if (params.categories?.length) {
    return {
      type: 'broaden_category',
      description: 'Looking in related categories',
      modifiedParams: {
        ...params,
        categories: undefined,
      },
    }
  }

  if (params.location) {
    return {
      type: 'expand_location',
      description: 'Showing listings from all locations',
      modifiedParams: {
        ...params,
        location: undefined,
      },
    }
  }

  return {
    type: 'remove_filters',
    description: 'Showing all available listings',
    modifiedParams: {
      categories: undefined,
      location: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      condition: undefined,
      query: undefined,
    },
  }
}

/**
 * Build a search plan for browsing categories (no specific intent).
 */
export function buildBrowsePlan(): SearchPlan {
  return {
    params: {
      status: 'active',
      sort: 'newest',
      limit: 12,
      page: 1,
    },
    description: 'Browsing all categories',
    fallback: {
      type: 'suggest_alternatives',
      description: 'Try searching for something specific',
    },
    confidence: 0.6,
  }
}

/**
 * Build a search plan for getting recommendations.
 */
export function buildRecommendationPlan(
  preferredCategories: string[],
  preferredLocation?: string,
  maxBudget?: number
): SearchPlan {
  const params: MarketplaceSearchParams = {
    status: 'active',
    sort: 'newest',
    limit: 5,
    page: 1,
  }

  if (preferredCategories.length > 0) {
    params.categories = preferredCategories
  }
  if (preferredLocation) {
    params.location = preferredLocation
  }
  if (maxBudget) {
    params.maxPrice = maxBudget
  }

  return {
    params,
    description: 'Getting personalized recommendations',
    fallback: {
      type: 'remove_filters',
      description: 'Showing popular listings instead',
      modifiedParams: { categories: undefined, location: undefined, minPrice: undefined, maxPrice: undefined },
    },
    confidence: 0.7,
  }
}
