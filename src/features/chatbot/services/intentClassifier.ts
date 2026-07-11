import type { Intent, IntentClassification, MarketplaceEntities } from '../types'
import { matchCategory } from './canonicalCategories'
import { getCategoryFlow } from './categoryFlows'

interface IntentPattern {
  intent: Intent
  keywords: RegExp[]
  phrases: RegExp[]
  confidence: number
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'GREETING',
    keywords: [],
    phrases: [
      /^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|greetings|yo|sup)\b/i,
      /^(what'?s?\s*up|how\s*are\s*you|how\s*doing)/i,
    ],
    confidence: 0.95,
  },
  {
    intent: 'FAREWELL',
    keywords: [/bye/i, /goodbye/i, /see\s*you/i, /farewell/i, /later/i],
    phrases: [
      /^(bye|goodbye|see\s+you|take\s+care|farewell|gotta\s+go|i'm?\s*(out|leaving|done))\s*[!.?]*$/i,
      /^(see\s+you\s+(later|soon|around))/i,
      /^(have\s+a\s+(good|great|nice)\s+(day|one))/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'THANK_YOU',
    keywords: [/thanks/i, /thank/i, /appreciate/i, /grateful/i],
    phrases: [
      /^(thanks|thank\s+you|thank\s+you\s+so\s+much|thanks\s+a\s+lot|much\s+appreciated|appreciate\s+(it|that|the\s+help))\s*[!.?]*$/i,
      /^(that'?s?\s+(helpful|great|perfect|what\s+i\s+needed))/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'SEARCH_LISTINGS',
    keywords: [
      /find/i, /search/i, /looking\s*for/i, /need/i,
      /available/i, /sell/i, /selling/i,
    ],
    phrases: [
      /find\s+(?!on\b|in\b|at\b|the\b|a\b|an\b|some\b|my\b|your\b)\w+/i,
      /search\s+(for\s+)?/i,
      /looking\s+for\s+/i,
      /show\s+me\s+\w+/i,
      /any\s+\w+\s+(available|selling|for\s+sale)/i,
      /do\s+you\s+have\s+\w+/i,
      /buy\s+(a|an|some|the)\s+\w+/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'BROWSE_CATEGORIES',
    keywords: [/category/i, /categories/i, /browse/i, /explore/i, /list/i],
    phrases: [
      /what\s+categories/i,
      /browse\s+categories/i,
      /show\s+categories/i,
      /list\s+of\s+categories/i,
      /what\s+can\s+i\s+(find|buy|browse)/i,
      /what\s+do\s+you\s+have/i,
      /explore/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'LISTING_DETAILS',
    keywords: [/detail/i, /details/i, /info/i, /information/i, /about/i],
    phrases: [
      /tell\s+me\s+about/i,
      /details?\s+(for|about|of)/i,
      /what\s+(can\s+you\s+)?tell\s+me\s+about/i,
      /more\s+(info|information|details)/i,
      /listing\s*(id|#|\d+)/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'BUYING_HELP',
    keywords: [/buy/i, /buyer/i, /purchase/i, /pay/i, /payment/i, /order/i],
    phrases: [
      /how\s+(do\s+i|can\s+i)\s+buy/i,
      /how\s+to\s+buy/i,
      /buying\s+(process|guide|help|on)/i,
      /purchase\s+(process|guide|help)/i,
      /how\s+does\s+(buying|purchase|payment)/i,
      /what\s+is\s+the\s+buying/i,
      /payment\s+(method|option|process)/i,
      /safe\s+to\s+buy/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'SELLING_HELP',
    keywords: [
      /sell/i, /seller/i, /post/i, /listing/i, /advertise/i,
      /add\s+(a\s+)?(listing|list|ad)/i,
      /create\s+(a\s+)?(listing|ad)/i,
      /publish\s+(a\s+)?listing/i,
      /list\s+my/i,
    ],
    phrases: [
      /how\s+(do\s+i|can\s+i)\s+sell/i,
      /how\s+to\s+sell/i,
      /selling\s+(process|guide|help|on)/i,
      /post\s+(a\s+)?(listing|ad)/i,
      /create\s+(a\s+)?(listing|list|ad)/i,
      /how\s+to\s+post/i,
      /list\s+(my\s+)?(\w+\s+)?(item|phone|bike|car|product|something)/i,
      /sell\s+my/i,
      /sell\s+something/i,
      /add\s+(a\s+)?(listing|list|ad)/i,
      /add\s+listings?/i,
      /publish\s+(a\s+)?listing/i,
      /create\s+ads?/i,
      /where\s+(do|can)\s+i\s+(add|post|list|create)\s+my/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'LISTING_ADVICE',
    keywords: [/advice/i, /tip/i, /tips/i, /suggest/i, /improve/i, /better/i],
    phrases: [
      /how\s+to\s+(write|create|make|improve)/i,
      /tips?\s+for\s+(selling|listing|posting)/i,
      /advice\s+for\s+(selling|listing|posting)/i,
      /how\s+to\s+attract\s+buyers/i,
      /make\s+(my\s+)?listing\s+better/i,
      /improve\s+(my\s+)?listing/i,
    ],
    confidence: 0.8,
  },
  {
    intent: 'PRICING_HELP',
    keywords: [/price/i, /pricing/i, /cost/i, /worth/i, /value/i, /how\s+much/i, /rate/i],
    phrases: [
      /how\s+much\s+(should\s+)?(i\s+)?(charge|price|ask)/i,
      /what\s+(is|should\s+be)\s+the\s+price/i,
      /fair\s+price/i,
      /right\s+price/i,
      /price\s+(guide|suggestion|advice|help|check)/i,
      /estimate\s+(price|value|worth)/i,
      /is\s+it\s+(worth|priced)/i,
      /overpriced|underpriced/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'SAFETY',
    keywords: [/safe/i, /safety/i, /scam/i, /fraud/i, /secure/i, /trust/i],
    phrases: [
      /is\s+it\s+safe/i,
      /safety\s+(tips?|guide|advice|concern)/i,
      /how\s+to\s+stay\s+safe/i,
      /avoid\s+scam/i,
      /prevent\s+fraud/i,
      /is\s+this\s+(a\s+)?scam/i,
      /trust\s+(this|seller)/i,
      /payment\s+safety/i,
      /otp\s+scam/i,
      /upi\s+scam/i,
      /bank\s+transfer\s+risk/i,
      /fake\s+(seller|listing)/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'CONTACT_SELLER',
    keywords: [/contact/i, /reach/i, /message/i, /call/i, /phone/i, /seller/i, /talk/i],
    phrases: [
      /how\s+(do\s+i|can\s+i)\s+(contact|reach|message)/i,
      /contact\s+(the\s+)?seller/i,
      /talk\s+to\s+(the\s+)?seller/i,
      /message\s+(the\s+)?seller/i,
      /phone\s+number/i,
      /seller\s+(contact|info|detail)/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'PLATFORM_HELP',
    keywords: [/platform/i, /website/i, /app/i, /feature/i, /how\s+does/i, /work/i],
    phrases: [
      /how\s+(does|do)\s+(this|it|the\s+platform)/i,
      /how\s+to\s+use/i,
      /platform\s+(help|guide|feature|work)/i,
      /what\s+can\s+(i|you)\s+do/i,
      /feature/i,
      /account\s+(setup|create|delete|manage)/i,
      /settings/i,
      /what\s+(are|is)\s+the\s+(fees?|cost|charge|price)/i,
      /how\s+much\s+(does|do)\s+(it|this)\s+cost/i,
      /is\s+it\s+free/i,
    ],
    confidence: 0.8,
  },
  {
    intent: 'ACCOUNT_HELP',
    keywords: [/account/i, /profile/i, /password/i, /login/i, /signup/i, /register/i, /sign\s*in/i],
    phrases: [
      /how\s+to\s+(create|make|set\s*up)\s+(an?\s+)?account/i,
      /forgot\s+(my\s+)?password/i,
      /reset\s+password/i,
      /login\s+(issue|problem|help)/i,
      /sign\s*(in|up)\s+(issue|problem|help)/i,
      /delete\s+(my\s+)?account/i,
      /edit\s+(my\s+)?profile/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'LISTING_MANAGEMENT',
    keywords: [/my\s+listing/i, /my\s+ad/i, /my\s+item/i, /edit/i, /delete\s+listing/i, /remove\s+listing/i, /update\s+listing/i],
    phrases: [
      /how\s+(do\s+i|can\s+i)\s+(edit|update|change|delete|remove)\s+(my\s+)?listing/i,
      /my\s+listings?/i,
      /view\s+(my\s+)?listings?/i,
      /manage\s+(my\s+)?listings?/i,
      /where\s+(are|can\s+i\s+find)\s+my\s+listings/i,
      /delete\s+(my\s+)?(listing|ad|item)/i,
      /edit\s+(my\s+)?(listing|ad|item)/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'COMPARISON',
    keywords: [/compare/i, /vs/i, /versus/i, /difference/i, /better/i, /best/i],
    phrases: [
      /compare\s+/i,
      /what\s+(is\s+)?the\s+difference/i,
      /which\s+is\s+better/i,
      /best\s+\w+\s+(under|below|around)/i,
      /vs\.?|versus/i,
    ],
    confidence: 0.8,
  },
  {
    intent: 'RECOMMENDATION',
    keywords: [/recommend/i, /suggest/i, /advice/i, /what\s+should/i, /best/i],
    phrases: [
      /recommend\s+(a|me|some)/i,
      /what\s+should\s+i\s+(buy|look|get)/i,
      /suggest\s+(a|me|some)/i,
      /best\s+(option|choice|pick)/i,
      /what\s+do\s+you\s+recommend/i,
    ],
    confidence: 0.8,
  },
  {
    intent: 'UNSUPPORTED',
    keywords: [],
    phrases: [
      /\b(write|compose|create)\s+(me\s+)?(a\s+)?(poem|song|story|essay|article)\b/i,
      /\b(what\s+is\s+the\s+meaning\s+of\s+life)\b/i,
      /\b(tell\s+me\s+a\s+joke)\b/i,
      /\b(sing|dance|draw|paint)\b/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'SMALL_TALK',
    keywords: [],
    phrases: [
      /^(ok|okay|sure|cool|nice|great|awesome|alright|fine)\s*[!.?]*$/i,
      /^(how'?s?\s+it\s+going|what'?s?\s+new|how'?s?\s+life|how'?s?\s+everything)/i,
      /^(lol|haha|hehe|rofl|lmao|funny)/i,
      /^(that'?s?\s+(good|great|nice|awesome|cool))/i,
      /^(i'?m?\s+(good|fine|great|ok|doing\s+well))/i,
    ],
    confidence: 0.7,
  },
  {
    intent: 'OFF_TOPIC',
    keywords: [
      /python|javascript|java|c\+\+|coding|programming|code/i,
      /cricket|football|soccer|tennis|ipl|premier\s+league/i,
      /movie|film|song|music|celebrity|actor|actress/i,
      /politics|election|government|party|minister/i,
      /homework|assignment|exam|test|study|school|college/i,
      /weather|temperature|forecast/i,
      /recipe|cooking|food|diet/i,
      /news|current\s+affairs/i,
      /stock|investment|crypto|bitcoin|share\s+market/i,
      /history|geography|science|math|physics|chemistry|biology/i,
    ],
    phrases: [
      /who\s+(won|lost|is|are)\s+(the\s+)?(cricket|football|match|game|election)/i,
      /write\s+(a\s+)?(python|javascript|code|program|function)/i,
      /what\s+is\s+the\s+(capital|population|area|currency|president)/i,
      /how\s+(do\s+i|to)\s+(cook|bake|prepare|make\s+food)/i,
      /what\s+is\s+the\s+(meaning|definition|formula|theory)/i,
      /(cricket|football)\s+(score|match|result|team|player)/i,
      /tell\s+me\s+(a\s+)?(joke|story|poem|riddle)/i,
    ],
    confidence: 0.9,
  },
  {
    intent: 'ADMIN_ACTION',
    keywords: [/admin/i, /moderate/i, /moderation/i, /ban/i, /remove/i, /delete/i],
    phrases: [
      /admin\s+(panel|dashboard|action|task)/i,
      /moderate\s+(listing|user|content)/i,
      /system\s+(status|health|check)/i,
      /platform\s+(status|analytics|metric)/i,
    ],
    confidence: 0.85,
  },
  {
    intent: 'OFFENSIVE',
    keywords: [],
    phrases: [
      /\b(idiot|stupid|dumb|moron|ass|damn|hell|crap)\b/i,
      /\b(fuck|shit|bitch|ass|dick)\b/i,
      /\b(hate|kill|die|death|threat)\b/i,
    ],
    confidence: 0.9,
  },
]

function extractBudget(text: string): { min?: number; max?: number } | undefined {
  const underMatch = text.match(/(?:under|below|less\s+than|within|upto|up\s+to)\s*(?:rs\.?|inr|₹)?\s*(\d[\d,]*)/i)
  if (underMatch) {
    const val = parseInt(underMatch[1].replace(/,/g, ''), 10)
    if (!isNaN(val) && val > 0) return { max: val }
  }

  const aboveMatch = text.match(/(?:above|over|more\s+than|greater\s+than)\s*(?:rs\.?|inr|₹)?\s*(\d[\d,]*)/i)
  if (aboveMatch) {
    const val = parseInt(aboveMatch[1].replace(/,/g, ''), 10)
    if (!isNaN(val) && val > 0) return { min: val }
  }

  const rangeMatch = text.match(/(?:rs\.?|inr|₹)?\s*(\d[\d,]*)\s*(?:to|-)\s*(?:rs\.?|inr|₹)?\s*(\d[\d,]*)/i)
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1].replace(/,/g, ''), 10)
    const max = parseInt(rangeMatch[2].replace(/,/g, ''), 10)
    if (!isNaN(min) && !isNaN(max) && min > 0 && max > 0) return { min, max }
  }

  const standaloneMatch = text.match(/(?:rs\.?|inr|₹)\s*(\d[\d,]*)/i)
  if (standaloneMatch) {
    const val = parseInt(standaloneMatch[1].replace(/,/g, ''), 10)
    if (!isNaN(val) && val > 0) return { max: val }
  }

  return undefined
}

function extractCategory(text: string): string | undefined {
  // Delegate to canonicalCategories.ts (SINGLE SOURCE OF TRUTH) so we never
  // maintain a duplicate category mapping inside the intent classifier.
  // matchCategory returns the canonical category slug (e.g. "vehicles"),
  // which is exactly what marketplaceSearch.searchListings filters by.
  return matchCategory(text)
}

function extractLocation(text: string): string | undefined {
  const patterns = [
    /(?:in|at|near|from|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
    /(?:in|at|near|from|around)\s+([a-z]+(?:\s+[a-z]+)*)/g,
  ]

  const locationStopWords = new Set([
    'the', 'a', 'an', 'this', 'that', 'it', 'my', 'your', 'his', 'her',
    'what', 'which', 'where', 'how', 'when', 'why', 'who',
    'buy', 'sell', 'find', 'search', 'show', 'get', 'need', 'want',
    'price', 'cost', 'cheap', 'expensive', 'good', 'best', 'new', 'used',
    'please', 'help', 'can', 'could', 'would', 'should', 'will',
    'phone', 'laptop', 'bike', 'car', 'book', 'camera', 'shoes',
    'under', 'above', 'between', 'with', 'for', 'about',
  ])

  for (const pattern of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags)
    let match
    while ((match = regex.exec(text)) !== null) {
      const loc = match[1].trim()
      const words = loc.split(/\s+/)
      const filtered = words.filter(w => !locationStopWords.has(w.toLowerCase()))
      if (filtered.length > 0 && filtered.join('').length >= 3) {
        const capitalized = filtered.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
        if (capitalized.length >= 3) return capitalized
      }
    }
  }

  return undefined
}

function extractBrand(text: string): string | undefined {
  const brands = [
    'apple', 'samsung', 'sony', 'lg', 'oneplus', 'xiaomi', 'redmi', 'realme',
    'vivo', 'oppo', 'nokia', 'motorola', 'google', 'pixel',
    'dell', 'hp', 'lenovo', 'asus', 'acer', 'msi', 'macbook',
    'toyota', 'honda', 'hyundai', 'maruti', 'suzuki', 'tata', 'mahindra', 'bmw', 'mercedes',
    'nike', 'adidas', 'puma', 'reebok',
    'canon', 'nikon', 'sony', 'gopro', 'dji',
    'ikea', 'godrej', 'pepperfry',
  ]

  const normalized = text.toLowerCase()
  for (const brand of brands) {
    if (normalized.includes(brand)) return brand.charAt(0).toUpperCase() + brand.slice(1)
  }
  return undefined
}

function extractCondition(text: string): string | undefined {
  const conditions: [RegExp, string][] = [
    [/\b(new|brand\s*new|sealed|unopened|mint)\b/i, 'new'],
    [/\b(used|pre[\s-]?owned|second\s*hand|old)\b/i, 'used'],
    [/\b(refurbished|renewed|restored)\b/i, 'refurbished'],
    [/\b(broken|damaged|faulty|not\s*working)\b/i, 'damaged'],
  ]

  for (const [pattern, condition] of conditions) {
    if (pattern.test(text)) return condition
  }
  return undefined
}

function extractQuery(text: string): string | undefined {
  const cleaned = text
    .replace(/\b(find|search|looking\s+for|show\s+me|get\s+me|want\s+to\s+buy|need|buy|purchase|available|sell|selling)\b/gi, '')
    .replace(/\b(under|below|over|above|less\s+than|more\s+than|within|upto|up\s+to)\b/gi, '')
    .replace(/\b(in|at|near|from|around)\b/gi, '')
    .replace(/\b(new|used|refurbished|cheap|best|good|great)\b/gi, '')
    .replace(/(?:rs\.?|inr|₹)\s*\d[\d,]*/gi, '')
    .replace(/\d[\d,]*/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return cleaned.length >= 2 ? cleaned : undefined
}

function extractListingId(text: string): string | undefined {
  const match = text.match(/(?:listing|item|ad)\s+(?:id\s*)?(?:#?\s*)?([A-Z0-9]{6,})/i)
  if (match) return match[1]
  const match2 = text.match(/(?:id|#)\s*[:=]?\s*([A-Z0-9]{6,})/i)
  return match2 ? match2[1] : undefined
}

function extractEntities(text: string): MarketplaceEntities {
  const entities: MarketplaceEntities = {}

  const budget = extractBudget(text)
  if (budget) entities.budget = budget

  const category = extractCategory(text)
  if (category) entities.category = category

  const location = extractLocation(text)
  if (location) entities.location = location

  const brand = extractBrand(text)
  if (brand) entities.brand = brand

  const condition = extractCondition(text)
  if (condition) entities.condition = condition

  const listingId = extractListingId(text)
  if (listingId) entities.listingId = listingId

  const query = extractQuery(text)
  if (query) entities.query = query

  if (/\b(buy|buying|purchase|want\s+to\s+buy)\b/i.test(text)) entities.buyerIntent = true
  if (/\b(sell|selling|sell\s+my|list\s+my|add\s+(a\s+)?listing|post\s+(a\s+)?ad|create\s+(a\s+)?listing)\b/i.test(text)) entities.sellerIntent = true

  return entities
}

function entityHasValue(entities: MarketplaceEntities, key: keyof MarketplaceEntities): boolean {
  const val = entities[key]
  if (val === undefined || val === null) return false
  if (typeof val === 'string' && val.trim() === '') return false
  if (typeof val === 'object' && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>
    return Object.keys(obj).length > 0
  }
  return true
}

function getMissingInformation(intent: Intent, entities: MarketplaceEntities): string[] {
  const missing: string[] = []

  switch (intent) {
    case 'SEARCH_LISTINGS': {
      const flow = getCategoryFlow(entities.category)
      for (const field of flow.fields) {
        if (!entityHasValue(entities, field.entityKey)) {
          missing.push(field.key)
        }
      }
      break
    }
    case 'LISTING_DETAILS':
      if (!entities.listingId && !entities.query) missing.push('listing')
      break
    case 'PRICING_HELP':
      if (!entities.category && !entities.query) missing.push('item')
      break
    case 'CONTACT_SELLER':
      if (!entities.listingId) missing.push('listing')
      break
    case 'COMPARISON':
      if (!entities.category && !entities.query) missing.push('items to compare')
      break
    case 'RECOMMENDATION':
      if (!entities.category && !entities.query) missing.push('what you need')
      break
    case 'LISTING_MANAGEMENT':
      if (!entities.listingId && !entities.query) missing.push('listing')
      break
  }

  return missing
}

export { getMissingInformation }

export function classifyIntent(message: string): IntentClassification {
  const trimmed = message.trim()

  if (trimmed.length === 0) {
    return {
      intent: 'UNKNOWN',
      confidence: 0,
      entities: {},
      missingInformation: [],
      requiresClarification: false,
    }
  }

  let entities = extractEntities(trimmed)
  const category = entities.category

  // Product category slugs that should trigger direct SEARCH_LISTINGS for
  // short queries. Excludes action/service categories like "events", "services",
  // "jobs" that would false-positive on verbs like "show", "find", "work".
  const PRODUCT_CATEGORY_SLUGS = new Set([
    'vehicles',
    'mobiles-tablets',
    'electronics',
    'property',
    'furniture-home',
    'fashion-lifestyle',
    'kids',
    'sports-hobbies',
    'pets',
    'education',
  ])
  
  // entities.category is populated via canonicalCategories.matchCategory (the
  // SINGLE SOURCE OF TRUTH). If a valid marketplace PRODUCT category was
  // detected AND the query is a short, direct category search (≤3 words),
  // route straight to SEARCH_LISTINGS so terms like "car", "bike", "iphone",
  // "laptop" and "house" surface listings instead of a generic help response.
  const searchMissing = getMissingInformation('SEARCH_LISTINGS', entities)
  if (category && PRODUCT_CATEGORY_SLUGS.has(category) && trimmed.split(/\s+/).length <= 3) {
    return {
      intent: 'SEARCH_LISTINGS',
      confidence: 0.9,
      entities,
      missingInformation: searchMissing,
      requiresClarification: searchMissing.length > 0,
    }
  }

  let bestPhraseMatch: IntentPattern | null = null
  let bestPhraseScore = 0

  for (const pattern of INTENT_PATTERNS) {
    let phraseCount = 0
    for (const phrase of pattern.phrases) {
      if (phrase.test(trimmed)) {
        phraseCount++
      }
    }
    if (phraseCount > 0) {
      const score = pattern.confidence * phraseCount
      if (score > bestPhraseScore) {
        bestPhraseScore = score
        bestPhraseMatch = pattern
      }
    }
  }
  
  if (bestPhraseMatch && bestPhraseScore > 0.5) {
    const missing = getMissingInformation(bestPhraseMatch.intent, entities)
    const clarifyIntents = new Set(['SEARCH_LISTINGS', 'LISTING_MANAGEMENT'])
    return {
      intent: bestPhraseMatch.intent,
      confidence: bestPhraseScore,
      entities,
      missingInformation: missing,
      requiresClarification: missing.length > 0 && clarifyIntents.has(bestPhraseMatch.intent),
    }
  }

  let bestKeywordMatch: IntentPattern | null = null
  let bestKeywordScore = 0

  for (const pattern of INTENT_PATTERNS) {
    let keywordCount = 0
    for (const keyword of pattern.keywords) {
      if (keyword.test(trimmed)) {
        keywordCount++
      }
    }
    if (keywordCount > 0) {
      const score = pattern.confidence * keywordCount * 0.4
      if (score > bestKeywordScore) {
        bestKeywordScore = score
        bestKeywordMatch = pattern
      }
    }
  }

  if (bestKeywordMatch && bestKeywordScore > 0.5) {
    entities = extractEntities(trimmed)
    const missing = getMissingInformation(bestKeywordMatch.intent, entities)
    const clarifyIntents = new Set(['SEARCH_LISTINGS', 'LISTING_MANAGEMENT'])
    return {
      intent: bestKeywordMatch.intent,
      confidence: Math.min(bestKeywordMatch.confidence * 0.7, 1),
      entities,
      missingInformation: missing,
      requiresClarification: missing.length > 0 && clarifyIntents.has(bestKeywordMatch.intent),
    }
  }

  entities = extractEntities(trimmed)

  return {
    intent: 'UNKNOWN',
    confidence: 0.3,
    entities,
    missingInformation: [],
    requiresClarification: false,
  }
}
