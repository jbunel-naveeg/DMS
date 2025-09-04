"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GoogleIntegrationManager, GoogleIntegration } from "@naveeg/ui"
import { useUserData } from "@naveeg/lib"

export default function GoogleIntegrationsPage() {
  const router = useRouter()
  const { loading: userLoading } = useUserData()
  const [integrations, setIntegrations] = useState<GoogleIntegration[]>([])
  const [loading, setLoading] = useState(false)

  // Load integrations on component mount
  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/google/integrations')
      if (!response.ok) {
        throw new Error('Failed to load integrations')
      }

      const data = await response.json()
      setIntegrations(data.integrations || [])
    } catch (err) {
      console.error('Error loading integrations:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (type: 'analytics' | 'search_console' | 'business_profile') => {
    try {
      // Get OAuth authorization URL
      const response = await fetch('/api/google/oauth/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service: type }),
      })

      if (!response.ok) {
        throw new Error('Failed to get authorization URL')
      }

      const data = await response.json()
      
      // Redirect to Google OAuth
      window.location.href = data.authorizationUrl
    } catch (err) {
      console.error('Error connecting service:', err)
    }
  }

  const handleDisconnect = async (id: string) => {
    try {
      const response = await fetch(`/api/google/integrations/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to disconnect')
      }

      // Remove from local state
      setIntegrations(prev => prev.filter(integration => integration.id !== id))
      
      return { success: true }
    } catch (err) {
      console.error('Error disconnecting service:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect'
      return { success: false, error: errorMessage }
    }
  }

  const handleReconnect = async (id: string) => {
    try {
      // Find the integration to reconnect
      const integration = integrations.find(i => i.id === id)
      if (!integration) {
        throw new Error('Integration not found')
      }

      // Get OAuth authorization URL for reconnection
      const response = await fetch('/api/google/oauth/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          service: integration.type,
          reconnect: true,
          integrationId: id 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get authorization URL')
      }

      const data = await response.json()
      
      // Redirect to Google OAuth
      window.location.href = data.authorizationUrl
      
      return { success: true }
    } catch (err) {
      console.error('Error reconnecting service:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to reconnect'
      return { success: false, error: errorMessage }
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <GoogleIntegrationManager
          integrations={integrations}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onReconnect={handleReconnect}
          loading={loading}
        />
      </div>
    </div>
  )
}
