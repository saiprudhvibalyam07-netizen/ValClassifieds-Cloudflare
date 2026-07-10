import { Check, CheckCheck, AlertCircle } from 'lucide-react'
import type { ChatbotMessage } from '../types'
import { cn } from '../../../utils/cn'
import { formatTime } from '../../../utils/formatTime'

interface MessageBubbleProps {
  message: ChatbotMessage
  onRetry?: (messageId: string) => void
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const isFailed = message.status === 'failed'
  const isSending = message.status === 'sending'

  return (
    <div className="flex gap-2 px-4 py-1.5 justify-end">
      <div className="max-w-[80%] order-1">
        <div
          className={cn(
            'rounded-2xl px-4 py-2 text-sm leading-relaxed bg-primary-600 text-white rounded-br-md',
            isFailed && 'opacity-70'
          )}
        >
          <p>{message.content}</p>
        </div>
        <div className="mt-1 flex items-center gap-1 justify-end">
          <span className="text-[10px] text-gray-400">{formatTime(message.createdAt)}</span>
          <span className="text-[10px]">
            {isSending && <Check className="h-3 w-3 text-gray-400" />}
            {message.status === 'sent' && <CheckCheck className="h-3 w-3 text-blue-400" />}
            {isFailed && (
              <button
                onClick={() => onRetry?.(message.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
                aria-label="Retry sending message"
              >
                <AlertCircle className="h-3 w-3" />
                <span className="text-[10px]">Failed</span>
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
