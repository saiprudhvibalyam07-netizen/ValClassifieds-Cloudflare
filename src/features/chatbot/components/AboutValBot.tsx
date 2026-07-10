import { X, Bot } from 'lucide-react'

interface AboutValBotProps {
  onClose: () => void
}

export function AboutValBot({ onClose }: AboutValBotProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="About ValBot"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <Bot className="h-7 w-7 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ValBot</h3>
          <p className="mt-1 text-xs text-gray-500">Marketplace Assistant</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          ValBot is the official Marketplace Assistant for ValClassifieds. It can help you
          search listings, discover products, buy safely, sell successfully, and navigate
          the platform.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">ValBot can help with</p>
          <ul className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-500" />
              Search and discover listings
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-500" />
              Buying guidance and safety tips
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-500" />
              Selling advice and listing help
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary-500" />
              Platform features and navigation
            </li>
          </ul>
        </div>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          ValBot provides guidance. It does not make decisions, negotiate, or invent marketplace information.
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
