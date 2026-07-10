export const CHATBOT_CONFIG = {
  enabled: true,
  mockMode: true,
  sessionExpiryDays: 30,
  messageLimit: 50,
  typingDelay: { min: 800, max: 2000 },
  maxStarterPrompts: 4,
}

export const LOG_CONFIG = {
  enabled: true,
  level: 'info' as const,
  maxEntries: 100,
  analyticsEnabled: true,
}

export const NL_CONFIG = {
  enabled: true,
  minConfidence: 0.4,
  defaultLocation: '',
  maxPriceLimit: 100000000,
}

export const MEMORY_CONFIG = {
  enabled: true,
  sessionTTL: 86400000,
  persistentTTL: 2592000000,
  maxSessionEntries: 100,
  maxPersistentEntries: 500,
  minConfidence: 0.3,
  preferenceLearningEnabled: true,
  conversationSummarizationEnabled: true,
  summarizationMinMessages: 10,
  pruningInterval: 86400000,
  recommendationTopK: 5,
  maxRecentTopics: 20,
  maxViewedListings: 50,
}

export const ANALYTICS_CONFIG = {
  enabled: true,
  trackConversations: true,
  trackUsers: true,
  trackUsage: true,
  trackPerformance: true,
  trackCost: false,
  trackQuality: true,
  trackReliability: true,
  aggregationWindow: 3600000,
}

export const COST_MONITORING_CONFIG = {
  enabled: false,
  alertThreshold: 100,
  billingCycle: 'monthly',
  trackPerUser: true,
  trackPerConversation: true,
  trackPerFeature: true,
  trackProviderUsage: false,
}

export const QUALITY_MONITORING_CONFIG = {
  enabled: true,
  trackHallucinationRate: false,
  trackCitationUsage: false,
  trackRetrievalQuality: false,
  trackRecommendationSuccess: true,
  trackValidationFailures: false,
  hallucinationAlertThreshold: 0.05,
  failureAlertThreshold: 0.1,
}

export const RELIABILITY_CONFIG = {
  enabled: true,
  trackLatency: true,
  trackTimeouts: true,
  trackRetries: true,
  trackStreaming: true,
  trackProviderFailures: false,
  trackCacheHitRatio: true,
  trackDatabaseLatency: true,
  latencyAlertThreshold: 5000,
  timeoutAlertThreshold: 10,
}

export const FEATURE_FLAGS_CONFIG = {
  enabled: true,
  providers: {},
  features: {
    streaming: { enabled: true, fallback: false },
    rag: { enabled: false, fallback: [] },
    memory: { enabled: true, fallback: null },
    recommendations: { enabled: true, fallback: [] },
    marketplaceSearch: { enabled: true, fallback: null },
    embeddings: { enabled: false, fallback: null },
    hybridSearch: { enabled: false, fallback: null },
    citationEngine: { enabled: false, fallback: [] },
    toolRouter: { enabled: true, fallback: [] },
    individualTools: { enabled: true, fallback: [] },
    experimentalFeatures: { enabled: false, fallback: null },
  },
  environmentOverrides: { enabled: true },
  auditLogging: { enabled: true },
}

export const PROMPT_REGISTRY_CONFIG = {
  enabled: false,
  defaultVersion: 1,
  maxVersions: 100,
  rollbackEnabled: false,
  autoPromote: false,
  auditLogging: false,
}

export const ADMIN_OPERATIONS_CONFIG = {
  enabled: true,
  auditLogging: true,
  rateLimiting: { enabled: true, maxRequestsPerMinute: 100 },
  timeout: { enabled: true, defaultTimeout: 10000 },
}

export const RUNTIME_CONFIG_CONFIG = {
  enabled: true,
  validationSchema: { enabled: true },
  hotReload: { enabled: true },
  versionControl: { enabled: true },
  environmentIsolation: { enabled: true },
}

export const ALERT_CONFIG = {
  enabled: true,
  rules: {
    highLatency: { threshold: 5000, window: 60000 },
    highTokenUsage: { threshold: 100000, window: 3600000 },
    costSpike: { percentage: 50, window: 3600000 },
    providerUnavailable: { threshold: 1, window: 300000 },
  },
}

export const HEALTH_CONFIG = {
  enabled: true,
  checkInterval: 60000,
  providers: ['supabase', 'marketplaceSearch'],
  healthCheckTimeout: 5000,
  consecutiveFailuresBeforeAlert: 3,
}

export const PRIVACY_CONFIG = {
  enabled: true,
  auditLogging: true,
  exportRequests: true,
  deletionLogging: true,
  permissionChanges: true,
  dataRetentionDays: 365,
}