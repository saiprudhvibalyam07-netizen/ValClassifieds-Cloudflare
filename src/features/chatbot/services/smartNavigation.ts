import type { SuggestedAction } from './responseTypes'

interface NavTrigger {
  patterns: RegExp[]
  actions: SuggestedAction[]
}

const NAV_TRIGGERS: NavTrigger[] = [
  {
    patterns: [
      /\bpost(ing)?\s+(a\s+)?listing\b/i,
      /\bcreate\s+(a\s+)?listing\b/i,
      /\blist\s+(an?\s+)?item\b/i,
      /\bsell\s+(my\s+)?(item|phone|car|bike|product)\b/i,
      /\bhow\s+to\s+(list|post|sell)\b/i,
    ],
    actions: [
      { label: 'Post a Listing', value: 'post listing' },
    ],
  },
  {
    patterns: [
      /\bmessages?\b/i,
      /\b(open|check|view)\s+(my\s+)?messages?\b/i,
      /\bcontact\s+(the\s+)?seller\b/i,
      /\bchat\b/i,
      /\bsend\s+(a\s+)?message\b/i,
      /\binbox\b/i,
    ],
    actions: [
      { label: 'Open Messages', value: 'open messages' },
    ],
  },
  {
    patterns: [
      /\bfavou?rites?\b/i,
      /\bsaved?\s+(items?|listings?)\b/i,
      /\b(bookmark|wishlist)\b/i,
      /\bsave\s+(this|the)\s+listing\b/i,
    ],
    actions: [
      { label: 'View Favorites', value: 'view favorites' },
    ],
  },
  {
    patterns: [
      /\bmy\s+listings?\b/i,
      /\bmy\s+ads?\b/i,
      /\bmy\s+items?\b/i,
      /\bmanage\s+(my\s+)?(listings?|ads?|items?)\b/i,
      /\bview\s+(my\s+)?listings?\b/i,
    ],
    actions: [
      { label: 'My Listings', value: 'my listings' },
    ],
  },
  {
    patterns: [
      /\bprofile\b/i,
      /\bmy\s+profile\b/i,
      /\baccount\s+settings\b/i,
      /\bsettings\b/i,
      /\bupdate\s+(my\s+)?profile\b/i,
    ],
    actions: [
      { label: 'Profile', value: 'profile' },
      { label: 'Account Settings', value: 'account settings' },
    ],
  },
  {
    patterns: [
      /\bsafety\b/i,
      /\bscam\b/i,
      /\b(how\s+to\s+)?stay\s+safe\b/i,
      /\breport\b/i,
    ],
    actions: [
      { label: 'Safety Guide', value: 'safety tips' },
    ],
  },
  {
    patterns: [
      /\bsearch\b/i,
      /\bfind\b/i,
      /\bbrowse\b/i,
      /\blooking\s+for\b/i,
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
    ],
  },
  {
    patterns: [
      /\bcategor(y|ies)\b/i,
      /\bexplore\b/i,
    ],
    actions: [
      { label: 'Browse Categories', value: 'show categories' },
    ],
  },
]

export function getNavigationActions(
  responseText: string,
  existingActions: SuggestedAction[] = []
): SuggestedAction[] {
  const existingLabels = new Set(existingActions.map(a => a.label))
  const extras: SuggestedAction[] = []

  for (const trigger of NAV_TRIGGERS) {
    if (trigger.patterns.some(p => p.test(responseText))) {
      for (const action of trigger.actions) {
        if (!existingLabels.has(action.label) && !extras.some(e => e.label === action.label)) {
          extras.push(action)
        }
      }
    }
  }

  return extras.slice(0, 3)
}

export function enrichWithNavigation(
  sections: Array<{ type: string; content?: string }>,
  existingActions: SuggestedAction[] = []
): SuggestedAction[] {
  const fullText = sections
    .map(s => ('content' in s ? String(s.content ?? '') : ''))
    .join(' ')

  return getNavigationActions(fullText, existingActions)
}
