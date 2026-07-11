import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { selectAccountArticle } from '../../knowledge/account'

export class AccountHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const article = selectAccountArticle(classification)

    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: article.title, level: 2 },
    ]
    for (const section of article.response) {
      sections.push(section)
    }

    return {
      sections,
      suggestedActions: article.actions,
      intent: 'ACCOUNT_HELP',
      role,
    }
  }
}
