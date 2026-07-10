import { describe, it, expect, beforeEach } from 'vitest'
import { conversationContext } from '../conversationContext'

describe('conversationContext', () => {
  beforeEach(() => {
    conversationContext.reset()
  })

  describe('getContext', () => {
    it('returns default context', () => {
      const ctx = conversationContext.getContext()
      expect(ctx.lastIntent).toBeNull()
      expect(ctx.conversationStage).toBe('greeting')
      expect(ctx.clarificationCount).toBe(0)
    })
  })

  describe('updateContext', () => {
    it('updates last intent', () => {
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', { category: 'phones' })
      expect(ctx.lastIntent).toBe('SEARCH_LISTINGS')
    })

    it('merges entities', () => {
      conversationContext.updateContext('SEARCH_LISTINGS', { category: 'phones' })
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', { budget: { max: 20000 } })
      expect(ctx.lastEntities.category).toBe('phones')
      expect(ctx.lastEntities.budget?.max).toBe(20000)
    })

    it('updates conversation stage', () => {
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', {})
      expect(ctx.conversationStage).toBe('searching')
    })

    it('sets current goal for search', () => {
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', { category: 'phones' })
      expect(ctx.currentGoal).toContain('phones')
    })

    it('sets current goal for search with budget', () => {
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', {
        category: 'phones',
        budget: { max: 20000 },
      })
      expect(ctx.currentGoal).toContain('20000')
    })

    it('builds search filters', () => {
      const ctx = conversationContext.updateContext('SEARCH_LISTINGS', {
        category: 'phones',
        budget: { max: 20000 },
        location: 'Delhi',
      })
      expect(ctx.searchFilters?.categories).toContain('phones')
      expect(ctx.searchFilters?.maxPrice).toBe(20000)
      expect(ctx.searchFilters?.location).toBe('Delhi')
    })

    it('resets clarification count', () => {
      conversationContext.incrementClarification()
      conversationContext.incrementClarification()
      const ctx = conversationContext.updateContext('GREETING', {})
      expect(ctx.clarificationCount).toBe(0)
    })

    it('handles greeting stage', () => {
      const ctx = conversationContext.updateContext('GREETING', {})
      expect(ctx.conversationStage).toBe('greeting')
    })

    it('handles browsing stage', () => {
      const ctx = conversationContext.updateContext('BROWSE_CATEGORIES', {})
      expect(ctx.conversationStage).toBe('exploring')
    })

    it('handles evaluating stage', () => {
      const ctx = conversationContext.updateContext('LISTING_DETAILS', {})
      expect(ctx.conversationStage).toBe('evaluating')
    })

    it('handles support stage', () => {
      const ctx = conversationContext.updateContext('BUYING_HELP', {})
      expect(ctx.conversationStage).toBe('support')
    })

    it('handles transacting stage', () => {
      const ctx = conversationContext.updateContext('CONTACT_SELLER', {})
      expect(ctx.conversationStage).toBe('transacting')
    })
  })

  describe('incrementClarification', () => {
    it('increments count', () => {
      conversationContext.incrementClarification()
      const ctx = conversationContext.getContext()
      expect(ctx.clarificationCount).toBe(1)
    })

    it('increments multiple times', () => {
      conversationContext.incrementClarification()
      conversationContext.incrementClarification()
      const ctx = conversationContext.getContext()
      expect(ctx.clarificationCount).toBe(2)
    })
  })

  describe('setLastResponse', () => {
    it('stores last response', () => {
      conversationContext.setLastResponse('Hello there!')
      const ctx = conversationContext.getContext()
      expect(ctx.lastResponse).toBe('Hello there!')
    })
  })

  describe('reset', () => {
    it('clears all context', () => {
      conversationContext.updateContext('SEARCH_LISTINGS', { category: 'phones' })
      conversationContext.setLastResponse('test')
      conversationContext.reset()
      const ctx = conversationContext.getContext()
      expect(ctx.lastIntent).toBeNull()
      expect(ctx.lastEntities).toEqual({})
      expect(ctx.lastResponse).toBeNull()
    })
  })

  describe('conversation-scoped context', () => {
    it('maintains separate contexts per conversation', () => {
      conversationContext.updateContext('SEARCH_LISTINGS', { category: 'phones' }, 'conv-1')
      conversationContext.updateContext('BUYING_HELP', {}, 'conv-2')

      const ctx1 = conversationContext.getContext('conv-1')
      const ctx2 = conversationContext.getContext('conv-2')

      expect(ctx1.lastIntent).toBe('SEARCH_LISTINGS')
      expect(ctx2.lastIntent).toBe('BUYING_HELP')
    })

    it('returns default for unknown conversation', () => {
      const ctx = conversationContext.getContext('unknown-conv')
      expect(ctx.lastIntent).toBeNull()
    })

    it('resets specific conversation', () => {
      conversationContext.updateContext('SEARCH_LISTINGS', {}, 'conv-1')
      conversationContext.reset('conv-1')
      const ctx = conversationContext.getContext('conv-1')
      expect(ctx.lastIntent).toBeNull()
    })
  })
})
