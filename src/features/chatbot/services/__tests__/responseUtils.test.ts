import { describe, it, expect } from 'vitest'
import {
  formatPrice,
  formatEntitySummary,
  sanitizeText,
  truncateText,
  isListLike,
  extractListItems,
  parseMarkdownSections,
} from '../responseUtils'

describe('responseUtils', () => {
  describe('formatPrice', () => {
    it('formats a price as INR currency', () => {
      expect(formatPrice(15000)).toBe('₹15,000')
    })

    it('formats zero', () => {
      expect(formatPrice(0)).toBe('₹0')
    })

    it('formats large numbers', () => {
      expect(formatPrice(100000)).toBe('₹1,00,000')
    })

    it('rounds to whole number', () => {
      expect(formatPrice(15000.50)).toBe('₹15,001')
    })
  })

  describe('formatEntitySummary', () => {
    it('formats category only', () => {
      expect(formatEntitySummary({ category: 'Mobiles' })).toBe('Mobiles')
    })

    it('formats category and budget', () => {
      const result = formatEntitySummary({ category: 'Mobiles', budget: { max: 20000 } })
      expect(result).toContain('Mobiles')
      expect(result).toContain('₹20,000')
    })

    it('formats category, location, and budget', () => {
      const result = formatEntitySummary({
        category: 'Cars',
        location: 'Delhi',
        budget: { min: 500000, max: 1000000 },
      })
      expect(result).toContain('Cars')
      expect(result).toContain('Delhi')
      expect(result).toContain('₹5,00,000')
      expect(result).toContain('₹10,00,000')
    })

    it('formats brand and condition', () => {
      const result = formatEntitySummary({ brand: 'Samsung', condition: 'Used' })
      expect(result).toContain('Samsung')
      expect(result).toContain('Used')
    })

    it('handles empty entities', () => {
      expect(formatEntitySummary({})).toBe('')
    })

    it('handles budget with only min', () => {
      const result = formatEntitySummary({ budget: { min: 10000 } })
      expect(result).toBe('')
    })
  })

  describe('sanitizeText', () => {
    it('removes HTML tags', () => {
      expect(sanitizeText('<p>Hello</p>')).toBe('Hello')
    })

    it('removes script tags and their content', () => {
      expect(sanitizeText('<script>alert("xss")</script>Hello')).toBe('Hello')
    })

    it('handles nested tags', () => {
      expect(sanitizeText('<div><span>Hello</span></div>')).toBe('Hello')
    })

    it('trims whitespace', () => {
      expect(sanitizeText('  Hello  ')).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(sanitizeText('')).toBe('')
    })

    it('handles string with no tags', () => {
      expect(sanitizeText('Hello world')).toBe('Hello world')
    })
  })

  describe('truncateText', () => {
    it('returns original text if within limit', () => {
      expect(truncateText('Hello', 10)).toBe('Hello')
    })

    it('truncates text exceeding limit', () => {
      const result = truncateText('Hello World this is a long text', 15)
      expect(result.length).toBeLessThanOrEqual(15)
      expect(result).toContain('...')
      expect(result).toBe('Hello World...')
    })

    it('handles exact length', () => {
      expect(truncateText('Hello', 5)).toBe('Hello')
    })
  })

  describe('isListLike', () => {
    it('detects bullet list', () => {
      expect(isListLike('- Item 1\n- Item 2\n- Item 3')).toBe(true)
    })

    it('detects numbered list', () => {
      expect(isListLike('1. First\n2. Second\n3. Third')).toBe(true)
    })

    it('detects star list', () => {
      expect(isListLike('* Item 1\n* Item 2')).toBe(true)
    })

    it('returns false for single line', () => {
      expect(isListLike('Just a sentence')).toBe(false)
    })

    it('returns false for non-list text', () => {
      expect(isListLike('Line one\nLine two\nLine three')).toBe(false)
    })
  })

  describe('extractListItems', () => {
    it('extracts bullet items', () => {
      const items = extractListItems('- Apple\n- Banana\n- Cherry')
      expect(items).toEqual(['Apple', 'Banana', 'Cherry'])
    })

    it('extracts numbered items', () => {
      const items = extractListItems('1. First\n2. Second\n3. Third')
      expect(items).toEqual(['First', 'Second', 'Third'])
    })

    it('handles mixed list', () => {
      const items = extractListItems('- Item 1\n2. Item 2\n- Item 3')
      expect(items).toEqual(['Item 1', 'Item 2', 'Item 3'])
    })

    it('returns empty array for no list items', () => {
      expect(extractListItems('No lists here')).toEqual([])
    })
  })

  describe('parseMarkdownSections', () => {
    it('parses plain text', () => {
      const sections = parseMarkdownSections('Hello world')
      expect(sections).toHaveLength(1)
      expect(sections[0].type).toBe('text')
    })

    it('parses headings', () => {
      const sections = parseMarkdownSections('## Title\nContent here')
      expect(sections.some(s => s.type === 'heading')).toBe(true)
    })

    it('parses bullet lists', () => {
      const sections = parseMarkdownSections('- Item 1\n- Item 2')
      expect(sections.some(s => s.type === 'info_section')).toBe(true)
    })

    it('parses numbered lists', () => {
      const sections = parseMarkdownSections('1. Step one\n2. Step two')
      expect(sections.some(s => s.type === 'numbered_steps')).toBe(true)
    })

    it('handles empty input', () => {
      expect(parseMarkdownSections('')).toEqual([])
      expect(parseMarkdownSections('  ')).toEqual([])
    })
  })
})
