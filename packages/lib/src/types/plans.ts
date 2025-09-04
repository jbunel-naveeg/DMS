export interface Plan {
  id: string
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    websites: number
    domains: number
    storage: number // in GB
    bandwidth: number // in GB
    team_members: number
  }
  stripe_price_id?: string
  is_popular?: boolean
  is_enterprise?: boolean
}

export interface UserPlan {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
  plan: Plan
}

export interface Website {
  id: string
  user_id: string
  name: string
  subdomain: string
  url: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  template: string
  description?: string
  created_at: string
  updated_at: string
  last_deployed_at?: string
}

export interface Domain {
  id: string
  website_id: string
  domain: string
  status: 'active' | 'inactive' | 'pending' | 'failed'
  ssl_enabled: boolean
  created_at: string
  updated_at: string
  website: Website
}

export interface UsageStats {
  websites_count: number
  domains_count: number
  storage_used: number // in GB
  bandwidth_used: number // in GB
  team_members_count: number
}

export interface PlanLimits {
  websites: number
  domains: number
  storage: number
  bandwidth: number
  team_members: number
}

export interface PlanUsage {
  websites: { used: number; limit: number }
  domains: { used: number; limit: number }
  storage: { used: number; limit: number }
  bandwidth: { used: number; limit: number }
  team_members: { used: number; limit: number }
}

// Plan definitions
export const PLANS: Plan[] = [
  {
    id: 'trial',
    name: 'Trial',
    description: 'Perfect for testing the platform',
    price: 0,
    interval: 'month',
    features: [
      '1 Website',
      '1 Subdomain',
      '1GB Storage',
      '10GB Bandwidth',
      'Basic Support',
      'WordPress Hosting'
    ],
    limits: {
      websites: 1,
      domains: 1,
      storage: 1,
      bandwidth: 10,
      team_members: 1
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Great for small businesses and freelancers',
    price: 29,
    interval: 'month',
    features: [
      '3 Websites',
      '3 Custom Domains',
      '10GB Storage',
      '100GB Bandwidth',
      'Priority Support',
      'WordPress Hosting',
      'SSL Certificates',
      'Basic Analytics'
    ],
    limits: {
      websites: 3,
      domains: 3,
      storage: 10,
      bandwidth: 100,
      team_members: 2
    },
    stripe_price_id: 'price_starter_monthly'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Perfect for growing businesses',
    price: 79,
    interval: 'month',
    features: [
      '10 Websites',
      '10 Custom Domains',
      '50GB Storage',
      '500GB Bandwidth',
      'Priority Support',
      'WordPress Hosting',
      'SSL Certificates',
      'Advanced Analytics',
      'Team Collaboration',
      'API Access'
    ],
    limits: {
      websites: 10,
      domains: 10,
      storage: 50,
      bandwidth: 500,
      team_members: 5
    },
    is_popular: true,
    stripe_price_id: 'price_pro_monthly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: 199,
    interval: 'month',
    features: [
      'Unlimited Websites',
      'Unlimited Domains',
      '500GB Storage',
      '2TB Bandwidth',
      '24/7 Priority Support',
      'WordPress Hosting',
      'SSL Certificates',
      'Advanced Analytics',
      'Team Collaboration',
      'API Access',
      'Custom Integrations',
      'Dedicated Support'
    ],
    limits: {
      websites: -1, // -1 means unlimited
      domains: -1,
      storage: 500,
      bandwidth: 2000,
      team_members: -1
    },
    is_enterprise: true,
    stripe_price_id: 'price_enterprise_monthly'
  }
]

// Helper functions
export function getPlanById(id: string): Plan | undefined {
  return PLANS.find(plan => plan.id === id)
}

export function getPlanLimits(planId: string): PlanLimits | null {
  const plan = getPlanById(planId)
  return plan ? plan.limits : null
}

export function calculateUsagePercentage(usage: number, limit: number): number {
  if (limit === -1) return 0 // Unlimited
  if (limit === 0) return 100
  return Math.min((usage / limit) * 100, 100)
}

export function isFeatureAvailable(planId: string, feature: keyof PlanLimits, currentUsage: number): boolean {
  const limits = getPlanLimits(planId)
  if (!limits) return false
  
  const limit = limits[feature]
  if (limit === -1) return true // Unlimited
  return currentUsage < limit
}

export function formatStorageSize(gb: number): string {
  if (gb >= 1000) {
    return `${(gb / 1000).toFixed(1)}TB`
  }
  return `${gb}GB`
}

export function formatBandwidthSize(gb: number): string {
  if (gb >= 1000) {
    return `${(gb / 1000).toFixed(1)}TB`
  }
  return `${gb}GB`
}