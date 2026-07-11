const OFF_TOPIC_PATTERNS = [
  { category: 'programming', patterns: [/\b(python|javascript|java|c\+\+|rust|go\s*lang|php|swift|kotlin|ruby|typescript)\b/i, /\b(code|programming|coding|algorithm|function|variable|loop|array|api|backend|frontend|database|sql|noql)\b/i] },
  { category: 'politics', patterns: [/\b(politics|election|government|president|minister|parliament|democracy|vote|party|policy|bill|law)\b/i] },
  { category: 'sports', patterns: [/\b(cricket|football|soccer|tennis|basketball|volleyball|ipl|premier\s+league|world\s+cup|olympics)\b/i, /\b(match|score|team|player|tournament|championship)\b/i] },
  { category: 'entertainment', patterns: [/\b(movie|film|cinema|song|music|celebrity|actor|actress|tv\s*show|netflix|youtube)\b/i] },
  { category: 'education', patterns: [/\b(homework|assignment|exam|test|study|school|college|university|class|lesson|tutorial|essay)\b/i] },
  { category: 'weather', patterns: [/\b(weather|temperature|forecast|rain|snow|sunny|cloudy|storm|climate)\b/i] },
  { category: 'cooking', patterns: [/\b(recipe|cooking|bake|baking|cook|diet|nutrition|ingredient)\b/i] },
  { category: 'finance', patterns: [/\b(stock|investment|crypto|bitcoin|share\s+market|trading|mutual\s+fund|finance)\b/i] },
  { category: 'general_knowledge', patterns: [/\b(history|geography|science|math|physics|chemistry|biology|capital\s+of|population|area|currency)\b/i, /\b(meaning|definition|formula|theory|principle)\b/i] },
  { category: 'health', patterns: [/\b(health|medicine|doctor|hospital|disease|symptom|treatment|exercise|yoga|fitness)\b/i] },
]

const MARKETPLACE_KEYWORDS = [
  /\b(buy|sell|listing|price|item|product|shop|marketplace)\b/i,
  /\b(classified|ad|post|message|contact|seller|buyer)\b/i,
  /\b(account|profile|login|register|sign|password|payment)\b/i,
  /\b(category|search|find|browse|explore|view|show)\b/i,
  /\b(refund|return|shipping|delivery|warranty|condition)\b/i,
  /\b(favorite|review|rating|feedback|report|block)\b/i,
  /\b(help|guide|tip|advice|how\s+to|step|process)\b/i,
  /\b(safe|safety|scam|fraud|trust|verify|secure)\b/i,
  /\b(phone|laptop|car|bike|house|furniture|electronics|clothing|book)\b/i,
]

function isMarketplaceQuery(text: string): boolean {
  const cleaned = text
    .replace(/^(hi|hello|hey|bye|thanks|thank\s*you)\b/i, '')
    .trim()

  if (cleaned.length < 3) return true

  const marketplaceScore = MARKETPLACE_KEYWORDS.reduce((score, kw) =>
    kw.test(text) ? score + 1 : score, 0
  )

  const hasMarketplaceIntent = marketplaceScore >= 2

  const isOffTopic = OFF_TOPIC_PATTERNS.some(({ patterns }) =>
    patterns.some(p => p.test(text))
  )

  if (!hasMarketplaceIntent && isOffTopic) return false

  return true
}

export function isOffTopic(message: string): boolean {
  return !isMarketplaceQuery(message)
}

export function getOffTopicResponse(): string {
  return "I'm designed to help with ValClassifieds. I can assist with buying, selling, listings, messaging, accounts, and marketplace safety. If you have a marketplace-related question, I'd be happy to help."
}
