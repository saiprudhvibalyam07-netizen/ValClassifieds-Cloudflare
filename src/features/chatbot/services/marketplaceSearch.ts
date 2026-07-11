import { supabase } from '../../../lib/supabase'
import type { Listing, Category, Profile, ListingImage } from '../../../types'
import { logger } from './logger'
import { mapToLiveCategories, isPureCategoryQuery } from './liveCategoryMapping'

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface MarketplaceSearchParams {
  /** Text search query (searches title, description, location) */
  query?: string
  /** Category slugs to filter by */
  categories?: string[]
  /** Minimum price */
  minPrice?: number
  /** Maximum price */
  maxPrice?: number
  /** Location (city name) */
  location?: string
  /** Condition filter: 'new' or 'used' */
  condition?: 'new' | 'used'
  /** Listing status */
  status?: 'pending' | 'active' | 'sold' | 'inactive'
  /** Seller user ID */
  sellerId?: string
  /** Sort order */
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
  /** Page number (1-based) */
  page?: number
  /** Results per page */
  limit?: number
}

export interface MarketplaceSearchResult {
  listings: ListingWithRelations[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ListingWithRelations extends Listing {
  category?: Category
  profile?: Profile
  images?: ListingImage[]
}

export interface CategoryWithCount extends Category {
  activeCount: number
}

export interface SellerInfo {
  id: string
  name: string | null
  avatar_url: string | null
  location: string | null
  listingCount: number
  joinedAt: string
}

// ─── Search Service ────────────────────────────────────────────────────────────

const DEFAULT_LIMIT = 12
const MAX_LIMIT = 50

/**
 * Search marketplace listings with filters, sorting, and pagination.
 * This is the ONLY gateway for marketplace search queries.
 */
export async function searchListings(
  params: MarketplaceSearchParams
): Promise<MarketplaceSearchResult> {
  const {
    query,
    categories,
    minPrice,
    maxPrice,
    location,
    condition,
    status = 'active',
    sellerId,
    sort = 'newest',
    page = 1,
    limit = DEFAULT_LIMIT,
  } = params

  const safeLimit = Math.min(Math.max(1, limit), MAX_LIMIT)
  const offset = (Math.max(1, page) - 1) * safeLimit

  // Translate the classifier's rich category concepts to the live DB taxonomy.
  const liveCategories = mapToLiveCategories(categories)

  // Determine the "pure category" decision against a query with location and
  // currency words removed, so e.g. "House in Hyderabad" or "Bike under 1 lakh"
  // still resolve by category rather than a literal title text search.
  const pureDetectionQuery = location
    ? query?.replace(new RegExp(`\\b${escapeRegex(location)}\\b`, 'gi'), ' ').trim() || undefined
    : query
  const isPureCategory = isPureCategoryQuery(pureDetectionQuery)

  // Pure category searches (e.g. "car", "phone") are resolved by category
  // filter only — never by a `title ILIKE '%car%'` text search, since listing
  // titles usually don't repeat the bare category noun.
  const textQuery = isPureCategory ? undefined : query

  let dbQuery = supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon, description, display_order, created_at),
      profile:profiles(id, email, full_name, avatar_url, phone, role, location, about, created_at),
      images:listing_images(id, listing_id, url, sort_order)
    `, { count: 'exact' })
    .eq('status', status)

  // Apply filters
  if (liveCategories && liveCategories.length > 0) {
    const { data: catIds } = await supabase
      .from('categories')
      .select('id')
      .in('slug', liveCategories)
    if (catIds && catIds.length > 0) {
      dbQuery = dbQuery.in('category_id', catIds.map(c => c.id))
    }
  }

  if (minPrice !== undefined) {
    dbQuery = dbQuery.gte('price', minPrice)
  }
  if (maxPrice !== undefined) {
    dbQuery = dbQuery.lte('price', maxPrice)
  }
  if (location) {
    dbQuery = dbQuery.ilike('city', `%${location}%`)
  }
  if (condition) {
    dbQuery = dbQuery.eq('condition', condition)
  }
  if (sellerId) {
    dbQuery = dbQuery.eq('user_id', sellerId)
  }

  // Text search across multiple fields (only for brand/model/specific keywords;
  // pure category searches skip this and rely on the category filter above).
  if (textQuery && textQuery.trim()) {
    const q = `%${textQuery.trim()}%`
    dbQuery = dbQuery.or(
      `title.ilike.${q},description.ilike.${q},location.ilike.${q},address.ilike.${q},city.ilike.${q},state.ilike.${q}`
    )
  }

  // Sorting
  switch (sort) {
    case 'oldest':
      dbQuery = dbQuery.order('created_at', { ascending: true })
      break
    case 'price_asc':
      dbQuery = dbQuery.order('price', { ascending: true })
      break
    case 'price_desc':
      dbQuery = dbQuery.order('price', { ascending: false })
      break
    case 'newest':
    default:
      dbQuery = dbQuery.order('is_featured', { ascending: false })
      dbQuery = dbQuery.order('created_at', { ascending: false })
      break
  }

  // Pagination
  dbQuery = dbQuery.range(offset, offset + safeLimit - 1)

  const { data, error, count } = await dbQuery

  if (error) {
    logger.error('marketplace_search_error', { details: { error: error.message, params } })
    return { listings: [], total: 0, page, limit: safeLimit, hasMore: false }
  }

  const total = count ?? 0
  const listings = (data ?? []) as ListingWithRelations[]

  return {
    listings,
    total,
    page,
    limit: safeLimit,
    hasMore: offset + safeLimit < total,
  }
}

/**
 * Get a single listing by ID with all relations.
 */
export async function getListingById(id: string): Promise<ListingWithRelations | null> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon, description, display_order, created_at),
      profile:profiles(id, email, full_name, avatar_url, phone, role, location, about, created_at),
      images:listing_images(id, listing_id, url, sort_order)
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as ListingWithRelations
}

/**
 * Get all categories with active listing counts.
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (catError || !categories) return []

  const { data: counts } = await supabase
    .from('listings')
    .select('category_id')
    .eq('status', 'active')

  const countMap = new Map<string, number>()
  for (const row of counts ?? []) {
    countMap.set(row.category_id, (countMap.get(row.category_id) ?? 0) + 1)
  }

  return categories.map(cat => ({
    ...cat,
    activeCount: countMap.get(cat.id) ?? 0,
  })) as CategoryWithCount[]
}

/**
 * Get a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as Category
}

/**
 * Get seller public info by user ID.
 */
export async function getSellerInfo(userId: string): Promise<SellerInfo | null> {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, location, created_at')
    .eq('id', userId)
    .single()

  if (profileError || !profile) return null

  const { count } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'active')

  return {
    id: profile.id,
    name: profile.full_name,
    avatar_url: profile.avatar_url,
    location: profile.location,
    listingCount: count ?? 0,
    joinedAt: profile.created_at,
  }
}

/**
 * Get featured listings (is_featured = true, limited).
 */
export async function getFeaturedListings(limit = 6): Promise<ListingWithRelations[]> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon, description, display_order, created_at),
      profile:profiles(id, email, full_name, avatar_url, phone, role, location, about, created_at),
      images:listing_images(id, listing_id, url, sort_order)
    `)
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data ?? []) as ListingWithRelations[]
}

