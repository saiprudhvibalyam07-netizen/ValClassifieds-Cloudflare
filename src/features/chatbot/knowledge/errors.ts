import type { ResponseSection, SuggestedAction } from '../services/responseTypes'

export interface ErrorArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface ErrorArticleEmptyState {
  variant: 'offline' | 'timeout' | 'unauthorized' | 'server_error' | 'no_permissions'
  title: string
  description: string
  action?: SuggestedAction
}

export interface ErrorArticle {
  id: string
  version: number
  title: string
  kind: string
  intent: 'UNSUPPORTED'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: ErrorArticleMetadata
  emptyState?: ErrorArticleEmptyState
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: ErrorArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const ERROR_ACTIONS: SuggestedAction[] = [
  { label: 'Browse Listings', value: 'browse categories' },
  { label: 'Search Listings', value: 'search' },
  { label: 'Contact Support', value: 'contact support' },
]

const articles: ErrorArticle[] = [
  // ───────────────────────── ERRORS (30) ─────────────────────────
  {
    id: 'ERR-001',
    version: VERSION,
    title: 'Something Went Wrong',
    kind: 'generic',
    intent: 'UNSUPPORTED',
    category: 'generic',
    triggers: ['error', 'problem', 'not working', 'failed', 'issue'],
    response: [
      { type: 'error', message: 'Something went wrong. Please try again.' },
    ],
    actions: [
      { label: 'Try Again', value: 'retry' },
      { label: 'Start New Chat', value: 'hello' },
    ],
    metadata: META,
    isDefault: true,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-002',
    version: VERSION,
    title: 'Connection Problem',
    kind: 'connection',
    intent: 'UNSUPPORTED',
    category: 'connection',
    triggers: ['connection', 'connect', 'network', 'unreachable'],
    response: [
      { type: 'error', message: 'We could not reach the server. Check your connection and try again.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-003',
    version: VERSION,
    title: 'Service Maintenance',
    kind: 'maintenance',
    intent: 'UNSUPPORTED',
    category: 'maintenance',
    triggers: ['maintenance', 'down for maintenance', 'updating'],
    response: [
      { type: 'error', message: 'ValClassifieds is briefly under maintenance. Please try again shortly.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-004',
    version: VERSION,
    title: 'Upload Failed',
    kind: 'upload',
    intent: 'UNSUPPORTED',
    category: 'uploads',
    triggers: ['upload', 'image', 'photo', 'file', 'attachment'],
    response: [
      { type: 'error', message: 'Your upload did not go through. Use JPG or PNG under 5 MB and try again.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-005',
    version: VERSION,
    title: 'You Are Offline',
    kind: 'offline',
    intent: 'UNSUPPORTED',
    category: 'offline',
    triggers: ['offline', 'no internet', 'disconnected'],
    response: [
      { type: 'error', message: 'You appear to be offline. Reconnect and we will pick up where you left off.' },
    ],
    actions: [
      { label: 'Try Again', value: 'retry' },
      { label: 'Browse Categories', value: 'show categories' },
    ],
    emptyState: {
      variant: 'offline',
      title: 'You are offline',
      description: 'Check your internet connection and try again.',
    },
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-006',
    version: VERSION,
    title: 'Image Too Large',
    kind: 'image_size',
    intent: 'UNSUPPORTED',
    category: 'uploads',
    triggers: ['too large', 'file size', 'big file', 'limit'],
    response: [
      { type: 'error', message: 'That file is too large. Compress it or choose a smaller image and retry.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-007',
    version: VERSION,
    title: 'Session Timed Out',
    kind: 'timeout',
    intent: 'UNSUPPORTED',
    category: 'session',
    triggers: ['timed out', 'timeout', 'expired', 'inactive'],
    response: [
      { type: 'error', message: 'Your session was inactive for too long and has timed out. Start a new chat to continue.' },
    ],
    actions: [
      { label: 'Start New Chat', value: 'hello' },
    ],
    emptyState: {
      variant: 'timeout',
      title: 'Session timed out',
      description: 'The conversation has been inactive for too long.',
      action: { label: 'Start New Chat', value: 'hello' },
    },
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-008',
    version: VERSION,
    title: 'Sign In Required',
    kind: 'unauthorized',
    intent: 'UNSUPPORTED',
    category: 'auth',
    triggers: ['sign in', 'log in', 'unauthorized', 'not signed in', 'auth'],
    response: [
      { type: 'error', message: 'Please sign in to ValClassifieds to use this feature.' },
    ],
    actions: [
      { label: 'Sign In', value: 'login' },
      { label: 'Browse Listings', value: 'browse categories' },
    ],
    emptyState: {
      variant: 'unauthorized',
      title: 'Sign in required',
      description: 'Please sign in to access this feature.',
      action: { label: 'Sign In', value: 'login' },
    },
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-009',
    version: VERSION,
    title: 'Listing Not Found',
    kind: 'listing',
    intent: 'UNSUPPORTED',
    category: 'listing',
    triggers: ['listing not found', 'no such listing', 'removed', 'deleted listing'],
    response: [
      { type: 'error', message: 'We could not find that listing. It may have been sold or removed.' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
      { label: 'Browse Categories', value: 'show categories' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-010',
    version: VERSION,
    title: 'Search Failed',
    kind: 'search',
    intent: 'UNSUPPORTED',
    category: 'search',
    triggers: ['search failed', 'no search', 'could not search'],
    response: [
      { type: 'error', message: 'The search did not return results. Try different keywords or broaden your filters.' },
    ],
    actions: [
      { label: 'Browse Categories', value: 'show categories' },
      { label: 'Search Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-011',
    version: VERSION,
    title: 'Message Not Sent',
    kind: 'message',
    intent: 'UNSUPPORTED',
    category: 'messaging',
    triggers: ['message not sent', 'could not send', 'message failed'],
    response: [
      { type: 'error', message: 'Your message could not be sent. Check the connection and try again.' },
    ],
    actions: [
      { label: 'Retry', value: 'retry' },
      { label: 'Open Messages', value: 'open messages' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-012',
    version: VERSION,
    title: 'Payment Issue',
    kind: 'payment',
    intent: 'UNSUPPORTED',
    category: 'payments',
    triggers: ['payment', 'pay', 'transaction', 'charge'],
    response: [
      { type: 'error', message: 'ValClassifieds does not process payments. Arrange a safe method directly with the seller.' },
    ],
    actions: [
      { label: 'Safety Guide', value: 'safety tips' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-013',
    version: VERSION,
    title: 'Permission Denied',
    kind: 'no_permissions',
    intent: 'UNSUPPORTED',
    category: 'permissions',
    triggers: ['permission', 'not allowed', 'denied', 'restricted'],
    response: [
      { type: 'error', message: 'You do not have permission to perform this action.' },
    ],
    actions: [
      { label: 'Browse Listings', value: 'browse categories' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    emptyState: {
      variant: 'no_permissions',
      title: 'Access restricted',
      description: 'You do not have permission to perform this action.',
      action: { label: 'Contact Support', value: 'contact support' },
    },
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-014',
    version: VERSION,
    title: 'Account Locked',
    kind: 'account_locked',
    intent: 'UNSUPPORTED',
    category: 'auth',
    triggers: ['locked', 'suspended', 'blocked account'],
    response: [
      { type: 'error', message: 'Your account is temporarily locked. Contact support to restore access.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-015',
    version: VERSION,
    title: 'Invalid Input',
    kind: 'invalid_input',
    intent: 'UNSUPPORTED',
    category: 'validation',
    triggers: ['invalid', 'not valid', 'wrong format'],
    response: [
      { type: 'error', message: 'Some details were not valid. Please check your input and try again.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-016',
    version: VERSION,
    title: 'Rate Limited',
    kind: 'rate_limited',
    intent: 'UNSUPPORTED',
    category: 'limits',
    triggers: ['too many', 'slow down', 'rate limit'],
    response: [
      { type: 'error', message: 'You are doing that too quickly. Please wait a moment and try again.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-017',
    version: VERSION,
    title: 'Feature Unavailable',
    kind: 'unavailable',
    intent: 'UNSUPPORTED',
    category: 'availability',
    triggers: ['unavailable', 'not available', 'coming soon'],
    response: [
      { type: 'error', message: 'This feature is not available right now. Try again later.' },
    ],
    actions: [
      { label: 'Browse Listings', value: 'browse categories' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-018',
    version: VERSION,
    title: 'Server Error',
    kind: 'server_error',
    intent: 'UNSUPPORTED',
    category: 'server',
    triggers: ['server', '500', 'internal error', 'technical'],
    response: [
      { type: 'error', message: 'We hit a technical problem. Please try again in a moment.' },
    ],
    actions: [
      { label: 'Try Again', value: 'retry' },
      { label: 'Start New Chat', value: 'hello' },
    ],
    emptyState: {
      variant: 'server_error',
      title: 'Something went wrong',
      description: 'We encountered an issue. Please try again.',
      action: { label: 'Try Again', value: 'retry' },
    },
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-019',
    version: VERSION,
    title: 'Location Unavailable',
    kind: 'location',
    intent: 'UNSUPPORTED',
    category: 'location',
    triggers: ['location', 'gps', 'near me', 'area'],
    response: [
      { type: 'error', message: 'We could not detect your location. Enter a city or area to continue.' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-020',
    version: VERSION,
    title: 'Category Not Found',
    kind: 'category',
    intent: 'UNSUPPORTED',
    category: 'categories',
    triggers: ['category not found', 'no category'],
    response: [
      { type: 'error', message: 'That category does not exist. Browse all categories to find what you need.' },
    ],
    actions: [
      { label: 'Browse Categories', value: 'show categories' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-021',
    version: VERSION,
    title: 'Seller Unavailable',
    kind: 'seller',
    intent: 'UNSUPPORTED',
    category: 'messaging',
    triggers: ['seller unavailable', 'seller offline', 'no seller'],
    response: [
      { type: 'error', message: 'The seller is not available right now. Try messaging later or view similar listings.' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
      { label: 'Open Messages', value: 'open messages' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-022',
    version: VERSION,
    title: 'Cannot Delete Listing',
    kind: 'delete',
    intent: 'UNSUPPORTED',
    category: 'listing',
    triggers: ['cannot delete', 'delete failed', 'remove listing'],
    response: [
      { type: 'error', message: 'This listing could not be deleted. It may have active messages or be under review.' },
    ],
    actions: [
      { label: 'My Listings', value: 'my listings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-023',
    version: VERSION,
    title: 'Verification Needed',
    kind: 'verification',
    intent: 'UNSUPPORTED',
    category: 'auth',
    triggers: ['verify', 'verification', 'confirm your', 'confirm identity'],
    response: [
      { type: 'error', message: 'Please verify your account to continue. Check your email for the verification link.' },
    ],
    actions: [
      { label: 'Sign In', value: 'login' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-024',
    version: VERSION,
    title: 'Saved Item Removed',
    kind: 'saved',
    intent: 'UNSUPPORTED',
    category: 'favorites',
    triggers: ['saved item', 'favourite removed', 'wishlist item'],
    response: [
      { type: 'error', message: 'That saved item is no longer available. Browse similar listings to save a new one.' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
      { label: 'View Favorites', value: 'view favorites' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-025',
    version: VERSION,
    title: 'Chat History Lost',
    kind: 'history',
    intent: 'UNSUPPORTED',
    category: 'session',
    triggers: ['history', 'previous chat', 'lost messages'],
    response: [
      { type: 'error', message: 'We could not recover your previous chat. Start a new conversation and we will help you.' },
    ],
    actions: [
      { label: 'Start New Chat', value: 'hello' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-026',
    version: VERSION,
    title: 'Notification Failed',
    kind: 'notification',
    intent: 'UNSUPPORTED',
    category: 'account',
    triggers: ['notification', 'alert', 'reminder'],
    response: [
      { type: 'error', message: 'We could not send that notification. Check your notification settings and try again.' },
    ],
    actions: [
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-027',
    version: VERSION,
    title: 'Image Format Unsupported',
    kind: 'format',
    intent: 'UNSUPPORTED',
    category: 'uploads',
    triggers: ['format', 'unsupported file', 'wrong type'],
    response: [
      { type: 'error', message: 'That file format is not supported. Use JPG or PNG for images.' },
    ],
    actions: ERROR_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-028',
    version: VERSION,
    title: 'Too Many Listings',
    kind: 'limit_listings',
    intent: 'UNSUPPORTED',
    category: 'limits',
    triggers: ['too many listings', 'listing limit', 'max listings'],
    response: [
      { type: 'error', message: 'You have reached your active listings limit. Remove an old listing or contact support.' },
    ],
    actions: [
      { label: 'My Listings', value: 'my listings' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-029',
    version: VERSION,
    title: 'Report Could Not Be Sent',
    kind: 'report',
    intent: 'UNSUPPORTED',
    category: 'safety',
    triggers: ['report', 'flag', 'complain'],
    response: [
      { type: 'error', message: 'We could not submit your report. Please try again or email safety@valclassifieds.com.' },
    ],
    actions: [
      { label: 'Safety Guide', value: 'safety tips' },
      { label: 'Contact Support', value: 'contact support' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'ERR-030',
    version: VERSION,
    title: 'Unknown Error',
    kind: 'unknown',
    intent: 'UNSUPPORTED',
    category: 'generic',
    triggers: ['unknown', 'strange', 'weird'],
    response: [
      { type: 'error', message: 'An unexpected error occurred. Please try again or start a new chat.' },
    ],
    actions: [
      { label: 'Try Again', value: 'retry' },
      { label: 'Start New Chat', value: 'hello' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
]

export default articles

function scoreTriggerMatch(query: string, trigger: string): number {
  const q = query.toLowerCase().trim()
  const t = trigger.toLowerCase().trim()
  if (!t) return 0
  if (q === t) return 3
  if (q.startsWith(t)) return 2
  if (q.includes(t)) return 1
  return 0
}

function matchArticles(pool: ErrorArticle[], query: string): ErrorArticle | null {
  let best: { article: ErrorArticle; score: number; triggerLen: number } | null = null
  for (const article of pool) {
    for (const trigger of article.triggers) {
      const score = scoreTriggerMatch(query, trigger)
      if (score > 0) {
        if (
          best === null ||
          score > best.score ||
          (score === best.score && trigger.length > best.triggerLen)
        ) {
          best = { article, score, triggerLen: trigger.length }
        }
      }
    }
  }
  return best ? best.article : null
}

export function selectErrorArticle(kindOrQuery: string): ErrorArticle {
  const byKind = articles.find((a) => a.kind === kindOrQuery)
  if (byKind) return byKind
  const byQuery = matchArticles(articles, kindOrQuery)
  if (byQuery) return byQuery
  return articles.find((a) => a.isDefault) ?? articles[0]
}
