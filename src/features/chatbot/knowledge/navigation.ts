import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface NavigationArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface NavigationArticle {
  id: string
  version: number
  title: string
  intent: 'NAVIGATION'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: NavigationArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: NavigationArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const articles: NavigationArticle[] = [
  // ───────────────────────── MESSAGES (5) ─────────────────────────
  {
    id: 'NAV-001',
    version: VERSION,
    title: 'Where Are My Messages?',
    intent: 'NAVIGATION',
    category: 'messages',
    triggers: ['where are my messages', 'my messages', 'messages', 'open messages', 'inbox', 'chat'],
    response: [
      { type: 'heading', content: 'Your Messages', level: 2 },
      { type: 'text', content: 'All your chats with buyers and sellers live in the Messages section. Open the Messages icon from the top menu or your account dashboard to see active conversations, unread messages, and archived chats.' },
    ],
    actions: [{ label: 'Open Messages', value: 'open messages' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-002',
    version: VERSION,
    title: 'Open Messages',
    intent: 'NAVIGATION',
    category: 'messages',
    triggers: ['open messages', 'go to messages', 'show messages', 'view messages'],
    response: [
      { type: 'heading', content: 'Open Messages', level: 2 },
      { type: 'text', content: 'Tap the Messages icon in the header to open your inbox. From there you can read replies, send new messages, and manage conversations.' },
    ],
    actions: [{ label: 'Open Messages', value: 'open messages' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-003',
    version: VERSION,
    title: 'Message a Seller',
    intent: 'NAVIGATION',
    category: 'messages',
    triggers: ['message a seller', 'contact seller', 'chat with seller', 'reach seller'],
    response: [
      { type: 'heading', content: 'Message a Seller', level: 2 },
      { type: 'text', content: 'Open the listing you are interested in and tap "Contact Seller" or "Send Message." The conversation opens in Messages, linked to that item.' },
    ],
    actions: [{ label: 'Open Messages', value: 'open messages' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-004',
    version: VERSION,
    title: 'Archived Conversations',
    intent: 'NAVIGATION',
    category: 'messages',
    triggers: ['archived', 'archive chat', 'old conversations', 'hidden chats'],
    response: [
      { type: 'heading', content: 'Archived Conversations', level: 2 },
      { type: 'text', content: 'Archived chats are tucked away in the Archive folder inside Messages. Open Messages, find the Archive option, and restore any conversation you need.' },
    ],
    actions: [{ label: 'Open Messages', value: 'open messages' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-005',
    version: VERSION,
    title: 'Message Notifications',
    intent: 'NAVIGATION',
    category: 'messages',
    triggers: ['message notifications', 'chat alerts', 'reply alert'],
    response: [
      { type: 'heading', content: 'Message Notifications', level: 2 },
      { type: 'text', content: 'New message alerts are controlled in Notification Settings. Turn them on so you never miss a reply from a buyer or seller.' },
    ],
    actions: [
      { label: 'Notification Settings', value: 'notification settings' },
      { label: 'Open Messages', value: 'open messages' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── FAVORITES (4) ─────────────────────────
  {
    id: 'NAV-006',
    version: VERSION,
    title: 'Open Favorites',
    intent: 'NAVIGATION',
    category: 'favorites',
    triggers: ['open favorites', 'favorites', 'saved items', 'view favorites', 'wishlist'],
    response: [
      { type: 'heading', content: 'Your Favorites', level: 2 },
      { type: 'text', content: 'Listings you save with the heart icon appear under Favorites in your Profile. Tap Favorites to revisit saved items and see if any dropped in price.' },
    ],
    actions: [{ label: 'View Favorites', value: 'view favorites' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-007',
    version: VERSION,
    title: 'Save a Listing',
    intent: 'NAVIGATION',
    category: 'favorites',
    triggers: ['save listing', 'save this listing', 'bookmark', 'add to favorites'],
    response: [
      { type: 'heading', content: 'Save a Listing', level: 2 },
      { type: 'text', content: 'Tap the heart on any listing to save it. Saved items collect in Favorites so you can compare and return to them later.' },
    ],
    actions: [{ label: 'View Favorites', value: 'view favorites' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-008',
    version: VERSION,
    title: 'Manage Saved Items',
    intent: 'NAVIGATION',
    category: 'favorites',
    triggers: ['manage favorites', 'remove favorite', 'delete saved', 'organize favorites'],
    response: [
      { type: 'heading', content: 'Manage Saved Items', level: 2 },
      { type: 'text', content: 'Open Favorites to remove items you no longer want, or tap a saved listing to view or message the seller.' },
    ],
    actions: [{ label: 'View Favorites', value: 'view favorites' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-009',
    version: VERSION,
    title: 'Price Drop Alerts on Favorites',
    intent: 'NAVIGATION',
    category: 'favorites',
    triggers: ['price drop', 'favorite alerts', 'saved alerts'],
    response: [
      { type: 'heading', content: 'Price Drop Alerts', level: 2 },
      { type: 'text', content: 'When a saved item drops in price, we notify you by message. Keep notifications on in Notification Settings to catch the best deals.' },
    ],
    actions: [{ label: 'View Favorites', value: 'view favorites' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── LISTINGS (5) ─────────────────────────
  {
    id: 'NAV-010',
    version: VERSION,
    title: 'See My Listings',
    intent: 'NAVIGATION',
    category: 'listings',
    triggers: ['my listings', 'see my listings', 'view my listings', 'my ads', 'my items'],
    response: [
      { type: 'heading', content: 'Your Listings', level: 2 },
      { type: 'text', content: 'All listings you have posted are under "My Listings" in your Profile. There you can view, edit, renew, or remove each one and see how many views it has.' },
    ],
    actions: [{ label: 'My Listings', value: 'my listings' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-011',
    version: VERSION,
    title: 'Manage My Listings',
    intent: 'NAVIGATION',
    category: 'listings',
    triggers: ['manage listings', 'manage my listings', 'edit listings', 'my ads'],
    response: [
      { type: 'heading', content: 'Manage My Listings', level: 2 },
      { type: 'text', content: 'Open "My Listings" to manage everything you have posted — update photos, change the price, mark as sold, or delete. Each listing has an "Edit" option.' },
    ],
    actions: [{ label: 'My Listings', value: 'my listings' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-012',
    version: VERSION,
    title: 'Post a New Listing',
    intent: 'NAVIGATION',
    category: 'listings',
    triggers: ['post a listing', 'create listing', 'sell an item', 'new listing'],
    response: [
      { type: 'heading', content: 'Post a Listing', level: 2 },
      { type: 'text', content: 'To sell, open the "Sell" or "Post Listing" button from your Profile or the menu. Add photos, a clear title, an honest description, a price, and your location, then publish.' },
    ],
    actions: [{ label: 'Post a Listing', value: 'post listing' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-013',
    version: VERSION,
    title: 'Edit a Listing',
    intent: 'NAVIGATION',
    category: 'listings',
    triggers: ['edit a listing', 'edit my listing', 'change listing', 'update listing'],
    response: [
      { type: 'heading', content: 'Edit a Listing', level: 2 },
      { type: 'text', content: 'Open "My Listings," choose the item, and tap "Edit" to change photos, title, price, or details. Save to update it in search.' },
    ],
    actions: [{ label: 'My Listings', value: 'my listings' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-014',
    version: VERSION,
    title: 'Listing Performance',
    intent: 'NAVIGATION',
    category: 'listings',
    triggers: ['listing views', 'how many views', 'listing stats', 'performance'],
    response: [
      { type: 'heading', content: 'Listing Performance', level: 2 },
      { type: 'text', content: 'Each listing in "My Listings" shows its view count and age. Low views after a week? Try better photos, a clearer title, or a small price drop and renew.' },
    ],
    actions: [{ label: 'My Listings', value: 'my listings' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PROFILE & SETTINGS (5) ─────────────────────────
  {
    id: 'NAV-015',
    version: VERSION,
    title: 'Go to Profile',
    intent: 'NAVIGATION',
    category: 'profile',
    triggers: ['profile', 'go to profile', 'my profile', 'open profile', 'account'],
    response: [
      { type: 'heading', content: 'Your Profile', level: 2 },
      { type: 'text', content: 'Your Profile is the hub for everything — listings, favorites, messages, and settings. Tap your avatar or "Profile" in the menu to open it.' },
    ],
    actions: [
      { label: 'Profile', value: 'profile' },
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-016',
    version: VERSION,
    title: 'Profile Settings',
    intent: 'NAVIGATION',
    category: 'profile',
    triggers: ['profile settings', 'edit profile', 'update profile', 'profile info'],
    response: [
      { type: 'heading', content: 'Profile Settings', level: 2 },
      { type: 'text', content: 'Open Profile, then "Edit Profile" to update your name, photo, location, and bio. A complete profile builds trust with buyers and sellers.' },
    ],
    actions: [
      { label: 'Profile', value: 'profile' },
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-017',
    version: VERSION,
    title: 'Account Settings',
    intent: 'NAVIGATION',
    category: 'profile',
    triggers: ['account settings', 'settings', 'preferences', 'options'],
    response: [
      { type: 'heading', content: 'Account Settings', level: 2 },
      { type: 'text', content: 'Account Settings (from Profile) is where you manage your password, email, privacy, notifications, and linked accounts. Explore each section to tailor ValClassifieds.' },
    ],
    actions: [
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Profile', value: 'profile' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-018',
    version: VERSION,
    title: 'Notification Settings',
    intent: 'NAVIGATION',
    category: 'profile',
    triggers: ['notification settings', 'notifications', 'alerts', 'manage notifications'],
    response: [
      { type: 'heading', content: 'Notification Settings', level: 2 },
      { type: 'text', content: 'Open Account Settings, then "Notifications" to choose what we message you about — new messages, offers, price drops, or news — and pick push, email, or both.' },
    ],
    actions: [
      { label: 'Notification Settings', value: 'notification settings' },
      { label: 'Account Settings', value: 'account settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-019',
    version: VERSION,
    title: 'Privacy Settings',
    intent: 'NAVIGATION',
    category: 'profile',
    triggers: ['privacy settings', 'privacy', 'manage privacy'],
    response: [
      { type: 'heading', content: 'Privacy Settings', level: 2 },
      { type: 'text', content: 'Under Account Settings, open Privacy to control what shows on your profile, who can message you, and how your activity appears.' },
    ],
    actions: [
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Privacy Settings', value: 'privacy settings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── SAVED SEARCHES (3) ─────────────────────────
  {
    id: 'NAV-020',
    version: VERSION,
    title: 'Saved Searches',
    intent: 'NAVIGATION',
    category: 'searches',
    triggers: ['saved searches', 'saved search', 'my searches'],
    response: [
      { type: 'heading', content: 'Saved Searches', level: 2 },
      { type: 'text', content: 'Saved searches let you re-run a favourite filter in one tap. Find them in your Profile under "Saved Searches" and get alerts when new matching items appear.' },
    ],
    actions: [{ label: 'Saved Searches', value: 'saved searches' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-021',
    version: VERSION,
    title: 'Create a Saved Search',
    intent: 'NAVIGATION',
    category: 'searches',
    triggers: ['create saved search', 'save search', 'new saved search'],
    response: [
      { type: 'heading', content: 'Create a Saved Search', level: 2 },
      { type: 'text', content: 'Run a search, then tap "Save Search" and give it a name. You will get a notification when new listings match, so you never miss the right item.' },
    ],
    actions: [{ label: 'Saved Searches', value: 'saved searches' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-022',
    version: VERSION,
    title: 'View Saved Searches',
    intent: 'NAVIGATION',
    category: 'searches',
    triggers: ['view saved searches', 'open saved searches', 'my saved searches'],
    response: [
      { type: 'heading', content: 'View Saved Searches', level: 2 },
      { type: 'text', content: 'Open Saved Searches from your Profile to see and run your saved filters, or delete the ones you no longer need.' },
    ],
    actions: [{ label: 'Saved Searches', value: 'saved searches' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── CATEGORIES & HELP (4) ─────────────────────────
  {
    id: 'NAV-023',
    version: VERSION,
    title: 'Browse Categories',
    intent: 'NAVIGATION',
    category: 'categories',
    triggers: ['browse categories', 'categories', 'explore', 'all categories'],
    response: [
      { type: 'heading', content: 'Browse Categories', level: 2 },
      { type: 'text', content: 'Open the Categories menu from the home screen to explore Vehicles, Electronics, Home, Fashion, and more. Pick a category to see everything listed in it.' },
    ],
    actions: [{ label: 'Browse Categories', value: 'show categories' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-024',
    version: VERSION,
    title: 'Open the Help Center',
    intent: 'NAVIGATION',
    category: 'help',
    triggers: ['help center', 'help', 'support center', 'how to use', 'guide'],
    response: [
      { type: 'heading', content: 'Help Center', level: 2 },
      { type: 'text', content: 'The Help Center has articles on buying, selling, safety, and account management. Open it from the menu or ask ValBot — we can point you to the right guide.' },
    ],
    actions: [
      { label: 'Contact Support', value: 'contact support' },
      { label: 'Safety Guide', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-025',
    version: VERSION,
    title: 'Contact Support',
    intent: 'NAVIGATION',
    category: 'help',
    triggers: ['contact support', 'customer support', 'talk to support', 'get help'],
    response: [
      { type: 'heading', content: 'Contact Support', level: 2 },
      { type: 'text', content: 'Need a hand? Open the Help Center and choose "Contact Support," or message us with your question and listing ID where relevant. Our team replies as quickly as possible.' },
    ],
    actions: [{ label: 'Contact Support', value: 'contact support' }],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-026',
    version: VERSION,
    title: 'Marketplace Features',
    intent: 'NAVIGATION',
    category: 'features',
    triggers: ['features', 'marketplace features', 'what can i do', 'capabilities'],
    response: [
      { type: 'heading', content: 'Marketplace Features', level: 2 },
      { type: 'text', content: 'ValClassifieds lets you buy and sell locally: post free listings, search with filters, message sellers, save favourites, and manage everything from your Profile. Explore the menu to see it all.' },
    ],
    actions: [
      { label: 'Browse Categories', value: 'show categories' },
      { label: 'Post a Listing', value: 'post listing' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── HOME & MISC (4) ─────────────────────────
  {
    id: 'NAV-027',
    version: VERSION,
    title: 'How to Buy',
    intent: 'NAVIGATION',
    category: 'features',
    triggers: ['how to buy', 'buying guide', 'purchase', 'how to purchase'],
    response: [
      { type: 'heading', content: 'How to Buy', level: 2 },
      { type: 'text', content: 'To buy, search or browse listings, open one you like, and tap "Contact Seller" to message. Agree a safe public meetup, inspect the item, then pay. Keep all chat on ValClassifieds.' },
    ],
    actions: [
      { label: 'Search Listings', value: 'search' },
      { label: 'Safety Guide', value: 'safety tips' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-028',
    version: VERSION,
    title: 'How to Sell',
    intent: 'NAVIGATION',
    category: 'features',
    triggers: ['how to sell', 'selling guide', 'sell', 'sell my item'],
    response: [
      { type: 'heading', content: 'How to Sell', level: 2 },
      { type: 'text', content: 'To sell, tap "Post Listing," add clear photos, write a honest title and description, set a fair price, and publish. Manage everything from "My Listings."' },
    ],
    actions: [
      { label: 'Post a Listing', value: 'post listing' },
      { label: 'My Listings', value: 'my listings' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-029',
    version: VERSION,
    title: 'Go Back or Home',
    intent: 'NAVIGATION',
    category: 'home',
    triggers: ['go back', 'home', 'dashboard', 'main page', 'start over'],
    response: [
      { type: 'heading', content: 'Go Back or Home', level: 2 },
      { type: 'text', content: 'Use the back arrow to return to the previous screen, or tap the ValClassifieds logo to return to the home feed. Your Profile and Messages are always in the menu.' },
    ],
    actions: [
      { label: 'Browse Categories', value: 'show categories' },
      { label: 'Search Listings', value: 'search' },
    ],
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'NAV-030',
    version: VERSION,
    title: 'Navigation Help',
    intent: 'NAVIGATION',
    category: 'home',
    triggers: ['navigation', 'where is', 'how do i find', 'can\'t find', 'lost'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Navigation Help', level: 2 },
      { type: 'text', content: 'Here is where to find the main parts of ValClassifieds:\n\n• Messages — the speech-bubble icon in the header\n• Favorites — your Profile\n• My Listings — your Profile\n• Profile & Settings — tap your avatar\n• Categories — the home menu\n• Help — the menu or ask ValBot\n\nTell us what you are looking for and we will point you to it.' },
    ],
    actions: [
      { label: 'Open Messages', value: 'open messages' },
      { label: 'My Listings', value: 'my listings' },
      { label: 'Account Settings', value: 'account settings' },
      { label: 'Browse Categories', value: 'show categories' },
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

function matchArticles(pool: NavigationArticle[], query: string): NavigationArticle | null {
  let best: { article: NavigationArticle; score: number; triggerLen: number } | null = null
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

export function selectNavigationArticle(
  classification: IntentClassification
): NavigationArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}

export function selectNavigationArticleByCategory(category: string): NavigationArticle {
  return (
    articles.find((a) => a.category === category) ??
    articles.find((a) => a.isDefault) ??
    articles[0]
  )
}
