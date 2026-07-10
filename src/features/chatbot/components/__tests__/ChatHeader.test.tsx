import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatHeader } from '../ChatHeader'

describe('ChatHeader', () => {
  it('renders the title for visitor role', () => {
    render(<ChatHeader role="visitor" onClose={() => {}} onNewChat={() => {}} onClearConversation={() => {}} onAbout={() => {}} />)
    expect(screen.getByText('ValBot')).toBeInTheDocument()
  })

  it('renders the title for admin role', () => {
    render(<ChatHeader role="admin" onClose={() => {}} onNewChat={() => {}} onClearConversation={() => {}} onAbout={() => {}} />)
    expect(screen.getByText('ValBot')).toBeInTheDocument()
  })

  it('renders the title for seller role', () => {
    render(<ChatHeader role="seller" onClose={() => {}} onNewChat={() => {}} onClearConversation={() => {}} onAbout={() => {}} />)
    expect(screen.getByText('ValBot')).toBeInTheDocument()
  })

  it('shows online status', () => {
    render(<ChatHeader role="visitor" onClose={() => {}} onNewChat={() => {}} onClearConversation={() => {}} onAbout={() => {}} />)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<ChatHeader role="visitor" onClose={onClose} onNewChat={() => {}} onClearConversation={() => {}} onAbout={() => {}} />)
    fireEvent.click(screen.getByLabelText('Close chat'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
