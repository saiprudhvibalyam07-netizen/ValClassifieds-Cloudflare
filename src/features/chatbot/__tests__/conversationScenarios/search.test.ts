import { describe, it, vi, expect } from 'vitest'
import { runScenario, assertScenario, assertListingGrid } from './helpers'
import { SEARCH } from './scenarioData'
import type { MarketplaceSearchParams, MarketplaceSearchResult } from '../../services/marketplaceSearch'

vi.mock('../../services/marketplaceSearch', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/marketplaceSearch')>()
  const fake = (params: MarketplaceSearchParams): MarketplaceSearchResult => {
    const listings = [
      {
        id: 'l1',
        title: 'Sample listing',
        price: params.maxPrice ? Math.min(5000, params.maxPrice) : 5000,
        category: { slug: params.categories?.[0] ?? 'items-for-sale' } as never,
        location: params.location ?? 'Bangalore',
        images: [],
        city: params.location ?? 'Bangalore',
      },
    ]
    return {
      listings: listings as never,
      total: listings.length,
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      hasMore: false,
    }
  }
  return { ...actual, searchListings: vi.fn(fake) }
})

import { searchListings } from '../../services/marketplaceSearch'

describe('conversation QA: search (natural language)', () => {
  it.each(SEARCH)('"%s" -> %s', async (msg, intent) => {
    const r = await runScenario(msg)
    assertScenario(r, intent)
  })
})

describe('conversation QA: search results render a listing grid', () => {
  const gridQueries = [
    'car in Delhi',
    'phone under 10000 in Bangalore',
    'bike in Bangalore',
    'laptop under 50000 in Pune',
  ]
  it.each(gridQueries)('"%s" renders listing grid', async (msg) => {
    const r = await runScenario(msg)
    assertScenario(r, 'SEARCH_LISTINGS')
    assertListingGrid(r)
  })
})

describe('conversation QA: search applies structured filters', () => {
  it('extracts price + location filter', async () => {
    vi.mocked(searchListings).mockClear()
    await runScenario('phone under 10000 in Bangalore')
    expect(vi.mocked(searchListings).mock.calls.length).toBeGreaterThan(0)
    const call = vi.mocked(searchListings).mock.calls[0][0] as MarketplaceSearchParams
    expect(call.maxPrice).toBe(10000)
    expect(call.location).toBe('Bangalore')
  })

  it('maps rich category to live DB slug', async () => {
    vi.mocked(searchListings).mockClear()
    await runScenario('bike in Bangalore')
    const call = vi.mocked(searchListings).mock.calls[0][0] as MarketplaceSearchParams
    expect(call.categories).toContain('vehicles')
  })
})
