import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { pickAcknowledgement } from '../../services/responseQuality'

export class SafetyHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()

    if (text.includes('seller') || text.includes('trust') || text.includes('reliable')) {
      return {
        sections: [
          { type: 'heading', content: 'How to Evaluate a Seller', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} While we verify user accounts during registration, we cannot guarantee that any particular seller is trustworthy. Here are some ways to evaluate a seller yourself:\n\n• Review their profile — check when they joined and how many listings they have\n• Look at the quality and honesty of their listing photos and descriptions\n• Send them a message first — gauge how responsive and professional they are\n• Be cautious of deals that appear significantly below market value\n\nAlways inspect items in person before making payment.` },
        ],
        suggestedActions: [
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Report User', value: 'report' },
        ],
        intent: 'SAFETY',
        role,
      }
    }

    if (text.includes('scam') || text.includes('otp') || text.includes('upi')) {
      return {
        sections: [
          { type: 'heading', content: 'Scam Awareness', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Protecting yourself from scams is important. Here are common tactics to be aware of:\n\n• Never share OTPs, UPI PINs, or bank details with anyone — no platform representative will ever ask for these\n• Avoid advance payment to "hold" or "reserve" an item — always inspect first\n• Be cautious of fake payment screenshots — verify the money is in your account\n• Do not click links sent by strangers — they may be phishing attempts\n\nIf you encounter any of these, stop communication and report the user immediately.` },
        ],
        suggestedActions: [
          { label: 'Report User', value: 'report' },
          { label: 'Contact Support', value: 'contact support' },
          { label: 'Safety Guide', value: 'safety tips' },
        ],
        intent: 'SAFETY',
        role,
      }
    }

    if (text.includes('payment') || text.includes('pay')) {
      return {
        sections: [
          { type: 'heading', content: 'Safe Payment Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} ValClassifieds connects buyers and sellers — we do not process payments directly. Here is how to handle payments safely:\n\n• Inspect the item in person before making any payment\n• Cash on delivery or in-person cash transactions are the safest options\n• For bank transfers, verify the details carefully before sending\n• Never pay in advance to "reserve" or "hold" an item\n• Keep records of all transactions for your reference` },
        ],
        suggestedActions: [
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Report User', value: 'report' },
          { label: 'Contact Support', value: 'contact support' },
        ],
        intent: 'SAFETY',
        role,
      }
    }

    if (text.includes('meet') || text.includes('pickup') || text.includes('in person')) {
      return {
        sections: [
          { type: 'heading', content: 'Safe Meetup Tips', level: 2 },
          { type: 'text', content: `${pickAcknowledgement()} Meeting in person is a common way to complete transactions. Here are some suggestions for a safe experience:\n\n• Choose a public, well-lit location — coffee shops, shopping centres, or police stations\n• Bring a friend or family member along if possible\n• Let someone know where you are going and when you expect to return\n• Inspect the item thoroughly before handing over any money\n• Test electronics to confirm they are in working condition\n• Trust your instincts — if something feels off, it is okay to walk away` },
        ],
        suggestedActions: [
          { label: 'Safety Tips', value: 'safety tips' },
          { label: 'Search Listings', value: 'search' },
        ],
        intent: 'SAFETY',
        role,
      }
    }

    return {
      sections: [
        { type: 'heading', content: 'Marketplace Safety Guide', level: 2 },
        { type: 'text', content: `${pickAcknowledgement()} Your safety is important. Here are some guidelines to keep in mind while using ValClassifieds:\n\n• Evaluate sellers by reviewing their profile and listing history\n• Meet in public, well-lit locations for in-person transactions\n• Inspect items carefully before making payment\n• Cash is the safest payment method for local transactions\n• Keep all communication on the platform for your protection\n• Report any suspicious behaviour to help keep the community safe\n\nWe verify users during registration, but we encourage you to use your best judgment in every transaction.` },
      ],
      suggestedActions: [
        { label: 'Scam Awareness', value: 'scam warning' },
        { label: 'Payment Safety', value: 'payment safety' },
        { label: 'Meetup Tips', value: 'meetup tips' },
        { label: 'Report User', value: 'report' },
        { label: 'Contact Support', value: 'contact support' },
      ],
      intent: 'SAFETY',
      role,
    }
  }
}
