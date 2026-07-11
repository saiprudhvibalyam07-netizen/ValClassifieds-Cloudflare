import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { selectBuyingArticle } from '../../knowledge/buying'

export class BuyingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const article = selectBuyingArticle(classification)

    return {
      sections: article.response,
      suggestedActions: article.actions,
      intent: 'BUYING_HELP',
      role,
    }
  }
}
