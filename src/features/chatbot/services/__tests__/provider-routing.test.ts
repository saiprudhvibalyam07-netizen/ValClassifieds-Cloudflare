import { describe, it, expect, vi } from 'vitest'

vi.mock('../config', () => ({
  CHATBOT_CONFIG: {
    enabled: true,
    mockMode: true,
    typingDelay: { min: 10, max: 20 },
    maxStarterPrompts: 4,
  },
}))

describe('getConversationProvider routing (mockMode: true)', () => {
  it('returns mockConversationProvider and does NOT return fallback', async () => {
    const { getConversationProvider } = await import('../provider')
    const provider = getConversationProvider()

    const response = await provider.sendMessage('hi', 'visitor')

    expect(response.content).toContain('ValBot')
    expect(response.content).not.toContain('apologize')
    expect(response.content).not.toContain('unable to process')
  })

  it('returns mockConversationProvider for various inputs', async () => {
    const { getConversationProvider } = await import('../provider')
    const provider = getConversationProvider()

    const tests = [
      { input: 'hello', expected: 'ValBot' },
      { input: 'how to buy on this platform', expected: 'Buying' },
      { input: 'is it safe to buy here', expected: 'safe' },
      { input: 'show categories', expected: 'Categories' },
    ]

    for (const { input, expected } of tests) {
      const response = await provider.sendMessage(input, 'visitor')
      expect(response.content).toContain(expected)
      expect(response.content).not.toContain('apologize')
    }
  })
})
