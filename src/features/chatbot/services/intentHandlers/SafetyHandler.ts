import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class SafetyHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    // Determine safety variant from message content
    const text = (classification.entities.query ?? '').toLowerCase()
    let query = 'safety tips'

    if (text.includes('scam') || text.includes('otp') || text.includes('upi')) {
      query = 'scam'
    } else if (text.includes('payment') || text.includes('pay')) {
      query = 'payment'
    } else if (text.includes('fake') || text.includes('fraud')) {
      query = 'fake'
    }

    const topic = getSupportTopic(query) ?? getSupportTopic('safety tips')
    return topic
      ? {
          ...topic,
          intent: 'SAFETY',
          role,
        }
      : {
          sections: [
            {
              type: 'safety_banner',
              variant: 'general_safety',
              title: 'Safety Tips',
              message: 'Follow these guidelines for a safe marketplace experience.',
              tips: [
                'Always meet in public, well-lit places.',
                'Bring a friend when meeting strangers.',
                'Verify the item before making any payment.',
                'Never share OTPs, UPI PINs, or bank details.',
                'Communicate through the platform for your protection.',
                'Report suspicious activity immediately.',
              ],
            },
          ],
          suggestedActions: [
            { label: 'Report Issue', value: 'report scam' },
            { label: 'Contact Support', value: 'contact support' },
          ],
          intent: 'SAFETY',
          role,
        }
  }
}