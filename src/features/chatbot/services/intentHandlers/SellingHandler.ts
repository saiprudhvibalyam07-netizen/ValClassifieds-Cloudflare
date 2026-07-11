import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { selectSellingArticle } from '../../knowledge/selling'

export class SellingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const article = selectSellingArticle(classification)

    return {
      sections: article.response,
      suggestedActions: article.actions,
      intent: 'SELLING_HELP',
      role,
    }
  }
}
