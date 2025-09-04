export interface LeadData {
  email: string
  name: string
  company?: string
  phone?: string
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface SiteProvisioningData {
  user_id: string
  site_name: string
  subdomain: string
  template?: string
}

export interface DomainActionData {
  action: 'verify' | 'ssl_request' | 'delete'
  domain: string
  user_id: string
  website_id?: string
}

export interface N8NResponse {
  success: boolean
  message: string
  [key: string]: any
}

export class N8NService {
  private baseUrl: string

  constructor(baseUrl: string = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678') {
    this.baseUrl = baseUrl
  }

  /**
   * Capture a lead from the marketing site
   */
  async captureLead(leadData: LeadData): Promise<N8NResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/lead-captured`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadData,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error capturing lead:', error)
      throw new Error('Failed to capture lead')
    }
  }

  /**
   * Provision a new site
   */
  async provisionSite(siteData: SiteProvisioningData): Promise<N8NResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/provision-site`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...siteData,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error provisioning site:', error)
      throw new Error('Failed to provision site')
    }
  }

  /**
   * Process domain action
   */
  async processDomainAction(domainData: DomainActionData): Promise<N8NResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/domain-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...domainData,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error processing domain action:', error)
      throw new Error('Failed to process domain action')
    }
  }

  /**
   * Check N8N health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/healthz`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      return response.ok
    } catch (error) {
      console.error('Error checking N8N health:', error)
      return false
    }
  }

  /**
   * Get workflow status
   */
  async getWorkflowStatus(workflowId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting workflow status:', error)
      throw new Error('Failed to get workflow status')
    }
  }
}

// Export singleton instance
export const n8nService = new N8NService()
