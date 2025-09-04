import { useState, useEffect } from 'react'
import { createBrowserClient } from '../auth/auth'
import { UserPlan, Website, Domain, UsageStats, PlanUsage } from '../types/plans'

export interface UserData {
  plan: UserPlan | null
  websites: Website[]
  domains: Domain[]
  usage: UsageStats
  planUsage: PlanUsage
  loading: boolean
  error: string | null
}

export function useUserData(): UserData {
  const [data, setData] = useState<UserData>({
    plan: null,
    websites: [],
    domains: [],
    usage: {
      websites_count: 0,
      domains_count: 0,
      storage_used: 0,
      bandwidth_used: 0,
      team_members_count: 0
    },
    planUsage: {
      websites: { used: 0, limit: 0 },
      domains: { used: 0, limit: 0 },
      storage: { used: 0, limit: 0 },
      bandwidth: { used: 0, limit: 0 },
      team_members: { used: 0, limit: 0 }
    },
    loading: true,
    error: null
  })

  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))

        // Fetch user's current plan
        const { data: planData, error: planError } = await supabase
          .from('user_plans')
          .select(`
            *,
            plan:plans(*)
          `)
          .eq('status', 'active')
          .single()

        if (planError && planError.code !== 'PGRST116') {
          throw new Error(planError.message)
        }

        // Fetch user's websites
        const { data: websitesData, error: websitesError } = await supabase
          .from('websites')
          .select('*')
          .order('created_at', { ascending: false })

        if (websitesError) {
          throw new Error(websitesError.message)
        }

        // Fetch user's domains
        const { data: domainsData, error: domainsError } = await supabase
          .from('domains')
          .select(`
            *,
            website:websites(*)
          `)
          .order('created_at', { ascending: false })

        if (domainsError) {
          throw new Error(domainsError.message)
        }

        // Calculate usage stats
        const usage: UsageStats = {
          websites_count: websitesData?.length || 0,
          domains_count: domainsData?.length || 0,
          storage_used: 0, // This would be calculated from actual storage usage
          bandwidth_used: 0, // This would be calculated from actual bandwidth usage
          team_members_count: 0 // This would be fetched from team_members table
        }

        // Calculate plan usage
        const plan = planData?.plan || { limits: { websites: 1, domains: 1, storage: 1, bandwidth: 10, team_members: 1 } }
        const planUsage: PlanUsage = {
          websites: { used: usage.websites_count, limit: plan.limits.websites },
          domains: { used: usage.domains_count, limit: plan.limits.domains },
          storage: { used: usage.storage_used, limit: plan.limits.storage },
          bandwidth: { used: usage.bandwidth_used, limit: plan.limits.bandwidth },
          team_members: { used: usage.team_members_count, limit: plan.limits.team_members }
        }

        setData({
          plan: planData,
          websites: websitesData || [],
          domains: domainsData || [],
          usage,
          planUsage,
          loading: false,
          error: null
        })
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch user data'
        }))
      }
    }

    fetchUserData()
  }, [supabase])

  return data
}
