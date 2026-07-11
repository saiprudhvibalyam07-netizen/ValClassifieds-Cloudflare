import type {
  Intent,
  MarketplaceEntities,
  ConversationContextState,
  ConversationStage,
  SearchFilters,
} from '../types'

const initialContext: ConversationContextState = {
  lastIntent: null,
  lastEntities: {},
  currentGoal: null,
  conversationStage: 'greeting',
  currentListing: null,
  searchFilters: null,
  clarificationCount: 0,
  lastResponse: null,
  askedFields: [],
  lastAcknowledgment: null,
}

const STAGE_TRANSITIONS: Record<string, ConversationStage> = {
  GREETING: 'greeting',
  FAREWELL: 'greeting',
  THANK_YOU: 'exploring',
  SEARCH_LISTINGS: 'searching',
  BROWSE_CATEGORIES: 'exploring',
  LISTING_DETAILS: 'evaluating',
  BUYING_HELP: 'support',
  SELLING_HELP: 'support',
  LISTING_ADVICE: 'support',
  PRICING_HELP: 'support',
  SAFETY: 'support',
  CONTACT_SELLER: 'transacting',
  PLATFORM_HELP: 'support',
  ACCOUNT_HELP: 'support',
  LISTING_MANAGEMENT: 'support',
  COMPARISON: 'evaluating',
  RECOMMENDATION: 'searching',
  SMALL_TALK: 'exploring',
  OFF_TOPIC: 'support',
  ADMIN_ACTION: 'support',
  OFFENSIVE: 'support',
  UNSUPPORTED: 'support',
  UNKNOWN: 'exploring',
}

class ConversationContextManager {
  private context: ConversationContextState = { ...initialContext }
  private contextsByConversation: Map<string, ConversationContextState> = new Map()

  getContext(conversationId?: string): ConversationContextState {
    if (conversationId) {
      return this.contextsByConversation.get(conversationId) ?? { ...initialContext }
    }
    return { ...this.context }
  }

  updateContext(
    intent: Intent,
    entities: MarketplaceEntities,
    conversationId?: string
  ): ConversationContextState {
    const target = conversationId
      ? (this.contextsByConversation.get(conversationId) ?? { ...initialContext })
      : this.context

    const newStage = STAGE_TRANSITIONS[intent] ?? 'exploring'

    const mergedEntities: MarketplaceEntities = {
      ...target.lastEntities,
      ...entities,
    }

    // Filter out fields that the user has now answered
    const remainingAsked = target.askedFields.filter(f => {
      if (f === 'category') return !mergedEntities.category && !mergedEntities.query
      if (f === 'budget') return !mergedEntities.budget
      if (f === 'location') return !mergedEntities.location
      if (f === 'listing') return !mergedEntities.listingId && !mergedEntities.query
      return true
    })

    const updated: ConversationContextState = {
      ...target,
      lastIntent: intent,
      lastEntities: mergedEntities,
      conversationStage: newStage,
      currentGoal: this.deriveGoal(intent, mergedEntities),
      currentListing: entities.listingId ?? target.currentListing,
      searchFilters: this.buildFilters(mergedEntities),
      clarificationCount: 0,
      askedFields: remainingAsked,
    }

    if (conversationId) {
      this.contextsByConversation.set(conversationId, updated)
    } else {
      this.context = updated
    }

    return updated
  }

  incrementClarification(conversationId?: string): void {
    const target = conversationId
      ? this.contextsByConversation.get(conversationId)
      : this.context
    if (target) {
      target.clarificationCount++
    }
  }

  setLastResponse(response: string, conversationId?: string): void {
    const target = conversationId
      ? this.contextsByConversation.get(conversationId)
      : this.context
    if (target) {
      target.lastResponse = response
    }
  }

  setAskedField(field: string, conversationId?: string): void {
    const target = conversationId
      ? this.contextsByConversation.get(conversationId)
      : this.context
    if (target && !target.askedFields.includes(field)) {
      target.askedFields.push(field)
    }
  }

  setLastAcknowledgment(ack: string, conversationId?: string): void {
    const target = conversationId
      ? this.contextsByConversation.get(conversationId)
      : this.context
    if (target) {
      target.lastAcknowledgment = ack
    }
  }

  reset(conversationId?: string): void {
    if (conversationId) {
      this.contextsByConversation.delete(conversationId)
    } else {
      this.context = { ...initialContext }
    }
  }

  private deriveGoal(intent: Intent, entities: MarketplaceEntities): string | null {
    switch (intent) {
      case 'SEARCH_LISTINGS':
        if (entities.category && entities.budget?.max) {
          return `Find ${entities.category} under ${entities.budget.max}`
        }
        if (entities.category) return `Find ${entities.category}`
        return 'Search listings'
      case 'BROWSE_CATEGORIES':
        return 'Browse categories'
      case 'LISTING_DETAILS':
        return entities.listingId ? `View listing ${entities.listingId}` : 'View listing details'
      case 'BUYING_HELP':
        return 'Get buying help'
      case 'SELLING_HELP':
        return 'Get selling help'
      case 'CONTACT_SELLER':
        return 'Contact seller'
      case 'COMPARISON':
        return 'Compare items'
      case 'RECOMMENDATION':
        return 'Get recommendations'
      case 'LISTING_MANAGEMENT':
        return 'Manage listings'
      default:
        return null
    }
  }

  private buildFilters(entities: MarketplaceEntities): SearchFilters | null {
    if (!entities.category && !entities.budget && !entities.location && !entities.query) {
      return null
    }

    const filters: SearchFilters = {}
    if (entities.category) filters.categories = [entities.category]
    if (entities.budget?.max) filters.maxPrice = entities.budget.max
    if (entities.budget?.min) filters.minPrice = entities.budget.min
    if (entities.location) filters.location = entities.location
    if (entities.query) filters.query = entities.query

    return filters
  }
}

export const conversationContext = new ConversationContextManager()
