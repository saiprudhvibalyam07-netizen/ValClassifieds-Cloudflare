import { MapPin, Tag, User, ExternalLink } from 'lucide-react'
import { cn } from '../../../utils/cn'
import type { ListingData } from '../services/responseTypes'
import { formatPrice } from '../services/responseUtils'

interface ListingCardProps {
  listing: ListingData
  onAction?: (value: string) => void
}

export function ListingCard({ listing, onAction }: ListingCardProps) {
  const hasPrice = listing.price !== undefined && listing.price !== null

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-3',
        'dark:border-gray-700 dark:bg-gray-800',
        'transition-colors hover:border-primary-300 dark:hover:border-primary-700'
      )}
      role="article"
      aria-label={`Listing: ${listing.title}`}
    >
      <div className="flex gap-3">
        {listing.thumbnail ? (
          <img
            src={listing.thumbnail}
            alt={listing.title}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <Tag className="h-6 w-6 text-gray-400" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
            {listing.title}
          </h4>

          {hasPrice && (
            <p className="mt-0.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
              {formatPrice(listing.price!)}
            </p>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
            {listing.location && (
              <span className="flex items-center gap-0.5">
                <MapPin className="h-3 w-3" />
                {listing.location}
              </span>
            )}
            {listing.category && (
              <span className="flex items-center gap-0.5">
                <Tag className="h-3 w-3" />
                {listing.category}
              </span>
            )}
            {listing.seller && (
              <span className="flex items-center gap-0.5">
                <User className="h-3 w-3" />
                {listing.seller}
              </span>
            )}
          </div>

          {listing.condition && (
            <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {listing.condition}
            </span>
          )}
        </div>
      </div>

      {listing.url && onAction && (
        <button
          onClick={() => onAction(listing.url!)}
          className={cn(
            'mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg',
            'border border-primary-200 bg-primary-50 px-3 py-1.5',
            'text-xs font-medium text-primary-700',
            'transition-colors hover:bg-primary-100 hover:border-primary-300',
            'dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
            'dark:hover:bg-primary-900/50',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
          )}
          aria-label={`View ${listing.title}`}
        >
          <ExternalLink className="h-3 w-3" />
          View Listing
        </button>
      )}
    </div>
  )
}
