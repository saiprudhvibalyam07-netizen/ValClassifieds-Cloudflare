import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'

export class ThankYouHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const responses = [
      "You're welcome. I'm glad I could help. If anything else comes up, just let me know.",
      'Happy to help. Let me know if you need anything else.',
      'My pleasure. Is there anything else I can assist you with?',
    ]
    const content = responses[Math.floor(Math.random() * responses.length)]

    return {
      sections: [{ type: 'text', content }],
      suggestedActions: [
        { label: 'Search Listings', value: 'search' },
        { label: 'Browse Categories', value: 'show categories' },
        { label: 'Safety Tips', value: 'safety tips' },
      ],
      intent: 'THANK_YOU',
      role,
    }
  }
}
