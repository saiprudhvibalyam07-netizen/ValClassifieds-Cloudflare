import type { ChatbotRole } from '../types'

export interface GreetingTrigger {
  type: 'keyword'
  keywords: string[]
}

export interface GreetingResponse {
  type: 'text'
  content: string
}

export interface GreetingAction {
  type: 'redirect'
  label: string
  value: string
}

export interface GreetingArticle {
  id: string
  title: string
  category: 'greetings'
  intent: 'GREETING'
  trigger: GreetingTrigger
  responses: GreetingResponse[]
  actions: GreetingAction[]
  roles?: ChatbotRole[]
  isDefault?: boolean
  lastUpdated: string
  version: number
}

const articles: GreetingArticle[] = [
  {
    id: 'GREET-001',
    title: 'Hello',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['hello'] },
    responses: [
      { type: 'text', content: 'ValBot: Hello! Welcome to ValClassifieds, where local buyers and sellers connect.' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-002',
    title: 'Hi',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['hi', 'hi there', 'hii'] },
    responses: [
      { type: 'text', content: 'ValBot: Hi there! Great to see you on ValClassifieds. How can I help you today?' },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-003',
    title: 'Hey',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['hey'] },
    responses: [
      { type: 'text', content: 'ValBot: Hey! I am ValBot, your marketplace assistant. What can I do for you?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-004',
    title: 'Hello There',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['hello there'] },
    responses: [
      { type: 'text', content: 'ValBot: Hello there! Welcome to ValClassifieds. Tell me what you are looking for and I will help you find it.' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-005',
    title: 'Good Morning',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['good morning'] },
    responses: [
      { type: 'text', content: 'ValBot: Good morning! A fresh start is a great time to find what you need. How can I help you today?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-006',
    title: 'Good Afternoon',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['good afternoon'] },
    responses: [
      { type: 'text', content: 'ValBot: Good afternoon! I am here to help you buy, sell, or explore on ValClassifieds. What brings you in?' },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-007',
    title: 'Good Evening',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['good evening'] },
    responses: [
      { type: 'text', content: 'ValBot: Good evening! Winding down or still hunting for a great deal? I am happy to help either way.' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-008',
    title: 'Visitor Welcome',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: [] },
    roles: ['visitor'],
    responses: [
      { type: 'text', content: "ValBot: Welcome to ValClassifieds! I'm ValBot, your marketplace assistant. I can help you find what you're looking for, learn about the platform, and get started. What brings you here today?" },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
      { type: 'redirect', label: 'How to Buy', value: 'buying' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-009',
    title: 'Buyer Welcome',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: [] },
    roles: ['buyer'],
    responses: [
      { type: 'text', content: "ValBot: Welcome back! I'm ValBot, your marketplace assistant. I can help you search listings, understand buying processes, and answer marketplace questions. What can I help you find?" },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
      { type: 'redirect', label: 'Buying Safely', value: 'safety' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-010',
    title: 'Seller Welcome',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: [] },
    roles: ['seller'],
    responses: [
      { type: 'text', content: "ValBot: Welcome back! I'm ValBot, your marketplace assistant. I can help you create better listings, reach buyers, and manage your sales. What would you like help with?" },
    ],
    actions: [
      { type: 'redirect', label: 'Post a Listing', value: 'selling' },
      { type: 'redirect', label: 'Pricing Tips', value: 'pricing' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-011',
    title: 'Admin Welcome',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: [] },
    roles: ['admin'],
    responses: [
      { type: 'text', content: "ValBot: Welcome! I'm ValBot. I can help you review platform activity, check system status, and manage administrative tasks. What would you like to review?" },
    ],
    actions: [
      { type: 'redirect', label: 'System Health', value: 'admin' },
      { type: 'redirect', label: 'Active Conversations', value: 'admin' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-012',
    title: 'How Are You',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['how are you', 'how are you doing', "how's it going", 'how is it going', 'how have you been'] },
    responses: [
      { type: 'text', content: 'ValBot: I am doing great, thanks for asking! I am always ready to help you buy, sell, or explore on ValClassifieds. How can I help you today?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-013',
    title: "What's Up",
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ["what's up", 'whats up', 'wassup', 'sup'] },
    responses: [
      { type: 'text', content: 'ValBot: Not much, just here to help you on ValClassifieds! Looking for something specific, or just browsing?' },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-014',
    title: 'Greetings',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['greetings'] },
    responses: [
      { type: 'text', content: 'ValBot: Greetings! Welcome to ValClassifieds. I am ValBot, your marketplace assistant. How may I assist you?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-015',
    title: 'Yo',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['yo'] },
    responses: [
      { type: 'text', content: 'ValBot: Yo! Good to see you on ValClassifieds. What are we hunting for today?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-016',
    title: 'Good Day',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['good day'] },
    responses: [
      { type: 'text', content: 'ValBot: Good day to you! Whether you are buying or selling, I am here to make it easier. How can I help?' },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-017',
    title: 'Hey There',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['hey there'] },
    responses: [
      { type: 'text', content: 'ValBot: Hey there! Thanks for stopping by ValClassifieds. Tell me what you need and I will point you the right way.' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-018',
    title: 'Howdy',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['howdy'] },
    responses: [
      { type: 'text', content: 'ValBot: Howdy, partner! I am ValBot, ready to help you wrangle up the best deals on ValClassifieds. What can I do for you?' },
    ],
    actions: [
      { type: 'redirect', label: 'Start Searching', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-019',
    title: 'Nice To Meet You',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['nice to meet you', 'pleasure to meet you', 'good to see you', 'great to meet you'] },
    responses: [
      { type: 'text', content: 'ValBot: Nice to meet you too! I am ValBot, your ValClassifieds assistant. I am here whenever you need to buy, sell, or explore.' },
    ],
    actions: [
      { type: 'redirect', label: 'Browse Categories', value: 'browse' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
  {
    id: 'GREET-020',
    title: 'General Welcome',
    category: 'greetings',
    intent: 'GREETING',
    trigger: { type: 'keyword', keywords: ['welcome'] },
    isDefault: true,
    responses: [
      { type: 'text', content: 'ValBot: Welcome! I am ValBot, your marketplace assistant. How can I help you with your ValClassifieds needs today?' },
    ],
    actions: [
      { type: 'redirect', label: 'Get Started', value: 'search' },
    ],
    lastUpdated: '2026-07-11',
    version: 1,
  },
]

export default articles

function scoreKeywordMatch(normalized: string, keyword: string): number {
  if (normalized === keyword) return 3
  if (normalized.startsWith(keyword)) return 2
  if (normalized.includes(keyword)) return 1
  return 0
}

export function selectGreetingArticle(role: ChatbotRole, query?: string): GreetingArticle {
  const normalized = (query ?? '').toLowerCase().trim()

  if (normalized) {
    let best: { article: GreetingArticle; score: number } | null = null
    for (const article of articles) {
      if (article.intent !== 'GREETING') continue
      for (const keyword of article.trigger.keywords) {
        const score = scoreKeywordMatch(normalized, keyword.toLowerCase())
        if (score > 0 && (best === null || score > best.score)) {
          best = { article, score }
        }
      }
    }
    if (best) return best.article
  }

  const roleDefault = articles.find(a => a.roles?.includes(role))
  if (roleDefault) return roleDefault

  const genericDefault = articles.find(a => a.isDefault)
  if (genericDefault) return genericDefault

  return articles[0]
}
