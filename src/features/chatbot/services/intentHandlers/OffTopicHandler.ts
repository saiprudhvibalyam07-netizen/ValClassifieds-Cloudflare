import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { redirectMessage, pickNextActionIntro } from '../../services/responseQuality'

export class OffTopicHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    return {
      sections: [
        { type: 'heading', content: 'Help with Your Marketplace Needs', level: 2 },
        { type: 'text', content: redirectMessage() },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Search Listings', value: 'search' },
        { label: 'How to Buy', value: 'how to buy' },
        { label: 'How to Sell', value: 'how to sell' },
      ],
      intent: 'OFF_TOPIC',
      role,
    }
  }
}
