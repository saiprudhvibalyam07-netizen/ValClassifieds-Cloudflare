import { describe, it, expect } from 'vitest'
import { getClarification } from '../clarificationEngine'

describe('clarificationEngine', () => {
  describe('getClarification', () => {
    it('returns no clarification when no fields missing', () => {
      const result = getClarification('SEARCH_LISTINGS', {}, [])
      expect(result.shouldClarify).toBe(false)
    })

    it('asks about category first for search', () => {
      const result = getClarification('SEARCH_LISTINGS', {}, ['category', 'budget', 'location'])
      expect(result.shouldClarify).toBe(true)
      expect(result.missingFields).toContain('category')
      expect(result.question).toBeTruthy()
    })

    it('asks about budget when category is present', () => {
      const result = getClarification('SEARCH_LISTINGS', { category: 'phones' }, ['budget', 'location'])
      expect(result.shouldClarify).toBe(true)
      expect(result.missingFields).toContain('budget')
    })

    it('asks about location when category and budget present', () => {
      const result = getClarification('SEARCH_LISTINGS', { category: 'phones', budget: { max: 20000 } }, ['location'])
      expect(result.shouldClarify).toBe(true)
      expect(result.missingFields).toContain('location')
    })

    it('asks about listing for listing details', () => {
      const result = getClarification('LISTING_DETAILS', {}, ['listing'])
      expect(result.shouldClarify).toBe(true)
      expect(result.missingFields).toContain('listing')
    })

    it('asks about item for pricing help', () => {
      const result = getClarification('PRICING_HELP', {}, ['item'])
      expect(result.shouldClarify).toBe(true)
      expect(result.missingFields).toContain('item')
    })

    it('asks about items to compare', () => {
      const result = getClarification('COMPARISON', {}, ['items to compare'])
      expect(result.shouldClarify).toBe(true)
    })

    it('returns single field in missingFields', () => {
      const result = getClarification('SEARCH_LISTINGS', {}, ['budget'])
      expect(result.missingFields).toHaveLength(1)
      expect(result.missingFields[0]).toBe('budget')
    })

    it('returns appropriate question for each field', () => {
      const fields = ['category', 'budget', 'location', 'listing', 'item']
      for (const field of fields) {
        const result = getClarification('SEARCH_LISTINGS', {}, [field])
        expect(result.question).toBeTruthy()
        expect(result.question.length).toBeGreaterThan(5)
      }
    })
  })
})
