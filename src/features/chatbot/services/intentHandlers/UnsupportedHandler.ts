import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class UnsupportedHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const topic = getSupportTopic('unsupported')
    return topic
      ? {
          ...topic,
          intent: 'UNSUPPORTED',
          role,
        }
      : {
          sections: [
            {
              type: 'empty_state',
              variant: 'no_results',
              title: 'I can help with marketplace questions',
              description: 'I\'m ValBot, your Marketplace Assistant. I can help you with:',
            },
            {
              type: 'info_section',
              title: 'What I can do',
              items: [
                'Search and browse listings',
                'View listing details and contact sellers',
                'Get buying and selling guidance',
                'Pricing help and market comparisons',
                'Safety tips and scam awareness',
                'Account and platform questions',
              ],
            },
          ],
          suggestedActions: [
            { label: 'Search Listings', value: 'search' },
            { label: 'Browse Categories', value: 'show categories' },
            { label: 'How to Buy', value: 'how to buy' },
            { label: 'Safety Tips', value: 'safety tips' },
          ],
          intent: 'UNSUPPORTED',
          role,
        }
  }
}