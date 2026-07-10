import { describe, it, expect } from 'vitest'
import { classifyIntent } from '../intentClassifier'

describe('intentClassifier', () => {
  describe('GREETING', () => {
    it('classifies hello', () => {
      const result = classifyIntent('hello')
      expect(result.intent).toBe('GREETING')
      expect(result.confidence).toBeGreaterThan(0.5)
    })

    it('classifies hi', () => {
      expect(classifyIntent('hi').intent).toBe('GREETING')
    })

    it('classifies hey', () => {
      expect(classifyIntent('hey').intent).toBe('GREETING')
    })

    it('classifies good morning', () => {
      expect(classifyIntent('good morning').intent).toBe('GREETING')
    })

    it('classifies what\'s up', () => {
      expect(classifyIntent('what\'s up').intent).toBe('GREETING')
    })

    it('classifies how are you', () => {
      expect(classifyIntent('how are you').intent).toBe('GREETING')
    })
  })

  describe('SEARCH_LISTINGS', () => {
    it('classifies find phones', () => {
      const result = classifyIntent('find phones')
      expect(result.intent).toBe('SEARCH_LISTINGS')
      expect(result.entities.category).toBe('Mobiles & Tablets')
    })

    it('classifies looking for a laptop', () => {
      const result = classifyIntent('looking for a laptop')
      expect(result.intent).toBe('SEARCH_LISTINGS')
      expect(result.entities.category).toBe('Computers & Laptops')
    })

    it('classifies show me bikes', () => {
      expect(classifyIntent('show me bikes').intent).toBe('SEARCH_LISTINGS')
    })

    it('classifies I want to buy a car', () => {
      const result = classifyIntent('I want to buy a car')
      expect(result.intent).toBe('SEARCH_LISTINGS')
      expect(result.entities.category).toBe('Cars & Vehicles')
      expect(result.entities.buyerIntent).toBe(true)
    })

    it('classifies need a camera', () => {
      expect(classifyIntent('need a camera').intent).toBe('SEARCH_LISTINGS')
    })

    it('classifies any phones available', () => {
      expect(classifyIntent('any phones available').intent).toBe('SEARCH_LISTINGS')
    })

    it('extracts budget with under', () => {
      const result = classifyIntent('find phones under 20000')
      expect(result.entities.budget?.max).toBe(20000)
    })

    it('extracts budget with above', () => {
      const result = classifyIntent('show me cars above 500000')
      expect(result.entities.budget?.min).toBe(500000)
    })

    it('extracts budget range', () => {
      const result = classifyIntent('find laptops 30000 to 50000')
      expect(result.entities.budget?.min).toBe(30000)
      expect(result.entities.budget?.max).toBe(50000)
    })

    it('extracts location', () => {
      const result = classifyIntent('find bikes in Bangalore')
      expect(result.entities.location).toBe('Bangalore')
    })

    it('extracts brand', () => {
      const result = classifyIntent('find samsung phones')
      expect(result.entities.brand).toBe('Samsung')
    })

    it('extracts condition', () => {
      const result = classifyIntent('find used phones')
      expect(result.entities.condition).toBe('used')
    })

    it('extracts new condition', () => {
      const result = classifyIntent('find brand new laptops')
      expect(result.entities.condition).toBe('new')
    })

    it('marks missing budget for search', () => {
      const result = classifyIntent('find phones')
      expect(result.missingInformation).toContain('budget')
    })

    it('marks missing location for search', () => {
      const result = classifyIntent('find phones under 20000')
      expect(result.missingInformation).toContain('location')
    })
  })

  describe('BROWSE_CATEGORIES', () => {
    it('classifies what categories', () => {
      expect(classifyIntent('what categories do you have').intent).toBe('BROWSE_CATEGORIES')
    })

    it('classifies browse categories', () => {
      expect(classifyIntent('browse categories').intent).toBe('BROWSE_CATEGORIES')
    })

    it('classifies show categories', () => {
      expect(classifyIntent('show categories').intent).toBe('BROWSE_CATEGORIES')
    })

    it('classifies what can I find', () => {
      expect(classifyIntent('what can I find on this platform').intent).toBe('BROWSE_CATEGORIES')
    })
  })

  describe('LISTING_DETAILS', () => {
    it('classifies tell me about', () => {
      expect(classifyIntent('tell me about this listing').intent).toBe('LISTING_DETAILS')
    })

    it('classifies more info', () => {
      expect(classifyIntent('more info about this item').intent).toBe('LISTING_DETAILS')
    })

    it('classifies details about', () => {
      expect(classifyIntent('details about listing ABC123').intent).toBe('LISTING_DETAILS')
    })
  })

  describe('BUYING_HELP', () => {
    it('classifies how to buy', () => {
      expect(classifyIntent('how to buy on this platform').intent).toBe('BUYING_HELP')
    })

    it('classifies buying process', () => {
      expect(classifyIntent('what is the buying process').intent).toBe('BUYING_HELP')
    })

    it('classifies payment methods', () => {
      expect(classifyIntent('what payment methods are available').intent).toBe('BUYING_HELP')
    })
  })

  describe('SELLING_HELP', () => {
    it('classifies how to sell', () => {
      expect(classifyIntent('how to sell on this platform').intent).toBe('SELLING_HELP')
    })

    it('classifies post listing', () => {
      expect(classifyIntent('post a listing').intent).toBe('SELLING_HELP')
    })

    it('classifies create listing', () => {
      expect(classifyIntent('create a listing').intent).toBe('SELLING_HELP')
    })

    it('classifies sell my phone', () => {
      const result = classifyIntent('sell my phone')
      expect(result.intent).toBe('SELLING_HELP')
      expect(result.entities.sellerIntent).toBe(true)
    })
  })

  describe('PRICING_HELP', () => {
    it('classifies how much should I charge', () => {
      expect(classifyIntent('how much should I charge for my laptop').intent).toBe('PRICING_HELP')
    })

    it('classifies fair price', () => {
      expect(classifyIntent('what is a fair price for this').intent).toBe('PRICING_HELP')
    })

    it('classifies price check', () => {
      expect(classifyIntent('price check for phones').intent).toBe('PRICING_HELP')
    })
  })

  describe('SAFETY', () => {
    it('classifies is it safe', () => {
      expect(classifyIntent('is it safe to buy here').intent).toBe('SAFETY')
    })

    it('classifies safety tips', () => {
      expect(classifyIntent('safety tips for buying').intent).toBe('SAFETY')
    })

    it('classifies scam warning', () => {
      expect(classifyIntent('how to avoid scams').intent).toBe('SAFETY')
    })

    it('classifies OTP scam', () => {
      expect(classifyIntent('what is otp scam').intent).toBe('SAFETY')
    })
  })

  describe('CONTACT_SELLER', () => {
    it('classifies how to contact seller', () => {
      expect(classifyIntent('how to contact the seller').intent).toBe('CONTACT_SELLER')
    })

    it('classifies talk to seller', () => {
      expect(classifyIntent('talk to seller').intent).toBe('CONTACT_SELLER')
    })
  })

  describe('PLATFORM_HELP', () => {
    it('classifies how does this work', () => {
      expect(classifyIntent('how does this platform work').intent).toBe('PLATFORM_HELP')
    })

    it('classifies how to use', () => {
      expect(classifyIntent('how to use this app').intent).toBe('PLATFORM_HELP')
    })

    it('classifies features', () => {
      expect(classifyIntent('what features are available').intent).toBe('PLATFORM_HELP')
    })
  })

  describe('ACCOUNT_HELP', () => {
    it('classifies create account', () => {
      expect(classifyIntent('how to create an account').intent).toBe('ACCOUNT_HELP')
    })

    it('classifies forgot password', () => {
      expect(classifyIntent('forgot my password').intent).toBe('ACCOUNT_HELP')
    })

    it('classifies login issue', () => {
      expect(classifyIntent('login issue help').intent).toBe('ACCOUNT_HELP')
    })
  })

  describe('COMPARISON', () => {
    it('classifies compare', () => {
      expect(classifyIntent('compare iPhone and Samsung').intent).toBe('COMPARISON')
    })

    it('classifies which is better', () => {
      expect(classifyIntent('which is better iPhone or Samsung').intent).toBe('COMPARISON')
    })
  })

  describe('RECOMMENDATION', () => {
    it('classifies recommend', () => {
      expect(classifyIntent('recommend a phone under 15000').intent).toBe('RECOMMENDATION')
    })

    it('classifies what should I buy', () => {
      expect(classifyIntent('what should I buy').intent).toBe('RECOMMENDATION')
    })
  })

  describe('SMALL_TALK', () => {
    it('classifies thanks', () => {
      expect(classifyIntent('thanks').intent).toBe('SMALL_TALK')
    })

    it('classifies thank you', () => {
      expect(classifyIntent('thank you').intent).toBe('SMALL_TALK')
    })

    it('classifies goodbye', () => {
      expect(classifyIntent('goodbye').intent).toBe('SMALL_TALK')
    })

    it('classifies bye', () => {
      expect(classifyIntent('bye').intent).toBe('SMALL_TALK')
    })

    it('classifies ok', () => {
      expect(classifyIntent('ok').intent).toBe('SMALL_TALK')
    })

    it('classifies cool', () => {
      expect(classifyIntent('cool').intent).toBe('SMALL_TALK')
    })
  })

  describe('ADMIN_ACTION', () => {
    it('classifies admin panel', () => {
      expect(classifyIntent('admin panel access').intent).toBe('ADMIN_ACTION')
    })

    it('classifies system status', () => {
      expect(classifyIntent('system status check').intent).toBe('ADMIN_ACTION')
    })
  })

  describe('OFFENSIVE', () => {
    it('classifies offensive language', () => {
      expect(classifyIntent('you are an idiot').intent).toBe('OFFENSIVE')
    })
  })

  describe('UNSUPPORTED', () => {
    it('classifies poem request', () => {
      expect(classifyIntent('write me a poem').intent).toBe('UNSUPPORTED')
    })
  })

  describe('UNKNOWN', () => {
    it('classifies empty string', () => {
      expect(classifyIntent('').intent).toBe('UNKNOWN')
    })

    it('classifies gibberish', () => {
      expect(classifyIntent('asdfghjkl').intent).toBe('UNKNOWN')
    })
  })

  describe('Entity Extraction', () => {
    it('extracts multiple entities', () => {
      const result = classifyIntent('find samsung phones under 20000 in Bangalore')
      expect(result.entities.category).toBe('Mobiles & Tablets')
      expect(result.entities.brand).toBe('Samsung')
      expect(result.entities.budget?.max).toBe(20000)
      expect(result.entities.location).toBe('Bangalore')
    })

    it('extracts with Rs prefix', () => {
      const result = classifyIntent('find phones under Rs. 15000')
      expect(result.entities.budget?.max).toBe(15000)
    })

    it('extracts with ₹ prefix', () => {
      const result = classifyIntent('find phones under ₹25000')
      expect(result.entities.budget?.max).toBe(25000)
    })

    it('extracts buyer intent', () => {
      const result = classifyIntent('I want to buy a laptop')
      expect(result.entities.buyerIntent).toBe(true)
    })

    it('extracts seller intent', () => {
      const result = classifyIntent('I want to sell my phone')
      expect(result.entities.sellerIntent).toBe(true)
    })

    it('extracts refurbished condition', () => {
      const result = classifyIntent('find refurbished laptops')
      expect(result.entities.condition).toBe('refurbished')
    })

    it('extracts listing ID', () => {
      const result = classifyIntent('tell me about listing ABC123XYZ')
      expect(result.entities.listingId).toBe('ABC123XYZ')
    })
  })
})
