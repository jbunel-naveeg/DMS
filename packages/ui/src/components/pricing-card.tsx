import * as React from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "../lib/utils"

export interface PricingCardProps {
  plan: {
    id: string
    name: string
    description: string
    price: number
    interval: string
    features: string[]
    is_popular?: boolean
    is_enterprise?: boolean
  }
  currentPlanId?: string
  onSelect: (planId: string) => void
  loading?: boolean
  className?: string
}

export function PricingCard({ 
  plan, 
  currentPlanId, 
  onSelect, 
  loading = false, 
  className 
}: PricingCardProps) {
  const isCurrentPlan = currentPlanId === plan.id
  const isPopular = plan.is_popular
  const isEnterprise = plan.is_enterprise

  const formatPrice = (price: number, interval: string) => {
    if (price === 0) return 'Free'
    return `$${price}/${interval}`
  }

  return (
    <Card className={cn(
      "relative w-full",
      isPopular && "border-blue-500 shadow-lg",
      isEnterprise && "border-purple-500 shadow-lg",
      className
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      {isEnterprise && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Enterprise
          </div>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-lg">{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{formatPrice(plan.price, plan.interval)}</span>
          {plan.price > 0 && (
            <span className="text-gray-500 ml-2">per {plan.interval}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={cn(
            "w-full",
            isCurrentPlan 
              ? "bg-gray-500 cursor-not-allowed" 
              : isPopular 
              ? "bg-blue-600 hover:bg-blue-700" 
              : isEnterprise
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-900 hover:bg-gray-800"
          )}
          onClick={() => onSelect(plan.id)}
          disabled={isCurrentPlan || loading}
        >
          {isCurrentPlan ? 'Current Plan' : loading ? 'Processing...' : 'Get Started'}
        </Button>
      </CardContent>
    </Card>
  )
}
