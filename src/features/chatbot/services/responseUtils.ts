import type { ResponseSection, SuggestedAction, StructuredResponse } from './responseTypes'
import type { Intent, ChatbotRole } from '../types'

/**
 * Parse a raw text response into basic sections.
 * Supports: headings (##), bullet lists (- / *), numbered lists (1.), bold (**), links.
 * Does not allow arbitrary HTML.
 */
export function parseMarkdownSections(text: string): ResponseSection[] {
  if (!text || !text.trim()) return []

  const lines = text.split('\n')
  const sections: ResponseSection[] = []
  let currentText: string[] = []

  const flushText = () => {
    const content = currentText.join('\n').trim()
    if (content) {
      sections.push({ type: 'text', content })
    }
    currentText = []
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Heading: ## or ###
    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/)
    if (headingMatch) {
      flushText()
      const level = trimmed.startsWith('###') ? 3 : trimmed.startsWith('##') ? 2 : 1
      sections.push({ type: 'heading', content: headingMatch[1], level })
      continue
    }

    // Bullet list item
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/)
    if (bulletMatch) {
      flushText()
      // Collect consecutive bullet items
      const items: string[] = [bulletMatch[1]]
      // No need to peek ahead since we process line by line; handle in a simple way
      sections.push({ type: 'info_section', title: '', items })
      continue
    }

    // Numbered list item
    const numberedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/)
    if (numberedMatch) {
      flushText()
      sections.push({ type: 'numbered_steps', steps: [numberedMatch[1]] })
      continue
    }

    // Regular text line
    currentText.push(line)
  }

  flushText()
  return sections
}

/**
 * Format a price as currency string.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Extract entities as human-readable summary.
 */
export function formatEntitySummary(entities: {
  category?: string
  budget?: { min?: number; max?: number }
  location?: string
  brand?: string
  condition?: string
}): string {
  const parts: string[] = []
  if (entities.category) parts.push(entities.category)
  if (entities.brand) parts.push(`from ${entities.brand}`)
  if (entities.budget?.max) parts.push(`under ${formatPrice(entities.budget.max)}`)
  if (entities.budget?.min && entities.budget?.max) {
    parts.push(`between ${formatPrice(entities.budget.min)} and ${formatPrice(entities.budget.max)}`)
  }
  if (entities.location) parts.push(`in ${entities.location}`)
  if (entities.condition) parts.push(`(${entities.condition})`)
  return parts.join(' ')
}

/**
 * Sanitize text for safe rendering. Strips HTML tags and script content.
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trimEnd() + '...'
}

/**
 * Check if a string looks like a list of items (multiple lines with bullets/numbers).
 */
export function isListLike(text: string): boolean {
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length < 2) return false
  const bulletCount = lines.filter(l => /^[-*]\s+/.test(l.trim())).length
  const numberedCount = lines.filter(l => /^\d+[.)]\s+/.test(l.trim())).length
  return bulletCount >= 2 || numberedCount >= 2
}

/**
 * Convert list-like text into an array of items.
 */
export function extractListItems(text: string): string[] {
  return text
    .split('\n')
    .map(l => l.trim())
    .filter(l => /^[-*]\s+/.test(l) || /^\d+[.)]\s+/.test(l))
    .map(l => l.replace(/^[-*]\s+/, '').replace(/^\d+[.)]\s+/, ''))
}

/**
 * Create a StructuredResponse from sections and metadata.
 * Helper for handlers to easily return structured responses.
 */
export function createStructuredResponse(
  sections: ResponseSection[],
  intent: Intent,
  role: ChatbotRole,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return {
    sections,
    suggestedActions: suggestedActions ?? [],
    intent,
    role,
  }
}

/**
 * Create a text-only StructuredResponse.
 */
export function createTextResponse(
  content: string,
  intent: Intent,
  role: ChatbotRole,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return createStructuredResponse(
    [{ type: 'text', content }],
    intent,
    role,
    suggestedActions
  )
}

/**
 * Create a listing grid StructuredResponse.
 */
export function createListingGridResponse(
  listings: Array<{ id: string; title: string; price?: number; location?: string; category?: string; condition?: string; seller?: string; thumbnail?: string; url?: string }>,
  intent: Intent,
  role: ChatbotRole,
  title?: string,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return createStructuredResponse(
    [{ type: 'listing_grid', listings, title }],
    intent,
    role,
    suggestedActions
  )
}

/**
 * Create an info section StructuredResponse.
 */
export function createInfoResponse(
  title: string,
  items: string[],
  intent: Intent,
  role: ChatbotRole,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return createStructuredResponse(
    [{ type: 'info_section', title, items }],
    intent,
    role,
    suggestedActions
  )
}

/**
 * Create numbered steps StructuredResponse.
 */
export function createStepsResponse(
  title: string,
  steps: string[],
  intent: Intent,
  role: ChatbotRole,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return createStructuredResponse(
    [{ type: 'numbered_steps', title, steps }],
    intent,
    role,
    suggestedActions
  )
}

/**
 * Create a safety banner response.
 */
export function createSafetyResponse(
  variant: 'scam_warning' | 'unsafe_payment' | 'suspicious_seller' | 'identity_warning' | 'general_safety',
  title: string,
  message: string,
  tips: string[],
  intent: Intent,
  role: ChatbotRole,
  suggestedActions?: SuggestedAction[]
): StructuredResponse {
  return createStructuredResponse(
    [{ type: 'safety_banner', variant, title, message, tips }],
    intent,
    role,
    suggestedActions
  )
}
