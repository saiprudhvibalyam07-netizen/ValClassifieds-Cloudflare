import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement, pickNextActionIntro } from '../../services/responseQuality'

export class PlatformHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()

    if (text.includes('fee') || text.includes('cost') || text.includes('charge') || text.includes('price')) {
      return {
        sections: [
          { type: 'heading', content: 'Platform Fees', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Listing items on ValClassifieds is free. When a sale is completed through the platform, a small service fee applies. Here is a summary:\n\n• Creating a listing — Free\n• Browsing and searching — Free\n• Messaging sellers — Free\n• Completed sale fee — A small percentage of the sale price\n\nFor detailed and up-to-date fee information, please refer to our help centre.` },
        ],
        suggestedActions: [
          { label: 'Contact Support', value: 'contact support' },
          { label: 'How to List', value: 'how to list' },
          { label: 'Post a Listing', value: 'post listing' },
        ],
        intent: 'PLATFORM_HELP',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'ValClassifieds Help', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} ValClassifieds is a local marketplace where people buy and sell items in their community. Here are some common topics:\n\n• Posting a listing is free and straightforward\n• Buying safely — meet in public, inspect items before paying\n• Messaging — use the built-in chat to communicate with sellers\n• Favourites — save listings to revisit later\n• Fees — listing is free; a small fee applies on completed sales` },
        { type: 'text', content: pickNextActionIntro() },
      ],
      suggestedActions: [
        { label: 'Fees & Pricing', value: 'platform fees' },
        { label: 'Contact Support', value: 'contact support' },
        { label: 'How to List', value: 'how to list' },
        { label: 'Post a Listing', value: 'post listing' },
      ],
      intent: 'PLATFORM_HELP',
      role,
    }
  }
}
