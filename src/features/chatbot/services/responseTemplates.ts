import type { Intent, ChatbotRole } from '../types'
import type { SuggestedAction, ResponseSection, SafetyVariant } from './responseTypes'

// ─── Suggested Actions by Role ─────────────────────────────────────────────────

export const BUYER_ACTIONS: SuggestedAction[] = [
  { label: 'Search Phones', value: 'search phones' },
  { label: 'Browse Categories', value: 'show categories' },
  { label: 'Buying Tips', value: 'buying tips' },
  { label: 'Safety Guide', value: 'is it safe to buy' },
]

export const SELLER_ACTIONS: SuggestedAction[] = [
  { label: 'Create Listing', value: 'how to list' },
  { label: 'Improve Photos', value: 'photo tips' },
  { label: 'Pricing Guide', value: 'pricing help' },
  { label: 'View Listings', value: 'my listings' },
]

export const ADMIN_ACTIONS: SuggestedAction[] = [
  { label: 'System Health', value: 'system status' },
  { label: 'Recent Activity', value: 'recent activity' },
  { label: 'Pending Reports', value: 'pending reports' },
]

export const VISITOR_ACTIONS: SuggestedAction[] = [
  { label: 'Search Listings', value: 'search' },
  { label: 'Browse Categories', value: 'show categories' },
  { label: 'How to Buy', value: 'how to buy' },
  { label: 'Safety Tips', value: 'safety tips' },
]

// ─── Role-specific Action Maps ─────────────────────────────────────────────────

export const ROLE_ACTIONS: Record<ChatbotRole, SuggestedAction[]> = {
  visitor: VISITOR_ACTIONS,
  buyer: BUYER_ACTIONS,
  seller: SELLER_ACTIONS,
  admin: ADMIN_ACTIONS,
}

// ─── Intent-specific Suggested Actions ─────────────────────────────────────────

