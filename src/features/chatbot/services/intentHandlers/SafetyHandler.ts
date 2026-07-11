import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { selectSafetyArticle } from '../../knowledge/safety'

export class SafetyHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const article = selectSafetyArticle(classification)

    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: article.title, level: 2 },
    ]
    for (const section of article.response) {
      sections.push(section)
    }

    return {
      sections,
      suggestedActions: article.actions,
      intent: 'SAFETY',
      role,
    }
  }
}
