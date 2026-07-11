import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'

export class FarewellHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const farewells = [
      'Thanks for stopping by. Wishing you all the best with your buying and selling on ValClassifieds. Feel free to come back anytime you need assistance.',
      'Take care, and happy trading on ValClassifieds. I will be here whenever you need me.',
      'Goodbye for now. I hope you found what you were looking for. If you need anything else, just say hello.',
    ]
    const content = farewells[Math.floor(Math.random() * farewells.length)]

    return {
      sections: [{ type: 'text', content }],
      suggestedActions: [
        { label: 'Start New Chat', value: 'hello' },
        { label: 'Browse Listings', value: 'search' },
      ],
      intent: 'FAREWELL',
      role,
    }
  }
}
