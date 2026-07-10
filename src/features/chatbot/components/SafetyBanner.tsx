import { ShieldAlert, AlertTriangle, CreditCard, UserX, Info } from 'lucide-react'
import { cn } from '../../../utils/cn'
import type { SafetyVariant } from '../services/responseTypes'

interface SafetyBannerProps {
  variant: SafetyVariant
  title: string
  message: string
  tips?: string[]
}

const VARIANT_CONFIG: Record<SafetyVariant, {
  icon: typeof ShieldAlert
  containerClass: string
  iconClass: string
  titleClass: string
}> = {
  scam_warning: {
    icon: AlertTriangle,
    containerClass: 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30',
    iconClass: 'text-red-500',
    titleClass: 'text-red-800 dark:text-red-200',
  },
  unsafe_payment: {
    icon: CreditCard,
    containerClass: 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30',
    iconClass: 'text-amber-500',
    titleClass: 'text-amber-800 dark:text-amber-200',
  },
  suspicious_seller: {
    icon: UserX,
    containerClass: 'border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/30',
    iconClass: 'text-orange-500',
    titleClass: 'text-orange-800 dark:text-orange-200',
  },
  identity_warning: {
    icon: ShieldAlert,
    containerClass: 'border-purple-300 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/30',
    iconClass: 'text-purple-500',
    titleClass: 'text-purple-800 dark:text-purple-200',
  },
  general_safety: {
    icon: Info,
    containerClass: 'border-primary-300 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/30',
    iconClass: 'text-primary-500',
    titleClass: 'text-primary-800 dark:text-primary-200',
  },
}

export function SafetyBanner({ variant, title, message, tips }: SafetyBannerProps) {
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.general_safety
  const Icon = config.icon

  return (
    <div
      className={cn(
        'mt-2 rounded-xl border p-3',
        config.containerClass
      )}
      role="alert"
      aria-label={title}
    >
      <div className="flex items-start gap-2">
        <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', config.iconClass)} />
        <div className="min-w-0 flex-1">
          <h4 className={cn('text-xs font-semibold', config.titleClass)}>
            {title}
          </h4>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {message}
          </p>

          {tips && tips.length > 0 && (
            <ul className="mt-2 space-y-1" role="list">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[11px] text-gray-600 dark:text-gray-400"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
