import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement } from '../../services/responseQuality'

export class ListingAdvisorHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    const category = classification.entities.category

    if (text.includes('photo') || text.includes('image') || text.includes('picture')) {
      return {
        sections: [
          { type: 'heading', content: 'Photo Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Great photos are one of the most effective ways to attract buyers. Here are a few suggestions:\n\n• Take photos in natural daylight near a window — avoid using flash\n• Clean the item and choose a neutral, uncluttered background\n• Capture multiple angles — front, back, sides, and any unique details\n• Show any defects or wear honestly — this builds trust with buyers\n• Include a size reference for clothing or electronics\n• Take at least 4-6 photos to give buyers a complete view` },
        ],
        suggestedActions: [
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Title Tips', value: 'listing tips' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'LISTING_ADVICE',
        role,
      }
    }

    if (text.includes('title') || text.includes('headline') || text.includes('name')) {
      return {
        sections: [
          { type: 'heading', content: 'Title Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} A clear, descriptive title helps buyers find your listing quickly. Here is what works well:\n\n• Start with the brand and model (e.g. "iPhone 14 Pro Max")\n• Include the condition — "New", "Like New", "Gently Used"\n• Mention key specifications — storage size, colour, year\n• Keep it under 60 characters for full visibility\n• Avoid ALL CAPS, excessive punctuation, and special characters\n\nExample: "iPhone 14 Pro Max 256GB — Deep Purple — Excellent Condition"` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Description Tips', value: 'listing tips' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'LISTING_ADVICE',
        role,
      }
    }

    if (text.includes('description') || text.includes('desc') || text.includes('detail')) {
      return {
        sections: [
          { type: 'heading', content: 'Description Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} A well-written description answers buyer questions before they need to ask. Here are some tips:\n\n• Start with the most important details — brand, model, key specifications\n• Describe the condition honestly, including any scratches, dents, or wear\n• Mention the original purchase price and how long you have owned it\n• List what is included — box, charger, accessories, warranty\n• Explain why you are selling — this helps build trust\n• Keep paragraphs short and use bullet points for readability` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'LISTING_ADVICE',
        role,
      }
    }

    if (text.includes('price') || text.includes('pricing') || text.includes('how much')) {
      return {
        sections: [
          { type: 'heading', content: 'Pricing Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Setting the right price helps you sell at fair value without waiting too long. Here are some guidelines:\n\n• Search for similar listings to understand the current market\n• Condition guide: New (80-100%), Like New (70-85%), Good (50-70%), Fair (30-50%)\n• Price 5-10% above your minimum to leave room for negotiation\n• Consider bundle discounts if selling multiple items together\n• Update your price if you are not getting inquiries after a week` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Title Tips', value: 'listing tips' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'LISTING_ADVICE',
        role,
      }
    }

    if (category) {
      return {
        sections: [
          { type: 'heading', content: `Tips for Listing ${category.charAt(0).toUpperCase() + category.slice(1)}`, level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here are some best practices for creating an effective listing:\n\n• Clear, well-lit photos from multiple angles\n• Descriptive title with brand, model, and condition\n• Honest description covering condition and what is included\n• Competitive price based on similar listings\n• Your location for local pickup options\n• Quick responses to buyer questions` },
        ],
        suggestedActions: [
          { label: 'Photo Tips', value: 'photo tips' },
          { label: 'Pricing Tips', value: 'pricing help' },
          { label: 'Post My Listing', value: 'post listing' },
        ],
        intent: 'LISTING_ADVICE',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Listing Advisor', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} I can help you create a listing that attracts buyers. What aspect would you like tips on?\n\n• Photo Tips — capture attention with great images\n• Title Tips — write headlines that get clicks\n• Description Tips — describe your item clearly\n• Pricing Tips — price it right to sell at fair value` },
      ],
      suggestedActions: [
        { label: 'Photo Tips', value: 'photo tips' },
        { label: 'Pricing Tips', value: 'pricing help' },
        { label: 'Title Tips', value: 'listing tips' },
        { label: 'Post My Listing', value: 'post listing' },
      ],
      intent: 'LISTING_ADVICE',
      role,
    }
  }
}
