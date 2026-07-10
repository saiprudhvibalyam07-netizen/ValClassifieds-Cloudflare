import { describe, it, expect } from 'vitest'
import { mockConversationProvider } from '../mockConversationProvider'

describe('mockConversationProvider', () => {
  it('returns response for empty messages', async () => {
    const response = await mockConversationProvider.sendMessage('', 'visitor')
    expect(response.content).toBeTruthy()
    expect(response.content.length).toBeGreaterThan(0)
    expect(response.delay).toBeGreaterThanOrEqual(800)
    expect(response.delay).toBeLessThanOrEqual(2000)
  })

  it('returns greeting for hi/hello', async () => {
    const res1 = await mockConversationProvider.sendMessage('hi', 'visitor')
    expect(res1.content).toContain('ValBot')

    const res2 = await mockConversationProvider.sendMessage('Hello', 'buyer')
    expect(res2.content).toContain('ValBot')
  })

  it('returns role-specific responses', async () => {
    const visitor = await mockConversationProvider.sendMessage('hi', 'visitor')
    expect(visitor.content).toContain('ValBot')

    const buyer = await mockConversationProvider.sendMessage('hi', 'buyer')
    expect(buyer.content).toContain('ValBot')

    const seller = await mockConversationProvider.sendMessage('hi', 'seller')
    expect(seller.content).toContain('ValBot')

    const admin = await mockConversationProvider.sendMessage('hi', 'admin')
    expect(admin.content).toContain('ValBot')
  })

  it('returns goodbye response', async () => {
    const response = await mockConversationProvider.sendMessage('bye', 'visitor')
    expect(response.content).toContain('Goodbye')
  })

  it('returns category response', async () => {
    const response = await mockConversationProvider.sendMessage('show categories', 'visitor')
    expect(response.content).toContain('Categories')
  })

  it('returns buying response', async () => {
    const response = await mockConversationProvider.sendMessage('how to buy', 'buyer')
    expect(response.content).toContain('Buying')
  })

  it('returns selling response', async () => {
    const response = await mockConversationProvider.sendMessage('how to sell', 'seller')
    expect(response.content).toContain('Listing')
  })

  it('returns safety response', async () => {
    const response = await mockConversationProvider.sendMessage('is it safe', 'visitor')
    expect(response.content.toLowerCase()).toContain('scam')
  })

  it('returns policy response', async () => {
    const response = await mockConversationProvider.sendMessage('what are the fees', 'visitor')
    expect(response.content.toLowerCase()).toContain('free')
  })

  it('returns follow-up for unrecognized queries', async () => {
    const response = await mockConversationProvider.sendMessage('xylophone pricing', 'visitor')
    expect(response.content.length).toBeGreaterThan(0)
  })

  it('provides starter prompts for each role', () => {
    const visitorPrompts = mockConversationProvider.getStarterPrompts('visitor')
    expect(visitorPrompts.length).toBeGreaterThan(0)
    expect(visitorPrompts.length).toBeLessThanOrEqual(4)

    const adminPrompts = mockConversationProvider.getStarterPrompts('admin')
    expect(adminPrompts.length).toBeGreaterThan(0)
  })

  it('falls back to visitor prompts for unknown roles', () => {
    const prompts = mockConversationProvider.getStarterPrompts('unknown' as never)
    expect(prompts.length).toBeGreaterThan(0)
  })
})