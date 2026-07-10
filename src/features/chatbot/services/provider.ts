import type { ChatbotRole, MockResponse } from '../types'
import type { ChatbotMessage } from '../types'
import { CHATBOT_CONFIG } from '../config'
import { mockConversationProvider } from './mockConversationProvider'

export interface SendMessageOptions {
  onToken?: (token: string) => void
  signal?: AbortSignal
  messages?: ChatbotMessage[]
}

export interface ConversationProvider {
  sendMessage(
    content: string,
    role: ChatbotRole,
    options?: SendMessageOptions
  ): Promise<MockResponse>

  getRoleResponse(role: ChatbotRole): string
  getStarterPrompts(role: ChatbotRole): string[]
}

export function getConversationProvider(): ConversationProvider {
  if (CHATBOT_CONFIG.mockMode === true) {
    return mockConversationProvider
  }

  return mockConversationProvider
}