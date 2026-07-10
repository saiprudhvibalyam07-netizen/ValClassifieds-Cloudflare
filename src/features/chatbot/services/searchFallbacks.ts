import type { MarketplaceSearchParams, MarketplaceSearchResult } from './marketplaceSearch'
import { searchListings } from './marketplaceSearch'
import type { SearchPlan, FallbackStrategy } from './queryPlanner'
import { logger } from './logger'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface FallbackResult {
  /** The search result from the fallback search */
  result: MarketplaceSearchResult
  /** Description of what the fallback did */
  description: string
  /** Whether this was a fallback (true) or original search (false) */
  wasFallback: boolean
}

// ─── Fallback Executor ─────────────────────────────────────────────────────────

/**
 * Execute a search plan with automatic fallback.
 * If the initial search returns no results, tries the fallback strategy.
 */
export async function executeWithFallback(
  plan: SearchPlan
): Promise<FallbackResult> {
  // Step 1: Try the original search
  const originalResult = await searchListings(plan.params)

  if (originalResult.listings.length > 0) {
    return {
      result: originalResult,
      description: plan.description,
      wasFallback: false,
    }
  }

  logger.info('search_no_results', {
    details: { params: plan.params, fallback: plan.fallback.type },
  })

  // Step 2: Execute fallback strategy
  return executeFallback(plan.fallback, plan.params)
}

/**
 * Execute a fallback strategy.
 */
async function executeFallback(
  fallback: FallbackStrategy,
  originalParams: MarketplaceSearchParams
): Promise<FallbackResult> {
  switch (fallback.type) {
    case 'widen_price':
      return executeWidenPrice(fallback, originalParams)
    case 'expand_location':
      return executeExpandLocation(fallback, originalParams)
    case 'broaden_category':
      return executeBroadenCategory(fallback, originalParams)
    case 'remove_filters':
      return executeRemoveFilters(fallback)
    case 'suggest_alternatives':
      return executeSuggestAlternatives(originalParams)
    default:
      return executeRemoveFilters({
        type: 'remove_filters',
        description: 'Showing all available listings',
      })
  }
}

/**
 * Widen price range to find more results.
 */
async function executeWidenPrice(
  fallback: FallbackStrategy,
  originalParams: MarketplaceSearchParams
): Promise<FallbackResult> {
  if (fallback.modifiedParams) {
    const result = await searchListings(fallback.modifiedParams)
    if (result.listings.length > 0) {
      return { result, description: fallback.description, wasFallback: true }
    }
  }

  // If widening price didn't work, try removing price filter entirely
  const noPriceResult = await searchListings({
    ...originalParams,
    minPrice: undefined,
    maxPrice: undefined,
  })

  if (noPriceResult.listings.length > 0) {
    return {
      result: noPriceResult,
      description: 'Removing price filter to show more options',
      wasFallback: true,
    }
  }

  // Last resort: remove all filters
  return executeRemoveFilters({
    type: 'remove_filters',
    description: 'Showing all available listings',
  })
}

/**
 * Expand location to find more results.
 */
async function executeExpandLocation(
  fallback: FallbackStrategy,
  originalParams: MarketplaceSearchParams
): Promise<FallbackResult> {
  if (fallback.modifiedParams) {
    const result = await searchListings(fallback.modifiedParams)
    if (result.listings.length > 0) {
      return { result, description: fallback.description, wasFallback: true }
    }
  }

  // Try removing location
  const noLocationResult = await searchListings({
    ...originalParams,
    location: undefined,
  })

  if (noLocationResult.listings.length > 0) {
    return {
      result: noLocationResult,
      description: 'Showing listings from all locations',
      wasFallback: true,
    }
  }

  return executeRemoveFilters({
    type: 'remove_filters',
    description: 'Showing all available listings',
  })
}

/**
 * Broaden category to find more results.
 */
async function executeBroadenCategory(
  fallback: FallbackStrategy,
  originalParams: MarketplaceSearchParams
): Promise<FallbackResult> {
  if (fallback.modifiedParams) {
    const result = await searchListings(fallback.modifiedParams)
    if (result.listings.length > 0) {
      return { result, description: fallback.description, wasFallback: true }
    }
  }

  // Try removing category
  const noCategoryResult = await searchListings({
    ...originalParams,
    categories: undefined,
  })

  if (noCategoryResult.listings.length > 0) {
    return {
      result: noCategoryResult,
      description: 'Showing listings from all categories',
      wasFallback: true,
    }
  }

  return executeRemoveFilters({
    type: 'remove_filters',
    description: 'Showing all available listings',
  })
}

/**
 * Remove all filters and show everything.
 */
async function executeRemoveFilters(
  fallback: FallbackStrategy
): Promise<FallbackResult> {
  const result = await searchListings({
    status: 'active',
    sort: 'newest',
    limit: 12,
    page: 1,
  })

  return {
    result,
    description: fallback.description,
    wasFallback: true,
  }
}

/**
 * Suggest alternatives when no results are found.
 */
async function executeSuggestAlternatives(
  _originalParams: MarketplaceSearchParams
): Promise<FallbackResult> {
  // Try a completely open search
  const result = await searchListings({
    status: 'active',
    sort: 'newest',
    limit: 6,
    page: 1,
  })

  return {
    result,
    description: 'Here are some popular listings you might like',
    wasFallback: true,
  }
}

/**
 * Generate a user-friendly fallback message based on the fallback type.
 */
export function getFallbackMessage(fallback: FallbackStrategy): string {
  switch (fallback.type) {
    case 'widen_price':
      return 'No exact matches in your budget. Here are some options at different prices:'
    case 'expand_location':
      return 'No listings found in that area. Here are options from nearby locations:'
    case 'broaden_category':
      return 'No listings in that specific category. Here are related items:'
    case 'remove_filters':
      return 'No matches with those filters. Here are some popular listings:'
    case 'suggest_alternatives':
      return 'Here are some listings you might be interested in:'
    default:
      return 'Here are some options for you:'
  }
}
