'use client'

import { useState, useEffect } from 'react'
import { useUserData } from '@naveeg/lib'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  DomainManager,
  FeatureGate
} from '@naveeg/ui'
import { useRouter } from 'next/navigation'

interface Domain {
  id: string
  domain: string
  status: 'active' | 'inactive' | 'pending' | 'failed' | 'suspended'
  ssl_status: 'pending' | 'active' | 'failed' | 'expired'
  ssl_enabled: boolean
  verified_at?: string
  expires_at?: string
  nameservers?: string[]
  dns_records?: Array<{
    type: string
    name: string
    value: string
    ttl: number
  }>
}

export default function DomainsPage() {
  const { websites, loading: userDataLoading } = useUserData()
  const router = useRouter()
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null)

  // Load domains for the first website
  useEffect(() => {
    if (websites && websites.length > 0 && !selectedWebsite) {
      setSelectedWebsite(websites[0].id)
      loadDomains(websites[0].id)
    }
  }, [websites, selectedWebsite])

  const loadDomains = async (websiteId: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/domains?website_id=${websiteId}`)
      const data = await response.json()

      if (data.success) {
        setDomains(data.domains || [])
      } else {
        throw new Error(data.error || 'Failed to load domains')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load domains')
    } finally {
      setLoading(false)
    }
  }

  const handleAddDomain = async (domain: string): Promise<{ success: boolean; error?: string }> => {
    if (!selectedWebsite) {
      return { success: false, error: 'No website selected' }
    }

    try {
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website_id: selectedWebsite,
          domain: domain,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Reload domains
        await loadDomains(selectedWebsite)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to add domain' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add domain' }
    }
  }

  const handleRemoveDomain = async (domainId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/domains/${domainId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        // Reload domains
        if (selectedWebsite) {
          await loadDomains(selectedWebsite)
        }
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to remove domain' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to remove domain' }
    }
  }

  const handleVerifyDomain = async (domainId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/domains/${domainId}/verify`, {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        // Reload domains
        if (selectedWebsite) {
          await loadDomains(selectedWebsite)
        }
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to verify domain' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to verify domain' }
    }
  }

  const handleRequestSSL = async (domainId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/domains/${domainId}/ssl`, {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        // Reload domains
        if (selectedWebsite) {
          await loadDomains(selectedWebsite)
        }
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Failed to request SSL certificate' }
      }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to request SSL certificate' }
    }
  }

  const handleWebsiteChange = (websiteId: string) => {
    setSelectedWebsite(websiteId)
    loadDomains(websiteId)
  }

  if (userDataLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!websites || websites.length === 0) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No websites found</h3>
          <p className="mt-1 text-sm text-gray-500">
            You need to create a website before you can add custom domains.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.push('/onboarding')}>
              Create Website
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Custom Domains</h1>
        <p className="mt-2 text-gray-600">
          Connect your own domains to your websites.
        </p>
      </div>

      {/* Website Selector */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Website</CardTitle>
            <CardDescription>
              Choose which website to manage domains for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {websites.map((website) => (
                <div
                  key={website.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedWebsite === website.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleWebsiteChange(website.id)}
                >
                  <h3 className="font-medium text-gray-900">{website.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{website.url}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      website.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {website.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Domain Management */}
      {selectedWebsite && (
        <FeatureGate feature="custom_domains">
          <DomainManager
            websiteId={selectedWebsite}
            domains={domains}
            onAddDomain={handleAddDomain}
            onRemoveDomain={handleRemoveDomain}
            onVerifyDomain={handleVerifyDomain}
            onRequestSSL={handleRequestSSL}
            loading={loading}
          />
        </FeatureGate>
      )}

    </div>
  )
}