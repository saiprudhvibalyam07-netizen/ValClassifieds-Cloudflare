import { cn } from '../../../utils/cn'
import type { SuggestedAction } from '../services/responseTypes'

interface SuggestedActionsProps {
  actions: SuggestedAction[]
  title?: string
  onAction: (value: string) => void
}

export function SuggestedActions({ actions, title, onAction }: SuggestedActionsProps) {
  if (actions.length === 0) return null

  const displayActions = actions.slice(0, 4)

  return (
    <div className="mt-2">
      {title && (
        <p className="mb-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={title || 'Suggested actions'}>
        {displayActions.map((action) => (
          <button
            key={action.value}
            onClick={() => onAction(action.value)}
            className={cn(
              'rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1',
              'text-[11px] font-medium text-primary-700',
              'transition-colors hover:bg-primary-100 hover:border-primary-300',
              'dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
              'dark:hover:bg-primary-900/50',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
            )}
            aria-label={action.label}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
