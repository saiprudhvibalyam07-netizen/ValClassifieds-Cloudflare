import type {
  ChatbotRole,
  ConversationPipelineResult,
} from '../types'
import type { StructuredResponse } from './responseTypes'
import { classifyIntent } from './intentClassifier'
import { getClarification } from './clarificationEngine'
import { shouldContinueClarifying, getAssumptionMessage } from './followUpEngine'
import { conversationContext } from './conversationContext'
import { resolveStrategy } from './responseStrategy'
import { getHandler } from './intentHandlers'
import { formatResponse, formatClarification } from './responseFormatter'

/**
 * Extract a plain text summary from a StructuredResponse.
 * Used for the `response` field in ConversationPipelineResult.
 */
function extractText(sr: StructuredResponse): string {
  return sr.sections
    .filter(
      (s) =>
        s.type === 'text' ||
        s.type === 'heading' ||
        s.type === 'subheading' ||
        s.type === 'info_section' ||
        s.type === 'numbered_steps' ||
        s.type === 'warning' ||
        s.type === 'success' ||
        s.type === 'error' ||
        s.type === 'empty_state' ||
        s.type === 'safety_banner'
    )
    .map((s) => {
      if (
        s.type === 'text' ||
        s.type === 'heading' ||
        s.type === 'subheading' ||
        s.type === 'warning'
      ) {
        return s.content
      }
      if (s.type === 'info_section') {
        return s.title ? `${s.title}\n${s.items.join('\n')}` : s.items.join('\n')
      }
      if (s.type === 'numbered_steps') {
        return s.title
          ? `${s.title}\n${s.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}`
          : s.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
      }
      if (s.type === 'safety_banner') {
        const tips = s.tips
          ? `\n${s.tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}`
          : ''
        return `${s.title}: ${s.message}${tips}`
      }
      if (s.type === 'success') {
        return s.message
      }
      if (s.type === 'error') {
        return s.message
      }
      if (s.type === 'empty_state') {
        return `${s.title}: ${s.description}`
      }
      return ''
    })
    .join('\n\n')
}

export async function runConversationPipeline(
  message: string,
  role: ChatbotRole,
  conversationId?: string
): Promise<ConversationPipelineResult> {
  const context = conversationContext.getContext(conversationId)

  const classification = classifyIntent(message)

  const clarification = getClarification(
    classification.intent,
    classification.entities,
    classification.missingInformation
  )

  const shouldClarify = shouldContinueClarifying(classification, context)

  const strategy = resolveStrategy({
    classification,
    clarification: { ...clarification, shouldClarify },
    context,
  })

  let structuredResponse: StructuredResponse
  let response: string

  if (strategy === 'CLARIFY' && clarification.question) {
    structuredResponse = formatClarification(clarification.question, classification.intent, role)
    response = clarification.question
    conversationContext.incrementClarification(conversationId)
  } else if (classification.requiresClarification && context.clarificationCount >= 2) {
    const assumptionText = getAssumptionMessage(classification)
    const handler = getHandler(classification.intent)
    const handlerResponse = await handler.handle(classification, context, role)
    structuredResponse = formatResponse(assumptionText + '\n\n' + extractText(handlerResponse), classification.intent, role)
    response = assumptionText + '\n\n' + extractText(handlerResponse)
  } else {
    const handler = getHandler(classification.intent)
    const handlerResponse = await handler.handle(classification, context, role)
    // Handler already returns StructuredResponse — pass through to formatter
    // which enriches with suggested actions based on intent
    structuredResponse = formatResponse(handlerResponse, classification.intent, role)
    response = extractText(handlerResponse)
  }

  conversationContext.updateContext(
    classification.intent,
    classification.entities,
    conversationId
  )
  conversationContext.setLastResponse(response, conversationId)

  return {
    classification,
    strategy,
    response,
    structuredResponse,
    context: conversationContext.getContext(conversationId),
  }
}