import { createClient } from '@supabase/supabase-js'

export interface TenWebSite {
  id: string
  name: string
  url: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
  updated_at: string
}

export interface TenWebDomain {
  id: string
  domain: string
  site_id: string
  status: 'active' | 'inactive' | 'pending'
  ssl_enabled: boolean
  created_at: string
  updated_at: string
}

export interface CreateSiteRequest {
  name: string
  subdomain: string
  template?: string
  description?: string
}

export interface CreateSiteResponse {
  success: boolean
  site?: TenWebSite
  error?: string
}

export interface CreateDomainRequest {
  site_id: string
  domain: string
}

export interface CreateDomainResponse {
  success: boolean
  domain?: TenWebDomain
  error?: string
}

export class TenWebAPI {
  private apiKey: string
  private baseUrl = 'https://my.10web.io/api'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`TenWeb API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Create a new WordPress site
  async createSite(request: CreateSiteRequest): Promise<CreateSiteResponse> {
    try {
      // Simulate 10Web API call - replace with actual API integration
      const mockSite: TenWebSite = {
        id: `site_${Date.now()}`,
        name: request.name,
        url: `https://${request.subdomain}.naveeg.com`,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // In a real implementation, you would call the actual 10Web API:
      // const response = await this.makeRequest<TenWebSite>('/sites', 'POST', request)
      
      return {
        success: true,
        site: mockSite,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Get all sites for a user
  async getSites(): Promise<TenWebSite[]> {
    try {
      // Simulate API call - replace with actual implementation
      return []
    } catch (error) {
      console.error('Error fetching sites:', error)
      return []
    }
  }

  // Get site details
  async getSite(siteId: string): Promise<TenWebSite | null> {
    try {
      // Simulate API call - replace with actual implementation
      return null
    } catch (error) {
      console.error('Error fetching site:', error)
      return null
    }
  }

  // Create a custom domain for a site
  async createDomain(request: CreateDomainRequest): Promise<CreateDomainResponse> {
    try {
      // Simulate 10Web API call - replace with actual API integration
      const mockDomain: TenWebDomain = {
        id: `domain_${Date.now()}`,
        domain: request.domain,
        site_id: request.site_id,
        status: 'pending',
        ssl_enabled: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // In a real implementation, you would call the actual 10Web API:
      // const response = await this.makeRequest<TenWebDomain>('/domains', 'POST', request)
      
      return {
        success: true,
        domain: mockDomain,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Get domains for a site
  async getDomains(siteId: string): Promise<TenWebDomain[]> {
    try {
      // Simulate API call - replace with actual implementation
      return []
    } catch (error) {
      console.error('Error fetching domains:', error)
      return []
    }
  }

  // Delete a site
  async deleteSite(siteId: string): Promise<boolean> {
    try {
      // Simulate API call - replace with actual implementation
      return true
    } catch (error) {
      console.error('Error deleting site:', error)
      return false
    }
  }

  // Delete a domain
  async deleteDomain(domainId: string): Promise<boolean> {
    try {
      // Simulate API call - replace with actual implementation
      return true
    } catch (error) {
      console.error('Error deleting domain:', error)
      return false
    }
  }
}

// Create a singleton instance
export const tenWebAPI = new TenWebAPI(process.env.TENWEB_API_KEY || '')

// Helper function to get TenWeb API instance
export function getTenWebAPI(): TenWebAPI {
  const apiKey = process.env.TENWEB_API_KEY
  if (!apiKey) {
    throw new Error('TENWEB_API_KEY environment variable is required')
  }
  return new TenWebAPI(apiKey)
}