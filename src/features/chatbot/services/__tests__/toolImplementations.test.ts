import { describe, it, expect, beforeEach } from 'vitest'
import { executeToolCall, getRegisteredTools, unregisterTool } from '../toolRouter'
import { registerPhase2Tools } from '../toolImplementations'

describe('Phase 2 Tool Implementations', () => {
  beforeEach(() => {
    const tools = getRegisteredTools()
    tools.forEach((name) => unregisterTool(name))
    registerPhase2Tools()
  })

  describe('Tool Registration', () => {
    it('registers all 4 marketplace tools', () => {
      const tools = getRegisteredTools()
      expect(tools).toContain('searchListings')
      expect(tools).toContain('getListingDetails')
      expect(tools).toContain('getCategories')
      expect(tools).toContain('getSellerInfo')
      expect(tools).toHaveLength(4)
    })
  })

  describe('searchListings', () => {
    it('returns listings matching query', async () => {
      const result = await executeToolCall('searchListings', { query: 'phone' }, 'visitor')
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(Array.isArray((result.data as any)?.listings)).toBe(true)
    })

    it('filters by category', async () => {
      const result = await executeToolCall('searchListings', { categories: ['Electronics'] }, 'buyer')
      expect(result.success).toBe(true)
    })
  })

  describe('getCategories', () => {
    it('returns all categories', async () => {
      const result = await executeToolCall('getCategories', {}, 'visitor')
      expect(result.success).toBe(true)
      expect(Array.isArray((result.data as any)?.categories)).toBe(true)
    })
  })

  describe('getSellerInfo', () => {
    it('returns success false for unknown seller', async () => {
      const result = await executeToolCall('getSellerInfo', { sellerId: 'unknown' }, 'visitor')
      expect(result.success).toBe(false)
    })
  })
})