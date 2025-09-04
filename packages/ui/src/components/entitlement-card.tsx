import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { FeatureBadge } from "./feature-gate"
import { cn } from "../lib/utils"

export interface EntitlementCardProps {
  title: string
  description: string
  features: Array<{
    name: string
    feature: string
    description?: string
  }>
  onUpgrade?: () => void
  className?: string
}

export function EntitlementCard({ 
  title, 
  description, 
  features, 
  onUpgrade,
  className 
}: EntitlementCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{feature.name}</h4>
                  <FeatureBadge feature={feature.feature} />
                </div>
                {feature.description && (
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {onUpgrade && (
          <div className="pt-4 border-t">
            <Button 
              onClick={onUpgrade}
              className="w-full"
            >
              Upgrade Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export interface FeatureComparisonProps {
  features: Array<{
    name: string
    feature: string
    description?: string
  }>
  onUpgrade?: () => void
  className?: string
}

export function FeatureComparison({ 
  features, 
  onUpgrade,
  className 
}: FeatureComparisonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Feature Access</h3>
        <p className="text-sm text-gray-600">
          Check which features are available in your current plan
        </p>
      </div>
      
      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{feature.name}</h4>
              {feature.description && (
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              )}
            </div>
            <FeatureBadge feature={feature.feature} />
          </div>
        ))}
      </div>
      
      {onUpgrade && (
        <div className="text-center pt-4">
          <Button onClick={onUpgrade}>
            Upgrade to Access More Features
          </Button>
        </div>
      )}
    </div>
  )
}
