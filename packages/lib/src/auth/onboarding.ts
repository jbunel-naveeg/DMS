import { useState, useEffect } from 'react'
import { createBrowserClient } from './auth'

export interface OnboardingStatus {
  isCompleted: boolean
  hasWebsites: boolean
  loading: boolean
  error: string | null
}

export function useOnboardingStatus(): OnboardingStatus {
  const [status, setStatus] = useState<OnboardingStatus>({
    isCompleted: false,
    hasWebsites: false,
    loading: true,
    error: null
  })
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        setStatus(prev => ({ ...prev, loading: true, error: null }))

        // Check if user has any websites
        const { data: websites, error: websitesError } = await supabase
          .from('websites')
          .select('id')
          .limit(1)

        if (websitesError) {
          throw new Error(websitesError.message)
        }

        const hasWebsites = websites && websites.length > 0
        const isCompleted = hasWebsites

        setStatus({
          isCompleted,
          hasWebsites,
          loading: false,
          error: null
        })
      } catch (error) {
        setStatus({
          isCompleted: false,
          hasWebsites: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    checkOnboardingStatus()
  }, [supabase])

  return status
}
