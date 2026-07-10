import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class BuyingHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const topic = getSupportTopic('how to buy')
    return topic
      ? {
          ...topic,
          intent: 'BUYING_HELP',
          role,
        }
      : {
          sections: [
            { type: 'text', content: 'I can help you with buying on ValClassifieds. What specific aspect would you like to know about?' },
          ],
          suggestedActions: [
            { label: 'How to Buy', value: 'how to buy' },
            { label: 'Safety Tips', value: 'safety tips' },
            { label: 'Search Listings', value: 'search' },
          ],
          intent: 'BUYING_HELP',
          role,
        }
  }
}