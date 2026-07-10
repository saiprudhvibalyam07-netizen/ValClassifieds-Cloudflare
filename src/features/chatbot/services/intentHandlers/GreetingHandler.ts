import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class GreetingHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    let query = 'greeting visitor'

    switch (role) {
      case 'buyer':
        query = 'greeting buyer'
        break
      case 'seller':
        query = 'greeting seller'
        break
      case 'admin':
        query = 'greeting admin'
        break
      default:
        query = 'greeting visitor'
    }

    const topic = getSupportTopic(query)
    return topic
      ? {
          ...topic,
          intent: 'GREETING',
          role,
        }
      : {
          sections: [
            {
              type: 'text' as const,
              content: 'Welcome to ValClassifieds! I\'m ValBot, your marketplace assistant. I can help you find what you\'re looking for, learn about the platform, and get started. What brings you here today?',
            },
          ],
          suggestedActions: [],
          intent: 'GREETING',
          role,
        }
  }
}