import type { Intent, ChatbotRole } from '../types'

// ─── Response Section Types ────────────────────────────────────────────────────

export type ResponseSectionType =
  | 'text'
  | 'heading'
  | 'subheading'
  | 'listing_card'
  | 'listing_grid'
  | 'comparison_table'
  | 'safety_banner'
  | 'suggested_actions'
  | 'empty_state'
  | 'info_section'
  | 'numbered_steps'
  | 'warning'
  | 'success'
  | 'error'

export type EmptyStateVariant =
  | 'no_results'
  | 'cleared'
  | 'offline'
  | 'timeout'
  | 'unauthorized'
  | 'server_error'
  | 'no_permissions'

export type SafetyVariant =
  | 'scam_warning'
  | 'unsafe_payment'
  | 'suspicious_seller'
  | 'identity_warning'
  | 'general_safety'

export type SuccessVariant =
  | 'conversation_cleared'
  | 'listing_created'
  | 'search_complete'
  | 'profile_updated'

// ─── Response Section Interfaces ───────────────────────────────────────────────

export interface TextSection {
  type: 'text'
  content: string
}

export interface HeadingSection {
  type: 'heading'
  content: string
  level?: 1 | 2 | 3
}

export interface SubheadingSection {
  type: 'subheading'
  content: string
}

export interface ListingData {
  id: string
  title: string
  price?: number
  location?: string
  category?: string
  condition?: string
  seller?: string
  thumbnail?: string
  url?: string
}

export interface ListingCardSection {
  type: 'listing_card'
  listing: ListingData
}

export interface ListingGridSection {
  type: 'listing_grid'
  listings: ListingData[]
  title?: string
}

export interface ComparisonRow {
  label: string
  values: string[]
}

export interface ComparisonTableSection {
  type: 'comparison_table'
  headers: string[]
  rows: ComparisonRow[]
  title?: string
}

export interface SafetyBannerSection {
  type: 'safety_banner'
  variant: SafetyVariant
  title: string
  message: string
  tips?: string[]
}

export interface SuggestedAction {
  label: string
  value: string
  icon?: string
}

export interface SuggestedActionsSection {
  type: 'suggested_actions'
  actions: SuggestedAction[]
  title?: string
}

export interface EmptyStateSection {
  type: 'empty_state'
  variant: EmptyStateVariant
  title: string
  description: string
  action?: SuggestedAction
}

export interface InfoSection {
  type: 'info_section'
  title: string
  items: string[]
}

export interface NumberedStepsSection {
  type: 'numbered_steps'
  title?: string
  steps: string[]
}

export interface WarningSection {
  type: 'warning'
  content: string
}

export interface SuccessSection {
  type: 'success'
  variant: SuccessVariant
  message: string
}

export interface ErrorSection {
  type: 'error'
  message: string
  retry?: SuggestedAction
}

// ─── Union Type ────────────────────────────────────────────────────────────────

export type ResponseSection =
  | TextSection
  | HeadingSection
  | SubheadingSection
  | ListingCardSection
  | ListingGridSection
  | ComparisonTableSection
  | SafetyBannerSection
  | SuggestedActionsSection
  | EmptyStateSection
  | InfoSection
  | NumberedStepsSection
  | WarningSection
  | SuccessSection
  | ErrorSection

// ─── Structured Response ──────────────────────────────────────────────────────

export interface StructuredResponse {
  sections: ResponseSection[]
  suggestedActions?: SuggestedAction[]
  intent: Intent
  role: ChatbotRole
}

// ─── Handler Return Type (enriched) ───────────────────────────────────────────

export interface EnrichedHandlerResult {
  content: string
  structured: StructuredResponse
}
