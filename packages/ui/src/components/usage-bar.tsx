import * as React from "react"
import { cn } from "../lib/utils"

export interface UsageBarProps {
  label: string
  used: number
  limit: number
  unit?: string
  className?: string
}

export function UsageBar({ label, used, limit, unit = "", className }: UsageBarProps) {
  const percentage = limit === -1 ? 0 : Math.min((used / limit) * 100, 100)
  const isUnlimited = limit === -1
  const isNearLimit = percentage > 80
  const isOverLimit = used > limit && limit !== -1

  const getBarColor = () => {
    if (isOverLimit) return "bg-red-500"
    if (isNearLimit) return "bg-yellow-500"
    return "bg-blue-500"
  }

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className={cn(
          "font-medium",
          isOverLimit ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-gray-900"
        )}>
          {isUnlimited ? (
            `${formatValue(used)}${unit}`
          ) : (
            `${formatValue(used)}${unit} / ${formatValue(limit)}${unit}`
          )}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            getBarColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {isUnlimited && (
        <p className="text-xs text-gray-500">Unlimited</p>
      )}
      
      {isOverLimit && (
        <p className="text-xs text-red-600">
          Over limit! Please upgrade your plan.
        </p>
      )}
      
      {isNearLimit && !isOverLimit && (
        <p className="text-xs text-yellow-600">
          Approaching limit. Consider upgrading.
        </p>
      )}
    </div>
  )
}
