import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class AccountHandler implements IntentHandler {
  async handle(
    classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    const text = (classification.entities.query ?? '').toLowerCase()
    let query = 'help'

    if (text.includes('password') || text.includes('login') || text.includes('sign in')) {
      query = 'forgot password'
    } else if (text.includes('delete') || text.includes('remove') || text.includes('close')) {
      query = 'delete account'
    } else if (text.includes('register') || text.includes('signup') || text.includes('create account')) {
      query = 'register'
    }

    const topic = getSupportTopic(query)
    return topic
      ? {
          ...topic,
          intent: 'ACCOUNT_HELP',
          role,
        }
      : {
          sections: [
            { type: 'heading', content: 'Account Help', level: 2 },
            { type: 'text', content: 'I can help with account-related questions:' },
            { type: 'info_section', title: 'Common Account Topics', items: [
              'Sign up or sign in to your account',
              'Reset your password if you forgot it',
              'Manage your listings and favorites',
              'Update your profile and notification settings',
              'Delete your account permanently',
            ]},
          ],
          suggestedActions: [
            { label: 'Sign In', value: 'sign in' },
            { label: 'Reset Password', value: 'forgot password' },
            { label: 'Contact Support', value: 'contact support' },
          ],
          intent: 'ACCOUNT_HELP',
          role,
        }
  }
}