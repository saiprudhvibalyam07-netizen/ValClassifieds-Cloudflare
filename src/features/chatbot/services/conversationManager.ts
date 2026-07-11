import { supabase } from '../../../lib/supabase'
import type { ChatbotConversation, ChatbotMessage, ChatbotRole } from '../types'
import { SESSION_STORAGE_KEY } from '../constants'
import { clearAllMemories } from './memoryStore'
import { randomUUID } from '../../../lib/uuid'

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY) ?? ''
  if (!sessionId) {
    sessionId = randomUUID()
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
  }
  return sessionId
}

async function setSessionContext(sessionId: string): Promise<void> {
  await supabase.rpc('set_chatbot_session', { session_id: sessionId }).maybeSingle()
}

// Wipe all client-side chatbot state associated with the current user/session.
// Called on auth change (logout/login/switch) so no conversation, message,
// memory, or ephemeral id can leak to the next account.
//
// `endingUserId` is the identity of the provider being torn down:
//  - a guest (null) refresh must KEEP its session id so the guest conversation
//    can be restored on reload;
//  - an authenticated user's teardown (logout / switch) clears the legacy
//    guest session id so the next account starts clean.
async function resetSession(endingUserId: string | null): Promise<void> {
  if (endingUserId !== null) {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    } catch {
      /* ignore storage errors */
    }
  }
  try {
    await clearAllMemories()
  } catch {
    /* ignore memory-clear errors */
  }
}

export const conversationManager = {
  resetSession,
  async createConversation(userId: string | null, role: ChatbotRole): Promise<ChatbotConversation | null> {
    const sessionId = userId ? null : getSessionId()

    try {
      if (sessionId) {
        await setSessionContext(sessionId).catch(() => {})
      }

      const { data, error } = await supabase
        .from('chatbot_conversations')
        .insert({
          user_id: userId,
          session_id: sessionId,
          role,
          title: null,
          status: 'active',
          message_count: 0,
          metadata: {},
        })
        .select()
        .single()

      if (error) {
        console.error('Failed to create conversation:', error.message)
        return null
      }

      return mapConversation(data)
    } catch (err) {
      console.error('Chatbot network failure creating conversation:', err)
      return null
    }
  },

  async getActiveConversation(userId: string | null): Promise<ChatbotConversation | null> {
    try {
      let query = supabase
        .from('chatbot_conversations')
        .select()
        .eq('status', 'active')
        .order('last_activity', { ascending: false })
        .limit(1)

      if (userId) {
        query = query.eq('user_id', userId)
      } else {
        const sessionId = getSessionId()
        await setSessionContext(sessionId).catch(() => {})
        query = query.is('user_id', null).eq('session_id', sessionId)
      }

      const { data, error } = await query

      if (error || !data || data.length === 0) return null

      return mapConversation(data[0])
    } catch (err) {
      console.error('getActiveConversation failed:', err)
      return null
    }
  },

  async getMessages(conversationId: string): Promise<ChatbotMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chatbot_messages')
        .select()
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Failed to fetch messages:', error.message)
        return []
      }

      return (data ?? []).map(mapMessage)
    } catch (err) {
      console.error('getMessages failed:', err)
      return []
    }
  },

  async saveMessage(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<ChatbotMessage | null> {
    try {
      const { data, error } = await supabase
        .from('chatbot_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content,
        })
        .select()
        .single()

      if (error) {
        console.error('Failed to save message:', error.message)
        return null
      }

      // Update conversation's last_activity and updated_at
      await supabase
        .from('chatbot_conversations')
        .update({
          last_activity: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId)
        .then(() => {})

      return mapMessage(data)
    } catch (err) {
      console.error('saveMessage failed:', err)
      return null
    }
  },
}

function mapConversation(data: Record<string, unknown>): ChatbotConversation {
  return {
    id: data.id as string,
    userId: data.user_id as string | null,
    sessionId: data.session_id as string | null,
    role: data.role as ChatbotRole,
    title: data.title as string | null,
    status: data.status as ChatbotConversation['status'],
    messageCount: (data.message_count as number) ?? 0,
    lastActivity: data.last_activity as string,
    metadata: (data.metadata as Record<string, unknown>) ?? {},
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
  }
}

function mapMessage(data: Record<string, unknown>): ChatbotMessage {
  return {
    id: data.id as string,
    conversationId: data.conversation_id as string,
    role: data.role as ChatbotMessage['role'],
    content: (data.content as string) ?? '',
    createdAt: data.created_at as string,
    status: 'sent',
  }
}
