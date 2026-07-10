import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class SellingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    // Use 'how to sell' for both SELLING_HELP and LISTING_ADVICE
    const query = classification.entities.sellerIntent ? 'listing advice' : 'how to sell'
    const topic = getSupportTopic(query)
    return topic
      ? {
          ...topic,
          intent: classification.intent,
          role,
        }
      : {
          sections: [
            { type: 'text', content: 'I can help with selling. What do you need guidance on?' },
          ],
          suggestedActions: [
            { label: 'How to Sell', value: 'how to sell' },
            { label: 'Pricing Help', value: 'pricing help' },
            { label: 'Photo Tips', value: 'photo tips' },
          ],
          intent: classification.intent,
          role,
        }
  }
}