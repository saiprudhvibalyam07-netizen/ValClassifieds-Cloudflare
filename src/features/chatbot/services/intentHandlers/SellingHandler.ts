import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement, pickNextActionIntro } from '../../services/responseQuality'

export class SellingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    const category = classification.entities.category

    if (text.includes('step') || text.includes('guide') || text.includes('prepare') || text.includes('start')) {
      return {
        sections: [
          { type: 'heading', content: 'Listing Preparation Guide', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here is a step-by-step guide to creating an effective listing:\n\n1. Take clear, well-lit photos from multiple angles\n2. Write a descriptive title with brand, model, and condition\n3. Describe your item honestly — condition, what is included, and why you are selling\n4. Set a competitive price based on similar listings\n5. Choose the right category so buyers can find your listing\n6. Add your location for local pickup options\n\nWould you like tips on any specific step?` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Post My Listing', value: 'post listing' },
          { label: 'View My Listings', value: 'my listings' },
        ],
        intent: 'SELLING_HELP',
        role,
      }
    }

    if (text.includes('photo') || text.includes('image') || text.includes('picture')) {
      return {
        sections: [
          { type: 'heading', content: 'Photo Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Good photos make a significant difference in how quickly your item sells. Here are a few suggestions:\n\n• Clean the item and photograph it in natural daylight near a window\n• Capture multiple angles — front, back, sides, and any unique features\n• Show any defects honestly — this builds trust with potential buyers\n• Use a plain, uncluttered background\n• Take at least 4-6 photos for a complete view` },
        ],
        suggestedActions: [
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Description Tips', value: 'listing tips' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'SELLING_HELP',
        role,
      }
    }

    if (text.includes('price') || text.includes('pricing') || text.includes('how much')) {
      return {
        sections: [
          { type: 'heading', content: 'How to Price Your Item', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Setting the right price helps your item sell at a fair value. Consider these general guidelines:\n\n• Search for similar items to see current market rates\n• New or unused: 80-100% of the original price\n• Like new or gently used: 60-80%\n• Good condition with some wear: 40-60%\n• Fair condition or well-used: 20-40%\n\nPricing slightly above your minimum gives room for negotiation while ensuring you get a fair price.` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Post My Listing', value: 'post listing' },
          { label: 'Check Prices', value: 'search' },
        ],
        intent: 'SELLING_HELP',
        role,
      }
    }

    if (text.includes('title') || text.includes('headline') || text.includes('describe') || text.includes('description')) {
      return {
        sections: [
          { type: 'heading', content: 'Writing Your Listing', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} A well-written listing helps buyers understand exactly what you are offering. Here are some tips:\n\n• Title: Brand + Model + Condition + Key Specifications\n• Open with the most important details first\n• Describe the condition honestly, mentioning any wear or defects\n• List what is included — original box, charger, accessories\n• Use bullet points for specifications and features\n• Mention your preferred payment and pickup method` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'SELLING_HELP',
        role,
      }
    }

    if (category) {
      return {
        sections: [
          { type: 'heading', content: `Selling ${category.charAt(0).toUpperCase() + category.slice(1)}`, level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here is a quick checklist for selling ${category}:\n\n• Take clear photos showing the item from all angles\n• Research similar listings to price competitively\n• Write an honest description covering condition and what is included\n• Choose the correct category for maximum visibility\n• Respond to buyer messages promptly` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'SELLING_HELP',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Selling on ValClassifieds', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} I can guide you through every step of selling on our marketplace. Here is what I can help with:\n\n• Photo tips — capture attention with great images\n• Writing tips — craft an effective title and description\n• Pricing guide — set the right price to sell at fair value\n• Step-by-step guide — prepare everything for your listing` },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Step-by-Step Guide', value: 'listing guide' },
        { label: 'Photo Tips', value: 'photo tips' },
        { label: 'Pricing Tips', value: 'pricing help' },
        { label: 'Post My Listing', value: 'post listing' },
      ],
      intent: 'SELLING_HELP',
      role,
    }
  }
}
