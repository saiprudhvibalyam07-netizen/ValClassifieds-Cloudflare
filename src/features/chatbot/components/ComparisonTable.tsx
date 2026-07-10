import { cn } from '../../../utils/cn'
import type { ComparisonRow } from '../services/responseTypes'

interface ComparisonTableProps {
  headers: string[]
  rows: ComparisonRow[]
  title?: string
}

export function ComparisonTable({ headers, rows, title }: ComparisonTableProps) {
  if (headers.length === 0 || rows.length === 0) return null

  return (
    <div className="mt-2">
      {title && (
        <h4 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table
          className="w-full text-left text-xs"
          role="table"
          aria-label={title || 'Comparison'}
        >
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400" scope="col">
                Feature
              </th>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-3 py-2 font-medium text-gray-700 dark:text-gray-300"
                  scope="col"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  'border-b border-gray-100 dark:border-gray-800',
                  i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
                )}
              >
                <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-300">
                  {row.label}
                </td>
                {row.values.map((value, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400"
                  >
                    {value || <span className="italic text-gray-400">Not available</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
