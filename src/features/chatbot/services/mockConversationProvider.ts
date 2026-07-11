import type { ChatbotRole, MockResponse, StructuredResponse } from '../types'
import type { ConversationProvider, SendMessageOptions } from './provider'
import { STARTER_PROMPTS } from '../constants'
import { CHATBOT_CONFIG } from '../config'
import { runConversationPipeline } from './conversationPipeline'
import { selectGreetingArticle } from '../knowledge/greetings'

function greetingTextForRole(role: ChatbotRole): string {
  return selectGreetingArticle(role).responses[0]?.content ?? ''
}

function randomDelay(): number {
  const { min, max } = CHATBOT_CONFIG.typingDelay
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function buildPipelineResponse(
  content: string,
  role: ChatbotRole,
  conversationId?: string
): Promise<{ content: string; structuredResponse?: StructuredResponse }> {
  try {
    const result = await runConversationPipeline(content, role, conversationId)
    return { content: result.response, structuredResponse: result.structuredResponse }
  } catch {
    return { content: greetingTextForRole(role) }
  }
}

export const mockConversationProvider: ConversationProvider = {
  getRoleResponse(role: ChatbotRole): string {
    return greetingTextForRole(role)
  },

  async sendMessage(content: string, role: ChatbotRole, options?: SendMessageOptions): Promise<MockResponse> {
    const delay = randomDelay()
    const conversationId = options?.messages?.[0]?.conversationId
    const pipelineResult = await buildPipelineResponse(content, role, conversationId)

    if (options?.onToken) {
      const words = pipelineResult.content.split(' ')
      const chunkDelay = Math.max(30, Math.floor(delay / words.length))

      for (let i = 0; i < words.length; i++) {
        if (options.signal?.aborted) break
        await new Promise((resolve) => setTimeout(resolve, chunkDelay))
        options.onToken(words[i] + (i < words.length - 1 ? ' ' : ''))
      }
    }

    return { content: pipelineResult.content, structuredResponse: pipelineResult.structuredResponse, delay }
  },

  getStarterPrompts(role: ChatbotRole): string[] {
    return (STARTER_PROMPTS[role] ?? STARTER_PROMPTS.visitor).slice(0, CHATBOT_CONFIG.maxStarterPrompts)
  },
}
