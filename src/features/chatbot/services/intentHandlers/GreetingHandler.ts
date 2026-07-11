import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { selectGreetingArticle } from '../../knowledge/greetings'

export class GreetingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const article = selectGreetingArticle(role, classification.entities.query)

    const sections = article.responses.map(r => ({
      type: r.type as any,
      content: r.content,
    }))

    const actions = (article.actions ?? []).map(a => ({
      label: a.label,
      value: a.value,
    }))

    return {
      sections,
      suggestedActions: actions.length > 0 ? actions : undefined,
      intent: 'GREETING',
      role,
    }
  }
}
