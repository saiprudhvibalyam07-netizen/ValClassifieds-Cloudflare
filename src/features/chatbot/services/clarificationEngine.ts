import type { Intent, MarketplaceEntities, ClarificationResult, ConversationContextState } from '../types'
import { getCategoryFlow, getCategoryQuestion, getCategoryExplanation } from './categoryFlows'

function getAcknowledgment(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('thank') || lower.includes('thanks')) return "You're welcome! "
  if (lower.includes('yes') || lower.includes('yeah') || lower.includes('sure')) return 'Great! '
  if (lower.includes('no') || lower.includes('nah') || lower.includes('nope')) return 'No problem! '
  if (lower.includes('ok') || lower.includes('okay') || lower.includes('alright')) return 'Okay! '

  const brandPatterns = [
    /\b(hyundai|honda|toyota|maruti|suzuki|bmw|mercedes)\b/i,
    /\b(iphone|samsung|oneplus|xiaomi|apple|macbook)\b/i,
    /\b(nike|adidas|puma)\b/i,
  ]
  for (const p of brandPatterns) {
    if (p.test(lower)) return 'Great choice! '
  }

  return ''
}

function buildQuestionWithExplanation(
  question: string,
  explanation: string,
  ackPrefix: string
): string {
  if (explanation) {
    return `${ackPrefix}${question} (${explanation})`
  }
  return `${ackPrefix}${question}`
}

export function getClarification(
  intent: Intent,
  entities: MarketplaceEntities,
  missingInformation: string[],
  context?: ConversationContextState,
  userMessage?: string
): ClarificationResult {
  if (missingInformation.length === 0) {
    return { shouldClarify: false, question: '', missingFields: [] }
  }

  const askedFields = context?.askedFields ?? []
  const categorySlug = entities.category ?? context?.lastEntities?.category ?? undefined

  const alreadyAsked = missingInformation.filter(f => askedFields.includes(f))
  const notYetAsked = missingInformation.filter(f => !askedFields.includes(f))

  const fieldsToAsk = notYetAsked.length > 0 ? notYetAsked : alreadyAsked

  if (fieldsToAsk.length === 0) {
    return { shouldClarify: false, question: '', missingFields: [] }
  }

  if (intent === 'SEARCH_LISTINGS') {
    const flow = getCategoryFlow(categorySlug)
    for (const field of flow.fields) {
      if (fieldsToAsk.includes(field.key)) {
        const askedCount = askedFields.filter(f => f === field.key).length
        const question = getCategoryQuestion(field.key, categorySlug, askedCount)
        const explanation = getCategoryExplanation(field.key, categorySlug)
        const ack = userMessage ? getAcknowledgment(userMessage) : ''
        return {
          shouldClarify: true,
          question: buildQuestionWithExplanation(question, explanation, ack),
          missingFields: [field.key],
        }
      }
    }
  }

  if (intent === 'LISTING_MANAGEMENT') {
    if (missingInformation.includes('listing')) {
      return {
        shouldClarify: true,
        question: 'Which listing would you like to manage?',
        missingFields: ['listing'],
      }
    }
  }

  if (intent === 'PRICING_HELP' && fieldsToAsk.includes('item')) {
    return {
      shouldClarify: true,
      question: 'Which item would you like pricing help with?',
      missingFields: ['item'],
    }
  }

  if (intent === 'COMPARISON' && fieldsToAsk.includes('items to compare')) {
    return {
      shouldClarify: true,
      question: 'Which items would you like to compare?',
      missingFields: ['items to compare'],
    }
  }

  if (intent === 'RECOMMENDATION' && fieldsToAsk.includes('what you need')) {
    return {
      shouldClarify: true,
      question: 'What kind of recommendation are you looking for?',
      missingFields: ['what you need'],
    }
  }

  const field = fieldsToAsk[0]
  const ack = userMessage ? getAcknowledgment(userMessage) : ''

  return {
    shouldClarify: true,
    question: `${ack}Could you provide more details about the ${field}?`,
    missingFields: [field],
  }
}
