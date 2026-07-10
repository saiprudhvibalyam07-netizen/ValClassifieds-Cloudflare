import type {
  IntentClassification,
  ConversationContextState,
  ResponseStrategy,
  ClarificationResult,
} from '../types'

interface StrategyInput {
  classification: IntentClassification
  clarification: ClarificationResult
  context: ConversationContextState
}

export function resolveStrategy(input: StrategyInput): ResponseStrategy {
  const { classification, clarification, context } = input
  const { intent, confidence } = classification

  if (intent === 'OFFENSIVE') return 'SAFETY_WARNING'
  if (intent === 'UNSUPPORTED') return 'UNSUPPORTED'
  if (intent === 'ADMIN_ACTION') return 'HANDOFF'

  if (clarification.shouldClarify) return 'CLARIFY'

  if (confidence < 0.4 && intent === 'UNKNOWN') return 'REDIRECT'

  if (context.clarificationCount >= 2 && classification.missingInformation.length > 0) {
    return 'ANSWER'
  }

  switch (intent) {
    case 'GREETING':
    case 'SMALL_TALK':
      return 'ANSWER'
    case 'SEARCH_LISTINGS':
      return 'SEARCH'
    case 'BROWSE_CATEGORIES':
    case 'LISTING_DETAILS':
    case 'BUYING_HELP':
    case 'SELLING_HELP':
    case 'LISTING_ADVICE':
    case 'PRICING_HELP':
    case 'SAFETY':
    case 'CONTACT_SELLER':
    case 'PLATFORM_HELP':
    case 'ACCOUNT_HELP':
    case 'COMPARISON':
    case 'RECOMMENDATION':
      return 'ANSWER'
    default:
      return 'REDIRECT'
  }
}
