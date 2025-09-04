import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface UpgradeCTAProps {
  currentPlan: {
    id: string
    name: string
  }
  suggestedPlan: {
    id: string
    name: string
    price: number
    interval: string
    features: string[]
  }
  onUpgrade: () => void
  reason?: string
  className?: string
}

export function UpgradeCTA({ 
  currentPlan, 
  suggestedPlan, 
  onUpgrade, 
  reason,
  className 
}: UpgradeCTAProps) {
  const formatPrice = (price: number, interval: string) => {
    if (price === 0) return 'Free'
    return `$${price}/${interval}`
  }

  return (
    <Card className={cn("border-blue-200 bg-blue-50", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-blue-900">
              Upgrade to {suggestedPlan.name}
            </CardTitle>
            <CardDescription className="text-blue-700">
              {reason || `You're currently on the ${currentPlan.name} plan.`}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {formatPrice(suggestedPlan.price, suggestedPlan.interval)}
            </div>
            <div className="text-sm text-blue-600">
              per {suggestedPlan.interval}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-blue-900">What you'll get:</h4>
          <ul className="space-y-1">
            {suggestedPlan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-blue-700">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
            {suggestedPlan.features.length > 3 && (
              <li className="text-sm text-blue-600">
                +{suggestedPlan.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <Button
          onClick={onUpgrade}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  )
}

export interface UsageUpgradeCTAProps {
  feature: string
  currentUsage: number
  limit: number
  suggestedPlan: {
    id: string
    name: string
    price: number
    interval: string
  }
  onUpgrade: () => void
  className?: string
}

export function UsageUpgradeCTA({ 
  feature, 
  currentUsage, 
  limit, 
  suggestedPlan, 
  onUpgrade, 
  className 
}: UsageUpgradeCTAProps) {
  const percentage = (currentUsage / limit) * 100
  const isOverLimit = currentUsage > limit

  return (
    <Card className={cn("border-yellow-200 bg-yellow-50", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-yellow-800">
              {isOverLimit ? 'Limit Exceeded' : 'Approaching Limit'}
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              You've used {currentUsage} of {limit} {feature}
              {isOverLimit ? '. Please upgrade to continue.' : '. Consider upgrading soon.'}
            </p>
            <div className="mt-3 flex space-x-3">
              <Button
                size="sm"
                onClick={onUpgrade}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Upgrade to {suggestedPlan.name}
              </Button>
              <div className="text-sm text-yellow-600 flex items-center">
                ${suggestedPlan.price}/{suggestedPlan.interval}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
