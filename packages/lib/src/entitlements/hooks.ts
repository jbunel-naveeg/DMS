import { useState, useEffect } from 'react'
import { useUserData } from '../hooks/use-user-data'
import { entitlementService, FeatureEntitlement, EntitlementCheck } from './entitlements'

export interface UseEntitlementReturn {
  checkFeature: (feature: string) => FeatureEntitlement
  hasFeature: (feature: string) => boolean
  canUseFeature: (feature: string) => boolean
  getFeatureReason: (feature: string) => string | undefined
  requiresUpgrade: (feature: string) => boolean
  loading: boolean
  error: string | null
}

export function useEntitlements(): UseEntitlementReturn {
  const { plan, planUsage, loading, error } = useUserData()
  const [entitlements, setEntitlements] = useState<Map<string, FeatureEntitlement>>(new Map())

  useEffect(() => {
    if (!plan || !planUsage) return

    const currentEntitlements = new Map<string, FeatureEntitlement>()
    
    // Check all available features for the current plan
    const availableFeatures = entitlementService.getAvailableFeatures(plan.plan.id)
    
    availableFeatures.forEach(feature => {
      const check: EntitlementCheck = {
        feature,
        planId: plan.plan.id,
        usage: planUsage,
        limits: plan.plan.limits
      }
      
      const entitlement = entitlementService.checkFeatureEntitlement(check)
      currentEntitlements.set(feature, entitlement)
    })

    setEntitlements(currentEntitlements)
  }, [plan, planUsage])

  const checkFeature = (feature: string): FeatureEntitlement => {
    if (entitlements.has(feature)) {
      return entitlements.get(feature)!
    }

    // If not cached, check on demand
    if (!plan || !planUsage) {
      return {
        feature,
        allowed: false,
        reason: 'No plan information available'
      }
    }

    const check: EntitlementCheck = {
      feature,
      planId: plan.plan.id,
      usage: planUsage,
      limits: plan.plan.limits
    }

    return entitlementService.checkFeatureEntitlement(check)
  }

  const hasFeature = (feature: string): boolean => {
    return checkFeature(feature).allowed
  }

  const canUseFeature = (feature: string): boolean => {
    const entitlement = checkFeature(feature)
    return entitlement.allowed && !entitlement.upgradeRequired
  }

  const getFeatureReason = (feature: string): string | undefined => {
    return checkFeature(feature).reason
  }

  const requiresUpgrade = (feature: string): boolean => {
    return checkFeature(feature).upgradeRequired || false
  }

  return {
    checkFeature,
    hasFeature,
    canUseFeature,
    getFeatureReason,
    requiresUpgrade,
    loading,
    error
  }
}

export interface UseFeatureGateProps {
  feature: string
  fallback?: React.ReactNode
  children: React.ReactNode
  showUpgrade?: boolean
}

export function useFeatureGate(feature: string) {
  const entitlements = useEntitlements()
  const entitlement = entitlements.checkFeature(feature)

  return {
    ...entitlement,
    ...entitlements,
    isAllowed: entitlement.allowed,
    needsUpgrade: entitlement.upgradeRequired || false
  }
}
