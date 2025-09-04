import { UserPlan, PlanLimits, PlanUsage } from '../types/plans'

export interface FeatureEntitlement {
  feature: string
  allowed: boolean
  reason?: string
  upgradeRequired?: boolean
  currentUsage?: number
  limit?: number
}

export interface EntitlementCheck {
  feature: string
  planId: string
  usage: PlanUsage
  limits: PlanLimits
}

export class EntitlementService {
  private planLimits: Map<string, PlanLimits> = new Map()
  private featureDefinitions: Map<string, string[]> = new Map()

  constructor() {
    this.initializeFeatureDefinitions()
  }

  private initializeFeatureDefinitions() {
    // Define which features are available for each plan
    this.featureDefinitions.set('trial', [
      'basic_websites',
      'basic_domains',
      'basic_analytics',
      'basic_support'
    ])

    this.featureDefinitions.set('starter', [
      'basic_websites',
      'basic_domains',
      'basic_analytics',
      'basic_support',
      'custom_domains',
      'ssl_certificates',
      'priority_support',
      'basic_team_collaboration'
    ])

    this.featureDefinitions.set('pro', [
      'basic_websites',
      'basic_domains',
      'basic_analytics',
      'basic_support',
      'custom_domains',
      'ssl_certificates',
      'priority_support',
      'basic_team_collaboration',
      'advanced_analytics',
      'api_access',
      'advanced_team_collaboration',
      'custom_integrations'
    ])

    this.featureDefinitions.set('enterprise', [
      'basic_websites',
      'basic_domains',
      'basic_analytics',
      'basic_support',
      'custom_domains',
      'ssl_certificates',
      'priority_support',
      'basic_team_collaboration',
      'advanced_analytics',
      'api_access',
      'advanced_team_collaboration',
      'custom_integrations',
      'unlimited_websites',
      'unlimited_domains',
      'dedicated_support',
      'custom_contracts',
      'sla_guarantee'
    ])
  }

  checkFeatureEntitlement(check: EntitlementCheck): FeatureEntitlement {
    const { feature, planId, usage, limits } = check

    // Check if feature is available in the plan
    const planFeatures = this.featureDefinitions.get(planId) || []
    if (!planFeatures.includes(feature)) {
      return {
        feature,
        allowed: false,
        reason: 'Feature not available in your current plan',
        upgradeRequired: true
      }
    }

    // Check usage-based limits
    const usageCheck = this.checkUsageLimits(feature, usage, limits)
    if (!usageCheck.allowed) {
      return {
        feature,
        allowed: false,
        reason: usageCheck.reason,
        upgradeRequired: usageCheck.upgradeRequired,
        currentUsage: usageCheck.currentUsage,
        limit: usageCheck.limit
      }
    }

    return {
      feature,
      allowed: true
    }
  }

  private checkUsageLimits(feature: string, usage: PlanUsage, limits: PlanLimits): {
    allowed: boolean
    reason?: string
    upgradeRequired?: boolean
    currentUsage?: number
    limit?: number
  } {
    switch (feature) {
      case 'basic_websites':
      case 'unlimited_websites':
        return this.checkLimit('websites', usage.websites, limits.websites)
      
      case 'basic_domains':
      case 'custom_domains':
      case 'unlimited_domains':
        return this.checkLimit('domains', usage.domains, limits.domains)
      
      case 'basic_team_collaboration':
      case 'advanced_team_collaboration':
        return this.checkLimit('team_members', usage.team_members, limits.team_members)
      
      case 'storage':
        return this.checkLimit('storage', usage.storage, limits.storage)
      
      case 'bandwidth':
        return this.checkLimit('bandwidth', usage.bandwidth, limits.bandwidth)
      
      default:
        return { allowed: true }
    }
  }

  private checkLimit(
    resource: string,
    currentUsage: { used: number; limit: number },
    limit: number
  ): {
    allowed: boolean
    reason?: string
    upgradeRequired?: boolean
    currentUsage?: number
    limit?: number
  } {
    if (limit === -1) {
      return { allowed: true } // Unlimited
    }

    if (currentUsage.used >= limit) {
      return {
        allowed: false,
        reason: `You have reached your ${resource} limit`,
        upgradeRequired: true,
        currentUsage: currentUsage.used,
        limit: limit
      }
    }

    if (currentUsage.used >= limit * 0.8) {
      return {
        allowed: true,
        reason: `You are approaching your ${resource} limit`,
        currentUsage: currentUsage.used,
        limit: limit
      }
    }

    return { allowed: true }
  }

  getAvailableFeatures(planId: string): string[] {
    return this.featureDefinitions.get(planId) || []
  }

  getFeatureTier(feature: string): 'trial' | 'starter' | 'pro' | 'enterprise' {
    for (const [planId, features] of this.featureDefinitions.entries()) {
      if (features.includes(feature)) {
        return planId as 'trial' | 'starter' | 'pro' | 'enterprise'
      }
    }
    return 'enterprise' // Default to highest tier if not found
  }

  canUpgrade(currentPlanId: string, targetPlanId: string): boolean {
    const planHierarchy = ['trial', 'starter', 'pro', 'enterprise']
    const currentIndex = planHierarchy.indexOf(currentPlanId)
    const targetIndex = planHierarchy.indexOf(targetPlanId)
    
    return targetIndex > currentIndex
  }

  getUpgradePath(currentPlanId: string): string[] {
    const planHierarchy = ['trial', 'starter', 'pro', 'enterprise']
    const currentIndex = planHierarchy.indexOf(currentPlanId)
    
    return planHierarchy.slice(currentIndex + 1)
  }
}

// Create a singleton instance
export const entitlementService = new EntitlementService()
