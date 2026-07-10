import { describe, it, expect } from 'vitest'
import {
  formatResponse,
  formatClarification,
  formatSafetyWarning,
  formatError,
  formatEmptyState,
} from '../responseFormatter'

describe('responseFormatter', () => {
  describe('formatResponse', () => {
    it('formats a greeting response', () => {
      const result = formatResponse('Hello! Welcome to ValClassifieds.', 'GREETING', 'visitor')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('text')
      expect(result.sections[0].type === 'text' && result.sections[0].content).toBe('Hello! Welcome to ValClassifieds.')
      expect(result.intent).toBe('GREETING')
      expect(result.role).toBe('visitor')
    })

    it('formats a search response', () => {
      const result = formatResponse('I will help you find phones under 20000.', 'SEARCH_LISTINGS', 'buyer')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('text')
      expect(result.intent).toBe('SEARCH_LISTINGS')
    })

    it('formats a safety response with scam warning', () => {
      const result = formatResponse('Never share OTPs or UPI PINs. Report scams immediately.', 'SAFETY', 'buyer')
      expect(result.sections[0].type).toBe('safety_banner')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('scam_warning')
        expect(result.sections[0].title).toBe('Scam Alert')
        expect(result.sections[0].tips).toBeDefined()
        expect(result.sections[0].tips!.length).toBeGreaterThan(0)
      }
    })

    it('formats a safety response with fake listing warning', () => {
      const result = formatResponse('Check for fake listings and verify seller ratings.', 'SAFETY', 'visitor')
      expect(result.sections[0].type).toBe('safety_banner')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('suspicious_seller')
      }
    })

    it('formats a safety response with general safety tips', () => {
      const result = formatResponse('Stay safe on the platform.', 'SAFETY', 'buyer')
      expect(result.sections[0].type).toBe('safety_banner')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('general_safety')
      }
    })

    it('returns intent-specific suggested actions for search', () => {
      const result = formatResponse('Found phones.', 'SEARCH_LISTINGS', 'buyer')
      expect(result.suggestedActions).toBeDefined()
      expect(result.suggestedActions.length).toBeGreaterThan(0)
    })

    it('returns role-specific suggested actions for small talk', () => {
      const result = formatResponse('Happy to help!', 'SMALL_TALK', 'buyer')
      expect(result.suggestedActions).toBeDefined()
    })

    it('sanitizes HTML from content', () => {
      const result = formatResponse('<script>alert("xss")</script>Hello', 'GREETING', 'visitor')
      expect(result.sections[0].type).toBe('text')
      if (result.sections[0].type === 'text') {
        expect(result.sections[0].content).not.toContain('<script>')
        expect(result.sections[0].content).toContain('Hello')
      }
    })

    it('handles empty content gracefully', () => {
      const result = formatResponse('', 'GREETING', 'visitor')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('text')
    })

    it('handles all intent types', () => {
      const intents = [
        'GREETING', 'SEARCH_LISTINGS', 'BROWSE_CATEGORIES', 'LISTING_DETAILS',
        'BUYING_HELP', 'SELLING_HELP', 'LISTING_ADVICE', 'PRICING_HELP',
        'SAFETY', 'CONTACT_SELLER', 'PLATFORM_HELP', 'ACCOUNT_HELP',
        'COMPARISON', 'RECOMMENDATION', 'SMALL_TALK', 'ADMIN_ACTION',
        'OFFENSIVE', 'UNSUPPORTED', 'UNKNOWN',
      ] as const

      for (const intent of intents) {
        const result = formatResponse('Test content', intent, 'visitor')
        expect(result.sections.length).toBeGreaterThan(0)
        expect(result.intent).toBe(intent)
      }
    })

    it('handles all role types', () => {
      const roles = ['visitor', 'buyer', 'seller', 'admin'] as const
      for (const role of roles) {
        const result = formatResponse('Test', 'GREETING', role)
        expect(result.role).toBe(role)
      }
    })
  })

  describe('formatClarification', () => {
    it('formats a clarification question', () => {
      const result = formatClarification('What is your budget?', 'SEARCH_LISTINGS', 'buyer')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('text')
      if (result.sections[0].type === 'text') {
        expect(result.sections[0].content).toBe('What is your budget?')
      }
      expect(result.suggestedActions).toEqual([])
    })
  })

  describe('formatSafetyWarning', () => {
    it('formats scam warning', () => {
      const result = formatSafetyWarning('Never share OTPs.', 'buyer')
      expect(result.sections[0].type).toBe('safety_banner')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('scam_warning')
        expect(result.sections[0].title).toBe('Scam Alert')
      }
    })

    it('formats fake listing warning', () => {
      const result = formatSafetyWarning('Watch out for fake listings.', 'visitor')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('suspicious_seller')
      }
    })

    it('formats payment warning', () => {
      const result = formatSafetyWarning('Do not pay outside the platform.', 'buyer')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('unsafe_payment')
      }
    })

    it('formats general safety', () => {
      const result = formatSafetyWarning('Stay safe always.', 'visitor')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].variant).toBe('general_safety')
      }
    })

    it('extracts tips from content', () => {
      const result = formatSafetyWarning('Never share OTPs. Always verify sellers. Report suspicious activity.', 'buyer')
      if (result.sections[0].type === 'safety_banner') {
        expect(result.sections[0].tips).toBeDefined()
        expect(result.sections[0].tips!.length).toBeGreaterThan(0)
      }
    })
  })

  describe('formatError', () => {
    it('formats an error response', () => {
      const result = formatError('Technical error details', 'buyer')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('error')
      if (result.sections[0].type === 'error') {
        expect(result.sections[0].message).toBe('Something went wrong. Please try again.')
      }
      expect(result.suggestedActions.length).toBeGreaterThan(0)
    })
  })

  describe('formatEmptyState', () => {
    it('formats no results empty state', () => {
      const result = formatEmptyState('no_results', 'buyer')
      expect(result.sections).toHaveLength(1)
      expect(result.sections[0].type).toBe('empty_state')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('no_results')
        expect(result.sections[0].title).toBe('No listings found')
      }
    })

    it('formats cleared empty state', () => {
      const result = formatEmptyState('cleared', 'visitor')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('cleared')
      }
    })

    it('formats offline empty state', () => {
      const result = formatEmptyState('offline', 'buyer')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('offline')
      }
    })

    it('formats timeout empty state', () => {
      const result = formatEmptyState('timeout', 'visitor')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('timeout')
      }
    })

    it('formats unauthorized empty state', () => {
      const result = formatEmptyState('unauthorized', 'buyer')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('unauthorized')
      }
    })

    it('formats server error empty state', () => {
      const result = formatEmptyState('server_error', 'visitor')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('server_error')
      }
    })

    it('formats no permissions empty state', () => {
      const result = formatEmptyState('no_permissions', 'buyer')
      if (result.sections[0].type === 'empty_state') {
        expect(result.sections[0].variant).toBe('no_permissions')
      }
    })
  })
})
