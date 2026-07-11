import type {
  ChatbotRole,
  ConversationPipelineResult,
} from '../types'
import type { StructuredResponse } from './responseTypes'
import { classifyIntent, getMissingInformation } from './intentClassifier'
import { getClarification } from './clarificationEngine'
import { shouldContinueClarifying, getAssumptionMessage, getSearchConfirmationMessage } from './followUpEngine'
import { conversationContext } from './conversationContext'
import { resolveStrategy, getVerificationQuestion } from './responseStrategy'
import { getHandler } from './intentHandlers'
import { formatResponse, formatClarification } from './responseFormatter'
import { isOffTopic, getOffTopicResponse } from './scopeDetector'
import { hasEnoughInformation, getCategoryFlow } from './categoryFlows'

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
      if (s.type === 'text' || s.type === 'heading' || s.type === 'subheading' || s.type === 'warning') {
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
      if (s.type === 'success') return s.message
      if (s.type === 'error') return s.message
      if (s.type === 'empty_state') return `${s.title}: ${s.description}`
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

  // 1. Off-topic detection — redirect non-marketplace queries
  if (isOffTopic(message)) {
    const topicResponse = getOffTopicResponse()
    const structuredResponse = formatResponse(topicResponse, 'OFF_TOPIC', role)

    conversationContext.updateContext('OFF_TOPIC', {}, conversationId)
    conversationContext.setLastResponse(topicResponse, conversationId)

    return {
      classification: {
        intent: 'OFF_TOPIC',
        confidence: 0.9,
        entities: {},
        missingInformation: [],
        requiresClarification: false,
      },
      strategy: 'UNSUPPORTED',
      response: topicResponse,
      structuredResponse,
      context: conversationContext.getContext(conversationId),
    }
  }

  // 2. Classify intent
  const classification = classifyIntent(message)

  // 3. Merge entities from context to avoid re-asking known info
  const mergedEntities = {
    ...context.lastEntities,
    ...classification.entities,
  }

  // Recompute what's actually missing considering what context already knows
  const effectiveMissing = getMissingInformation(classification.intent, mergedEntities)

  // Update classification with merged info
  classification.entities = mergedEntities
  classification.missingInformation = effectiveMissing
  classification.requiresClarification =
    effectiveMissing.length > 0 &&
    (classification.intent === 'SEARCH_LISTINGS' || classification.intent === 'LISTING_MANAGEMENT')

  // Progressive Search: check if we already have enough mandatory fields
  // for the detected category to proceed to search without asking everything
  const progressiveEnough = classification.intent === 'SEARCH_LISTINGS'
    ? hasEnoughInformation(mergedEntities, mergedEntities.category)
    : false

  // Progressive Search: only ask about mandatory fields when we have
  // enough to start searching. Filter out optional fields from clarification.
  const missingForClarification = progressiveEnough
    ? effectiveMissing.filter(f => {
        const flow = getCategoryFlow(mergedEntities.category)
        const fieldCfg = flow.fields.find(fld => fld.key === f)
        return fieldCfg?.mandatory ?? true
      })
    : effectiveMissing

  // 4. Get memory-aware clarification
  const clarification = getClarification(
    classification.intent,
    mergedEntities,
    missingForClarification,
    context,
    message
  )

  // 5. Check if we have enough information to auto-proceed
  const hasEnoughInfo = progressiveEnough || effectiveMissing.length === 0
  const shouldClarify = hasEnoughInfo
    ? false
    : shouldContinueClarifying(classification, context)

  const strategy = resolveStrategy({
    classification,
    clarification: { ...clarification, shouldClarify },
    context,
  })

  let structuredResponse: StructuredResponse
  let response: string

  if (strategy === 'VERIFY') {
    const verifyQuestion = getVerificationQuestion(classification)
    structuredResponse = formatClarification(verifyQuestion, classification.intent, role)
    response = verifyQuestion
  } else if (strategy === 'CLARIFY' && clarification.question) {
    structuredResponse = formatClarification(clarification.question, classification.intent, role)
    response = clarification.question

    // Track that we asked this field
    if (clarification.missingFields.length > 0) {
      conversationContext.setAskedField(clarification.missingFields[0], conversationId)
    }
    conversationContext.incrementClarification(conversationId)
  } else if (
    classification.requiresClarification &&
    !hasEnoughInfo &&
    context.clarificationCount >= 2
  ) {
    const assumptionText = getAssumptionMessage(classification)
    const handler = getHandler(classification.intent)
    const handlerResponse = await handler.handle(classification, context, role)
    structuredResponse = formatResponse(assumptionText + '\n\n' + extractText(handlerResponse), classification.intent, role)
    response = assumptionText + '\n\n' + extractText(handlerResponse)
  } else {
    const handler = getHandler(classification.intent)
    const handlerResponse = await handler.handle(classification, context, role)

    // Search Confirmation: when executing a search, briefly confirm what
    // we are about to search so the user has a chance to correct course.
    if (strategy === 'SEARCH' && context.clarificationCount > 0) {
      const confirmMsg = getSearchConfirmationMessage(classification)
      structuredResponse = formatResponse(handlerResponse, classification.intent, role)
      response = confirmMsg + '\n\n' + extractText(handlerResponse)
    } else {
      structuredResponse = formatResponse(handlerResponse, classification.intent, role)
      response = extractText(handlerResponse)
    }
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
