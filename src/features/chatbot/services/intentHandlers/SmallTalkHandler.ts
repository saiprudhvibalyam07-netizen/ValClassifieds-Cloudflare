import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { redirectMessage, pickNextActionIntro } from '../../services/responseQuality'

export class SmallTalkHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    return {
      sections: [
        { type: 'heading', content: 'Here to Help with the Marketplace', level: 2 },
        { type: 'text', content: redirectMessage() },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Browse Categories', value: 'show categories' },
        { label: 'Search Listings', value: 'search' },
        { label: 'How to Sell', value: 'how to sell' },
      ],
      intent: 'SMALL_TALK',
      role,
    }
  }
}
