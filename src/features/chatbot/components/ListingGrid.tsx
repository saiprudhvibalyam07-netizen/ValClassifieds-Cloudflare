import { ListingCard } from './ListingCard'
import type { ListingData } from '../services/responseTypes'

interface ListingGridProps {
  listings: ListingData[]
  title?: string
  onAction?: (value: string) => void
}

export function ListingGrid({ listings, title, onAction }: ListingGridProps) {
  if (listings.length === 0) return null

  return (
    <div className="mt-2">
      {title && (
        <h4 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h4>
      )}
      <div
        className="grid gap-2 sm:grid-cols-2"
        role="list"
        aria-label={title || 'Listings'}
      >
        {listings.map((listing) => (
          <div key={listing.id} role="listitem">
            <ListingCard listing={listing} onAction={onAction} />
          </div>
        ))}
      </div>
    </div>
  )
}
