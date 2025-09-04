import * as React from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "../lib/utils"

// Define the hook interface locally to avoid circular dependency
interface UseFeatureGateReturn {
  isAllowed: boolean
  needsUpgrade: boolean
  reason?: string
  currentUsage?: number
  limit?: number
}

// Mock implementation - in a real app, this would be passed as a prop or context
function useFeatureGate(feature: string): UseFeatureGateReturn {
  // This is a placeholder - in the real implementation, this would come from a context or prop
  return {
    isAllowed: true, // Default to allowed for now
    needsUpgrade: false,
  }
}

export interface FeatureGateProps {
  feature: string
  fallback?: React.ReactNode
  children: React.ReactNode
  showUpgrade?: boolean
  className?: string
}

export function FeatureGate({ 
  feature, 
  fallback, 
  children, 
  showUpgrade = true,
  className 
}: FeatureGateProps) {
  const { isAllowed, needsUpgrade, reason, currentUsage, limit } = useFeatureGate(feature)

  if (isAllowed) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className={cn("relative", className)}>
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Feature Not Available</CardTitle>
            <CardDescription>
              {reason || 'This feature is not available in your current plan'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUsage !== undefined && limit !== undefined && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Usage: {currentUsage} / {limit === -1 ? '∞' : limit}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${Math.min((currentUsage / limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            
            {showUpgrade && (
              <Button 
                className="w-full"
                onClick={() => {
                  // This would typically navigate to the billing page
                  window.location.href = '/dashboard/billing'
                }}
              >
                Upgrade Plan
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export interface FeatureBadgeProps {
  feature: string
  className?: string
}

export function FeatureBadge({ feature, className }: FeatureBadgeProps) {
  const { isAllowed, needsUpgrade, reason } = useFeatureGate(feature)

  if (isAllowed) {
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800",
        className
      )}>
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Available
      </span>
    )
  }

  if (needsUpgrade) {
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
        className
      )}>
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Upgrade Required
      </span>
    )
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
      className
    )}>
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
      </svg>
      Not Available
    </span>
  )
}

export interface FeatureTooltipProps {
  feature: string
  children: React.ReactNode
  className?: string
}

export function FeatureTooltip({ feature, children, className }: FeatureTooltipProps) {
  const { isAllowed, reason } = useFeatureGate(feature)

  if (isAllowed) {
    return <>{children}</>
  }

  return (
    <div className={cn("relative group", className)}>
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        {reason || 'Feature not available in your current plan'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )
}
