/**
 * Live Marketplace Category Mapping
 *
 * The intent classifier keeps richer internal category concepts in
 * `canonicalCategories.ts` (e.g. `mobiles-tablets`, `electronics`, `property`).
 * However, the live Supabase `categories` table only contains these slugs:
 *
 *   community | housing | items-for-sale | jobs | services | vehicles
 *
 * `searchListings()` must therefore translate the classifier's rich concept
 * into one of the six live categories so that real listings are returned.
 *
 * This module is the single place that performs that translation and detects
 * "pure category" searches (e.g. "car", "phone", "house") which should be
 * resolved by category only — NOT by a `title ILIKE '%car%'` text search.
 */

/** Slugs that actually exist in the live `categories` table. */
export const LIVE_CATEGORY_SLUGS = [
  'community',
  'housing',
  'items-for-sale',
  'jobs',
  'services',
  'vehicles',
] as const

export type LiveCategorySlug = (typeof LIVE_CATEGORY_SLUGS)[number]

/**
 * Explicit rich-concept → live-category translations.
 * Anything not listed falls under `items-for-sale` (general goods).
 */
const RICH_TO_LIVE: Record<string, LiveCategorySlug> = {
  property: 'housing',
  vehicles: 'vehicles',
  jobs: 'jobs',
  services: 'services',
  community: 'community',
}

/** General-goods catch-all for every rich concept not explicitly mapped. */
const DEFAULT_LIVE_CATEGORY: LiveCategorySlug = 'items-for-sale'

/** Map a single rich/canonical slug to a live DB category slug. */
export function mapToLiveCategory(slug?: string): LiveCategorySlug | undefined {
  if (!slug) return undefined
  if ((LIVE_CATEGORY_SLUGS as readonly string[]).includes(slug)) {
    return slug as LiveCategorySlug
  }
  return RICH_TO_LIVE[slug] ?? DEFAULT_LIVE_CATEGORY
}

/** Map a list of rich/canonical slugs to de-duplicated live DB slugs. */
export function mapToLiveCategories(slugs?: string[]): string[] | undefined {
  if (!slugs || slugs.length === 0) return undefined
  const mapped = Array.from(
    new Set(
      slugs
        .map((s) => mapToLiveCategory(s))
        .filter((s): s is LiveCategorySlug => s !== undefined),
    ),
  )
  return mapped
}

/**
 * Generic category nouns. When the search text consists ONLY of these tokens
 * (plus harmless filler), the user is asking for a whole category — not a
 * specific brand/model — so we search by category instead of free-text.
 *
 * Brand/model words (iphone, macbook, samsung, honda, swift, …) are
 * deliberately excluded so they keep using text search.
 */
const PURE_CATEGORY_TERMS = new Set<string>([
  // vehicles
  'car', 'cars', 'vehicle', 'vehicles', 'automobile', 'automobiles', 'sedan',
  'suv', 'truck', 'trucks', 'van', 'vans', 'jeep', 'bike', 'bikes', 'bicycle',
  'bicycles', 'cycle', 'motorcycle', 'motorbikes', 'motorbike', 'scooter',
  'scooters', 'auto', 'ev',
  // phones / electronics
  'phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'smartphones',
  'cellphone', 'handset', 'tablet', 'tablets', 'ipad', 'laptop', 'laptops',
  'computer', 'computers', 'notebook', 'pc', 'tv', 'television', 'monitor',
  'camera', 'cameras',
  // housing
  'house', 'houses', 'apartment', 'apartments', 'flat', 'flats', 'villa',
  'villas', 'property', 'bungalow', 'plot', 'land', 'home',
  // jobs
  'job', 'jobs', 'vacancy', 'vacancies', 'career',
  // services
  'service', 'services',
  // community
  'community', 'group', 'club',
])

/** Filler words ignored when deciding if a query is a pure category search. */
const PURE_CATEGORY_FILLER = new Set<string>([
  'for', 'sale', 'to', 'a', 'an', 'the', 'some', 'any', 'with', 'and', 'or',
  'of', 'on', 'my', 'your', 'his', 'her', 'used', 'new',
  // number / currency words that survive extractQuery()
  'lakh', 'lakhs', 'thousand', 'crore', 'k', 'rs', 'inr', 'rupees', 'budget',
])

/**
 * Returns true when the query is a bare category noun (optionally wrapped in
 * filler words) and therefore should be resolved by category filter alone.
 */
export function isPureCategoryQuery(query?: string): boolean {
  if (!query || query.trim().length === 0) return false
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0 && !PURE_CATEGORY_FILLER.has(t))
  if (tokens.length === 0) return false
  return tokens.every((t) => PURE_CATEGORY_TERMS.has(t))
}
