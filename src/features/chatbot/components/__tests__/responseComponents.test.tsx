import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ListingCard } from '../ListingCard'
import { ListingGrid } from '../ListingGrid'
import { ComparisonTable } from '../ComparisonTable'
import { SuggestedActions } from '../SuggestedActions'
import { SafetyBanner } from '../SafetyBanner'
import { EmptyState } from '../EmptyState'
import { ResponseRenderer } from '../ResponseRenderer'
import type { StructuredResponse, ListingData } from '../../services/responseTypes'

describe('ListingCard', () => {
  const mockListing: ListingData = {
    id: '1',
    title: 'iPhone 14 Pro',
    price: 85000,
    location: 'Delhi',
    category: 'Mobiles',
    condition: 'Used',
    seller: 'Rahul',
  }

  it('renders listing title', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('iPhone 14 Pro')).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('₹85,000')).toBeInTheDocument()
  })

  it('renders location', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('Delhi')).toBeInTheDocument()
  })

  it('renders category', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('Mobiles')).toBeInTheDocument()
  })

  it('renders condition', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('Used')).toBeInTheDocument()
  })

  it('renders seller', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.getByText('Rahul')).toBeInTheDocument()
  })

  it('does not render View Listing button without URL', () => {
    render(<ListingCard listing={mockListing} />)
    expect(screen.queryByText('View Listing')).not.toBeInTheDocument()
  })

  it('renders View Listing button with URL and onAction', () => {
    const onAction = vi.fn()
    render(<ListingCard listing={{ ...mockListing, url: '/listing/1' }} onAction={onAction} />)
    expect(screen.getByText('View Listing')).toBeInTheDocument()
  })

  it('calls onAction when View Listing is clicked', () => {
    const onAction = vi.fn()
    render(<ListingCard listing={{ ...mockListing, url: '/listing/1' }} onAction={onAction} />)
    fireEvent.click(screen.getByText('View Listing'))
    expect(onAction).toHaveBeenCalledWith('/listing/1')
  })

  it('handles missing price gracefully', () => {
    render(<ListingCard listing={{ id: '1', title: 'Test' }} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles missing optional fields gracefully', () => {
    render(<ListingCard listing={{ id: '1', title: 'Test', price: 100 }} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('₹100')).toBeInTheDocument()
  })

  it('renders thumbnail when provided', () => {
    render(<ListingCard listing={{ ...mockListing, thumbnail: '/img.jpg' }} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/img.jpg')
  })

  it('renders placeholder icon when no thumbnail', () => {
    const { container } = render(<ListingCard listing={mockListing} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('ListingGrid', () => {
  const listings: ListingData[] = [
    { id: '1', title: 'Phone 1', price: 10000 },
    { id: '2', title: 'Phone 2', price: 20000 },
  ]

  it('renders all listings', () => {
    render(<ListingGrid listings={listings} />)
    expect(screen.getByText('Phone 1')).toBeInTheDocument()
    expect(screen.getByText('Phone 2')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<ListingGrid listings={listings} title="Results" />)
    expect(screen.getByText('Results')).toBeInTheDocument()
  })

  it('returns null for empty listings', () => {
    const { container } = render(<ListingGrid listings={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders within a list role', () => {
    render(<ListingGrid listings={listings} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})

describe('ComparisonTable', () => {
  const headers = ['Phone A', 'Phone B']
  const rows = [
    { label: 'Price', values: ['₹10,000', '₹20,000'] },
    { label: 'Condition', values: ['New', 'Used'] },
  ]

  it('renders headers', () => {
    render(<ComparisonTable headers={headers} rows={rows} />)
    expect(screen.getByText('Phone A')).toBeInTheDocument()
    expect(screen.getByText('Phone B')).toBeInTheDocument()
  })

  it('renders rows', () => {
    render(<ComparisonTable headers={headers} rows={rows} />)
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('₹10,000')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<ComparisonTable headers={headers} rows={rows} title="Compare" />)
    expect(screen.getByText('Compare')).toBeInTheDocument()
  })

  it('renders "Not available" for empty values', () => {
    render(<ComparisonTable headers={['A']} rows={[{ label: 'Feature', values: [''] }]} />)
    expect(screen.getByText('Not available')).toBeInTheDocument()
  })

  it('returns null for empty headers', () => {
    const { container } = render(<ComparisonTable headers={[]} rows={rows} />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for empty rows', () => {
    const { container } = render(<ComparisonTable headers={headers} rows={[]} />)
    expect(container.innerHTML).toBe('')
  })
})

describe('SuggestedActions', () => {
  const actions = [
    { label: 'Search', value: 'search' },
    { label: 'Browse', value: 'browse' },
  ]

  it('renders all actions', () => {
    render(<SuggestedActions actions={actions} onAction={() => {}} />)
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Browse')).toBeInTheDocument()
  })

  it('calls onAction when clicked', () => {
    const onAction = vi.fn()
    render(<SuggestedActions actions={actions} onAction={onAction} />)
    fireEvent.click(screen.getByText('Search'))
    expect(onAction).toHaveBeenCalledWith('search')
  })

  it('renders title when provided', () => {
    render(<SuggestedActions actions={actions} title="Try" onAction={() => {}} />)
    expect(screen.getByText('Try')).toBeInTheDocument()
  })

  it('returns null for empty actions', () => {
    const { container } = render(<SuggestedActions actions={[]} onAction={() => {}} />)
    expect(container.innerHTML).toBe('')
  })

  it('limits to 4 actions', () => {
    const manyActions = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
      { label: 'D', value: 'd' },
      { label: 'E', value: 'e' },
    ]
    render(<SuggestedActions actions={manyActions} onAction={() => {}} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.queryByText('E')).not.toBeInTheDocument()
  })
})

describe('SafetyBanner', () => {
  it('renders scam warning', () => {
    render(<SafetyBanner variant="scam_warning" title="Scam Alert" message="Never share OTPs" />)
    expect(screen.getByText('Scam Alert')).toBeInTheDocument()
    expect(screen.getByText('Never share OTPs')).toBeInTheDocument()
  })

  it('renders unsafe payment warning', () => {
    render(<SafetyBanner variant="unsafe_payment" title="Payment Warning" message="Use platform payments" />)
    expect(screen.getByText('Payment Warning')).toBeInTheDocument()
  })

  it('renders suspicious seller warning', () => {
    render(<SafetyBanner variant="suspicious_seller" title="Suspicious" message="Verify seller" />)
    expect(screen.getByText('Suspicious')).toBeInTheDocument()
  })

  it('renders identity warning', () => {
    render(<SafetyBanner variant="identity_warning" title="Identity" message="Protect identity" />)
    expect(screen.getByText('Identity')).toBeInTheDocument()
  })

  it('renders general safety', () => {
    render(<SafetyBanner variant="general_safety" title="Safety" message="Be safe" />)
    expect(screen.getByText('Safety')).toBeInTheDocument()
  })

  it('renders tips when provided', () => {
    render(
      <SafetyBanner
        variant="scam_warning"
        title="Alert"
        message="Warning"
        tips={['Tip 1', 'Tip 2']}
      />
    )
    expect(screen.getByText('Tip 1')).toBeInTheDocument()
    expect(screen.getByText('Tip 2')).toBeInTheDocument()
  })

  it('has alert role', () => {
    render(<SafetyBanner variant="scam_warning" title="Alert" message="Warning" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})

describe('EmptyState', () => {
  it('renders no results state', () => {
    render(<EmptyState variant="no_results" title="No results" description="Try again" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        variant="no_results"
        title="No results"
        description="Try again"
        action={{ label: 'Browse', value: 'browse' }}
        onAction={onAction}
      />
    )
    fireEvent.click(screen.getByText('Browse'))
    expect(onAction).toHaveBeenCalledWith('browse')
  })

  it('does not render action button without onAction', () => {
    render(
      <EmptyState
        variant="no_results"
        title="No results"
        description="Try again"
        action={{ label: 'Browse', value: 'browse' }}
      />
    )
    expect(screen.queryByText('Browse')).not.toBeInTheDocument()
  })

  it('renders status role', () => {
    render(<EmptyState variant="offline" title="Offline" description="Check connection" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders all variants', () => {
    const variants = ['no_results', 'cleared', 'offline', 'timeout', 'unauthorized', 'server_error', 'no_permissions'] as const
    for (const variant of variants) {
      const { unmount } = render(<EmptyState variant={variant} title="Title" description="Desc" />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      unmount()
    }
  })
})

describe('ResponseRenderer', () => {
  const onAction = vi.fn()

  beforeEach(() => {
    onAction.mockClear()
  })

  it('renders text sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'text', content: 'Hello world' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders heading sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'heading', content: 'Title', level: 2 }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('renders safety banner sections', () => {
    const response: StructuredResponse = {
      sections: [{
        type: 'safety_banner',
        variant: 'scam_warning',
        title: 'Scam Alert',
        message: 'Never share OTPs',
        tips: ['Tip 1'],
      }],
      intent: 'SAFETY',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Scam Alert')).toBeInTheDocument()
    expect(screen.getByText('Tip 1')).toBeInTheDocument()
  })

  it('renders suggested actions', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'text', content: 'Hello' }],
      suggestedActions: [{ label: 'Search', value: 'search' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('calls onAction when suggested action is clicked', () => {
    const response: StructuredResponse = {
      sections: [],
      suggestedActions: [{ label: 'Search', value: 'search' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    fireEvent.click(screen.getByText('Search'))
    expect(onAction).toHaveBeenCalledWith('search')
  })

  it('renders info sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'info_section', title: 'Features', items: ['Feature 1', 'Feature 2'] }],
      intent: 'PLATFORM_HELP',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
  })

  it('renders numbered steps', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'numbered_steps', steps: ['Step 1', 'Step 2'] }],
      intent: 'BUYING_HELP',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('renders warning sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'warning', content: 'Be careful' }],
      intent: 'SAFETY',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Be careful')).toBeInTheDocument()
  })

  it('renders success sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'success', variant: 'search_complete', message: 'Search done' }],
      intent: 'SEARCH_LISTINGS',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Search done')).toBeInTheDocument()
  })

  it('renders error sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'error', message: 'Something went wrong', retry: { label: 'Retry', value: 'retry' } }],
      intent: 'UNSUPPORTED',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('calls onAction when error retry is clicked', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'error', message: 'Error', retry: { label: 'Retry', value: 'retry' } }],
      intent: 'UNSUPPORTED',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    fireEvent.click(screen.getByText('Retry'))
    expect(onAction).toHaveBeenCalledWith('retry')
  })

  it('renders subheading sections', () => {
    const response: StructuredResponse = {
      sections: [{ type: 'subheading', content: 'Sub Title' }],
      intent: 'GREETING',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Sub Title')).toBeInTheDocument()
  })

  it('handles empty sections', () => {
    const response: StructuredResponse = {
      sections: [],
      intent: 'GREETING',
      role: 'visitor',
    }
    const { container } = render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(container.querySelector('.space-y-2')).toBeInTheDocument()
  })

  it('renders listing cards', () => {
    const response: StructuredResponse = {
      sections: [{
        type: 'listing_card',
        listing: { id: '1', title: 'iPhone', price: 85000 },
      }],
      intent: 'SEARCH_LISTINGS',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('iPhone')).toBeInTheDocument()
    expect(screen.getByText('₹85,000')).toBeInTheDocument()
  })

  it('renders listing grid', () => {
    const response: StructuredResponse = {
      sections: [{
        type: 'listing_grid',
        listings: [
          { id: '1', title: 'Phone 1', price: 10000 },
          { id: '2', title: 'Phone 2', price: 20000 },
        ],
        title: 'Results',
      }],
      intent: 'SEARCH_LISTINGS',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Phone 1')).toBeInTheDocument()
    expect(screen.getByText('Phone 2')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
  })

  it('renders comparison table', () => {
    const response: StructuredResponse = {
      sections: [{
        type: 'comparison_table',
        headers: ['Phone A', 'Phone B'],
        rows: [{ label: 'Price', values: ['₹10,000', '₹20,000'] }],
        title: 'Compare',
      }],
      intent: 'COMPARISON',
      role: 'buyer',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('Phone A')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Compare')).toBeInTheDocument()
  })

  it('renders empty state sections', () => {
    const response: StructuredResponse = {
      sections: [{
        type: 'empty_state',
        variant: 'no_results',
        title: 'No results',
        description: 'Try again',
      }],
      intent: 'UNSUPPORTED',
      role: 'visitor',
    }
    render(<ResponseRenderer response={response} onAction={onAction} />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
