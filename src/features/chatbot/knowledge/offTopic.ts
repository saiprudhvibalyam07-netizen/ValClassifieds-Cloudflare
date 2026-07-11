import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface OffTopicArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface OffTopicArticle {
  id: string
  version: number
  title: string
  intent: 'OFF_TOPIC'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: OffTopicArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: OffTopicArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const OFFTOPIC_ACTIONS: SuggestedAction[] = [
  { label: 'Search Listings', value: 'search' },
  { label: 'How to Buy', value: 'how to buy' },
  { label: 'How to Sell', value: 'how to sell' },
]

const articles: OffTopicArticle[] = [
  // ───────────────────────── OFF-TOPIC (30) ─────────────────────────
  {
    id: 'OFT-001',
    version: VERSION,
    title: 'Weather',
    intent: 'OFF_TOPIC',
    category: 'weather',
    triggers: ['weather', 'forecast', 'rain', 'temperature', 'climate'],
    response: [
      { type: 'heading', content: 'Weather', level: 2 },
      { type: 'text', content: 'I focus on helping with ValClassifieds — buying, selling, and staying safe on the marketplace. For weather, please check your phone\'s weather app or a weather service. Meanwhile, I can help you find items or post a listing.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-002',
    version: VERSION,
    title: 'Politics',
    intent: 'OFF_TOPIC',
    category: 'politics',
    triggers: ['politics', 'president', 'election', 'government', 'vote'],
    response: [
      { type: 'heading', content: 'Politics', level: 2 },
      { type: 'text', content: 'I keep ValClassifieds neutral and focused on the marketplace, so I do not discuss politics or public figures. If you are here to buy or sell, I am happy to help with that.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-003',
    version: VERSION,
    title: 'Sports',
    intent: 'OFF_TOPIC',
    category: 'sports',
    triggers: ['sports', 'match', 'score', 'game result', 'cricket', 'football'],
    response: [
      { type: 'heading', content: 'Sports', level: 2 },
      { type: 'text', content: 'I am here for marketplace help, not sports updates. For scores and fixtures, a sports app is your best bet. I can help you buy or sell sports gear in the meantime.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-004',
    version: VERSION,
    title: 'Math',
    intent: 'OFF_TOPIC',
    category: 'math',
    triggers: ['math', 'calculate', 'solve', 'equation', 'sum'],
    response: [
      { type: 'heading', content: 'Math', level: 2 },
      { type: 'text', content: 'I do not solve math problems — my role is to help with ValClassifieds. If your question is about pricing an item or calculating a fair value, I can certainly help with that.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-005',
    version: VERSION,
    title: 'Programming',
    intent: 'OFF_TOPIC',
    category: 'programming',
    triggers: ['programming', 'code', 'bug', 'script', 'develop'],
    response: [
      { type: 'heading', content: 'Programming', level: 2 },
      { type: 'text', content: 'I am not a coding assistant, so I cannot help with programming. For marketplace tasks — like writing a listing or understanding fees — I am here to help.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-006',
    version: VERSION,
    title: 'Recipes and Cooking',
    intent: 'OFF_TOPIC',
    category: 'recipes',
    triggers: ['recipe', 'cook', 'cooking', 'food', 'meal'],
    response: [
      { type: 'heading', content: 'Recipes and Cooking', level: 2 },
      { type: 'text', content: 'I cannot share recipes, but I can help you buy or sell kitchen items, cookware, or appliances on ValClassifieds. What are you looking for?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-007',
    version: VERSION,
    title: 'Medical Advice',
    intent: 'OFF_TOPIC',
    category: 'medical',
    triggers: ['medical', 'health', 'symptom', 'doctor', 'medicine', 'sick'],
    response: [
      { type: 'heading', content: 'Medical Advice', level: 2 },
      { type: 'text', content: 'I am not a medical professional and cannot give health advice. Please consult a qualified doctor. For marketplace needs — like buying medical equipment — I can help.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-008',
    version: VERSION,
    title: 'Legal Advice',
    intent: 'OFF_TOPIC',
    category: 'legal',
    triggers: ['legal', 'lawyer', 'law', 'sue', 'contract'],
    response: [
      { type: 'heading', content: 'Legal Advice', level: 2 },
      { type: 'text', content: 'I cannot provide legal advice. For legal matters, please speak with a qualified lawyer. I can help with marketplace questions, such as safe transactions and reporting issues.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-009',
    version: VERSION,
    title: 'Homework and Study',
    intent: 'OFF_TOPIC',
    category: 'homework',
    triggers: ['homework', 'assignment', 'exam', 'study', 'school work'],
    response: [
      { type: 'heading', content: 'Homework and Study', level: 2 },
      { type: 'text', content: 'I do not complete homework or assignments — my focus is the ValClassifieds marketplace. If you need a textbook or study item, I can help you find one.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-010',
    version: VERSION,
    title: 'Questions About AI',
    intent: 'OFF_TOPIC',
    category: 'ai',
    triggers: ['ai', 'chatbot', 'how do you work', 'are you human', 'robot'],
    response: [
      { type: 'heading', content: 'Questions About AI', level: 2 },
      { type: 'text', content: 'I am ValBot, the ValClassifieds assistant, here to help you buy, sell, and stay safe. I keep things practical and marketplace-focused rather than discussing how I work. What can I help you with today?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-011',
    version: VERSION,
    title: 'Jokes',
    intent: 'OFF_TOPIC',
    category: 'jokes',
    triggers: ['joke', 'jokes', 'funny', 'make me laugh'],
    response: [
      { type: 'heading', content: 'Jokes', level: 2 },
      { type: 'text', content: 'I keep things helpful and on-topic with the marketplace, so I will skip the jokes. I can help you find a great deal or post something for sale instead!' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-012',
    version: VERSION,
    title: 'Stories',
    intent: 'OFF_TOPIC',
    category: 'stories',
    triggers: ['story', 'tell me a story', 'bedtime', 'fiction'],
    response: [
      { type: 'heading', content: 'Stories', level: 2 },
      { type: 'text', content: 'I do not tell stories — I am here to help with ValClassifieds. If you are in the mood to browse, I can show you interesting listings near you.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-013',
    version: VERSION,
    title: 'Music',
    intent: 'OFF_TOPIC',
    category: 'music',
    triggers: ['music', 'song', 'artist', 'album', 'lyrics'],
    response: [
      { type: 'heading', content: 'Music', level: 2 },
      { type: 'text', content: 'I cannot play or discuss music, but I can help you buy or sell instruments, speakers, and audio gear on ValClassifieds. Looking for something specific?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-014',
    version: VERSION,
    title: 'Movies and TV',
    intent: 'OFF_TOPIC',
    category: 'movies',
    triggers: ['movie', 'film', 'netflix', 'tv show', 'series'],
    response: [
      { type: 'heading', content: 'Movies and TV', level: 2 },
      { type: 'text', content: 'I do not cover movies or shows, but I can help you find or sell TVs, streaming devices, and DVDs on the marketplace. How can I help?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-015',
    version: VERSION,
    title: 'News',
    intent: 'OFF_TOPIC',
    category: 'news',
    triggers: ['news', 'current events', 'headlines', 'happening'],
    response: [
      { type: 'heading', content: 'News', level: 2 },
      { type: 'text', content: 'I do not share news or current events — my focus is the ValClassifieds marketplace. For the latest listings and deals, I am happy to help you search.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-016',
    version: VERSION,
    title: 'Investing and Finance',
    intent: 'OFF_TOPIC',
    category: 'finance',
    triggers: ['invest', 'stock', 'crypto', 'finance', 'trading'],
    response: [
      { type: 'heading', content: 'Investing and Finance', level: 2 },
      { type: 'text', content: 'I cannot give investment or financial advice. For marketplace transactions, remember ValClassifieds does not process payments — agree safe methods directly with the other party. Need help with a listing?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-017',
    version: VERSION,
    title: 'Travel',
    intent: 'OFF_TOPIC',
    category: 'travel',
    triggers: ['travel', 'flight', 'hotel', 'holiday', 'trip'],
    response: [
      { type: 'heading', content: 'Travel', level: 2 },
      { type: 'text', content: 'I do not handle travel bookings, but I can help you buy or sell luggage, cameras, and travel gear on ValClassifieds. What are you after?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-018',
    version: VERSION,
    title: 'Relationships',
    intent: 'OFF_TOPIC',
    category: 'relationships',
    triggers: ['relationship', 'dating', 'breakup', 'partner'],
    response: [
      { type: 'heading', content: 'Relationships', level: 2 },
      { type: 'text', content: 'I am not the right place for relationship advice — I focus on marketplace help. If you are buying or selling something, I am glad to assist.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-019',
    version: VERSION,
    title: 'Religion',
    intent: 'OFF_TOPIC',
    category: 'religion',
    triggers: ['religion', 'god', 'faith', 'prayer', 'belief'],
    response: [
      { type: 'heading', content: 'Religion', level: 2 },
      { type: 'text', content: 'I keep ValClassifieds neutral and do not discuss religion. I am happy to help with buying, selling, or staying safe on the marketplace instead.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-020',
    version: VERSION,
    title: 'Translation',
    intent: 'OFF_TOPIC',
    category: 'translation',
    triggers: ['translate', 'translation', 'in another language', 'meaning of'],
    response: [
      { type: 'heading', content: 'Translation', level: 2 },
      { type: 'text', content: 'I do not translate text, but I can help you write or understand a marketplace listing. For language changes in your account, see Language & Region in Settings.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-021',
    version: VERSION,
    title: 'Fitness',
    intent: 'OFF_TOPIC',
    category: 'fitness',
    triggers: ['fitness', 'workout', 'gym', 'exercise', 'diet'],
    response: [
      { type: 'heading', content: 'Fitness', level: 2 },
      { type: 'text', content: 'I am not a fitness coach, so I cannot plan workouts. I can help you buy or sell fitness equipment and gear on ValClassifieds, though. What do you need?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-022',
    version: VERSION,
    title: 'Gaming',
    intent: 'OFF_TOPIC',
    category: 'gaming',
    triggers: ['game', 'gaming', 'video game', 'console', 'xbox', 'playstation'],
    response: [
      { type: 'heading', content: 'Gaming', level: 2 },
      { type: 'text', content: 'I do not play games, but I can help you buy or sell consoles, games, and accessories on ValClassifieds. Want me to search?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-023',
    version: VERSION,
    title: 'Books',
    intent: 'OFF_TOPIC',
    category: 'books',
    triggers: ['book', 'novel', 'read', 'author', 'literature'],
    response: [
      { type: 'heading', content: 'Books', level: 2 },
      { type: 'text', content: 'I cannot discuss or summarise books, but I can help you find or sell books and textbooks on ValClassifieds. Looking for a title?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-024',
    version: VERSION,
    title: 'Trivia and Facts',
    intent: 'OFF_TOPIC',
    category: 'trivia',
    triggers: ['trivia', 'fact', 'random fact', 'did you know'],
    response: [
      { type: 'heading', content: 'Trivia and Facts', level: 2 },
      { type: 'text', content: 'I keep things practical and marketplace-focused, so I will skip trivia. I can help you discover interesting items or post your own listing instead.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-025',
    version: VERSION,
    title: 'Entertainment and Celebrities',
    intent: 'OFF_TOPIC',
    category: 'entertainment',
    triggers: ['entertainment', 'celebrity', 'famous', 'gossip'],
    response: [
      { type: 'heading', content: 'Entertainment and Celebrities', level: 2 },
      { type: 'text', content: 'I do not cover entertainment or celebrity news. For marketplace help — like buying electronics or event tickets — I am here for you.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-026',
    version: VERSION,
    title: 'Shopping Elsewhere',
    intent: 'OFF_TOPIC',
    category: 'other_sites',
    triggers: ['amazon', 'flipkart', 'ebay', 'other site', 'another website'],
    response: [
      { type: 'heading', content: 'Shopping Elsewhere', level: 2 },
      { type: 'text', content: 'I am the ValClassifieds assistant, so I focus on our local marketplace. I can help you find the same kind of item from sellers near you — often with the option to meet and inspect. Want to search?' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-027',
    version: VERSION,
    title: 'Personal Advice',
    intent: 'OFF_TOPIC',
    category: 'personal',
    triggers: ['personal problem', 'life advice', 'help me decide', 'what should i do'],
    response: [
      { type: 'heading', content: 'Personal Advice', level: 2 },
      { type: 'text', content: 'I am here for marketplace help rather than personal advice. If your question touches buying, selling, or staying safe on ValClassifieds, I am glad to help.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-028',
    version: VERSION,
    title: 'Time and Date',
    intent: 'OFF_TOPIC',
    category: 'time',
    triggers: ['what time', "today's date", 'what day', 'current time'],
    response: [
      { type: 'heading', content: 'Time and Date', level: 2 },
      { type: 'text', content: 'I do not report the time or date, but your device clock is the quickest source. For marketplace tasks — like scheduling a meetup — I can help you plan safely.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-029',
    version: VERSION,
    title: 'Directions and Maps',
    intent: 'OFF_TOPIC',
    category: 'maps',
    triggers: ['direction', 'route', 'map', 'how to get', 'navigation help'],
    response: [
      { type: 'heading', content: 'Directions and Maps', level: 2 },
      { type: 'text', content: 'I cannot provide directions, but for a marketplace meetup I suggest a public, well-lit place you both know. Agree the spot in your ValClassifieds chat before you go.' },
    ],
    actions: OFFTOPIC_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'OFT-030',
    version: VERSION,
    title: 'Help With Your Marketplace Needs',
    intent: 'OFF_TOPIC',
    category: 'general',
    triggers: ['off topic', 'not related', 'something else', 'random', 'other'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Help With Your Marketplace Needs', level: 2 },
      { type: 'text', content: 'I am ValBot, here to help with ValClassifieds — buying, selling, messaging, safety, and your account. I focus on marketplace topics, so I may not be able to answer that. How about I help you find an item or post a listing instead?' },
    ],
    actions: OFFTOPIC_ACTIONS,
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

function matchArticles(pool: OffTopicArticle[], query: string): OffTopicArticle | null {
  let best: { article: OffTopicArticle; score: number; triggerLen: number } | null = null
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

export function selectOffTopicArticle(
  classification: IntentClassification
): OffTopicArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}
