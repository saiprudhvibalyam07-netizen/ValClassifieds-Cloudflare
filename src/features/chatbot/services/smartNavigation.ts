import type { SuggestedAction, ResponseSection } from './responseTypes'
import { selectNavigationArticleByCategory } from '../knowledge/navigation'

type NavCategory =
  | 'post_listing'
  | 'messages'
  | 'favorites'
  | 'my_listings'
  | 'profile'
  | 'safety'
  | 'search'
  | 'categories'
  | 'help'
  | 'home'

interface NavTrigger {
  category: NavCategory
  patterns: RegExp[]
}

const NAV_TRIGGERS: NavTrigger[] = [
  {
    category: 'post_listing',
    patterns: [
      /\bpost(ing)?\s+(a\s+)?listing\b/i,
      /\bcreate\s+(a\s+)?listing\b/i,
      /\blist\s+(an?\s+)?item\b/i,
      /\bsell\s+(my\s+)?(item|phone|car|bike|product)\b/i,
      /\bhow\s+to\s+(list|post|sell)\b/i,
    ],
  },
  {
    category: 'messages',
    patterns: [
      /\bopen\s+(my\s+)?messages?\b/i,
      /\b(check|view)\s+(my\s+)?messages?\b/i,
      /\bcontact\s+(the\s+)?seller\b/i,
      /\bmy\s+inbox\b/i,
      /\bgo\s+to\s+(my\s+)?messages?\b/i,
    ],
  },
  {
    category: 'favorites',
    patterns: [
      /\bview\s+(my\s+)?favou?rites?\b/i,
      /\b(my\s+)?saved?\s+(items?|listings?)\b/i,
      /\b(my\s+)?wishlist\b/i,
    ],
  },
  {
    category: 'my_listings',
    patterns: [
      /\bmy\s+listings?\b/i,
      /\bmy\s+ads?\b/i,
      /\bmy\s+items?\b/i,
      /\bmanage\s+(my\s+)?(listings?|ads?|items?)\b/i,
      /\bview\s+(my\s+)?listings?\b/i,
    ],
  },
  {
    category: 'profile',
    patterns: [
      /\bmy\s+profile\b/i,
      /\baccount\s+settings\b/i,
      /\bprofile\s+settings\b/i,
      /\bupdate\s+(my\s+)?profile\b/i,
      /\bgo\s+to\s+(my\s+)?profile\b/i,
    ],
  },
  {
    category: 'safety',
    patterns: [
      /\bsafety\s+(tips|guide)\b/i,
      /\bhow\s+to\s+stay\s+safe\b/i,
      /\bscam\s+guide\b/i,
    ],
  },
  {
    category: 'search',
    patterns: [
      /\bgo\s+to\s+search\b/i,
      /\bopen\s+search\b/i,
    ],
  },
  {
    category: 'categories',
    patterns: [
      /\bbrowse\s+categor(y|ies)\b/i,
      /\bexplore\s+categor(y|ies)\b/i,
    ],
  },
  {
    category: 'help',
    patterns: [
      /\bhelp\s+centre\b/i,
      /\bhelp\s+center\b/i,
      /\bwhere\s+is\s+(the\s+)?help\b/i,
    ],
  },
  {
    category: 'home',
    patterns: [
      /\bgo\s+to\s+(the\s+)?home\s+page\b/i,
      /\bback\s+to\s+home\b/i,
      /\bopen\s+home\b/i,
    ],
  },
]

function detectCategory(text: string): NavCategory | null {
  for (const trigger of NAV_TRIGGERS) {
    if (trigger.patterns.some((p) => p.test(text))) {
      return trigger.category
    }
  }
  return null
}

export function getNavigationActions(
  responseText: string,
  existingActions: SuggestedAction[] = []
): SuggestedAction[] {
  const category = detectCategory(responseText)
  if (!category) return []

  const article = selectNavigationArticleByCategory(category)
  const existingLabels = new Set(existingActions.map((a) => a.label))
  return article.actions.filter((a) => !existingLabels.has(a.label)).slice(0, 3)
}

export function getNavigationGuidance(responseText: string): ResponseSection[] {
  const category = detectCategory(responseText)
  if (!category) return []
  return selectNavigationArticleByCategory(category).response
}

export function enrichWithNavigation(
  sections: Array<{ type: string; content?: string }>,
  existingActions: SuggestedAction[] = []
): SuggestedAction[] {
  const fullText = sections
    .map((s) => ('content' in s ? String(s.content ?? '') : ''))
    .join(' ')

  return getNavigationActions(fullText, existingActions)
}
