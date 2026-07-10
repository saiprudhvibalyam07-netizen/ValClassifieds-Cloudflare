import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatToggle } from '../ChatToggle'

describe('ChatToggle', () => {
  it('renders as a button with chat icon when closed', () => {
    render(<ChatToggle isOpen={false} onClick={() => {}} />)
    const button = screen.getByRole('button', { name: /open chat/i })
    expect(button).toBeInTheDocument()
  })

  it('renders close icon when open', () => {
    render(<ChatToggle isOpen={true} onClick={() => {}} />)
    const button = screen.getByRole('button', { name: /close chat/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ChatToggle isOpen={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has correct aria attributes', () => {
    render(<ChatToggle isOpen={false} onClick={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-haspopup', 'dialog')
  })
})
