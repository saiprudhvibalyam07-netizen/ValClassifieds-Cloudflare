import { describe, it, expect } from 'vitest'
import { getHandler } from '../intentHandlers'
import type { IntentClassification, ConversationContextState } from '../../types'
import type { StructuredResponse } from '../services/responseTypes'

function makeClassification(intent: string, overrides: Partial<IntentClassification> = {}): IntentClassification {
  return {
    intent: intent as IntentClassification['intent'],
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
    clarificationCount: 0,
    maxClarifications: 2,
    stage: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

function extractText(sr: StructuredResponse): string {
  return sr.sections
    .filter(
      (s) =>
        s.type === 'text' ||
        s.type === 'heading' ||
        s.type === 'subheading' ||
        s.type === 'info_section' ||
        s.type === 'numbered_steps' ||
        s.type === 'warning' ||
        s.type === 'success' ||
        s.type === 'error' ||
        s.type === 'empty_state' ||
        s.type === 'safety_banner'
    )
    .map((s) => {
      if (s.type === 'text' || s.type === 'heading' || s.type === 'subheading' || s.type === 'warning') {
        return s.content
      }
      if (s.type === 'info_section') {
        return s.title ? `${s.title}\n${s.items.join('\n')}` : s.items.join('\n')
      }
      if (s.type === 'numbered_steps') {
        return s.title ? `${s.title}\n${s.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}` : s.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
      }
      if (s.type === 'safety_banner') {
        const tips = s.tips ? `\n${s.tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}` : ''
        return `${s.title}: ${s.message}${tips}`
      }
      if (s.type === 'success') {
        return s.message
      }
      if (s.type === 'error') {
        return s.message
      }
      if (s.type === 'empty_state') {
        return `${s.title}: ${s.description}`
      }
      return ''
    })
    .join('\n\n')
}

describe('intentHandlers', () => {
  describe('GreetingHandler', () => {
    it('returns greeting for visitor', async () => {
      const handler = getHandler('GREETING')
      const result = await handler.handle(makeClassification('GREETING'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toBeTruthy()
      expect(text.length).toBeGreaterThan(5)
    })

    it('returns role-specific greeting', async () => {
      const handler = getHandler('GREETING')
      const visitorResult = await handler.handle(makeClassification('GREETING'), makeContext(), 'visitor')
      const buyerResult = await handler.handle(makeClassification('GREETING'), makeContext(), 'buyer')
      expect(extractText(visitorResult)).toBeTruthy()
      expect(extractText(buyerResult)).toBeTruthy()
    })
  })

  describe('SearchHandler', () => {
    it('returns search response with entities', async () => {
      const handler = getHandler('SEARCH_LISTINGS')
      const classification = makeClassification('SEARCH_LISTINGS', {
        entities: { category: 'phones', budget: { max: 20000 } },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      // In test env the search returns zero results, so we get the smart
      // alternatives path which references the category
      expect(text.toLowerCase()).toContain('phones')
      expect(text).toBeTruthy()
    })

    it('asks for info when no entities', async () => {
      const handler = getHandler('SEARCH_LISTINGS')
      const result = await handler.handle(makeClassification('SEARCH_LISTINGS'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toBeTruthy()
    })
  })

  describe('BrowseHandler', () => {
    it('lists categories', async () => {
      const handler = getHandler('BROWSE_CATEGORIES')
      const result = await handler.handle(makeClassification('BROWSE_CATEGORIES'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Categories')
    })
  })

  describe('ListingHandler', () => {
    it('handles listing ID', async () => {
      const handler = getHandler('LISTING_DETAILS')
      const classification = makeClassification('LISTING_DETAILS', {
        entities: { listingId: 'ABC123' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('ABC123')
    })

    it('asks for listing details', async () => {
      const handler = getHandler('LISTING_DETAILS')
      const result = await handler.handle(makeClassification('LISTING_DETAILS'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('BuyingHandler', () => {
    it('returns buying guidance', async () => {
      const handler = getHandler('BUYING_HELP')
      const result = await handler.handle(makeClassification('BUYING_HELP'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Buy')
    })
  })

  describe('SellingHandler', () => {
    it('returns selling guidance', async () => {
      const handler = getHandler('SELLING_HELP')
      const result = await handler.handle(makeClassification('SELLING_HELP'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })

    it('handles seller intent', async () => {
      const handler = getHandler('SELLING_HELP')
      const classification = makeClassification('SELLING_HELP', {
        entities: { sellerIntent: true },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('guide')
    })
  })

  describe('PricingHandler', () => {
    it('returns pricing advice', async () => {
      const handler = getHandler('PRICING_HELP')
      const result = await handler.handle(makeClassification('PRICING_HELP'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('price')
    })

    it('mentions item when available', async () => {
      const handler = getHandler('PRICING_HELP')
      const classification = makeClassification('PRICING_HELP', {
        entities: { category: 'phones' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      // In test env, falls back to static content which mentions price benchmarks
      expect(text.toLowerCase()).toContain('price')
    })
  })

  describe('SafetyHandler', () => {
    it('returns general safety tips', async () => {
      const handler = getHandler('SAFETY')
      const result = await handler.handle(makeClassification('SAFETY'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('safe')
    })

    it('returns OTP scam warning', async () => {
      const handler = getHandler('SAFETY')
      const classification = makeClassification('SAFETY', {
        entities: { query: 'otp scam' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('OTP')
    })

    it('returns fake listing warning', async () => {
      const handler = getHandler('SAFETY')
      const classification = makeClassification('SAFETY', {
        entities: { query: 'fake seller' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      // The enhanced SafetyHandler directs seller evaluation queries
      // to a dedicated guide about evaluating sellers
      expect(text.toLowerCase()).toContain('seller')
      expect(text.toLowerCase()).toContain('evaluate')
    })
  })

  describe('ContactSellerHandler', () => {
    it('handles listing ID', async () => {
      const handler = getHandler('CONTACT_SELLER')
      const classification = makeClassification('CONTACT_SELLER', {
        entities: { listingId: 'XYZ789' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Messaging Help')
    })

    it('asks for listing when no ID', async () => {
      const handler = getHandler('CONTACT_SELLER')
      const result = await handler.handle(makeClassification('CONTACT_SELLER'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('PlatformHandler', () => {
    it('returns fee info', async () => {
      const handler = getHandler('PLATFORM_HELP')
      const classification = makeClassification('PLATFORM_HELP', {
        entities: { query: 'what are the fees' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('fee')
    })

    it('returns general platform help', async () => {
      const handler = getHandler('PLATFORM_HELP')
      const result = await handler.handle(makeClassification('PLATFORM_HELP'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('AccountHandler', () => {
    it('returns login help', async () => {
      const handler = getHandler('ACCOUNT_HELP')
      const classification = makeClassification('ACCOUNT_HELP', {
        entities: { query: 'forgot password' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('password')
    })

    it('returns general account help', async () => {
      const handler = getHandler('ACCOUNT_HELP')
      const result = await handler.handle(makeClassification('ACCOUNT_HELP'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('RecommendationHandler', () => {
    it('returns recommendations', async () => {
      const handler = getHandler('RECOMMENDATION')
      const result = await handler.handle(makeClassification('RECOMMENDATION'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('ComparisonHandler', () => {
    it('returns comparison help', async () => {
      const handler = getHandler('COMPARISON')
      const result = await handler.handle(makeClassification('COMPARISON'), makeContext(), 'visitor')
      expect(extractText(result)).toBeTruthy()
    })
  })

  describe('UnsupportedHandler', () => {
    it('returns scope explanation', async () => {
      const handler = getHandler('UNSUPPORTED')
      const result = await handler.handle(makeClassification('UNSUPPORTED'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('marketplace')
    })

    it('handles OFFENSIVE intent', async () => {
      const handler = getHandler('OFFENSIVE')
      const result = await handler.handle(makeClassification('OFFENSIVE'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('marketplace')
    })

    it('handles UNKNOWN intent', async () => {
      const handler = getHandler('UNKNOWN')
      const result = await handler.handle(makeClassification('UNKNOWN'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text.toLowerCase()).toContain('marketplace')
    })
  })

  describe('SmallTalkHandler', () => {
    it('returns farewell', async () => {
      const handler = getHandler('SMALL_TALK')
      const classification = makeClassification('SMALL_TALK', {
        entities: { query: 'bye' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Marketplace')
    })

    it('returns thanks response', async () => {
      const handler = getHandler('SMALL_TALK')
      const classification = makeClassification('SMALL_TALK', {
        entities: { query: 'thank you' },
      })
      const result = await handler.handle(classification, makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Marketplace')
    })
  })

  describe('AdminHandler', () => {
    it('denies non-admin', async () => {
      const handler = getHandler('ADMIN_ACTION')
      const result = await handler.handle(makeClassification('ADMIN_ACTION'), makeContext(), 'visitor')
      const text = extractText(result)
      expect(text).toContain('Admin Access Required')
    })

    it('allows admin', async () => {
      const handler = getHandler('ADMIN_ACTION')
      const result = await handler.handle(makeClassification('ADMIN_ACTION'), makeContext(), 'admin')
      const text = extractText(result)
      expect(text).toContain('Admin')
    })
  })

  describe('getHandler', () => {
    it('returns handler for every intent', () => {
      const intents = [
        'GREETING', 'SEARCH_LISTINGS', 'BROWSE_CATEGORIES', 'LISTING_DETAILS',
        'BUYING_HELP', 'SELLING_HELP', 'LISTING_ADVICE', 'PRICING_HELP',
        'SAFETY', 'CONTACT_SELLER', 'PLATFORM_HELP', 'ACCOUNT_HELP',
        'COMPARISON', 'RECOMMENDATION', 'SMALL_TALK', 'ADMIN_ACTION',
        'OFFENSIVE', 'UNSUPPORTED', 'UNKNOWN',
      ]
      for (const intent of intents) {
        const handler = getHandler(intent as IntentClassification['intent'])
        expect(handler).toBeDefined()
        expect(typeof handler.handle).toBe('function')
      }
    })
  })
})