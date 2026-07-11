import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement, pickNextActionIntro } from '../../services/responseQuality'

export class BuyingHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    const category = classification.entities.category

    if (text.includes('compare') || text.includes('comparison')) {
      return {
        sections: [
          { type: 'heading', content: 'Comparing Listings', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} When comparing listings, here are a few things to consider:\n\n• Price relative to the item's condition and age\n• Location for pickup or delivery convenience\n• Seller responsiveness and listing quality\n• Photos that show the item clearly and honestly\n\nTaking a moment to compare these details can help you make a more informed decision.` },
        ],
        suggestedActions: [
          { label: 'Search Listings', value: 'search' },
          { label: 'Contact Seller', value: 'contact seller' },
          { label: 'Safety Tips', value: 'safety tips' },
        ],
        intent: 'BUYING_HELP',
        role,
      }
    }

    if (text.includes('negotiat') || text.includes('bargain') || text.includes('offer')) {
      return {
        sections: [
          { type: 'heading', content: 'Negotiating with Sellers', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Negotiation is a normal part of marketplace selling. Here are a few suggestions:\n\n• Start with a polite and friendly message\n• Reference specific details from the listing\n• Make a reasonable offer — 10-20% below the asking price is typical\n• Explain your reasoning for the offer\n• Be prepared to walk away if the price does not meet your expectations` },
        ],
        suggestedActions: [
          { label: 'Search Listings', value: 'search' },
          { label: 'Contact Seller', value: 'contact seller' },
          { label: 'Safety Tips', value: 'safety tips' },
        ],
        intent: 'BUYING_HELP',
        role,
      }
    }

    if (category) {
      return {
        sections: [
          { type: 'heading', content: `Buying ${category.charAt(0).toUpperCase() + category.slice(1)}`, level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here is what to keep in mind when buying ${category}:\n\n• Compare prices across multiple listings to get a sense of the market\n• Check the condition carefully and ask for additional photos if needed\n• Communicate through the platform for your protection\n• Meet in a public place to inspect before paying\n• If a deal seems too good to be true, it probably is` },
        ],
        suggestedActions: [
          { label: 'Search Listings', value: 'search' },
          { label: 'Compare Items', value: 'compare' },
          { label: 'Safety Tips', value: 'safety tips' },
        ],
        intent: 'BUYING_HELP',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Buying on ValClassifieds', level: 2 },
        { type: 'text', content: 'Buying on ValClassifieds is straightforward. Browse listings, connect with sellers, and complete your purchase — all within the platform.\n\nHere is what I can help with:\n\n• Search listings to find exactly what you need\n• Compare similar items to make informed decisions\n• Contact sellers and negotiate pricing\n• Learn safety tips for a smooth buying experience' },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Search Listings', value: 'search' },
        { label: 'Compare Items', value: 'compare' },
        { label: 'Negotiation Tips', value: 'negotiation tips' },
        { label: 'Safety Tips', value: 'safety tips' },
      ],
      intent: 'BUYING_HELP',
      role,
    }
  }
}
