import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class PlatformHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    let query = 'help'

    if (text.includes('fee') || text.includes('cost') || text.includes('charge') || text.includes('price')) {
      query = 'platform fees'
    }

    const topic = getSupportTopic(query)
    return topic
      ? {
          ...topic,
          intent: 'PLATFORM_HELP',
          role,
        }
      : {
          sections: [
            { type: 'heading', content: 'ValClassifieds Platform Help', level: 2 },
            { type: 'text', content: 'ValClassifieds is a local marketplace for buying and selling. Here are common topics:' },
            { type: 'info_section', title: 'Popular Help Topics', items: [
              'Posting a listing — free and easy',
              'Buying safely — meet in public, inspect first',
              'Fees — free to list, 2% on completed sales',
              'Messaging — built-in chat with sellers',
              'Favorites — save listings for later',
            ]},
          ],
          suggestedActions: [
            { label: 'Fees & Pricing', value: 'platform fees' },
            { label: 'Contact Support', value: 'contact support' },
            { label: 'How to List', value: 'how to list' },
          ],
          intent: 'PLATFORM_HELP',
          role,
        }
  }
}