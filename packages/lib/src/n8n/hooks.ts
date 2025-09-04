import { useState, useCallback } from 'react'
import { n8nService, LeadData, SiteProvisioningData, DomainActionData, N8NResponse } from './n8n'

export interface UseN8NReturn {
  captureLead: (leadData: LeadData) => Promise<N8NResponse>
  provisionSite: (siteData: SiteProvisioningData) => Promise<N8NResponse>
  processDomainAction: (domainData: DomainActionData) => Promise<N8NResponse>
  checkHealth: () => Promise<boolean>
  loading: boolean
  error: string | null
}

export function useN8N(): UseN8NReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRequest = useCallback(async <T>(
    requestFn: () => Promise<T>
  ): Promise<T> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await requestFn()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const captureLead = useCallback(async (leadData: LeadData): Promise<N8NResponse> => {
    return handleRequest(() => n8nService.captureLead(leadData))
  }, [handleRequest])

  const provisionSite = useCallback(async (siteData: SiteProvisioningData): Promise<N8NResponse> => {
    return handleRequest(() => n8nService.provisionSite(siteData))
  }, [handleRequest])

  const processDomainAction = useCallback(async (domainData: DomainActionData): Promise<N8NResponse> => {
    return handleRequest(() => n8nService.processDomainAction(domainData))
  }, [handleRequest])

  const checkHealth = useCallback(async (): Promise<boolean> => {
    return handleRequest(() => n8nService.checkHealth())
  }, [handleRequest])

  return {
    captureLead,
    provisionSite,
    processDomainAction,
    checkHealth,
    loading,
    error
  }
}
