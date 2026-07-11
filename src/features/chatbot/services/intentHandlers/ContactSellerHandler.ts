import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getListingById } from '../../services/marketplaceSearch'
import { selectMessagingArticle } from '../../knowledge/messaging'

export class ContactSellerHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const listingId = classification.entities.listingId

    let listingTitle: string | undefined
    if (listingId) {
      try {
        const listing = await getListingById(listingId)
        if (listing) {
          listingTitle = listing.title
        }
      } catch { /* ignore */ }
    }

    const article = selectMessagingArticle(classification)
    const heading = article.title + (listingTitle ? `: "${listingTitle}"` : '')

    const sections: StructuredResponse['sections'] = [
      { type: 'heading', content: heading, level: 2 },
    ]
    for (const section of article.response) {
      sections.push(section)
    }

    return {
      sections,
      suggestedActions: article.actions,
      intent: 'CONTACT_SELLER',
      role,
    }
  }
}
