import type { IntentClassification, ConversationContextState } from '../types'
import { formatPrice } from './responseUtils'
import { getCategoryFlow } from './categoryFlows'

const MAX_CLARIFICATIONS = 3

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
  if (entities.budget?.max) parts.push(`budget up to ${formatPrice(entities.budget.max)}`)
  if (entities.budget?.min && entities.budget?.max) {
    parts.push(`budget ${formatPrice(entities.budget.min)} to ${formatPrice(entities.budget.max)}`)
  }
  if (entities.location) parts.push(`location "${entities.location}"`)
  if (entities.brand) parts.push(`brand "${entities.brand}"`)
  if (entities.condition) parts.push(`condition "${entities.condition}"`)

  if (parts.length === 0) {
    return "I'll use general search parameters. You can narrow your search later."
  }

  return `I'll search using ${parts.join(', ')}. You can refine your search anytime.`
}

export function getSearchConfirmationMessage(
  classification: IntentClassification
): string {
  const entities = classification.entities
  const parts: string[] = []

  if (entities.category) {
    const flow = getCategoryFlow(entities.category)
    parts.push(flow.categorySlug === 'general' ? entities.category : entities.category)
  }
  if (entities.brand) parts.push(entities.brand)
  if (entities.budget?.max && entities.budget?.min) {
    parts.push(`${formatPrice(entities.budget.min)} - ${formatPrice(entities.budget.max)}`)
  } else if (entities.budget?.max) {
    parts.push(`under ${formatPrice(entities.budget.max)}`)
  } else if (entities.budget?.min) {
    parts.push(`from ${formatPrice(entities.budget.min)}`)
  }
  if (entities.location) parts.push(`in ${entities.location}`)
  if (entities.condition) parts.push(`(${entities.condition})`)

  if (parts.length === 0) {
    return "Let me search through all active listings for you. I'll show what's available!"
  }

  return `Alright! Searching for ${parts.join(' ')}. Let me find the best matches for you.`
}
