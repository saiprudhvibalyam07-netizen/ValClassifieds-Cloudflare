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

const VERIFY_THRESHOLD = 0.6

const VERIFY_LABELS: Record<string, string> = {
  SELLING_HELP: 'Create a new listing',
  LISTING_MANAGEMENT: 'View or manage your listings',
  SEARCH_LISTINGS: 'Search for listings',
  BUYING_HELP: 'Get buying assistance',
  LISTING_ADVICE: 'Get listing improvement tips',
  PRICING_HELP: 'Get pricing advice',
  SAFETY: 'Learn about safety',
  CONTACT_SELLER: 'Contact a seller',
  PLATFORM_HELP: 'Learn about the platform',
  ACCOUNT_HELP: 'Manage your account',
  COMPARISON: 'Compare items',
  RECOMMENDATION: 'Get recommendations',
}

export function getVerificationQuestion(classification: IntentClassification): string {
  const label = VERIFY_LABELS[classification.intent]
  if (!label) return ''

  return `Did you mean:\n\n• ${label}\n• Something else?`
}

export function resolveStrategy(input: StrategyInput): ResponseStrategy {
  const { classification, clarification, context } = input
  const { intent, confidence } = classification

  if (intent === 'OFFENSIVE') return 'SAFETY_WARNING'
  if (intent === 'OFF_TOPIC') return 'UNSUPPORTED'
  if (intent === 'UNSUPPORTED') return 'UNSUPPORTED'
  if (intent === 'ADMIN_ACTION') return 'HANDOFF'

  // Low confidence, non-UNKNOWN intents → ask for verification
  if (intent !== 'UNKNOWN' && confidence > 0 && confidence < VERIFY_THRESHOLD && VERIFY_LABELS[intent]) {
    return 'VERIFY'
  }

  if (clarification.shouldClarify) return 'CLARIFY'

  if (confidence < 0.4 && intent === 'UNKNOWN') return 'REDIRECT'

  const tooManyClarifications = context.clarificationCount >= 2 && classification.missingInformation.length > 0
  if (tooManyClarifications) return 'ANSWER'

  switch (intent) {
    case 'GREETING':
    case 'FAREWELL':
    case 'THANK_YOU':
    case 'SMALL_TALK':
    case 'LISTING_MANAGEMENT':
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
