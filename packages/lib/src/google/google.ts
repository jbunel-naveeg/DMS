import { GoogleAnalyticsService, GoogleAnalyticsMetrics } from './google-analytics'
import { GoogleSearchConsoleService, GoogleSearchConsoleMetrics } from './google-search-console'
import { GoogleBusinessProfileService, GoogleBusinessProfileMetrics } from './google-business-profile'

export interface GoogleOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

export interface GoogleIntegration {
  id: string
  type: 'analytics' | 'search_console' | 'business_profile'
  accountId: string
  accountName: string
  propertyId?: string
  siteUrl?: string
  locationId?: string
  accessToken: string
  refreshToken?: string
  expiresAt: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GoogleMetricsSummary {
  analytics?: GoogleAnalyticsMetrics
  searchConsole?: GoogleSearchConsoleMetrics
  businessProfile?: GoogleBusinessProfileMetrics
  lastUpdated: string
}

export class GoogleService {
  private analyticsService?: GoogleAnalyticsService
  private searchConsoleService?: GoogleSearchConsoleService
  private businessProfileService?: GoogleBusinessProfileService

  constructor(integrations: GoogleIntegration[]) {
    // Initialize services based on available integrations
    const analyticsIntegration = integrations.find(i => i.type === 'analytics' && i.isActive)
    if (analyticsIntegration) {
      this.analyticsService = new GoogleAnalyticsService(analyticsIntegration.accessToken)
    }

    const searchConsoleIntegration = integrations.find(i => i.type === 'search_console' && i.isActive)
    if (searchConsoleIntegration) {
      this.searchConsoleService = new GoogleSearchConsoleService(searchConsoleIntegration.accessToken)
    }

    const businessProfileIntegration = integrations.find(i => i.type === 'business_profile' && i.isActive)
    if (businessProfileIntegration) {
      this.businessProfileService = new GoogleBusinessProfileService(businessProfileIntegration.accessToken)
    }
  }

  // Get OAuth authorization URL
  static getAuthorizationUrl(config: GoogleOAuthConfig): string {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Exchange authorization code for tokens
  static async exchangeCodeForTokens(
    code: string,
    config: GoogleOAuthConfig
  ): Promise<{
    accessToken: string
    refreshToken: string
    expiresIn: number
  }> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error(`OAuth token exchange failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in
    }
  }

  // Refresh access token
  static async refreshAccessToken(
    refreshToken: string,
    config: GoogleOAuthConfig
  ): Promise<{
    accessToken: string
    expiresIn: number
  }> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in
    }
  }

  // Get comprehensive metrics from all connected services
  async getMetricsSummary(
    startDate: string,
    endDate: string,
    propertyId?: string,
    siteUrl?: string,
    locationId?: string
  ): Promise<GoogleMetricsSummary> {
    const summary: GoogleMetricsSummary = {
      lastUpdated: new Date().toISOString()
    }

    try {
      // Get Analytics metrics
      if (this.analyticsService && propertyId) {
        summary.analytics = await this.analyticsService.getMetrics(propertyId, startDate, endDate)
      }

      // Get Search Console metrics
      if (this.searchConsoleService && siteUrl) {
        summary.searchConsole = await this.searchConsoleService.getMetrics(siteUrl, startDate, endDate)
      }

      // Get Business Profile metrics
      if (this.businessProfileService && locationId) {
        summary.businessProfile = await this.businessProfileService.getMetrics(locationId, startDate, endDate)
      }
    } catch (error) {
      console.error('Error fetching metrics summary:', error)
      throw error
    }

    return summary
  }

  // Get Analytics service
  getAnalyticsService(): GoogleAnalyticsService | undefined {
    return this.analyticsService
  }

  // Get Search Console service
  getSearchConsoleService(): GoogleSearchConsoleService | undefined {
    return this.searchConsoleService
  }

  // Get Business Profile service
  getBusinessProfileService(): GoogleBusinessProfileService | undefined {
    return this.businessProfileService
  }

  // Check if service is available
  isServiceAvailable(type: 'analytics' | 'search_console' | 'business_profile'): boolean {
    switch (type) {
      case 'analytics':
        return this.analyticsService !== undefined
      case 'search_console':
        return this.searchConsoleService !== undefined
      case 'business_profile':
        return this.businessProfileService !== undefined
      default:
        return false
    }
  }

  // Get available services
  getAvailableServices(): Array<'analytics' | 'search_console' | 'business_profile'> {
    const services: Array<'analytics' | 'search_console' | 'business_profile'> = []
    
    if (this.analyticsService) services.push('analytics')
    if (this.searchConsoleService) services.push('search_console')
    if (this.businessProfileService) services.push('business_profile')
    
    return services
  }
}

// Default OAuth scopes for each service
export const GOOGLE_OAUTH_SCOPES = {
  analytics: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics.manage.users.readonly'
  ],
  search_console: [
    'https://www.googleapis.com/auth/webmasters.readonly'
  ],
  business_profile: [
    'https://www.googleapis.com/auth/business.manage'
  ]
}

// Helper function to get all required scopes
export function getAllGoogleScopes(): string[] {
  return [
    ...GOOGLE_OAUTH_SCOPES.analytics,
    ...GOOGLE_OAUTH_SCOPES.search_console,
    ...GOOGLE_OAUTH_SCOPES.business_profile
  ]
}

// Helper function to get scopes for specific services
export function getScopesForServices(services: Array<'analytics' | 'search_console' | 'business_profile'>): string[] {
  const scopes: string[] = []
  
  services.forEach(service => {
    scopes.push(...GOOGLE_OAUTH_SCOPES[service])
  })
  
  return [...new Set(scopes)] // Remove duplicates
}
