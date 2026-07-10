import { describe, it, expect } from 'vitest'
import {
  BUYER_ACTIONS,
  SELLER_ACTIONS,
  ADMIN_ACTIONS,
  VISITOR_ACTIONS,
  ROLE_ACTIONS,
  INTENT_ACTIONS,
  SAFETY_TEMPLATES,
  EMPTY_STATE_TEMPLATES,
  getSectionsForIntent,
} from '../responseTemplates'

describe('responseTemplates', () => {
  describe('action constants', () => {
    it('has buyer actions', () => {
      expect(BUYER_ACTIONS.length).toBe(4)
      expect(BUYER_ACTIONS[0].label).toBeDefined()
      expect(BUYER_ACTIONS[0].value).toBeDefined()
    })

    it('has seller actions', () => {
      expect(SELLER_ACTIONS.length).toBe(4)
    })

    it('has admin actions', () => {
      expect(ADMIN_ACTIONS.length).toBe(3)
    })

    it('has visitor actions', () => {
      expect(VISITOR_ACTIONS.length).toBe(4)
    })

    it('has all roles in ROLE_ACTIONS', () => {
      expect(ROLE_ACTIONS.visitor).toBeDefined()
      expect(ROLE_ACTIONS.buyer).toBeDefined()
      expect(ROLE_ACTIONS.seller).toBeDefined()
      expect(ROLE_ACTIONS.admin).toBeDefined()
    })

    it('has actions for all intents', () => {
      const intents = [
        'GREETING', 'SEARCH_LISTINGS', 'BROWSE_CATEGORIES', 'LISTING_DETAILS',
        'BUYING_HELP', 'SELLING_HELP', 'LISTING_ADVICE', 'PRICING_HELP',
        'SAFETY', 'CONTACT_SELLER', 'PLATFORM_HELP', 'ACCOUNT_HELP',
        'COMPARISON', 'RECOMMENDATION', 'SMALL_TALK', 'ADMIN_ACTION',
        'OFFENSIVE', 'UNSUPPORTED', 'UNKNOWN',
      ] as const

      for (const intent of intents) {
        expect(INTENT_ACTIONS[intent]).toBeDefined()
        expect(Array.isArray(INTENT_ACTIONS[intent])).toBe(true)
      }
    })
  })

  describe('SAFETY_TEMPLATES', () => {
    it('has scam template', () => {
      expect(SAFETY_TEMPLATES.scam).toBeDefined()
      expect(SAFETY_TEMPLATES.scam.variant).toBe('scam_warning')
      expect(SAFETY_TEMPLATES.scam.tips.length).toBeGreaterThan(0)
    })

    it('has otp template', () => {
      expect(SAFETY_TEMPLATES.otp).toBeDefined()
      expect(SAFETY_TEMPLATES.otp.variant).toBe('identity_warning')
    })

    it('has payment template', () => {
      expect(SAFETY_TEMPLATES.payment).toBeDefined()
      expect(SAFETY_TEMPLATES.payment.variant).toBe('unsafe_payment')
    })

    it('has fake template', () => {
      expect(SAFETY_TEMPLATES.fake).toBeDefined()
      expect(SAFETY_TEMPLATES.fake.variant).toBe('suspicious_seller')
    })

    it('has general template', () => {
      expect(SAFETY_TEMPLATES.general).toBeDefined()
      expect(SAFETY_TEMPLATES.general.variant).toBe('general_safety')
    })
  })

  describe('EMPTY_STATE_TEMPLATES', () => {
    it('has all empty state variants', () => {
      const variants = ['no_results', 'cleared', 'offline', 'timeout', 'unauthorized', 'server_error', 'no_permissions']
      for (const variant of variants) {
        expect(EMPTY_STATE_TEMPLATES[variant]).toBeDefined()
        expect(EMPTY_STATE_TEMPLATES[variant].title).toBeDefined()
        expect(EMPTY_STATE_TEMPLATES[variant].description).toBeDefined()
      }
    })
  })

  describe('getSectionsForIntent', () => {
    it('returns text section for GREETING', () => {
      const sections = getSectionsForIntent('GREETING', 'Hello!', 'visitor')
      expect(sections).toHaveLength(1)
      expect(sections[0].type).toBe('text')
    })

    it('returns text section for SEARCH_LISTINGS', () => {
      const sections = getSectionsForIntent('SEARCH_LISTINGS', 'Found phones', 'buyer')
      expect(sections).toHaveLength(1)
      expect(sections[0].type).toBe('text')
    })

    it('returns safety_banner for SAFETY intent with scam content', () => {
      const sections = getSectionsForIntent('SAFETY', 'Never share OTPs with anyone', 'buyer')
      expect(sections).toHaveLength(1)
      expect(sections[0].type).toBe('safety_banner')
    })

    it('returns safety_banner for SAFETY intent with fake content', () => {
      const sections = getSectionsForIntent('SAFETY', 'Watch for fake listings', 'visitor')
      expect(sections[0].type).toBe('safety_banner')
    })

    it('returns safety_banner for SAFETY intent with general content', () => {
      const sections = getSectionsForIntent('SAFETY', 'Stay safe on the platform', 'buyer')
      expect(sections[0].type).toBe('safety_banner')
    })

    it('returns text section for UNSUPPORTED', () => {
      const sections = getSectionsForIntent('UNSUPPORTED', 'Cannot help with that', 'visitor')
      expect(sections).toHaveLength(1)
      expect(sections[0].type).toBe('text')
    })

    it('returns text section for all intents', () => {
      const intents = [
        'GREETING', 'SEARCH_LISTINGS', 'BROWSE_CATEGORIES', 'LISTING_DETAILS',
        'BUYING_HELP', 'SELLING_HELP', 'LISTING_ADVICE', 'PRICING_HELP',
        'SAFETY', 'CONTACT_SELLER', 'PLATFORM_HELP', 'ACCOUNT_HELP',
        'COMPARISON', 'RECOMMENDATION', 'SMALL_TALK', 'ADMIN_ACTION',
        'OFFENSIVE', 'UNSUPPORTED', 'UNKNOWN',
      ] as const

      for (const intent of intents) {
        const sections = getSectionsForIntent(intent, 'Test content', 'visitor')
        expect(sections.length).toBeGreaterThan(0)
      }
    })
  })
})
