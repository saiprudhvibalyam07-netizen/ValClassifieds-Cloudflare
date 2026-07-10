import type { IntentHandler, IntentClassification, ConversationContextState, ChatbotRole } from '../../types'
import type { StructuredResponse } from '../../services/responseTypes'
import { getSupportTopic } from '../../services/supportContent'

export class AdminHandler implements IntentHandler {
  async handle(
    _classification: IntentClassification,
    _context: ConversationContextState,
    role: ChatbotRole
  ): Promise<StructuredResponse> {
    if (role !== 'admin') {
      const topic = getSupportTopic('admin access denied')
      return topic
        ? {
            ...topic,
            intent: 'ADMIN_ACTION',
            role,
          }
        : {
            sections: [
              {
                type: 'empty_state' as const,
                variant: 'no_permissions',
                title: 'Admin Access Required',
                description: 'This feature is only available to administrators.',
              },
            ],
            suggestedActions: [],
            intent: 'ADMIN_ACTION',
            role,
          }
    }

    const topic = getSupportTopic('admin dashboard')
    return topic
      ? {
          ...topic,
          intent: 'ADMIN_ACTION',
          role,
        }
      : {
          sections: [
            {
              type: 'heading' as const,
              content: 'Admin Dashboard',
              level: 2,
            },
            {
              type: 'info_section' as const,
              title: 'Available Admin Actions',
              items: [
                'System health and status monitoring',
                'User management and moderation',
                'Listing review and approval',
                'Reported content handling',
                'Analytics and usage statistics',
              ],
            },
          ],
          suggestedActions: [
            { label: 'System Health', value: 'system status' },
            { label: 'Recent Activity', value: 'recent activity' },
            { label: 'Pending Reports', value: 'pending reports' },
          ],
          intent: 'ADMIN_ACTION',
          role,
        }
  }
}