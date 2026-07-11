import { describe, it, expect, beforeEach } from 'vitest'
import { runConversationPipeline } from '../conversationPipeline'
import { conversationContext } from '../conversationContext'

describe('conversationPipeline', () => {
  beforeEach(() => {
    conversationContext.reset()
  })

  describe('GREETING', () => {
    it('returns greeting for hello', async () => {
      const result = await runConversationPipeline('hello', 'visitor')
      expect(result.classification.intent).toBe('GREETING')
      expect(result.strategy).toBe('ANSWER')
      expect(result.response).toBeTruthy()
      expect(result.response.length).toBeGreaterThan(5)
    })

    it('returns role-specific greeting', async () => {
      const result = await runConversationPipeline('hi', 'buyer')
      expect(result.response).toBeTruthy()
    })
  })

  describe('SEARCH_LISTINGS', () => {
    it('asks for clarification when missing info', async () => {
      const result = await runConversationPipeline('find phones', 'visitor')
      expect(result.classification.intent).toBe('SEARCH_LISTINGS')
      expect(result.strategy).toBe('CLARIFY')
      expect(result.response).toBeTruthy()
    })

    it('proceeds when info is complete', async () => {
      const result = await runConversationPipeline('find phones under 20000 in Bangalore', 'visitor')
      expect(result.classification.intent).toBe('SEARCH_LISTINGS')
      expect(result.strategy).toBe('SEARCH')
      expect(result.response).toBeTruthy()
    })

    it('extracts category', async () => {
      const result = await runConversationPipeline('find laptops', 'visitor')
      expect(result.classification.entities.category).toBe('electronics')
    }, 10000)

    it('extracts budget', async () => {
      const result = await runConversationPipeline('find phones under 15000', 'visitor')
      expect(result.classification.entities.budget?.max).toBe(15000)
    })
  })

  describe('BROWSE_CATEGORIES', () => {
    it('returns category list', async () => {
      const result = await runConversationPipeline('what categories do you have', 'visitor')
      expect(result.classification.intent).toBe('BROWSE_CATEGORIES')
      expect(result.response).toContain('Categories')
    })
  })

  describe('BUYING_HELP', () => {
    it('returns buying guidance', async () => {
      const result = await runConversationPipeline('how to buy', 'visitor')
      expect(result.classification.intent).toBe('BUYING_HELP')
      expect(result.response.toLowerCase()).toContain('buy')
    })
  })

  describe('SELLING_HELP', () => {
    it('returns selling guidance', async () => {
      const result = await runConversationPipeline('how to sell', 'visitor')
      expect(result.classification.intent).toBe('SELLING_HELP')
      expect(result.response).toBeTruthy()
    })
  })

  describe('SAFETY', () => {
    it('returns safety tips', async () => {
      const result = await runConversationPipeline('safety tips', 'visitor')
      expect(result.classification.intent).toBe('SAFETY')
      expect(result.response.toLowerCase()).toContain('safe')
    })

    it('returns scam warning', async () => {
      const result = await runConversationPipeline('otp scam warning', 'visitor')
      expect(result.classification.intent).toBe('SAFETY')
      expect(result.response).toContain('OTP')
    })
  })

  describe('PRICING_HELP', () => {
    it('returns pricing advice', async () => {
      const result = await runConversationPipeline('how much should I charge for my laptop', 'visitor')
      expect(result.classification.intent).toBe('PRICING_HELP')
      expect(result.response.toLowerCase()).toContain('price')
    })
  })

  describe('PLATFORM_HELP', () => {
    it('returns platform guidance', async () => {
      const result = await runConversationPipeline('how does this work', 'visitor')
      expect(result.classification.intent).toBe('PLATFORM_HELP')
      expect(result.response).toBeTruthy()
    })
  })

  describe('SMALL_TALK', () => {
    it('handles casual chat', async () => {
      const result = await runConversationPipeline('ok', 'visitor')
      expect(result.classification.intent).toBe('SMALL_TALK')
      expect(result.response).toBeTruthy()
    })
  })

  describe('THANK_YOU', () => {
    it('handles thanks', async () => {
      const result = await runConversationPipeline('thanks', 'visitor')
      expect(result.classification.intent).toBe('THANK_YOU')
      expect(result.response).toBeTruthy()
    })
  })

  describe('FAREWELL', () => {
    it('handles goodbye', async () => {
      const result = await runConversationPipeline('goodbye', 'visitor')
      expect(result.classification.intent).toBe('FAREWELL')
      expect(result.response).toBeTruthy()
    })
  })

  describe('OFFENSIVE', () => {
    it('returns safety warning', async () => {
      const result = await runConversationPipeline('you are an idiot', 'visitor')
      expect(result.classification.intent).toBe('OFFENSIVE')
      expect(result.strategy).toBe('SAFETY_WARNING')
    })
  })

  describe('UNSUPPORTED', () => {
    it('returns scope explanation', async () => {
      const result = await runConversationPipeline('write me a poem', 'visitor')
      expect(result.classification.intent).toBe('UNSUPPORTED')
      expect(result.response.toLowerCase()).toContain('marketplace')
    })
  })

  describe('ADMIN_ACTION', () => {
    it('restricts to admin role', async () => {
      const result = await runConversationPipeline('admin panel access', 'visitor')
      expect(result.classification.intent).toBe('ADMIN_ACTION')
      expect(result.response).toContain('Admin Access Required')
    })

    it('allows admin role', async () => {
      const result = await runConversationPipeline('admin panel access', 'admin')
      expect(result.classification.intent).toBe('ADMIN_ACTION')
      expect(result.response).toContain('Admin')
    })
  })

  describe('Context tracking', () => {
    it('updates context after processing', async () => {
      await runConversationPipeline('find phones', 'visitor')
      const ctx = conversationContext.getContext()
      expect(ctx.lastIntent).toBe('SEARCH_LISTINGS')
      expect(ctx.lastEntities.category).toBeDefined()
    })
  })
})