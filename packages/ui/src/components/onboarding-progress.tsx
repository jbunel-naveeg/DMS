import * as React from "react"
import { cn } from "../lib/utils"

export interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  steps: {
    id: string
    title: string
    completed: boolean
  }[]
  className?: string
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  steps,
  className
}: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center space-x-3 text-sm",
              index < currentStep ? "text-green-600" : 
              index === currentStep - 1 ? "text-blue-600" : 
              "text-gray-400"
            )}
          >
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-medium",
              step.completed 
                ? "border-green-500 bg-green-500 text-white" 
                : index === currentStep - 1
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-white text-gray-400"
            )}>
              {step.completed ? (
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={cn(
              "font-medium",
              step.completed ? "text-green-600" : 
              index === currentStep - 1 ? "text-blue-600" : 
              "text-gray-400"
            )}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
