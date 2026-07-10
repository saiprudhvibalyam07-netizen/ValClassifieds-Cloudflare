import { describe, it, expect } from 'vitest'
import { shouldContinueClarifying, getAssumptionMessage } from '../followUpEngine'
import type { IntentClassification, ConversationContextState } from '../../types'

function makeClassification(overrides: Partial<IntentClassification> = {}): IntentClassification {
  return {
    intent: 'SEARCH_LISTINGS',
    confidence: 0.9,
    entities: {},
    missingInformation: [],
    requiresClarification: false,
    ...overrides,
  }
}

function makeContext(overrides: Partial<ConversationContextState> = {}): ConversationContextState {
  return {
    lastIntent: null,
    lastEntities: {},
    currentGoal: null,
    conversationStage: 'greeting',
    currentListing: null,
    searchFilters: null,
    clarificationCount: 0,
    lastResponse: null,
    ...overrides,
  }
}

describe('followUpEngine', () => {
  describe('shouldContinueClarifying', () => {
    it('returns true when clarification needed and count < 2', () => {
      const classification = makeClassification({ requiresClarification: true, missingInformation: ['budget'] })
      const context = makeContext({ clarificationCount: 0 })
      expect(shouldContinueClarifying(classification, context)).toBe(true)
    })

    it('returns true on first clarification', () => {
      const classification = makeClassification({ requiresClarification: true, missingInformation: ['budget'] })
      const context = makeContext({ clarificationCount: 1 })
      expect(shouldContinueClarifying(classification, context)).toBe(true)
    })

    it('returns false when clarification count >= 2', () => {
      const classification = makeClassification({ requiresClarification: true, missingInformation: ['budget'] })
      const context = makeContext({ clarificationCount: 2 })
      expect(shouldContinueClarifying(classification, context)).toBe(false)
    })

    it('returns false when clarification not required', () => {
      const classification = makeClassification({ requiresClarification: false })
      const context = makeContext({ clarificationCount: 0 })
      expect(shouldContinueClarifying(classification, context)).toBe(false)
    })

    it('returns false when clarification not required', () => {
      const classification = makeClassification({ requiresClarification: false })
      const context = makeContext({ clarificationCount: 0 })
      expect(shouldContinueClarifying(classification, context)).toBe(false)
    })
  })

  describe('getAssumptionMessage', () => {
    it('mentions category when present', () => {
      const classification = makeClassification({ entities: { category: 'phones' } })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('phones')
    })

    it('mentions budget when present', () => {
      const classification = makeClassification({ entities: { budget: { max: 20000 } } })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('20000')
    })

    it('mentions location when present', () => {
      const classification = makeClassification({ entities: { location: 'Bangalore' } })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('Bangalore')
    })

    it('mentions brand when present', () => {
      const classification = makeClassification({ entities: { brand: 'Samsung' } })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('Samsung')
    })

    it('mentions condition when present', () => {
      const classification = makeClassification({ entities: { condition: 'used' } })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('used')
    })

    it('returns general message when no entities', () => {
      const classification = makeClassification({ entities: {} })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('general')
    })

    it('combines multiple entities', () => {
      const classification = makeClassification({
        entities: { category: 'phones', budget: { max: 20000 }, location: 'Delhi' },
      })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('phones')
      expect(msg).toContain('20000')
      expect(msg).toContain('Delhi')
    })

    it('mentions range when min and max present', () => {
      const classification = makeClassification({
        entities: { budget: { min: 10000, max: 20000 } },
      })
      const msg = getAssumptionMessage(classification)
      expect(msg).toContain('10000')
      expect(msg).toContain('20000')
    })
  })
})