export const INTENT_ACTIONS: Partial<Record<Intent, SuggestedAction[]>> = {
  GREETING: [],
  SEARCH_LISTINGS: [
    { label: 'Refine Search', value: 'refine search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
  BROWSE_CATEGORIES: [
    { label: 'Search Specific', value: 'search' },
    { label: 'Popular Items', value: 'popular items' },
  ],
  LISTING_DETAILS: [
    { label: 'Contact Seller', value: 'contact seller' },
    { label: 'Similar Items', value: 'similar items' },
    { label: 'Safety Tips', value: 'safety tips' },
  ],
  BUYING_HELP: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Compare Items', value: 'compare' },
    { label: 'Contact Seller', value: 'contact seller' },
    { label: 'Safety Guide', value: 'safety tips' },
  ],
  SELLING_HELP: [
    { label: 'Post a Listing', value: 'post listing' },
    { label: 'Pricing Guide', value: 'pricing help' },
    { label: 'Photo Tips', value: 'photo tips' },
    { label: 'View My Listings', value: 'my listings' },
  ],
  LISTING_ADVICE: [
    { label: 'Photo Tips', value: 'photo tips' },
    { label: 'Pricing Help', value: 'pricing help' },
    { label: 'Post a Listing', value: 'post listing' },
  ],
  PRICING_HELP: [
    { label: 'Browse Similar', value: 'similar items' },
    { label: 'Listing Tips', value: 'listing tips' },
  ],
  SAFETY: [
    { label: 'Safety Guide', value: 'safety tips' },
    { label: 'Scam Awareness', value: 'scam warning' },
    { label: 'Report User', value: 'report' },
    { label: 'Contact Support', value: 'contact support' },
  ],
  CONTACT_SELLER: [
    { label: 'Open Messages', value: 'open messages' },
    { label: 'Safety Tips', value: 'safety tips' },
    { label: 'Report Seller', value: 'report seller' },
  ],
  PLATFORM_HELP: [
    { label: 'Contact Support', value: 'contact support' },
    { label: 'FAQ', value: 'frequently asked questions' },
    { label: 'Post a Listing', value: 'post listing' },
  ],
  ACCOUNT_HELP: [
    { label: 'My Profile', value: 'profile' },
    { label: 'My Listings', value: 'my listings' },
    { label: 'Account Settings', value: 'account settings' },
    { label: 'Contact Support', value: 'contact support' },
  ],
  COMPARISON: [
    { label: 'Refine Search', value: 'refine search' },
    { label: 'Buying Tips', value: 'buying tips' },
  ],
  RECOMMENDATION: [
    { label: 'View Listing', value: 'view listing' },
    { label: 'Search More', value: 'search' },
  ],
  SMALL_TALK: [],
  FAREWELL: [
    { label: 'Start New Chat', value: 'hello' },
    { label: 'Browse Listings', value: 'search' },
  ],
  THANK_YOU: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
  LISTING_MANAGEMENT: [
    { label: 'Post a Listing', value: 'how to list' },
    { label: 'View My Listings', value: 'my listings' },
  ],
  OFF_TOPIC: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
  NAVIGATION: [
    { label: 'Open Messages', value: 'open messages' },
    { label: 'View Favorites', value: 'view favorites' },
    { label: 'My Profile', value: 'profile' },
  ],
  ADMIN_ACTION: ADMIN_ACTIONS,
  OFFENSIVE: [],
  UNSUPPORTED: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
  UNKNOWN: [
    { label: 'Search Listings', value: 'search' },
    { label: 'Browse Categories', value: 'show categories' },
  ],
}

// ─── Safety Templates ──────────────────────────────────────────────────────────

export interface SafetyTemplate {
  variant: SafetyVariant
  title: string
  message: string
  tips: string[]
}

export const SAFETY_TEMPLATES: Record<string, SafetyTemplate> = {
  scam: {
    variant: 'scam_warning',
    title: 'Scam Alert',
    message: 'Never share OTPs, UPI PINs, or bank details with anyone.',
    tips: [
      'Never share OTPs, UPI PINs, or bank details',
      'ValClassifieds will never ask for payment outside the platform',
      'Report suspicious messages immediately',
      'Verify seller identity before transacting',
    ],
  },
  otp: {
    variant: 'identity_warning',
    title: 'Identity Protection',
    message: 'Never share sensitive personal information with other users.',
    tips: [
      'Never share OTPs or verification codes',
      'Never share UPI PINs or bank passwords',
      'Keep your login credentials private',
      'Enable two-factor authentication if available',
    ],
  },
  payment: {
    variant: 'unsafe_payment',
    title: 'Unsafe Payment Warning',
    message: 'Complete all payments through the ValClassifieds platform.',
    tips: [
      'Use platform-integrated payment methods only',
      'Never transfer money directly to unknown sellers',
      'Escrow services protect both buyers and sellers',
      'Keep payment receipts for your records',
    ],
  },
  fake: {
    variant: 'suspicious_seller',
    title: 'Suspicious Listing Alert',
    message: 'Verify listing authenticity before making any payment.',
    tips: [
      'Check seller ratings and reviews',
      'Verify photos are genuine (reverse image search)',
      'Compare prices with similar listings',
      'Meet in public places for item inspection',
    ],
  },
  general: {
    variant: 'general_safety',
    title: 'Safety Tips',
    message: 'Follow these guidelines for a safe marketplace experience.',
    tips: [
      'Meet in public, well-lit places',
      'Verify items before paying',
      'Communicate through the platform',
      'Never share personal financial details',
    ],
  },
}

// ─── Intent to Section Builder ─────────────────────────────────────────────────

export function getSectionsForIntent(
  intent: Intent,
  rawContent: string,
  _role: ChatbotRole
): ResponseSection[] {
  const sections: ResponseSection[] = []

  switch (intent) {
    case 'GREETING':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'SEARCH_LISTINGS':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'BROWSE_CATEGORIES':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'LISTING_DETAILS':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'BUYING_HELP':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'SELLING_HELP':
    case 'LISTING_ADVICE':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'PRICING_HELP':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'SAFETY': {
      const lower = rawContent.toLowerCase()
      let templateKey = 'general'
      if (lower.includes('scam') || lower.includes('otp') || lower.includes('upi')) {
        templateKey = 'scam'
      } else if (lower.includes('fake') || lower.includes('fraud')) {
        templateKey = 'fake'
      } else if (lower.includes('payment') || lower.includes('pay')) {
        templateKey = 'payment'
      }
      const template = SAFETY_TEMPLATES[templateKey]
      sections.push({
        type: 'safety_banner',
        variant: template.variant,
        title: template.title,
        message: template.message,
        tips: template.tips,
      })
      break
    }

    case 'CONTACT_SELLER':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'PLATFORM_HELP':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'ACCOUNT_HELP':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'COMPARISON':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'RECOMMENDATION':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'SMALL_TALK':
    case 'FAREWELL':
    case 'THANK_YOU':
    case 'LISTING_MANAGEMENT':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'OFF_TOPIC':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'ADMIN_ACTION':
      sections.push({ type: 'text', content: rawContent })
      break

    case 'OFFENSIVE':
    case 'UNSUPPORTED':
    case 'UNKNOWN':
      sections.push({ type: 'text', content: rawContent })
      break

    default:
      sections.push({ type: 'text', content: rawContent })
  }

  return sections
}
