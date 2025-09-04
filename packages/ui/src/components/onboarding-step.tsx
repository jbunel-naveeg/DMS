import * as React from "react"
import { cn } from "../lib/utils"

export interface OnboardingStepProps {
  step: number
  totalSteps: number
  title: string
  description?: string
  children: React.ReactNode
  isCompleted?: boolean
  isActive?: boolean
  className?: string
}

export function OnboardingStep({
  step,
  totalSteps,
  title,
  description,
  children,
  isCompleted = false,
  isActive = false,
  className
}: OnboardingStepProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Step Header */}
      <div className="flex items-center space-x-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium",
          isCompleted 
            ? "border-green-500 bg-green-500 text-white" 
            : isActive 
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-gray-300 bg-white text-gray-500"
        )}>
          {isCompleted ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            step
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>

      {/* Step Content */}
      {isActive && (
        <div className="ml-14">
          {children}
        </div>
      )}
    </div>
  )
}
