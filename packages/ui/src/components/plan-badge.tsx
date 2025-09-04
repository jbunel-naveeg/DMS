import * as React from "react"
import { cn } from "../lib/utils"

export interface PlanBadgeProps {
  plan: {
    id: string
    name: string
    is_popular?: boolean
    is_enterprise?: boolean
  }
  className?: string
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  const getBadgeVariant = () => {
    if (plan.is_enterprise) return "enterprise"
    if (plan.is_popular) return "popular"
    if (plan.id === "trial") return "trial"
    return "default"
  }

  const variant = getBadgeVariant()

  const getBadgeStyles = () => {
    switch (variant) {
      case "enterprise":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500"
      case "popular":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500"
      case "trial":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getBadgeText = () => {
    switch (variant) {
      case "enterprise":
        return "Enterprise"
      case "popular":
        return "Most Popular"
      case "trial":
        return "Trial"
      default:
        return plan.name
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getBadgeStyles(),
        className
      )}
    >
      {variant === "popular" && (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {getBadgeText()}
    </div>
  )
}
