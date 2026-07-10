import type { StructuredResponse, ResponseSection } from '../services/responseTypes'
import { ListingCard } from './ListingCard'
import { ListingGrid } from './ListingGrid'
import { ComparisonTable } from './ComparisonTable'
import { SafetyBanner } from './SafetyBanner'
import { SuggestedActions } from './SuggestedActions'
import { EmptyState } from './EmptyState'
import { cn } from '../../../utils/cn'

interface ResponseRendererProps {
  response: StructuredResponse
  onAction: (value: string) => void
}

/**
 * Renders a structured response into UI sections.
 * Inspects each section type and renders the appropriate component.
 */
export function ResponseRenderer({ response, onAction }: ResponseRendererProps) {
  return (
    <div className="space-y-2">
      {response.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} onAction={onAction} />
      ))}

      {response.suggestedActions && response.suggestedActions.length > 0 && (
        <SuggestedActions
          actions={response.suggestedActions}
          onAction={onAction}
        />
      )}
    </div>
  )
}

function SectionRenderer({ section, onAction }: { section: ResponseSection; onAction: (v: string) => void }) {
  switch (section.type) {
    case 'text':
      return (
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100 whitespace-pre-line">
          {section.content}
        </p>
      )

    case 'heading': {
      const Tag = section.level === 1 ? 'h3' : section.level === 3 ? 'h5' : 'h4'
      return (
        <Tag className={cn(
          'font-semibold text-gray-900 dark:text-gray-100',
          section.level === 1 && 'text-sm',
          section.level === 2 && 'text-sm',
          section.level === 3 && 'text-xs'
        )}>
          {section.content}
        </Tag>
      )
    }

    case 'subheading':
      return (
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {section.content}
        </p>
      )

    case 'listing_card':
      return <ListingCard listing={section.listing} onAction={onAction} />

    case 'listing_grid':
      return (
        <ListingGrid
          listings={section.listings}
          title={section.title}
          onAction={onAction}
        />
      )

    case 'comparison_table':
      return (
        <ComparisonTable
          headers={section.headers}
          rows={section.rows}
          title={section.title}
        />
      )

    case 'safety_banner':
      return (
        <SafetyBanner
          variant={section.variant}
          title={section.title}
          message={section.message}
          tips={section.tips}
        />
      )

    case 'suggested_actions':
      return (
        <SuggestedActions
          actions={section.actions}
          title={section.title}
          onAction={onAction}
        />
      )

    case 'empty_state':
      return (
        <EmptyState
          variant={section.variant}
          title={section.title}
          description={section.description}
          action={section.action}
          onAction={onAction}
        />
      )

    case 'info_section':
      return (
        <div className="mt-1">
          {section.title && (
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              {section.title}
            </p>
          )}
          <ul className="space-y-0.5" role="list">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'numbered_steps':
      return (
        <div className="mt-1">
          {section.title && (
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              {section.title}
            </p>
          )}
          <ol className="space-y-1" role="list">
            {section.steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )

    case 'warning':
      return (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 dark:border-amber-800 dark:bg-amber-900/30"
          role="alert"
        >
          <p className="text-xs text-amber-800 dark:text-amber-200">{section.content}</p>
        </div>
      )

    case 'success':
      return (
        <div
          className="rounded-lg border border-green-300 bg-green-50 px-3 py-2 dark:border-green-800 dark:bg-green-900/30"
          role="status"
        >
          <p className="text-xs text-green-800 dark:text-green-200">{section.message}</p>
        </div>
      )

    case 'error':
      return (
        <div
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 dark:border-red-800 dark:bg-red-900/30"
          role="alert"
        >
          <p className="text-xs text-red-800 dark:text-red-200">{section.message}</p>
          {section.retry && (
            <button
              onClick={() => onAction(section.retry!.value)}
              className="mt-1 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 underline"
            >
              {section.retry.label}
            </button>
          )}
        </div>
      )

    default:
      return null
  }
}
