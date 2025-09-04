import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface BillingInfoProps {
  subscription: {
    id: string
    status: string
    current_period_start: string
    current_period_end: string
    cancel_at_period_end: boolean
    plan: {
      id: string
      name: string
      price: number
      interval: string
    }
  }
  onManageBilling: () => void
  onUpgrade: () => void
  onCancel: () => void
  className?: string
}

export function BillingInfo({ 
  subscription, 
  onManageBilling, 
  onUpgrade, 
  onCancel, 
  className 
}: BillingInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'trialing':
        return 'text-blue-600 bg-blue-100'
      case 'past_due':
        return 'text-yellow-600 bg-yellow-100'
      case 'canceled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'trialing':
        return 'Trial'
      case 'past_due':
        return 'Past Due'
      case 'canceled':
        return 'Canceled'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const formatPrice = (price: number, interval: string) => {
    if (price === 0) return 'Free'
    return `$${price}/${interval}`
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>
          Manage your subscription and billing details
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{subscription.plan.name}</h3>
              <p className="text-sm text-gray-500">
                {formatPrice(subscription.plan.price, subscription.plan.interval)}
              </p>
            </div>
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getStatusColor(subscription.status)
            )}>
              {getStatusText(subscription.status)}
            </div>
          </div>

          {/* Billing Period */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Current Period</span>
              <span className="font-medium">
                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
              </span>
            </div>
            
            {subscription.cancel_at_period_end && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cancellation</span>
                <span className="text-red-600 font-medium">
                  Ends on {formatDate(subscription.current_period_end)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onManageBilling}
            variant="outline"
            className="flex-1"
          >
            Manage Billing
          </Button>
          
          {subscription.status === 'active' && !subscription.cancel_at_period_end && (
            <>
              <Button
                onClick={onUpgrade}
                className="flex-1"
              >
                Upgrade Plan
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Cancel Subscription
              </Button>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Subscription ID: {subscription.id}</p>
          <p>
            {subscription.cancel_at_period_end 
              ? 'Your subscription will end at the current period and you will not be charged again.'
              : 'You will be charged automatically at the end of each billing period.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
