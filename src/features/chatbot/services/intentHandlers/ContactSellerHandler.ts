import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'
import { getListingById } from '../../services/marketplaceSearch'

export class ContactSellerHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const listingId = classification.entities.listingId
    let listingInfo = ''

    if (listingId) {
      try {
        const listing = await getListingById(listingId)
        if (listing) {
          listingInfo = ` for "${listing.title}" (₹${listing.price.toLocaleString()})`
        }
      } catch {
        // Ignore
      }
    }

    const topic = getSupportTopic('contact seller')
    return topic
      ? {
          ...topic,
          intent: 'CONTACT_SELLER',
          role,
          sections: topic.sections.map(s =>
            s.type === 'text' && s.content.includes('seller')
              ? { ...s, content: s.content.replace('a seller', `the seller${listingInfo}`) }
              : s
          ),
        }
      : {
          sections: [
            { type: 'heading', content: `Contacting Seller${listingInfo}`, level: 2 },
            { type: 'text', content: 'To contact the seller, open the listing and tap "Contact Seller" or "Send Message".' },
            { type: 'info_section', title: 'Messaging Tips', items: [
              'Be specific about what you want to know.',
              'Mention your budget if negotiating.',
              'Keep all communication on the platform for your protection.',
              'Sellers typically respond within 24 hours.',
            ]},
            { type: 'safety_banner', variant: 'general_safety', title: 'Safety First', message: 'Never share personal financial details or pay before seeing the item.', tips: [
              'Meet in public places only.',
              'Inspect the item before paying.',
              'Use platform messaging only.',
            ]},
          ],
          suggestedActions: [
            { label: 'Safety Tips', value: 'safety tips' },
            { label: 'Report Seller', value: 'report seller' },
          ],
          intent: 'CONTACT_SELLER',
          role,
        }
  }
}