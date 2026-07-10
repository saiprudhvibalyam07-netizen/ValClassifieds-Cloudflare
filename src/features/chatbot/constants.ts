import type { ChatbotRole } from './types'

export const SESSION_STORAGE_KEY = 'chatbot_session_id'
export const CONVERSATION_STORAGE_KEY = 'chatbot_active_conversation'

export const ROLE_GREETINGS: Record<ChatbotRole, string> = {
  visitor:
    'Welcome to ValClassifieds! I\'m ValBot, your marketplace assistant. I can help you find what you\'re looking for, learn about the platform, and get started. What brings you here today?',
  buyer:
    'Welcome back! I\'m ValBot, your marketplace assistant. I can help you search listings, understand buying processes, and answer marketplace questions. What can I help you find?',
  seller:
    'Welcome back! I\'m ValBot, your marketplace assistant. I can help you create better listings, reach buyers, and manage your sales. What would you like help with?',
  admin:
    'Welcome! I\'m ValBot. I can help you review platform activity, check system status, and manage administrative tasks. What would you like to review?',
}

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
