import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement } from '../../services/responseQuality'

export class ListingManagementHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = classification.entities.query?.toLowerCase() ?? ''

    if (text.includes('edit') || text.includes('update') || text.includes('change')) {
      return {
        sections: [
          { type: 'text', content: `${pickAcknowledgement()} To edit your listing:\n\n1. Go to your profile and tap "My Listings"\n2. Find the listing you want to edit\n3. Tap the "Edit" button\n4. Update the details, photos, or price\n5. Save your changes\n\nNeed tips on improving your listing? I can help with photos, pricing, and descriptions.` },
        ],
        suggestedActions: [
          { label: 'View My Listings', value: 'my listings' },
          { label: 'Post a New Listing', value: 'how to list' },
          { label: 'Listing Tips', value: 'photo tips' },
        ],
        intent: 'LISTING_MANAGEMENT',
        role,
      }
    }

    if (text.includes('delete') || text.includes('remove')) {
      return {
        sections: [
          { type: 'text', content: `${pickAcknowledgement()} To delete your listing:\n\n1. Go to your profile and tap "My Listings"\n2. Find the listing you want to remove\n3. Tap the "Delete" option\n4. Confirm deletion\n\nPlease note that deleted listings cannot be recovered. If you have active conversations with buyers, consider closing them before removing your listing.` },
          { type: 'warning', content: 'Make sure to close any active conversations with buyers before deleting your listing.' },
        ],
        suggestedActions: [
          { label: 'View My Listings', value: 'my listings' },
          { label: 'Post a New Listing', value: 'how to list' },
        ],
        intent: 'LISTING_MANAGEMENT',
        role,
      }
    }

    return {
      sections: [
        { type: 'text', content: `${pickAcknowledgement()} You can manage your listings from your profile page. Here is what you can do:\n\n• View all your active listings\n• Edit listing details, photos, and pricing\n• Mark items as sold\n• Delete listings when no longer needed\n\nWould you like help with any specific action?` },
      ],
      suggestedActions: [
        { label: 'Edit a Listing', value: 'edit my listing' },
        { label: 'Delete a Listing', value: 'delete my listing' },
        { label: 'Post a New Listing', value: 'how to list' },
        { label: 'View My Listings', value: 'my listings' },
      ],
      intent: 'LISTING_MANAGEMENT',
      role,
    }
  }
}
