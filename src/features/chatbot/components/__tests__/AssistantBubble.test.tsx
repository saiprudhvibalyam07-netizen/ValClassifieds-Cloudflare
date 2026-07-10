import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AssistantBubble } from '../AssistantBubble'
import type { ChatbotMessage, StructuredResponse } from '../../types'

function createAssistantMessage(overrides: Partial<ChatbotMessage> = {}): ChatbotMessage {
  return {
    id: 'msg-1',
    conversationId: 'conv-1',
    role: 'assistant',
    content: 'Here are some listings for you.',
    createdAt: new Date().toISOString(),
    status: 'sent',
    ...overrides,
  }
}

describe('AssistantBubble', () => {
  it('renders assistant message content', () => {
    render(<AssistantBubble message={createAssistantMessage()} />)
    expect(screen.getByText('Here are some listings for you.')).toBeInTheDocument()
  })

  it('renders bot avatar', () => {
    const { container } = render(<AssistantBubble message={createAssistantMessage()} />)
    const botIcon = container.querySelector('.lucide-bot')
    expect(botIcon).toBeInTheDocument()
  })

  it('renders structured response when provided', () => {
    const structured: StructuredResponse = {
      sections: [{ type: 'text', content: 'Structured content here' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(
      <AssistantBubble
        message={createAssistantMessage()}
        structuredResponse={structured}
        onAction={() => {}}
      />
    )
    expect(screen.getByText('Structured content here')).toBeInTheDocument()
  })

  it('falls back to plain content when no structured response', () => {
    render(
      <AssistantBubble
        message={createAssistantMessage({ content: 'Plain content' })}
      />
    )
    expect(screen.getByText('Plain content')).toBeInTheDocument()
  })

  it('falls back to plain content when onAction not provided', () => {
    const structured: StructuredResponse = {
      sections: [{ type: 'text', content: 'Structured' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(
      <AssistantBubble
        message={createAssistantMessage({ content: 'Plain fallback' })}
        structuredResponse={structured}
      />
    )
    expect(screen.getByText('Plain fallback')).toBeInTheDocument()
  })

  it('renders suggested actions from structured response', () => {
    const structured: StructuredResponse = {
      sections: [{ type: 'text', content: 'Hello' }],
      suggestedActions: [{ label: 'Search', value: 'search' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(
      <AssistantBubble
        message={createAssistantMessage()}
        structuredResponse={structured}
        onAction={() => {}}
      />
    )
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('calls onAction when suggested action is clicked', () => {
    const onAction = vi.fn()
    const structured: StructuredResponse = {
      sections: [],
      suggestedActions: [{ label: 'Browse', value: 'browse' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(
      <AssistantBubble
        message={createAssistantMessage()}
        structuredResponse={structured}
        onAction={onAction}
      />
    )
    fireEvent.click(screen.getByText('Browse'))
    expect(onAction).toHaveBeenCalledWith('browse')
  })
})
