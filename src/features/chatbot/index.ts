export { ChatWidget } from './components/ChatWidget'
export { ChatProvider } from './contexts/ChatContext'
export { useChat } from './hooks/useChat'
export { useChatAuth } from './hooks/useChatAuth'

export type {
  ChatbotConversation,
  ChatbotMessage,
  ChatbotRole,
  ChatState,
  ConversationStatus,
  MessageStatus,
  LogEntry,
  ToolDefinition,
  PermissionCheck,
  ValidationResult,
} from './types'

export type { ConversationProvider } from './services/provider'
export { getConversationProvider } from './services/provider'
export { CHATBOT_CONFIG, LOG_CONFIG, NL_CONFIG, MEMORY_CONFIG } from './config'

export { registerPhase2Tools } from './services/toolImplementations'
export { parseNaturalLanguage } from './services/naturalLanguageSearch'
export { seedMarketplaceData, clearMarketplaceData } from './services/marketplaceIntelligence'
export { searchListings, getListingDetails, getCategories, getSellerInfo } from './services/marketplaceIntelligence'

// Phase 3: Memory & Personalization
export type { MemoryEntry, MemoryQuery, MemoryScope, MemoryStats } from './types'
export type { UserProfile, UserPreference, ConversationSummary, Recommendation } from './types'
export type { PrivacySettings, PrivacyFilterResult, PrivacyAuditLog } from './services/memoryPrivacy'
export type { ConversationContext, ProcessMessageResult } from './services/memoryManager'

export {
  storeMemory, getMemory, deleteMemory, deleteUserMemories, deleteSessionMemories,
  getAllMemories, exportMemories, getMemoryStats, clearAllMemories, pruneExpiredMemories,
} from './services/memoryStore'

export { buildUserProfile, buildProfileContext } from './services/userProfile'
export { learnFromMessage, learnViewedListing, getLearnedPreferences } from './services/preferenceLearner'

export {
  summarizeConversation, findRelatedConversations, buildContinuityContext, getConversationSummary,
} from './services/conversationContinuity'

export {
  recommendListings, recommendCategories, recommendSellers, recommendAll,
} from './services/recommendationEngine'

export {
  processMessage, trackListingView, getRecommendations, getContext,
  forgetMemory, forgetUserMemories, forgetSessionMemories, resetAll,
} from './services/memoryManager'

export {
  filterSensitiveData, scrubSensitiveMemories, exportUserData, deleteAllUserData,
  getPrivacySettings, updatePrivacySettings, getAuditLogs, clearAuditLogs,
} from './services/memoryPrivacy'

// Phase 3: Intent Detection & Conversation Engine
export { classifyIntent } from './services/intentClassifier'
export { getClarification } from './services/clarificationEngine'
export { shouldContinueClarifying, getAssumptionMessage } from './services/followUpEngine'
export { conversationContext } from './services/conversationContext'
export { resolveStrategy } from './services/responseStrategy'
export { runConversationPipeline } from './services/conversationPipeline'
export { getHandler } from './services/intentHandlers'

export type {
  Intent,
  MarketplaceEntities,
  IntentClassification,
  ClarificationResult,
  ConversationContextState,
  ConversationStage,
  ResponseStrategy,
  IntentHandler,
  ConversationPipelineResult,
  StructuredResponse,
} from './types'

// Phase 4: Response Quality & Presentation Engine
export { formatResponse, formatClarification, formatSafetyWarning, formatError, formatEmptyState } from './services/responseFormatter'
export { formatPrice, formatEntitySummary, sanitizeText, truncateText, parseMarkdownSections } from './services/responseUtils'
export { BUYER_ACTIONS, SELLER_ACTIONS, ADMIN_ACTIONS, VISITOR_ACTIONS, ROLE_ACTIONS, INTENT_ACTIONS } from './services/responseTemplates'

export type {
  ResponseSectionType,
  EmptyStateVariant,
  SafetyVariant,
  SuccessVariant,
  ResponseSection,
  StructuredResponse as StructuredResponseType,
  ListingData,
  SuggestedAction,
  ComparisonRow,
} from './services/responseTypes'

export { ResponseRenderer } from './components/ResponseRenderer'
export { ListingCard } from './components/ListingCard'
export { ListingGrid } from './components/ListingGrid'
export { ComparisonTable } from './components/ComparisonTable'
export { SuggestedActions } from './components/SuggestedActions'
export { SafetyBanner } from './components/SafetyBanner'
export { EmptyState } from './components/EmptyState'

// Phase 5B: Marketplace Readiness & Database Optimization
export {
  CANONICAL_CATEGORIES,
  CATEGORY_SLUGS,
  CATEGORY_NAMES,
  matchCategory,
  matchCategories,
  getCategoryBySlug,
  getCategoryByAlias,
  fuzzyMatchCategories,
} from './services/canonicalCategories'
export type { CanonicalCategory } from './services/canonicalCategories'

export {
  searchListings as searchListingsV2,
  getListingById,
  getCategoriesWithCounts,
  getCategoryBySlug as getMarketplaceCategoryBySlug,
  getSellerInfo as getSellerInfoV2,
  getFeaturedListings,
  getLatestListings,
  getSimilarListings,
  getCategoryCounts,
  incrementViews,
} from './services/marketplaceSearch'
export type {
  MarketplaceSearchParams,
  MarketplaceSearchResult,
  ListingWithRelations,
  CategoryWithCount,
  SellerInfo,
} from './services/marketplaceSearch'

export {
  buildSearchPlan,
  buildBrowsePlan,
  buildRecommendationPlan,
} from './services/queryPlanner'
export type { SearchPlan, FallbackStrategy } from './services/queryPlanner'

export {
  executeWithFallback,
  getFallbackMessage,
} from './services/searchFallbacks'
export type { FallbackResult } from './services/searchFallbacks'