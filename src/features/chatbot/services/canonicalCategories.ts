/**
 * Canonical Category System
 *
 * This is the SINGLE SOURCE OF TRUTH for all category mappings.
 * Every system (intent classifier, NL parser, marketplace search, handlers)
 * MUST reference this file instead of defining its own mappings.
 *
 * Categories are keyed by their database slug (the authoritative identifier).
 */

export interface CanonicalCategory {
  slug: string
  name: string
  /** Keywords that map to this category (used by intent classifier & NL parser) */
  keywords: string[]
  /** Human-readable aliases for display */
  aliases: string[]
}

/**
 * All canonical categories with their keyword mappings.
 * The slug matches the database `categories.slug` column.
 */
export const CANONICAL_CATEGORIES: Record<string, CanonicalCategory> = {
  'property': {
    slug: 'property',
    name: 'Property',
    keywords: ['property', 'real estate', 'house', 'apartment', 'flat', 'rent', 'rental', 'land', 'plot', 'villa', 'bungalow', 'office space', 'shop', 'commercial'],
    aliases: ['Real Estate', 'Housing'],
  },
  'vehicles': {
    slug: 'vehicles',
    name: 'Vehicles',
    keywords: ['car', 'cars', 'vehicle', 'vehicles', 'automobile', 'sedan', 'suv', 'truck', 'van', 'jeep', 'bike', 'bikes', 'motorcycle', 'motorbike', 'scooter', 'bicycle', 'cycle', 'auto', 'tempero', 'ev'],
    aliases: ['Cars & Vehicles', 'Bikes & Scooters', 'Automobiles'],
  },
  'jobs': {
    slug: 'jobs',
    name: 'Jobs',
    keywords: ['job', 'jobs', 'vacancy', 'vacancies', 'employment', 'hiring', 'recruitment', 'work', 'career', 'internship', 'freelance', 'part time', 'full time'],
    aliases: ['Employment', 'Careers'],
  },
  'mobiles-tablets': {
    slug: 'mobiles-tablets',
    name: 'Mobiles & Tablets',
    keywords: ['phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'iphone', 'samsung', 'android', 'tablet', 'ipad', 'cellphone', 'handset'],
    aliases: ['Electronics', 'Mobiles'],
  },
  'electronics': {
    slug: 'electronics',
    name: 'Electronics',
    keywords: ['laptop', 'laptops', 'computer', 'macbook', 'notebook', 'tv', 'television', 'monitor', 'camera', 'dslr', 'gopro', 'headphones', 'earbuds', 'earphones', 'speaker', 'speakers', 'kitchen', 'appliance', 'mixer', 'oven', 'microwave', 'fridge', 'refrigerator', 'gaming', 'playstation', 'xbox', 'nintendo', 'ps5', 'ps4', 'console', 'accessories', 'gadget', 'gadgets'],
    aliases: ['Computers & Laptops', 'Electronics & Appliances', 'Gadgets'],
  },
  'furniture-home': {
    slug: 'furniture-home',
    name: 'Furniture & Home',
    keywords: ['furniture', 'sofa', 'table', 'chair', 'bed', 'wardrobe', 'desk', 'cabinet', 'shelf', 'home', 'decor', 'kitchen', 'appliance', 'curtain', 'carpet', 'mattress'],
    aliases: ['Home & Furniture', 'Home Decor'],
  },
  'services': {
    slug: 'services',
    name: 'Services',
    keywords: ['service', 'services', 'repair', 'plumber', 'electrician', 'cleaning', 'painting', 'tutor', 'coaching', 'consulting', 'catering', 'photography', 'event planning'],
    aliases: ['Professional Services'],
  },
  'education': {
    slug: 'education',
    name: 'Education',
    keywords: ['course', 'courses', 'tuition', 'coaching', 'class', 'classes', 'training', 'institute', 'school', 'college', 'university', 'book', 'books', 'textbook', 'novel', 'study'],
    aliases: ['Courses', 'Books & Media'],
  },
  'business-industrial': {
    slug: 'business-industrial',
    name: 'Business & Industrial',
    keywords: ['business', 'industrial', 'machinery', 'equipment', 'commercial', 'wholesale', 'bulk', 'factory', 'warehouse'],
    aliases: ['Industrial', 'Commercial'],
  },
  'pets': {
    slug: 'pets',
    name: 'Pets',
    keywords: ['pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'puppy', 'kitten', 'fish', 'bird', 'hamster', 'rabbit', 'pet supplies', 'pet food'],
    aliases: ['Pets & Pet Care', 'Animals'],
  },
  'kids': {
    slug: 'kids',
    name: 'Kids',
    keywords: ['baby', 'kids', 'child', 'children', 'stroller', 'crib', 'toys', 'toy', 'diaper', 'clothing', 'maternity', 'infant', 'toddler'],
    aliases: ['Baby & Kids', 'Baby Gear'],
  },
  'sports-hobbies': {
    slug: 'sports-hobbies',
    name: 'Sports & Hobbies',
    keywords: ['sports', 'sport', 'cricket', 'football', 'bat', 'racket', 'gym', 'fitness', 'yoga', 'cycling', 'hiking', 'camping', 'hobby', 'hobbies', 'collectible', 'guitar', 'piano', 'keyboard', 'instrument'],
    aliases: ['Sports & Leisure', 'Fitness', 'Musical Instruments'],
  },
  'fashion-lifestyle': {
    slug: 'fashion-lifestyle',
    name: 'Fashion & Lifestyle',
    keywords: ['fashion', 'clothing', 'dress', 'shirt', 'tshirt', 't-shirt', 'jeans', 'pants', 'jacket', 'coat', 'shoes', 'sneakers', 'boots', 'sandals', 'bag', 'bags', 'backpack', 'handbag', 'luggage', 'watch', 'watches', 'smartwatch', 'jewelry', 'accessories', 'beauty', 'cosmetics'],
    aliases: ['Fashion & Accessories', 'Clothing', 'Accessories'],
  },
  'events': {
    slug: 'events',
    name: 'Events',
    keywords: ['event', 'events', 'ticket', 'tickets', 'concert', 'show', 'party', 'wedding', 'celebration', 'festival'],
    aliases: ['Tickets', 'Entertainment'],
  },
  'matrimonial': {
    slug: 'matrimonial',
    name: 'Matrimonial',
    keywords: ['matrimonial', 'marriage', 'wedding', 'bride', 'groom', 'matrimony'],
    aliases: ['Marriage', 'Wedding'],
  },
  'community': {
    slug: 'community',
    name: 'Community',
    keywords: ['community', 'group', 'club', 'volunteer', 'charity', 'neighborhood', 'local'],
    aliases: ['Groups', 'Activities'],
  },
}

/** All valid category slugs */
export const CATEGORY_SLUGS = Object.keys(CANONICAL_CATEGORIES)

/** All category names (for display) */
export const CATEGORY_NAMES = Object.values(CANONICAL_CATEGORIES).map(c => c.name)

/**
 * Map a user keyword to a canonical category slug.
 * Returns the best-matching category slug, or undefined if no match.
 *
 * Uses longest-match-first strategy to prefer specific matches
 * (e.g., "iphone" → "mobiles-tablets" not "electronics").
 */
export function matchCategory(keyword: string): string | undefined {
  const lower = keyword.toLowerCase().trim()
  let bestMatch: string | undefined
  let bestLength = 0

  for (const [slug, category] of Object.entries(CANONICAL_CATEGORIES)) {
    for (const kw of category.keywords) {
      // Exact match
      if (lower === kw) {
        if (kw.length > bestLength) {
          bestLength = kw.length
          bestMatch = slug
        }
        continue
      }

      // Keyword appears as a whole word in the query
      // e.g., "phone" in "find me a phone"
      if (new RegExp(`\\b${escapeRegex(kw)}\\b`).test(lower)) {
        if (kw.length > bestLength) {
          bestLength = kw.length
          bestMatch = slug
        }
        continue
      }

      // Query appears as a whole word in the keyword
      // e.g., "car" in "cars" (yes) but NOT "house" in "warehouse" (no)
      if (kw.includes(lower) && lower.length >= 3) {
        const regex = new RegExp(`(?:^|\\b)${escapeRegex(lower)}(?:\\b|$)`)
        if (regex.test(kw)) {
          if (kw.length > bestLength) {
            bestLength = kw.length
            bestMatch = slug
          }
        }
      }
    }
  }

  return bestMatch
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Map multiple user keywords to category slugs.
 * Returns unique category slugs, ordered by relevance (most keywords matched first).
 */
export function matchCategories(keywords: string[]): string[] {
  const slugCounts = new Map<string, number>()

  for (const keyword of keywords) {
    const slug = matchCategory(keyword)
    if (slug) {
      slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1)
    }
  }

  return Array.from(slugCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => slug)
}

/**
 * Get a category by slug.
 */
export function getCategoryBySlug(slug: string): CanonicalCategory | undefined {
  return CANONICAL_CATEGORIES[slug]
}

/**
 * Get a category by any alias or keyword.
 */
export function getCategoryByAlias(alias: string): CanonicalCategory | undefined {
  const lower = alias.toLowerCase().trim()
  for (const category of Object.values(CANONICAL_CATEGORIES)) {
    if (category.name.toLowerCase() === lower) return category
    if (category.aliases.some(a => a.toLowerCase() === lower)) return category
    if (category.keywords.some(k => k.toLowerCase() === lower)) return category
  }
  return undefined
}

/**
 * Get all category slugs that match a search query.
 * Useful for broadening search when no exact match is found.
 */
export function fuzzyMatchCategories(query: string): string[] {
  const lower = query.toLowerCase().trim()
  const matches: string[] = []

  for (const [slug, category] of Object.entries(CANONICAL_CATEGORIES)) {
    // Check if any keyword is a substring of the query or vice versa
    for (const kw of category.keywords) {
      if (lower.includes(kw) || kw.includes(lower)) {
        matches.push(slug)
        break
      }
    }
    // Also check name and aliases
    if (lower.includes(category.name.toLowerCase())) {
      matches.push(slug)
    }
  }

  return [...new Set(matches)]
}
