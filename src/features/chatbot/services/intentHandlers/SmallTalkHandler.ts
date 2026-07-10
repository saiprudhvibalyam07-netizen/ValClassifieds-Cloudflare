import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class SmallTalkHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()

    if (text.includes('bye') || text.includes('goodbye') || text.includes('see you')) {
      const topic = getSupportTopic('goodbye')
      return topic
        ? {
            ...topic,
            intent: 'SMALL_TALK',
            role,
          }
        : {
            sections: [
              {
                type: 'text',
                content: 'Goodbye! Happy buying and selling on ValClassifieds. Come back anytime!',
              },
            ],
            suggestedActions: [
              { label: 'Start New Chat', value: 'hello' },
            ],
            intent: 'SMALL_TALK',
            role,
          }
    }

    if (text.includes('thank') || text.includes('thanks')) {
      const topic = getSupportTopic('thanks')
      return topic
        ? {
            ...topic,
            intent: 'SMALL_TALK',
            role,
          }
        : {
            sections: [
              {
                type: 'text',
                content: 'You\'re welcome! Let me know if you need anything else.',
              },
            ],
            suggestedActions: [
              { label: 'Search Listings', value: 'search' },
              { label: 'Browse Categories', value: 'show categories' },
            ],
            intent: 'SMALL_TALK',
            role,
          }
    }

    const topic = getSupportTopic('small talk fallback')
    return topic
      ? {
          ...topic,
          intent: 'SMALL_TALK',
          role,
        }
      : {
          sections: [
            {
              type: 'text',
              content: 'Nice chatting with you! How can I help with your marketplace needs today?',
            },
          ],
          suggestedActions: [
            { label: 'Search Listings', value: 'search' },
            { label: 'Browse Categories', value: 'show categories' },
          ],
          intent: 'SMALL_TALK',
          role,
        }
  }
}