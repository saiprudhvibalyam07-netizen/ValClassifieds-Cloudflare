import { describe, it, expect } from 'vitest'
import { resolveStrategy } from '../responseStrategy'
import type { IntentClassification, ConversationContextState, ClarificationResult } from '../../types'

function makeClassification(overrides: Partial<IntentClassification> = {}): IntentClassification {
  return {
    intent: 'UNKNOWN',
    confidence: 0.5,
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

function makeClarification(overrides: Partial<ClarificationResult> = {}): ClarificationResult {
  return {
    shouldClarify: false,
    question: '',
    missingFields: [],
    ...overrides,
  }
}

describe('responseStrategy', () => {
  describe('SAFETY_WARNING', () => {
    it('returns SAFETY_WARNING for offensive content', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'OFFENSIVE' }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('SAFETY_WARNING')
    })
  })

  describe('UNSUPPORTED', () => {
    it('returns UNSUPPORTED for unsupported intent', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'UNSUPPORTED' }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('UNSUPPORTED')
    })
  })

  describe('HANDOFF', () => {
    it('returns HANDOFF for admin action', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'ADMIN_ACTION' }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('HANDOFF')
    })
  })

  describe('CLARIFY', () => {
    it('returns CLARIFY when clarification needed', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SEARCH_LISTINGS', confidence: 0.9 }),
        clarification: makeClarification({ shouldClarify: true, question: 'What is your budget?' }),
        context: makeContext(),
      })
      expect(result).toBe('CLARIFY')
    })
  })

  describe('REDIRECT', () => {
    it('returns REDIRECT for low confidence unknown', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'UNKNOWN', confidence: 0.2 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('REDIRECT')
    })
  })

  describe('ANSWER', () => {
    it('returns ANSWER for greeting', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'GREETING', confidence: 0.95 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER for small talk', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SMALL_TALK', confidence: 0.7 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER when clarification count >= 2', () => {
      const result = resolveStrategy({
        classification: makeClassification({
          intent: 'SEARCH_LISTINGS',
          confidence: 0.9,
          missingInformation: ['budget'],
        }),
        clarification: makeClarification(),
        context: makeContext({ clarificationCount: 2 }),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER for buying help', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'BUYING_HELP', confidence: 0.85 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER for selling help', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SELLING_HELP', confidence: 0.85 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER for safety', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SAFETY', confidence: 0.9 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })

    it('returns ANSWER for pricing help', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'PRICING_HELP', confidence: 0.85 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('ANSWER')
    })
  })

  describe('SEARCH', () => {
    it('returns SEARCH for search listings', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SEARCH_LISTINGS', confidence: 0.9 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('SEARCH')
    })
  })

  describe('VERIFY', () => {
    it('returns VERIFY for low confidence intents', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'SELLING_HELP', confidence: 0.5 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).toBe('VERIFY')
    })

    it('does not return VERIFY for UNKNOWN intent', () => {
      const result = resolveStrategy({
        classification: makeClassification({ intent: 'UNKNOWN', confidence: 0.5 }),
        clarification: makeClarification(),
        context: makeContext(),
      })
      expect(result).not.toBe('VERIFY')
    })
  })
})
