import type { ChatbotRole } from './types'

export const SESSION_STORAGE_KEY = 'chatbot_session_id'
export const CONVERSATION_STORAGE_KEY = 'chatbot_active_conversation'

export const STARTER_PROMPTS: Record<ChatbotRole, string[]> = {
  visitor: [
    'What is ValClassifieds?',
    'Browse categories',
    'How do I buy something?',
    'Search listings',
  ],
  buyer: [
    'Find phones under 20000',
    'How to buy safely?',
    'Popular categories',
    'Contact seller help',
  ],
  seller: [
    'How to post a listing?',
    'Pricing suggestions',
    'Photo tips',
    'Promote my listing',
  ],
  admin: [
    'Show active conversations',
    'Recent feedback',
    'System health',
    'Pending escalations',
  ],
}
