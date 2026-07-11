import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getListingById } from '../../services/marketplaceSearch'
import { pickAcknowledgement, pickNextActionIntro } from '../../services/responseQuality'

export class ContactSellerHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    const listingId = classification.entities.listingId
    let listingInfo = ''

    if (listingId) {
      try {
        const listing = await getListingById(listingId)
        if (listing) {
          listingInfo = ` for "${listing.title}"`
        }
      } catch { /* ignore */ }
    }

    if (text.includes('negotiat') || text.includes('offer') || text.includes('bargain')) {
      return {
        sections: [
          { type: 'heading', content: `Negotiating${listingInfo}`, level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here are a few suggestions for negotiating through messaging:\n\n• Start with a friendly greeting to build rapport\n• Reference specific details from the listing to show genuine interest\n• Make a clear, reasonable offer and briefly explain your reasoning\n• Be polite — sellers are more likely to negotiate with courteous buyers\n• Ask questions about the condition or what is included\n\nKeep all communication on the platform for your protection.` },
        ],
        suggestedActions: [
          { label: 'Open Messages', value: 'open messages' },
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Search Listings', value: 'search' },
        ],
        intent: 'CONTACT_SELLER',
        role,
      }
    }

    if (text.includes('how to message') || text.includes('reach') || text.includes('contact')) {
      return {
        sections: [
          { type: 'heading', content: `How to Message a Seller${listingInfo}`, level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Here is how to get in touch with a seller:\n\n1. Open the listing you are interested in\n2. Tap "Contact Seller" or "Send Message"\n3. Write a clear message about what you would like to know\n4. Mention your interest and ask any relevant questions\n5. Check your Messages inbox for their reply — most sellers respond within 24 hours\n\nAll your conversations can be found in the Messages section.` },
        ],
        suggestedActions: [
          { label: 'Open Messages', value: 'open messages' },
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Search Listings', value: 'search' },
        ],
        intent: 'CONTACT_SELLER',
        role,
      }
    }

    if (text.includes('report') || text.includes('block') || text.includes('flag')) {
      return {
        sections: [
          { type: 'heading', content: 'Reporting a User', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} If someone is making you uncomfortable or behaving suspiciously:\n\n• Open the conversation in Messages\n• Tap the "Report" or "Flag" option\n• Select the reason for reporting\n• Submit — our team will review and take appropriate action\n\nYou can also block the user to prevent further messages.` },
          { type: 'warning', content: 'Never share personal information like OTPs, bank details, or passwords with other users.' },
        ],
        suggestedActions: [
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Contact Support', value: 'contact support' },
          { label: 'Open Messages', value: 'open messages' },
        ],
        intent: 'CONTACT_SELLER',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: `Messaging Help${listingInfo}`, level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} I can help you with messaging sellers on ValClassifieds. Here is what you can do:\n\n• Send a message to ask about a listing\n• Negotiate pricing and make offers\n• View all your conversations in the Messages section\n• Report any suspicious behaviour\n\nKeeping communication on the platform helps protect both buyers and sellers.` },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Open Messages', value: 'open messages' },
        { label: 'How to Message', value: 'how to message seller' },
        { label: 'Negotiation Tips', value: 'negotiation tips' },
        { label: 'Safety Tips', value: 'safety tips' },
      ],
      intent: 'CONTACT_SELLER',
      role,
    }
  }
}
