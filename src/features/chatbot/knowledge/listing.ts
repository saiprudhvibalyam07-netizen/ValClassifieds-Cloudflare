import type { ResponseSection, SuggestedAction } from '../services/responseTypes'
import type { IntentClassification } from '../types'

export interface ListingArticleMetadata {
  owner: string
  version: string
  lastReviewed: string
}

export interface ListingArticle {
  id: string
  version: number
  title: string
  intent: 'LISTING_ADVICE'
  category: string
  triggers: string[]
  response: ResponseSection[]
  actions: SuggestedAction[]
  metadata: ListingArticleMetadata
  isDefault?: boolean
  lastUpdated: string
}

const LAST_UPDATED = '2026-07-11'
const VERSION = 1
const META: ListingArticleMetadata = {
  owner: 'ValBot Knowledge Base',
  version: '1.0',
  lastReviewed: '2026-07-11',
}

const LISTING_ACTIONS: SuggestedAction[] = [
  { label: 'Photo Tips', value: 'photo tips' },
  { label: 'Title Tips', value: 'listing tips' },
  { label: 'Pricing Tips', value: 'pricing help' },
  { label: 'Post My Listing', value: 'post listing' },
]

const articles: ListingArticle[] = [
  // ───────────────────────── PHOTOS & MEDIA (10) ─────────────────────────
  {
    id: 'LIS-PHO-001',
    version: VERSION,
    title: 'Create a Listing',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['create listing', 'create a listing', 'how to list', 'post a listing', 'new listing', 'how do i create a listing', 'how to create a listing', 'start listing', 'list an item'],
    isDefault: true,
    response: [
      { type: 'heading', content: 'Create a Listing', level: 2 },
      { type: 'text', content: 'Posting on ValClassifieds takes a few minutes. A strong listing has great photos, a clear title, an honest description, a fair price, and the right category and location. Here is the flow:\n\n1. Choose the correct category for your item\n2. Add 4-6 clear photos from different angles\n3. Write a descriptive title with brand, model, and condition\n4. Describe the item honestly, including what is included\n5. Set a competitive price\n6. Add your location and publish\n\nPick a topic below for detailed tips.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-002',
    version: VERSION,
    title: 'Upload Photos',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['upload photos', 'upload photo', 'add photos', 'add photo', 'upload image', 'how to upload', 'how do i upload photos', 'attach photo'],
    response: [
      { type: 'heading', content: 'Upload Photos', level: 2 },
      { type: 'text', content: 'Photos are added from the listing form. Tap "Add Photos" and select images from your device — you can choose several at once. Accepted formats are JPG and PNG. Once uploaded, drag to reorder so your best shot appears first. Save when you are happy with the set.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-003',
    version: VERSION,
    title: 'How Many Photos Can I Add?',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['how many photos', 'photo limit', 'max photos', 'number of photos', 'photo count', 'maximum photos', 'how many images'],
    response: [
      { type: 'heading', content: 'How Many Photos Can I Add?', level: 2 },
      { type: 'text', content: 'You can add up to 10 photos per listing. We recommend at least 4-6 so buyers see the item clearly. More angles mean fewer questions and faster sales. The first photo is your thumbnail in search results, so make it the clearest, most appealing shot.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-004',
    version: VERSION,
    title: 'Photo Quality Tips',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['photo quality', 'good photos', 'better photos', 'photo tips', 'clear photos', 'sharp photos'],
    response: [
      { type: 'heading', content: 'Photo Quality Tips', level: 2 },
      { type: 'text', content: 'Great photos are the fastest way to attract buyers. Aim for:\n\n• Natural daylight near a window — avoid flash, which flattens detail\n• A clean, neutral background with no clutter\n• Sharp focus and good lighting on the item\n• A clear, unobstructed view of the whole product\n\nQuality beats quantity, but combine both for the best result.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-005',
    version: VERSION,
    title: 'Lighting and Background',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['lighting', 'background', 'natural light', 'daylight', 'flash', 'studio'],
    response: [
      { type: 'heading', content: 'Lighting and Background', level: 2 },
      { type: 'text', content: 'Lighting makes or breaks a photo. Shoot in soft daylight and keep the item out of direct sun, which causes harsh shadows. Use a plain wall, bedsheet, or table as a background so the product stands out. Avoid busy backgrounds that distract from the item.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-006',
    version: VERSION,
    title: 'Angles and Coverage',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['angles', 'multiple angles', 'different angles', 'show all sides', 'capture angles', 'all views'],
    response: [
      { type: 'heading', content: 'Angles and Coverage', level: 2 },
      { type: 'text', content: 'Capture the item from every side buyers care about: front, back, top, bottom, and any unique feature. For electronics, show ports and screens; for furniture, show legs and surfaces; for clothing, show the label and any flaws. Full coverage builds trust and cuts down on "is this available?" messages.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-007',
    version: VERSION,
    title: 'Show Flaws Honestly',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['flaws', 'defects', 'wear', 'honest photos', 'show damage', 'scratches photo'],
    response: [
      { type: 'heading', content: 'Show Flaws Honestly', level: 2 },
      { type: 'text', content: 'Photograph any scratches, dents, or signs of wear close up. Buyers appreciate honesty and are more likely to trust — and pay — when the condition is clear up front. Hiding damage leads to returns and bad reviews, so show it and mention it in the description.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-008',
    version: VERSION,
    title: 'Use a Size Reference',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['size reference', 'scale', 'measuring', 'reference object', 'dimensions photo'],
    response: [
      { type: 'heading', content: 'Use a Size Reference', level: 2 },
      { type: 'text', content: 'For clothing, bags, or electronics, include a photo with a size reference such as a ruler, coin, or hand. This helps buyers judge scale without asking. For furniture and appliances, note the exact dimensions in the description as well.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-009',
    version: VERSION,
    title: 'Add a Video',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['video', 'add video', 'upload video', 'clip', 'short video'],
    response: [
      { type: 'heading', content: 'Add a Video', level: 2 },
      { type: 'text', content: 'A short video shows the item in motion and builds extra confidence. Where supported, add a clip of the product working — for example, a phone powering on or a appliance running. Keep it steady, well-lit, and under a minute. Videos supplement, not replace, your photos.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PHO-010',
    version: VERSION,
    title: 'Edit or Remove Photos',
    intent: 'LISTING_ADVICE',
    category: 'photos',
    triggers: ['remove photo', 'delete photo', 'edit photo', 'replace photo', 'change photo', 'swap photo'],
    response: [
      { type: 'heading', content: 'Edit or Remove Photos', level: 2 },
      { type: 'text', content: 'You can change your photos any time. Open the listing, choose "Edit," then tap a photo to replace or delete it. Reorder by dragging so the best image leads. Save the update and the new set appears in search within a few minutes.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── TITLES & DESCRIPTIONS (10) ─────────────────────────
  {
    id: 'LIS-TIT-001',
    version: VERSION,
    title: 'Write a Good Title',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['write title', 'title tips', 'good title', 'how to write a title', 'write my title', 'title', 'headline', 'listing title', 'how should i write my title'],
    response: [
      { type: 'heading', content: 'Write a Good Title', level: 2 },
      { type: 'text', content: 'A clear, descriptive title helps buyers find your listing fast. What works well:\n\n• Start with the brand and model (e.g. "iPhone 14 Pro Max")\n• Add the condition — "New", "Like New", "Gently Used"\n• Mention key specs — storage, colour, year\n• Keep it under 60 characters for full visibility\n• Avoid ALL CAPS, excessive punctuation, and special characters\n\nExample: "iPhone 14 Pro Max 256GB — Deep Purple — Excellent Condition"' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-002',
    version: VERSION,
    title: 'Title Length and Format',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['title length', 'title character', '60 characters', 'title format', 'title too long', 'title limit'],
    response: [
      { type: 'heading', content: 'Title Length and Format', level: 2 },
      { type: 'text', content: 'Keep titles tight and readable. Aim for under 60 characters so the full line shows in search and previews. Put the most important words first — brand, model, condition — because the start is what buyers scan. Use a single dash or comma to separate parts; too many symbols look like spam.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-003',
    version: VERSION,
    title: 'Put Brand and Model in the Title',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['brand', 'model', 'brand and model', 'include brand', 'brand in title'],
    response: [
      { type: 'heading', content: 'Put Brand and Model in the Title', level: 2 },
      { type: 'text', content: 'Buyers search by brand and model, so name them exactly. "Samsung Galaxy S23 Ultra" performs far better than "nice phone for sale." Accurate naming also filters out the wrong inquiries and attracts serious buyers.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-004',
    version: VERSION,
    title: 'Show Condition in the Title',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['condition in title', 'title condition', 'new title', 'like new', 'condition label'],
    response: [
      { type: 'heading', content: 'Show Condition in the Title', level: 2 },
      { type: 'text', content: 'A one-word condition label sets expectations instantly: "New", "Like New", "Gently Used", or "Fair". It saves back-and-forth and matches buyers to the right item. Keep the word honest — the photos and description should back it up.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-005',
    version: VERSION,
    title: 'Write a Good Description',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['write description', 'description tips', 'good description', 'how to write a description', 'description', 'describe item', 'how do i write a good description', 'write a good description'],
    response: [
      { type: 'heading', content: 'Write a Good Description', level: 2 },
      { type: 'text', content: 'A good description answers buyer questions before they ask. Cover:\n\n• Brand, model, and key specifications up front\n• Condition honestly — including any scratches, dents, or wear\n• Original price and how long you have owned it\n• What is included — box, charger, accessories, warranty\n• Why you are selling, to build trust\n• Short paragraphs and bullet points for easy reading' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-006',
    version: VERSION,
    title: 'Structure Your Description',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['description structure', 'organize description', 'paragraphs', 'bullet points description', 'format description'],
    response: [
      { type: 'heading', content: 'Structure Your Description', level: 2 },
      { type: 'text', content: 'Make the description easy to scan. Lead with the essentials — what it is and its condition — then use short paragraphs or bullets for specs, inclusions, and flaws. Buyers skim on phones, so front-load the details that decide a sale.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-007',
    version: VERSION,
    title: 'What to Include in the Description',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['what to include', 'included items', 'what comes with', 'box charger', 'accessories included'],
    response: [
      { type: 'heading', content: 'What to Include in the Description', level: 2 },
      { type: 'text', content: 'List everything that comes with the item: original box, charger, cables, manuals, warranty card, or spare parts. Buyers value a complete set and it supports your price. If something is missing, say so clearly.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-008',
    version: VERSION,
    title: 'Be Honest About Condition',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['honest description', 'mention scratches', 'describe wear', 'condition honestly', 'honest about condition'],
    response: [
      { type: 'heading', content: 'Be Honest About Condition', level: 2 },
      { type: 'text', content: 'Describe wear exactly: "light scratch on the back", "battery health 88%", "tiny mark on the corner". Honest condition notes reduce returns and disputes, and buyers tend to pay more to a seller they trust.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-009',
    version: VERSION,
    title: 'Use Keywords Buyers Search',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['keywords', 'searchable', 'seo', 'find my listing', 'search terms', 'get found'],
    response: [
      { type: 'heading', content: 'Use Keywords Buyers Search', level: 2 },
      { type: 'text', content: 'Think like a buyer and use the words they type: the exact product name, common variants, and alternatives ("smartphone", "mobile", "cell phone"). Natural keywords in the title and description help your listing surface in search without stuffing.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-TIT-010',
    version: VERSION,
    title: 'Avoid Spammy Titles',
    intent: 'LISTING_ADVICE',
    category: 'titles',
    triggers: ['all caps', 'excessive punctuation', 'special characters', 'spammy title', 'clickbait', 'urgent in title'],
    response: [
      { type: 'heading', content: 'Avoid Spammy Titles', level: 2 },
      { type: 'text', content: 'Titles in ALL CAPS, with "!!!", or packed with hashtags look like spam and can be hidden or removed. Keep it clean and factual. Let the photos and price do the selling — a calm, clear title earns more trust.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── PRICING (10) ─────────────────────────
  {
    id: 'LIS-PRI-001',
    version: VERSION,
    title: 'Price Your Item',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['price', 'pricing', 'how to price', 'how should i price', 'price my item', 'set price', 'how should i price my item'],
    response: [
      { type: 'heading', content: 'Price Your Item', level: 2 },
      { type: 'text', content: 'A fair price sells faster. Start by checking what similar items are listed for, then set yours based on condition and how quickly you want to sell. Price 5-10% above your minimum to leave room for negotiation, and review after a week if inquiries are slow.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-002',
    version: VERSION,
    title: 'Research the Market Price',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['market price', 'compare prices', 'similar listings', 'research price', 'check price', 'going rate'],
    response: [
      { type: 'heading', content: 'Research the Market Price', level: 2 },
      { type: 'text', content: 'Search ValClassifieds for the same brand, model, and condition to see the going rate. Note the spread between asking and sold prices, and weight your item accordingly. Local demand also shifts prices, so check listings near you.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-003',
    version: VERSION,
    title: 'Price by Condition',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['condition price', 'condition guide', 'new price', 'used price', 'price by condition', 'condition based pricing'],
    response: [
      { type: 'heading', content: 'Price by Condition', level: 2 },
      { type: 'text', content: 'Use this guide as a starting point against the new price:\n\n• New (sealed): 80-100%\n• Like New: 70-85%\n• Good: 50-70%\n• Fair (visible wear): 30-50%\n\nAdjust for demand, age, and accessories included.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-004',
    version: VERSION,
    title: 'Leave Room to Negotiate',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['negotiate room', 'room for negotiation', 'price above minimum', 'bargaining', 'negotiation room'],
    response: [
      { type: 'heading', content: 'Leave Room to Negotiate', level: 2 },
      { type: 'text', content: 'Many buyers will offer below asking. List 5-10% above your true minimum so you can meet in the middle and still be happy. If your price is already your floor, say "firm" politely to reduce back-and-forth.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-005',
    version: VERSION,
    title: 'Bundle Discounts',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['bundle', 'multiple items', 'discount bundle', 'sell together', 'lot sale'],
    response: [
      { type: 'heading', content: 'Bundle Discounts', level: 2 },
      { type: 'text', content: 'Selling several related items? List them as a bundle with a small discount versus buying separately. Bundles clear stock faster and attract buyers who want the whole set — for example, a phone with case and charger.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-006',
    version: VERSION,
    title: 'Update Price If No Interest',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['no inquiries', 'lower price', 'reduce price', 'update price', 'not selling', 'drop price'],
    response: [
      { type: 'heading', content: 'Update Price If No Interest', level: 2 },
      { type: 'text', content: 'If a week passes with few views or messages, the price is likely high for the market. Lower it in small steps and renew the listing to return it to the top. A modest drop often triggers a burst of new interest.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-007',
    version: VERSION,
    title: 'Free vs Paid Listing',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['free listing', 'listing fee', 'paid listing', 'cost to list', 'is it free', 'charge to post'],
    response: [
      { type: 'heading', content: 'Free vs Paid Listing', level: 2 },
      { type: 'text', content: 'Posting a basic listing on ValClassifieds is free. Optional paid upgrades — such as featuring or bumping — are available if you want more visibility, but they are never required to sell. Check the pricing page for the latest optional fees.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-008',
    version: VERSION,
    title: 'Present Your Price Clearly',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['price format', 'show price', 'fixed price', 'mention price', 'display price'],
    response: [
      { type: 'heading', content: 'Present Your Price Clearly', level: 2 },
      { type: 'text', content: 'Always show a clear, final price in the price field — buyers trust transparent listings. If you are open to offers, say so in the description rather than leaving the price blank, which can look like a scam or get skipped.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-009',
    version: VERSION,
    title: 'Price for a Quick Sale',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['quick sale', 'sell fast', 'urgent sale', 'price to sell', 'need it gone'],
    response: [
      { type: 'heading', content: 'Price for a Quick Sale', level: 2 },
      { type: 'text', content: 'If speed matters more than top value, price at the lower end of the market — around or just below similar listings. A sharp price draws immediate messages and often sparks a quick, clean sale.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-PRI-010',
    version: VERSION,
    title: 'Avoid Overpricing',
    intent: 'LISTING_ADVICE',
    category: 'pricing',
    triggers: ['overpriced', 'too expensive', 'priced too high', 'lower my price', 'asking too much'],
    response: [
      { type: 'heading', content: 'Avoid Overpricing', level: 2 },
      { type: 'text', content: 'An item priced well above comparable listings tends to sit unsold and gather little interest. Re-anchor to the market: check recent sold prices, trim to a competitive number, and renew. A fair price almost always beats a hopeful one.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── CATEGORIES & ATTRIBUTES (8) ─────────────────────────
  {
    id: 'LIS-CAT-001',
    version: VERSION,
    title: 'Choose the Right Category',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['choose category', 'correct category', 'select category', 'category', 'how to choose category', 'how do i choose the correct category', 'pick a category'],
    response: [
      { type: 'heading', content: 'Choose the Right Category', level: 2 },
      { type: 'text', content: 'Picking the correct category puts your listing in front of the right buyers and helps search and filters work. Start broad — Vehicles, Electronics, Home — then pick the specific subcategory that matches your item. When unsure, choose the category buyers would browse to find it.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-002',
    version: VERSION,
    title: 'Category Affects Visibility',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['visibility', 'category affects', 'wrong category', 'category matters', 'category visibility'],
    response: [
      { type: 'heading', content: 'Category Affects Visibility', level: 2 },
      { type: 'text', content: 'A wrong category hides your listing from the buyers who want it and shows it to the wrong ones. Listings in the correct category rank better in filtered search and get more relevant views, so a careful choice pays off in inquiries.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-003',
    version: VERSION,
    title: 'Use Specific Subcategories',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['subcategory', 'subcategories', 'specific category', 'narrow category', 'specific subcategory'],
    response: [
      { type: 'heading', content: 'Use Specific Subcategories', level: 2 },
      { type: 'text', content: 'Drill down to the closest subcategory — "Smartphones" beats "Electronics", and "Sofas" beats "Furniture". Specific subcategories feed the right filters (brand, storage, size) so serious buyers can find you in a couple of taps.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-004',
    version: VERSION,
    title: 'Fill In Attributes',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['attributes', 'specs', 'specifications', 'details field', 'item attributes', 'fill attributes'],
    response: [
      { type: 'heading', content: 'Fill In Attributes', level: 2 },
      { type: 'text', content: 'Attributes are the structured fields — brand, model, condition, colour, storage. Fill them all in; they power filters and make your listing searchable by the exact specs buyers choose. Complete attributes also look more trustworthy than a bare description.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-005',
    version: VERSION,
    title: 'Set the Condition Attribute',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['condition attribute', 'set condition', 'condition dropdown', 'state', 'condition field'],
    response: [
      { type: 'heading', content: 'Set the Condition Attribute', level: 2 },
      { type: 'text', content: 'Choose the condition that matches reality — New, Like New, Good, or Fair. The condition attribute drives search filters and sets buyer expectations, so keep it consistent with your photos and description.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-006',
    version: VERSION,
    title: 'Brand and Model Attributes',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['brand attribute', 'model field', 'make model', 'brand field', 'model attribute'],
    response: [
      { type: 'heading', content: 'Brand and Model Attributes', level: 2 },
      { type: 'text', content: 'Enter the exact brand and model in their fields, not just the title. Accurate brand and model attributes let buyers filter precisely (e.g. "iPhone 14" or "Samsung S23") and improve where your listing appears in results.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-007',
    version: VERSION,
    title: 'Size and Dimensions Attributes',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['size attribute', 'dimensions field', 'measurement field', 'size field', 'dimensions'],
    response: [
      { type: 'heading', content: 'Size and Dimensions Attributes', level: 2 },
      { type: 'text', content: 'For clothing, furniture, and appliances, add size and dimensions in the attributes. These fields help buyers confirm fit and space before they message, reducing "is this still available?" questions and wasted trips.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-CAT-008',
    version: VERSION,
    title: 'Year and Variant Attributes',
    intent: 'LISTING_ADVICE',
    category: 'categories',
    triggers: ['year', 'variant', 'version', 'manufacture year', 'model year'],
    response: [
      { type: 'heading', content: 'Year and Variant Attributes', level: 2 },
      { type: 'text', content: 'For vehicles, electronics, and dated items, set the manufacture year and variant (e.g. "2022", "Pro", "512GB"). These details separate your listing from similar ones and match the exact searches buyers run.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── LOCATION & PUBLISHING (6) ─────────────────────────
  {
    id: 'LIS-LOC-001',
    version: VERSION,
    title: 'Set Your Location',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['location', 'set location', 'add location', 'your city', 'where to list', 'set your location'],
    response: [
      { type: 'heading', content: 'Set Your Location', level: 2 },
      { type: 'text', content: 'Add the city or area where the item is available. Location powers "near me" search and helps local buyers find you. Keep it accurate — buyers arrange pickups based on it, and a wrong city wastes everyone\'s time.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-LOC-002',
    version: VERSION,
    title: 'Location Affects Buyers',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['local buyers', 'near me', 'location matters', 'buyers nearby', 'local pickup interest'],
    response: [
      { type: 'heading', content: 'Location Affects Buyers', level: 2 },
      { type: 'text', content: 'Most ValClassifieds sales are local. A clear location brings nearby buyers who can meet and collect, while a missing or vague location loses them. List in the city you can actually meet in for the smoothest experience.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-LOC-003',
    version: VERSION,
    title: 'Publish Your Listing',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['publish', 'go live', 'make live', 'post my listing', 'activate listing', 'publish listing'],
    response: [
      { type: 'heading', content: 'Publish Your Listing', level: 2 },
      { type: 'text', content: 'When photos, title, description, price, category, and location are ready, tap "Publish" (or "Post Listing"). Your ad goes live and appears in search within a few minutes. You can edit or renew it any time from "My Listings".' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-LOC-004',
    version: VERSION,
    title: 'Review Before Publishing',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['review before', 'check before publish', 'preview', 'before posting', 'proofread'],
    response: [
      { type: 'heading', content: 'Review Before Publishing', level: 2 },
      { type: 'text', content: 'Before you publish, preview the listing as buyers will see it. Check the first photo, the title for typos, the price, and that the location is right. A quick review avoids edits and rebuilds trust from the first view.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-LOC-005',
    version: VERSION,
    title: 'Shipping vs Local Pickup',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['shipping', 'delivery', 'pickup', 'local pickup', 'postage', 'ship item'],
    response: [
      { type: 'heading', content: 'Shipping vs Local Pickup', level: 2 },
      { type: 'text', content: 'Decide how the item will change hands. Local pickup is simplest and safest for most sales — meet in a public place. If you offer shipping, state who pays, use a tracked service, and never ship before payment clears. Mention the method clearly in the listing.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-LOC-006',
    version: VERSION,
    title: 'Listing Status: Draft, Active, Sold',
    intent: 'LISTING_ADVICE',
    category: 'location',
    triggers: ['draft', 'status', 'active', 'sold', 'listing state', 'pending', 'listing status'],
    response: [
      { type: 'heading', content: 'Listing Status: Draft, Active, Sold', level: 2 },
      { type: 'text', content: 'Your listing moves through statuses: Draft (saved, not public), Active (live and searchable), and Sold (closed). You can save a draft to finish later, pause an active listing, or mark it Sold when the deal is done so buyers know it is gone.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },

  // ───────────────────────── EDIT / RENEW / DELETE (6) ─────────────────────────
  {
    id: 'LIS-EDT-001',
    version: VERSION,
    title: 'Edit Your Listing',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['edit listing', 'edit my listing', 'change listing', 'modify listing', 'update listing', 'how do i edit my listing', 'how to edit'],
    response: [
      { type: 'heading', content: 'Edit Your Listing', level: 2 },
      { type: 'text', content: 'To change a live listing, open it from "My Listings" and tap "Edit." You can update photos, title, description, price, category, or location, then save. Edits appear in search within a few minutes. Keeping details current avoids confusion and builds trust.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-EDT-002',
    version: VERSION,
    title: 'Renew or Bump Your Listing',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['renew', 'bump', 'refresh listing', 'renew my listing', 'extend', 'how do i renew my listing'],
    response: [
      { type: 'heading', content: 'Renew or Bump Your Listing', level: 2 },
      { type: 'text', content: 'Listings drift down over time. Renewing resets the date so yours returns near the top of search; bumping (where available) promotes it for extra visibility. Use renew when inquiries slow, or bump for a quick push on a popular item.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-EDT-003',
    version: VERSION,
    title: 'Mark as Sold',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['mark sold', 'sold', 'mark as sold', 'item sold', 'close as sold'],
    response: [
      { type: 'heading', content: 'Mark as Sold', level: 2 },
      { type: 'text', content: 'Once the item is gone, mark the listing Sold from "My Listings." This hides it from active search, stops new messages, and keeps your history tidy. Buyers browsing your profile will see it closed rather than available.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-EDT-004',
    version: VERSION,
    title: 'Delete Your Listing',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['delete listing', 'delete my listing', 'remove listing', 'take down', 'how do i delete my listing'],
    response: [
      { type: 'heading', content: 'Delete Your Listing', level: 2 },
      { type: 'text', content: 'To remove a listing entirely, open it from "My Listings," choose "Delete" or "Remove," and confirm. Deleted listings are taken out of search and cannot be restored — if you might sell again later, mark it Sold or pause it instead.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-EDT-005',
    version: VERSION,
    title: 'Pause or Hide a Listing',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['pause', 'hide listing', 'temporarily hide', 'unlist', 'take a break'],
    response: [
      { type: 'heading', content: 'Pause or Hide a Listing', level: 2 },
      { type: 'text', content: 'If you need a break — away on holiday or undecided — pause the listing instead of deleting it. A paused listing is hidden from search but keeps your photos and history, and you can bring it back in one tap when you are ready.' },
    ],
    actions: LISTING_ACTIONS,
    metadata: META,
    lastUpdated: LAST_UPDATED,
  },
  {
    id: 'LIS-EDT-006',
    version: VERSION,
    title: 'Duplicate or Repost a Listing',
    intent: 'LISTING_ADVICE',
    category: 'edit',
    triggers: ['duplicate', 'repost', 'copy listing', 'post again', 'relist'],
    response: [
      { type: 'heading', content: 'Duplicate or Repost a Listing', level: 2 },
      { type: 'text', content: 'Selling the same item again, or a second identical one? Duplicate the old listing to reuse its photos and text, then adjust any details and publish. Reposting a fresh copy also gives a sold-out listing a new lease in search.' },
    ],
    actions: LISTING_ACTIONS,
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

function matchArticles(pool: ListingArticle[], query: string): ListingArticle | null {
  let best: { article: ListingArticle; score: number; triggerLen: number } | null = null
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

export function selectListingArticle(
  classification: IntentClassification
): ListingArticle {
  const query = (classification.entities.query ?? '').toLowerCase().trim()
  const matched = matchArticles(articles, query)
  if (matched) return matched
  return articles.find((a) => a.isDefault) ?? articles[0]
}
