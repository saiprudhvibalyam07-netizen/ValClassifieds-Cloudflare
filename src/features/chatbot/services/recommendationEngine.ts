import type { Recommendation, UserPreference } from '../types'
import type { MarketplaceListing } from '../types'
import { MEMORY_CONFIG } from '../config'
import { searchListings, getCategoriesWithCounts } from './marketplaceSearch'
import { logger } from './logger'

function toMarketplaceListing(l: {
  id: string
  title: string
  price: number
  city: string | null
  category?: { name: string } | null
  condition: 'new' | 'used' | null
  profile?: { full_name: string | null } | null
  images?: { url: string }[] | null
  user_id: string
  created_at: string
}): MarketplaceListing {
  return {
    id: l.id,
    title: l.title,
    price: l.price,
    category: l.category?.name ?? 'Unknown',
    location: l.city ?? 'Unknown',
    sellerId: l.user_id,
    status: 'active',
    images: l.images?.map(i => i.url) ?? [],
    createdAt: l.created_at,
  }
}

export async function recommendListings(
  preferences: UserPreference[],
  excludeIds: string[] = []
): Promise<Recommendation[]> {
  const preferredCats = preferences
    .filter((p) => p.key === 'preferred_category')
    .sort((a, b) => b.confidence - a.confidence)
    .map((p) => p.value as string)

  const preferredLoc = preferences.find((p) => p.key === 'preferred_location')?.value as string | undefined
  const budgetUnder = preferences.find((p) => p.key === 'budget_under')?.value as string | undefined

  if (preferredCats.length === 0 && !preferredLoc) return []

  const maxPrice = budgetUnder ? parseFloat(budgetUnder) : undefined

  const results = await searchListings({
    categories: preferredCats.length > 0 ? preferredCats : undefined,
    location: preferredLoc,
    maxPrice,
    status: 'active',
    sort: 'newest',
    limit: 20,
    page: 1,
  })

  const filtered = results.listings.filter((l) => !excludeIds.includes(l.id))
  const topK = MEMORY_CONFIG.recommendationTopK

  const recommendations: Recommendation[] = filtered.slice(0, topK).map((listing, i) => {
    const mpListing = toMarketplaceListing(listing)
    return {
      type: 'listing',
      id: listing.id,
      title: listing.title,
      description: `₹${listing.price.toLocaleString()} — ${listing.city}`,
      score: 1 - (i / filtered.length),
      reason: buildListingReason(mpListing, preferences),
      image: listing.images?.[0]?.url,
    }
  })

  logger.info('listings_recommended', { details: { count: recommendations.length } })
  return recommendations
}

export async function recommendCategories(
  preferences: UserPreference[]
): Promise<Recommendation[]> {
  const preferredCats = preferences
    .filter((p) => p.key === 'preferred_category')
    .sort((a, b) => b.confidence - a.confidence)
    .map((p) => p.value as string)

  if (preferredCats.length === 0) return []

  const allCategories = await getCategoriesWithCounts()
  const topK = MEMORY_CONFIG.recommendationTopK

  const recommendations: Recommendation[] = preferredCats.slice(0, topK).map((catName, i) => {
    const cat = allCategories.find((c) => c.name === catName)
    return {
      type: 'category',
      id: cat?.slug ?? catName,
      title: catName,
      description: cat ? `${cat.activeCount} items available` : 'Browse listings',
      score: 1 - (i / topK),
      reason: `Based on your interest in ${catName.toLowerCase()}`,
    }
  })

  return recommendations
}

export async function recommendSellers(
  preferences: UserPreference[]
): Promise<Recommendation[]> {
  const preferredCats = preferences
    .filter((p) => p.key === 'preferred_category')
    .map((p) => p.value as string)

  if (preferredCats.length === 0) return []

  const results = await searchListings({ categories: preferredCats, status: 'active', limit: 20 })
  const sellerIds = new Set(results.listings.map((l) => l.user_id))

  const recommendations: Recommendation[] = Array.from(sellerIds).slice(0, MEMORY_CONFIG.recommendationTopK).map((id, i) => ({
    type: 'seller',
    id,
    title: `Seller #${id}`,
    description: `Active in ${preferredCats.join(', ')}`,
    score: 1 - (i / MEMORY_CONFIG.recommendationTopK),
    reason: `Has listings in ${preferredCats[0]?.toLowerCase() ?? 'your interests'}`,
  }))

  return recommendations
}

export async function recommendAll(
  preferences: UserPreference[],
  excludeListingIds: string[] = []
): Promise<{ listings: Recommendation[]; categories: Recommendation[]; sellers: Recommendation[]; resources: Recommendation[] }> {
  const [listings, categories, sellers] = await Promise.all([
    recommendListings(preferences, excludeListingIds),
    recommendCategories(preferences),
    recommendSellers(preferences),
  ])

  return { listings, categories, sellers, resources: [] }
}

function buildListingReason(listing: MarketplaceListing, preferences: UserPreference[]): string {
  const reasons: string[] = []

  const catPref = preferences.find((p) => p.key === 'preferred_category' && p.value === listing.category)
  if (catPref) reasons.push(`Matches your interest in ${listing.category.toLowerCase()}`)

  const locPref = preferences.find((p) => p.key === 'preferred_location')
  if (locPref && listing.location.toLowerCase().includes((locPref.value as string).toLowerCase())) {
    reasons.push(`Located in ${listing.location}`)
  }

  const budgetPref = preferences.find((p) => p.key === 'budget_under')
  if (budgetPref) {
    const budget = parseFloat(budgetPref.value as string)
    if (listing.price <= budget) reasons.push(`Within your budget`)
  }

  return reasons[0] ?? 'Recommended for you'
}