import { Bot } from 'lucide-react'
import type { ChatbotMessage, StructuredResponse } from '../types'
import { formatTime } from '../../../utils/formatTime'
import { ResponseRenderer } from './ResponseRenderer'

interface AssistantBubbleProps {
  message: ChatbotMessage
  structuredResponse?: StructuredResponse
  onAction?: (value: string) => void
}

export function AssistantBubble({ message, structuredResponse, onAction }: AssistantBubbleProps) {
  const hasStructured = structuredResponse && (
    structuredResponse.sections.length > 0 ||
    (structuredResponse.suggestedActions && structuredResponse.suggestedActions.length > 0)
  )

  return (
    <div className="flex gap-2 px-4 py-1.5 justify-start">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
        <Bot className="h-4 w-4 text-primary-600" />
      </div>
      <div className="max-w-[80%]">
        <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm leading-relaxed text-gray-900 dark:text-gray-100 rounded-bl-md">
          {hasStructured && onAction ? (
            <ResponseRenderer response={structuredResponse!} onAction={onAction} />
          ) : (
            <p>{message.content}</p>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 justify-start">
          <span className="text-[10px] text-gray-400">{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