/**
 * Get latest listings (newest first, limited).
 */
export async function getLatestListings(limit = 8): Promise<ListingWithRelations[]> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon, description, display_order, created_at),
      profile:profiles(id, email, full_name, avatar_url, phone, role, location, about, created_at),
      images:listing_images(id, listing_id, url, sort_order)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data ?? []) as ListingWithRelations[]
}

/**
 * Get similar listings based on category and price range.
 */
export async function getSimilarListings(
  listingId: string,
  limit = 4
): Promise<ListingWithRelations[]> {
  const listing = await getListingById(listingId)
  if (!listing) return []

  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon, description, display_order, created_at),
      profile:profiles(id, email, full_name, avatar_url, phone, role, location, about, created_at),
      images:listing_images(id, listing_id, url, sort_order)
    `)
    .eq('status', 'active')
    .eq('category_id', listing.category_id)
    .neq('id', listingId)
    .gte('price', listing.price * 0.5)
    .lte('price', listing.price * 2)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data ?? []) as ListingWithRelations[]
}

/**
 * Get listing counts grouped by category slug.
 * Returns a map of slug → count.
 */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const { data: listings } = await supabase
    .from('listings')
    .select('category_id')
    .eq('status', 'active')

  const { data: cats } = await supabase
    .from('categories')
    .select('id, slug')

  const idToSlug = new Map<string, string>()
  for (const cat of cats ?? []) {
    idToSlug.set(cat.id, cat.slug)
  }

  const counts: Record<string, number> = {}
  for (const row of listings ?? []) {
    const slug = idToSlug.get(row.category_id)
    if (slug) {
      counts[slug] = (counts[slug] ?? 0) + 1
    }
  }

  return counts
}

/**
 * Increment listing view count.
 */
export async function incrementViews(listingId: string): Promise<void> {
  try {
    await supabase.rpc('increment_views', { listing_id: listingId })
  } catch {
    // Fallback: direct update if RPC doesn't exist
    await supabase
      .from('listings')
      .update({ views_count: 1 })
      .eq('id', listingId)
  }
}
