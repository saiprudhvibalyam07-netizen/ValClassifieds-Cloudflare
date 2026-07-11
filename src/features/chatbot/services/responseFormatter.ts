import type { Intent, ChatbotRole } from '../types'
import type {
  StructuredResponse,
  ResponseSection,
  SuggestedAction,
} from './responseTypes'
import { getSectionsForIntent, INTENT_ACTIONS, ROLE_ACTIONS } from './responseTemplates'
import { sanitizeText } from './responseUtils'
import { enrichWithNavigation } from './smartNavigation'

/**
 * Format a raw handler response string into a structured response.
 * Also accepts an already-structured response (pass-through with action enrichment).
 *
 * This is the core of the Response Presentation Engine. It takes:
 * - The raw text from a handler OR an already-structured response
 * - The classified intent
 * - The user's role
 *
 * And produces a StructuredResponse with:
 * - Typed sections for the renderer
 * - Suggested actions for the user
 * - Intent metadata for the renderer
 */
export function formatResponse(
  rawContent: string | StructuredResponse,
  intent: Intent,
  role: ChatbotRole
): StructuredResponse {
  // If already structured, enrich with suggested actions + smart navigation
  if (rawContent && typeof rawContent === 'object' && 'sections' in rawContent) {
    const existing = rawContent as StructuredResponse
    const baseActions = existing.suggestedActions?.length
      ? existing.suggestedActions
      : getSuggestedActions(intent, role)
    const navActions = enrichWithNavigation(existing.sections, baseActions)
    return {
      ...existing,
      suggestedActions: baseActions.length > 0 ? [...baseActions, ...navActions] : navActions,
      intent,
      role,
    }
  }

  const sanitized = sanitizeText(rawContent as string)

  const sections = buildSections(sanitized, intent, role)
  const baseActions = getSuggestedActions(intent, role)
  const navActions = enrichWithNavigation(sections, baseActions)

  return {
    sections,
    suggestedActions: baseActions.length > 0 ? [...baseActions, ...navActions] : navActions,
    intent,
    role,
  }
}

/**
 * Build response sections from raw content and intent.
 */
function buildSections(
  rawContent: string,
  intent: Intent,
  role: ChatbotRole
): ResponseSection[] {
  const sections = getSectionsForIntent(intent, rawContent, role)

  if (sections.length === 0) {
    sections.push({ type: 'text', content: rawContent })
  }

  return sections
}

/**
 * Get suggested actions for the intent and role.
 * Intent-specific actions take priority over role defaults.
 */
function getSuggestedActions(
  intent: Intent,
  role: ChatbotRole
): SuggestedAction[] {
  const intentActions = INTENT_ACTIONS[intent]
  if (intentActions && intentActions.length > 0) {
    return intentActions
  }

  return ROLE_ACTIONS[role] ?? ROLE_ACTIONS.visitor
}

/**
 * Format a clarification response.
 */
export function formatClarification(
  question: string,
  intent: Intent,
  role: ChatbotRole
): StructuredResponse {
  return {
    sections: [{ type: 'text', content: question }],
    suggestedActions: [],
    intent,
    role,
  }
}

/**
 * Format a safety warning response.
 */
export function formatSafetyWarning(
  rawContent: string,
  role: ChatbotRole
): StructuredResponse {
  const lower = rawContent.toLowerCase()
  let variant: 'scam_warning' | 'unsafe_payment' | 'suspicious_seller' | 'identity_warning' | 'general_safety' = 'general_safety'
  let title = 'Safety Tips'

  if (lower.includes('scam') || lower.includes('otp') || lower.includes('upi')) {
    variant = 'scam_warning'
    title = 'Scam Alert'
  } else if (lower.includes('fake') || lower.includes('fraud')) {
    variant = 'suspicious_seller'
    title = 'Suspicious Listing Alert'
  } else if (lower.includes('payment') || lower.includes('pay')) {
    variant = 'unsafe_payment'
    title = 'Unsafe Payment Warning'
  }

  const tips = extractTipsFromContent(rawContent)

  return {
    sections: [
      {
        type: 'safety_banner',
        variant,
        title,
        message: sanitizeText(rawContent),
        tips: tips.length > 0 ? tips : undefined,
      },
    ],
    suggestedActions: INTENT_ACTIONS.SAFETY ?? [],
    intent: 'SAFETY',
    role,
  }
}

/**
 * Format an error response.
 */
export function formatError(
  _message: string,
  role: ChatbotRole
): StructuredResponse {
  return {
    sections: [
      {
        type: 'error',
        message: 'Something went wrong. Please try again.',
      },
    ],
    suggestedActions: [
      { label: 'Try Again', value: 'retry' },
      { label: 'Start New Chat', value: 'hello' },
    ],
    intent: 'UNSUPPORTED',
    role,
  }
}

/**
 * Format an empty state response.
 */
export function formatEmptyState(
  variant: 'no_results' | 'cleared' | 'offline' | 'timeout' | 'unauthorized' | 'server_error' | 'no_permissions',
  role: ChatbotRole
): StructuredResponse {
  const templates: Record<string, { title: string; description: string; action?: SuggestedAction }> = {
    no_results: {
      title: 'No listings found',
      description: 'Try adjusting your search filters or browse different categories.',
      action: { label: 'Browse Categories', value: 'show categories' },
    },
    cleared: {
      title: 'Conversation cleared',
      description: 'Start a new conversation with ValBot.',
      action: { label: 'Start Chat', value: 'hello' },
    },
    offline: {
      title: 'You are offline',
      description: 'Check your internet connection and try again.',
    },
    timeout: {
      title: 'Session timed out',
      description: 'The conversation has been inactive for too long.',
      action: { label: 'Start New Chat', value: 'hello' },
    },
    unauthorized: {
      title: 'Sign in required',
      description: 'Please sign in to access this feature.',
    },
    server_error: {
      title: 'Something went wrong',
      description: 'We encountered an issue. Please try again.',
      action: { label: 'Try Again', value: 'retry' },
    },
    no_permissions: {
      title: 'Access restricted',
      description: 'You do not have permission to perform this action.',
    },
  }

  const template = templates[variant] ?? templates.server_error

  return {
    sections: [
      {
        type: 'empty_state',
        variant,
        title: template.title,
        description: template.description,
        action: template.action,
      },
    ],
    suggestedActions: [],
    intent: 'UNSUPPORTED',
    role,
  }
}

/**
 * Extract safety tips from a raw content string.
 * Looks for sentences that are imperative or contain safety keywords.
 */
function extractTipsFromContent(content: string): string[] {
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10)

  const safetyKeywords = ['never', 'always', 'should', 'must', 'report', 'verify', 'check', 'avoid', 'don\'t', 'do not']

  return sentences
    .filter(s => safetyKeywords.some(kw => s.toLowerCase().includes(kw)))
    .slice(0, 4)
}
