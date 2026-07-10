import { describe, it, expect, beforeEach, vi } from 'vitest'
import { recommendListings, recommendCategories, recommendAll } from '../recommendationEngine'
import * as marketplaceSearch from '../marketplaceSearch'
import type { UserPreference } from '../../types'

vi.mock('../marketplaceSearch', () => ({
  searchListings: vi.fn(),
  getCategoriesWithCounts: vi.fn(),
  getSellerInfo: vi.fn(),
  getFeaturedListings: vi.fn(),
}))

const mockListings = [
  { id: 'l1', title: 'MacBook Pro', price: 120000, city: 'Mumbai', category: { name: 'Electronics' }, condition: 'new', profile: { full_name: 'Seller 1' }, images: [{ url: 'img1.jpg' }], user_id: 's1' },
  { id: 'l2', title: 'iPhone 15', price: 80000, city: 'Delhi', category: { name: 'Electronics' }, condition: 'new', profile: { full_name: 'Seller 2' }, images: [{ url: 'img2.jpg' }], user_id: 's2' },
  { id: 'l3', title: 'Sofa Set', price: 25000, city: 'Mumbai', category: { name: 'Furniture' }, condition: 'used', profile: { full_name: 'Seller 3' }, images: [{ url: 'img3.jpg' }], user_id: 's3' },
]

const mockCategoriesWithCounts = [
  { id: 'cat1', name: 'Electronics', slug: 'electronics', activeCount: 50 },
  { id: 'cat2', name: 'Furniture', slug: 'furniture', activeCount: 30 },
]

describe('RecommendationEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(marketplaceSearch.searchListings).mockResolvedValue({
      listings: mockListings,
      total: 3,
      page: 1,
      limit: 12,
      hasMore: false,
    })
    vi.mocked(marketplaceSearch.getCategoriesWithCounts).mockResolvedValue(mockCategoriesWithCounts)
  })

  describe('recommendListings', () => {
    it('returns recommendations based on category preference', async () => {
      const prefs: UserPreference[] = [
        { key: 'preferred_category', value: 'Electronics', confidence: 0.9, source: 'inferred', updatedAt: new Date().toISOString() },
      ]
      const recs = await recommendListings(prefs)
      expect(recs.length).toBeGreaterThan(0)
      expect(recs[0].type).toBe('listing')
      expect(recs[0].reason).toContain('electronics')
    })

    it('returns empty when no preferences', async () => {
      const recs = await recommendListings([])
      expect(recs).toHaveLength(0)
    })

    it('excludes specified listing IDs', async () => {
      const prefs: UserPreference[] = [
        { key: 'preferred_category', value: 'Electronics', confidence: 0.9, source: 'inferred', updatedAt: new Date().toISOString() },
      ]
      const recs = await recommendListings(prefs, ['l1', 'l2'])
      expect(recs.every((r) => !['l1', 'l2'].includes(r.id))).toBe(true)
    })

    it('respects budget preference', async () => {
      const prefs: UserPreference[] = [
        { key: 'preferred_category', value: 'Electronics', confidence: 0.9, source: 'inferred', updatedAt: new Date().toISOString() },
        { key: 'budget_under', value: '90000', confidence: 0.8, source: 'inferred', updatedAt: new Date().toISOString() },
      ]
      vi.mocked(marketplaceSearch.searchListings).mockResolvedValue({
        listings: [mockListings[0], mockListings[1]],
        total: 2,
        page: 1,
        limit: 12,
        hasMore: false,
      })
      const recs = await recommendListings(prefs)
      expect(recs.length).toBeGreaterThan(0)
    })
  })

  describe('recommendCategories', () => {
    it('returns category recommendations', async () => {
      const prefs: UserPreference[] = [
        { key: 'preferred_category', value: 'Electronics', confidence: 0.9, source: 'inferred', updatedAt: new Date().toISOString() },
        { key: 'preferred_category', value: 'Furniture', confidence: 0.6, source: 'inferred', updatedAt: new Date().toISOString() },
      ]
      const recs = await recommendCategories(prefs)
      expect(recs.length).toBeGreaterThan(0)
      expect(recs[0].type).toBe('category')
    })

    it('returns empty when no category preferences', async () => {
      const recs = await recommendCategories([])
      expect(recs).toHaveLength(0)
    })
  })

  describe('recommendAll', () => {
    it('returns all recommendation types', async () => {
      const prefs: UserPreference[] = [
        { key: 'preferred_category', value: 'Electronics', confidence: 0.9, source: 'inferred', updatedAt: new Date().toISOString() },
      ]
      const result = await recommendAll(prefs)
      expect(result).toHaveProperty('listings')
      expect(result).toHaveProperty('categories')
      expect(result).toHaveProperty('sellers')
      expect(result).toHaveProperty('resources')
    })

    it('returns empty arrays when no preferences', async () => {
      const result = await recommendAll([])
      expect(result.listings).toHaveLength(0)
      expect(result.categories).toHaveLength(0)
    })
  })
})