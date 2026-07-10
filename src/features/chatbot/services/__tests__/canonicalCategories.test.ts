import { describe, it, expect } from 'vitest'
import {
  CANONICAL_CATEGORIES,
  CATEGORY_SLUGS,
  CATEGORY_NAMES,
  matchCategory,
  matchCategories,
  getCategoryBySlug,
  getCategoryByAlias,
  fuzzyMatchCategories,
} from '../canonicalCategories'

describe('canonicalCategories', () => {
  describe('CANONICAL_CATEGORIES', () => {
    it('has 16 categories', () => {
      expect(Object.keys(CANONICAL_CATEGORIES).length).toBe(16)
    })

    it('each category has required fields', () => {
      for (const [slug, cat] of Object.entries(CANONICAL_CATEGORIES)) {
        expect(cat.slug).toBe(slug)
        expect(cat.name).toBeDefined()
        expect(cat.keywords.length).toBeGreaterThan(0)
        expect(cat.aliases.length).toBeGreaterThan(0)
      }
    })

    it('all slugs are lowercase with hyphens', () => {
      for (const slug of Object.keys(CANONICAL_CATEGORIES)) {
        expect(slug).toMatch(/^[a-z-]+$/)
      }
    })
  })

  describe('CATEGORY_SLUGS', () => {
    it('returns all category slugs', () => {
      expect(CATEGORY_SLUGS.length).toBe(16)
      expect(CATEGORY_SLUGS).toContain('property')
      expect(CATEGORY_SLUGS).toContain('vehicles')
      expect(CATEGORY_SLUGS).toContain('mobiles-tablets')
      expect(CATEGORY_SLUGS).toContain('electronics')
      expect(CATEGORY_SLUGS).toContain('furniture-home')
      expect(CATEGORY_SLUGS).toContain('services')
      expect(CATEGORY_SLUGS).toContain('education')
      expect(CATEGORY_SLUGS).toContain('pets')
      expect(CATEGORY_SLUGS).toContain('kids')
      expect(CATEGORY_SLUGS).toContain('sports-hobbies')
      expect(CATEGORY_SLUGS).toContain('fashion-lifestyle')
      expect(CATEGORY_SLUGS).toContain('events')
      expect(CATEGORY_SLUGS).toContain('matrimonial')
      expect(CATEGORY_SLUGS).toContain('community')
      expect(CATEGORY_SLUGS).toContain('jobs')
      expect(CATEGORY_SLUGS).toContain('business-industrial')
    })
  })

  describe('CATEGORY_NAMES', () => {
    it('returns all category names', () => {
      expect(CATEGORY_NAMES.length).toBe(16)
      expect(CATEGORY_NAMES).toContain('Property')
      expect(CATEGORY_NAMES).toContain('Vehicles')
      expect(CATEGORY_NAMES).toContain('Mobiles & Tablets')
    })
  })

  describe('matchCategory', () => {
    it('matches exact keywords', () => {
      expect(matchCategory('phone')).toBe('mobiles-tablets')
      expect(matchCategory('car')).toBe('vehicles')
      expect(matchCategory('laptop')).toBe('electronics')
      expect(matchCategory('sofa')).toBe('furniture-home')
      expect(matchCategory('pet')).toBe('pets')
    })

    it('matches plural forms', () => {
      expect(matchCategory('phones')).toBe('mobiles-tablets')
      expect(matchCategory('cars')).toBe('vehicles')
      expect(matchCategory('laptops')).toBe('electronics')
    })

    it('matches brand names', () => {
      expect(matchCategory('iphone')).toBe('mobiles-tablets')
      expect(matchCategory('samsung')).toBe('mobiles-tablets')
      expect(matchCategory('macbook')).toBe('electronics')
    })

    it('matches partial text in queries', () => {
      expect(matchCategory('find me a phone')).toBe('mobiles-tablets')
      expect(matchCategory('looking for a car')).toBe('vehicles')
    })

    it('returns undefined for unmatched text', () => {
      expect(matchCategory('xyzabc123')).toBeUndefined()
    })

    it('is case insensitive', () => {
      expect(matchCategory('PHONE')).toBe('mobiles-tablets')
      expect(matchCategory('Phone')).toBe('mobiles-tablets')
      expect(matchCategory('pHoNe')).toBe('mobiles-tablets')
    })

    it('prefers longest match', () => {
      // "iphone" (6 chars) should match before "phone" (5 chars) if both map to same category
      expect(matchCategory('iphone')).toBe('mobiles-tablets')
    })

    it('matches real estate keywords', () => {
      expect(matchCategory('house')).toBe('property')
      expect(matchCategory('apartment')).toBe('property')
      expect(matchCategory('rent')).toBe('property')
    })

    it('matches job keywords', () => {
      expect(matchCategory('job')).toBe('jobs')
      expect(matchCategory('vacancy')).toBe('jobs')
      expect(matchCategory('hiring')).toBe('jobs')
    })

    it('matches education keywords', () => {
      expect(matchCategory('course')).toBe('education')
      expect(matchCategory('textbook')).toBe('education')
    })

    it('matches fashion keywords', () => {
      expect(matchCategory('shirt')).toBe('fashion-lifestyle')
      expect(matchCategory('shoes')).toBe('fashion-lifestyle')
      expect(matchCategory('watch')).toBe('fashion-lifestyle')
    })

    it('matches sports keywords', () => {
      expect(matchCategory('cricket')).toBe('sports-hobbies')
      expect(matchCategory('guitar')).toBe('sports-hobbies')
    })

    it('matches kids keywords', () => {
      expect(matchCategory('baby')).toBe('kids')
      expect(matchCategory('toys')).toBe('kids')
    })

    it('matches events keywords', () => {
      expect(matchCategory('ticket')).toBe('events')
      expect(matchCategory('concert')).toBe('events')
    })

    it('matches community keywords', () => {
      expect(matchCategory('community')).toBe('community')
      expect(matchCategory('group')).toBe('community')
    })

    it('matches business keywords', () => {
      expect(matchCategory('industrial')).toBe('business-industrial')
      expect(matchCategory('machinery')).toBe('business-industrial')
    })
  })

  describe('matchCategories', () => {
    it('returns multiple categories for multiple keywords', () => {
      const result = matchCategories(['phone', 'car'])
      expect(result).toContain('mobiles-tablets')
      expect(result).toContain('vehicles')
    })

    it('returns empty array for no matches', () => {
      expect(matchCategories(['xyzabc', 'qwerty'])).toEqual([])
    })

    it('deduplicates categories', () => {
      const result = matchCategories(['phone', 'mobile', 'smartphone'])
      expect(result).toEqual(['mobiles-tablets'])
    })

    it('orders by match count', () => {
      const result = matchCategories(['phone', 'mobile', 'car'])
      expect(result[0]).toBe('mobiles-tablets')
      expect(result).toContain('vehicles')
    })
  })

  describe('getCategoryBySlug', () => {
    it('returns category for valid slug', () => {
      const cat = getCategoryBySlug('vehicles')
      expect(cat).toBeDefined()
      expect(cat!.name).toBe('Vehicles')
      expect(cat!.slug).toBe('vehicles')
    })

    it('returns undefined for invalid slug', () => {
      expect(getCategoryBySlug('nonexistent')).toBeUndefined()
    })

    it('returns all 16 categories', () => {
      for (const slug of CATEGORY_SLUGS) {
        expect(getCategoryBySlug(slug)).toBeDefined()
      }
    })
  })

  describe('getCategoryByAlias', () => {
    it('matches by name', () => {
      expect(getCategoryByAlias('Vehicles')?.slug).toBe('vehicles')
      expect(getCategoryByAlias('Property')?.slug).toBe('property')
    })

    it('matches by alias', () => {
      expect(getCategoryByAlias('Real Estate')?.slug).toBe('property')
      expect(getCategoryByAlias('Cars & Vehicles')?.slug).toBe('vehicles')
      expect(getCategoryByAlias('Mobiles')?.slug).toBe('mobiles-tablets')
    })

    it('matches by keyword', () => {
      expect(getCategoryByAlias('phone')?.slug).toBe('mobiles-tablets')
      expect(getCategoryByAlias('car')?.slug).toBe('vehicles')
    })

    it('is case insensitive', () => {
      expect(getCategoryByAlias('vehicles')?.slug).toBe('vehicles')
      expect(getCategoryByAlias('VEHICLES')?.slug).toBe('vehicles')
    })

    it('returns undefined for unknown alias', () => {
      expect(getCategoryByAlias('UnknownThing')).toBeUndefined()
    })
  })

  describe('fuzzyMatchCategories', () => {
    it('matches partial text', () => {
      const result = fuzzyMatchCategories('find me a phone')
      expect(result).toContain('mobiles-tablets')
    })

    it('matches multiple categories', () => {
      const result = fuzzyMatchCategories('phone and car')
      expect(result).toContain('mobiles-tablets')
      expect(result).toContain('vehicles')
    })

    it('matches category names', () => {
      const result = fuzzyMatchCategories('Vehicles')
      expect(result).toContain('vehicles')
    })

    it('returns empty for no matches', () => {
      expect(fuzzyMatchCategories('xyzabc123')).toEqual([])
    })

    it('deduplicates results', () => {
      const result = fuzzyMatchCategories('phone mobile smartphone')
      expect(result.filter(s => s === 'mobiles-tablets').length).toBe(1)
    })
  })
})
