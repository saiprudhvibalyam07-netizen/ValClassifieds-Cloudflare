import type { IntentClassification, ConversationContextState } from '../types'

const MAX_CLARIFICATIONS = 2

export function shouldContinueClarifying(
  classification: IntentClassification,
  context: ConversationContextState
): boolean {
  if (!classification.requiresClarification) return false
  if (context.clarificationCount >= MAX_CLARIFICATIONS) return false
  return true
}

export function getAssumptionMessage(
  classification: IntentClassification
): string {
  const entities = classification.entities
  const parts: string[] = []

  if (entities.category) parts.push(`category "${entities.category}"`)
  if (entities.budget?.max) parts.push(`budget up to ${entities.budget.max}`)
  if (entities.budget?.min && entities.budget?.max) {
    parts.push(`budget ${entities.budget.min} to ${entities.budget.max}`)
  }
  if (entities.location) parts.push(`location "${entities.location}"`)
  if (entities.brand) parts.push(`brand "${entities.brand}"`)
  if (entities.condition) parts.push(`condition "${entities.condition}"`)

  if (parts.length === 0) {
    return "I'll use general search parameters. You can narrow your search later."
  }

  return `I'll search using ${parts.join(', ')}. You can refine your search anytime.`
}
