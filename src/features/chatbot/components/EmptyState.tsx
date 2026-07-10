import { SearchX, Trash2, WifiOff, Clock, Lock, ServerCrash, ShieldX } from 'lucide-react'
import { cn } from '../../../utils/cn'
import type { EmptyStateVariant, SuggestedAction } from '../services/responseTypes'

interface EmptyStateProps {
  variant: EmptyStateVariant
  title: string
  description: string
  action?: SuggestedAction
  onAction?: (value: string) => void
}

const VARIANT_CONFIG: Record<EmptyStateVariant, typeof SearchX> = {
  no_results: SearchX,
  cleared: Trash2,
  offline: WifiOff,
  timeout: Clock,
  unauthorized: Lock,
  server_error: ServerCrash,
  no_permissions: ShieldX,
}

export function EmptyState({ variant, title, description, action, onAction }: EmptyStateProps) {
  const Icon = VARIANT_CONFIG[variant] ?? ServerCrash

  return (
    <div
      className="flex flex-col items-center px-4 py-8 text-center"
      role="status"
      aria-label={title}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-[240px] leading-relaxed">
        {description}
      </p>

      {action && onAction && (
        <button
          onClick={() => onAction(action.value)}
          className={cn(
            'mt-3 rounded-lg px-4 py-1.5',
            'text-xs font-medium text-primary-700 dark:text-primary-300',
            'border border-primary-200 dark:border-primary-800',
            'bg-primary-50 dark:bg-primary-900/30',
            'transition-colors hover:bg-primary-100 hover:border-primary-300',
            'dark:hover:bg-primary-900/50',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
          )}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
