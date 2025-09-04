'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useOnboardingStatus } from '@naveeg/lib'

export default function Home() {
  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  const { isCompleted, loading: onboardingLoading } = useOnboardingStatus()

  useEffect(() => {
    if (!userLoading && !onboardingLoading) {
      if (user) {
        if (isCompleted) {
          router.push('/dashboard')
        } else {
          router.push('/onboarding')
        }
      } else {
        router.push('/auth/signin')
      }
    }
  }, [user, userLoading, isCompleted, onboardingLoading, router])

  if (userLoading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null
}
