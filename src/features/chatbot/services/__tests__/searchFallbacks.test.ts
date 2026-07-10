import { describe, it, expect } from 'vitest'
import { getFallbackMessage, executeWithFallback } from '../searchFallbacks'
import type { FallbackStrategy } from '../queryPlanner'

describe('searchFallbacks', () => {
  describe('getFallbackMessage', () => {
    it('returns message for widen_price', () => {
      const fallback: FallbackStrategy = { type: 'widen_price', description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('budget')
    })

    it('returns message for expand_location', () => {
      const fallback: FallbackStrategy = { type: 'expand_location', description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('area')
    })

    it('returns message for broaden_category', () => {
      const fallback: FallbackStrategy = { type: 'broaden_category', description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('category')
    })

    it('returns message for remove_filters', () => {
      const fallback: FallbackStrategy = { type: 'remove_filters', description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('filters')
    })

    it('returns message for suggest_alternatives', () => {
      const fallback: FallbackStrategy = { type: 'suggest_alternatives', description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('interested')
    })

    it('returns message for unknown type', () => {
      const fallback: FallbackStrategy = { type: 'unknown' as FallbackStrategy['type'], description: '' }
      const msg = getFallbackMessage(fallback)
      expect(msg).toContain('options')
    })
  })

  describe('executeWithFallback', () => {
    it('can be imported', () => {
      expect(typeof executeWithFallback).toBe('function')
    })
  })
})
