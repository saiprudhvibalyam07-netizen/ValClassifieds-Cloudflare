import { describe, it, expect } from 'vitest'
import { buildSearchPlan, buildBrowsePlan, buildRecommendationPlan } from '../queryPlanner'
import type { IntentClassification, ConversationContextState } from '../../types'

function makeIntent(overrides: Partial<IntentClassification> = {}): IntentClassification {
  return {
    intent: 'search',
    confidence: 0.8,
    entities: {},
    followUpNeeded: false,
    ...overrides,
  }
}

function makeContext(overrides: Partial<ConversationContextState> = {}): ConversationContextState {
  return {
    conversationId: 'test',
    sessionId: 'test',
    userId: undefined,
    currentIntent: undefined,
    currentEntities: {},
    clarificationCount: 0,
    maxClarifications: 2,
    stage: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

describe('queryPlanner', () => {
  describe('buildSearchPlan', () => {
    it('builds a search plan from intent', () => {
      const intent = makeIntent({
        entities: {
          query: 'iPhone',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.query).toBe('iPhone')
      expect(plan.params.status).toBe('active')
      expect(plan.fallback.type).toBeDefined()
    })

    it('extracts category from intent', () => {
      const intent = makeIntent({
        entities: {
          category: 'phone',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.categories).toEqual(['mobiles-tablets'])
    })

    it('extracts location from intent', () => {
      const intent = makeIntent({
        entities: {
          location: 'Bangalore',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.location).toBe('Bangalore')
    })

    it('extracts budget from intent', () => {
      const intent = makeIntent({
        entities: {
          budget: { min: 10000, max: 50000 },
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.minPrice).toBe(10000)
      expect(plan.params.maxPrice).toBe(50000)
    })

    it('extracts price as single max value', () => {
      const intent = makeIntent({
        entities: {
          price: 30000,
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.maxPrice).toBe(30000)
    })

    it('extracts condition from intent', () => {
      const intent = makeIntent({
        entities: {
          condition: 'used',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.condition).toBe('used')
    })

    it('sets fallback to widen_price when category + location + price present', () => {
      const intent = makeIntent({
        entities: {
          category: 'phone',
          location: 'Bangalore',
          budget: { max: 20000 },
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.fallback.type).toBe('widen_price')
    })

    it('sets fallback to expand_location when category + location present', () => {
      const intent = makeIntent({
        entities: {
          category: 'phone',
          location: 'Bangalore',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.fallback.type).toBe('expand_location')
    })

    it('sets fallback to broaden_category when only category present', () => {
      const intent = makeIntent({
        entities: {
          category: 'vehicles',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.fallback.type).toBe('broaden_category')
    })

    it('sets fallback to expand_location when only location present', () => {
      const intent = makeIntent({
        entities: {
          location: 'Bangalore',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.fallback.type).toBe('expand_location')
    })

    it('sets fallback to remove_filters as default', () => {
      const intent = makeIntent({ entities: {} })
      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.fallback.type).toBe('remove_filters')
    })

    it('defaults to 12 results', () => {
      const intent = makeIntent({ entities: {} })
      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.limit).toBe(12)
    })

    it('limits to 1 for listing details', () => {
      const intent = makeIntent({
        intent: 'LISTING_DETAILS',
        entities: { listingId: '123' },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.limit).toBe(1)
    })

    it('limits to 4 for comparison', () => {
      const intent = makeIntent({
        intent: 'COMPARISON',
        entities: {},
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.limit).toBe(4)
    })

    it('limits to 5 for recommendation', () => {
      const intent = makeIntent({
        intent: 'RECOMMENDATION',
        entities: {},
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.params.limit).toBe(5)
    })

    it('calculates confidence based on filter count', () => {
      const noFilters = buildSearchPlan(makeIntent({ entities: {} }), makeContext())
      expect(noFilters.confidence).toBeGreaterThanOrEqual(0.5)

      const withFilters = buildSearchPlan(makeIntent({
        entities: { category: 'phone', location: 'Bangalore', budget: { max: 20000 } },
      }), makeContext())
      expect(withFilters.confidence).toBeGreaterThan(noFilters.confidence)
    })

    it('caps confidence at 0.95', () => {
      const intent = makeIntent({
        entities: {
          category: 'phone',
          location: 'Bangalore',
          budget: { min: 10000, max: 50000 },
          condition: 'new',
          query: 'iPhone',
        },
      })

      const plan = buildSearchPlan(intent, makeContext())
      expect(plan.confidence).toBeLessThanOrEqual(0.95)
    })
  })

  describe('buildBrowsePlan', () => {
    it('builds a browse plan with no args', () => {
      const plan = buildBrowsePlan()
      expect(plan.params.status).toBe('active')
      expect(plan.params.sort).toBe('newest')
      expect(plan.params.limit).toBe(12)
      expect(plan.fallback.type).toBe('suggest_alternatives')
    })
  })

  describe('buildRecommendationPlan', () => {
    it('builds a recommendation plan with categories', () => {
      const plan = buildRecommendationPlan(['electronics', 'mobiles-tablets'])
      expect(plan.params.categories).toEqual(['electronics', 'mobiles-tablets'])
      expect(plan.params.status).toBe('active')
      expect(plan.params.sort).toBe('newest')
      expect(plan.params.limit).toBe(5)
      expect(plan.fallback.type).toBe('remove_filters')
    })

    it('builds a recommendation plan with location', () => {
      const plan = buildRecommendationPlan(['vehicles'], 'Bangalore')
      expect(plan.params.location).toBe('Bangalore')
    })

    it('builds a recommendation plan with budget', () => {
      const plan = buildRecommendationPlan(['electronics'], undefined, 50000)
      expect(plan.params.maxPrice).toBe(50000)
    })

    it('builds a recommendation plan with no categories', () => {
      const plan = buildRecommendationPlan([])
      expect(plan.params.categories).toBeUndefined()
      expect(plan.params.limit).toBe(5)
    })
  })
})
