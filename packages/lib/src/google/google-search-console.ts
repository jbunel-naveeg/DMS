export interface GoogleSearchConsoleSite {
  siteUrl: string
  permissionLevel: 'SITE_FULL' | 'SITE_READ_ONLY' | 'SITE_RESTRICTED' | 'SITE_UNVERIFIED'
}

export interface GoogleSearchConsoleSearchAnalyticsData {
  rows: Array<{
    keys: string[]
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  responseAggregationType: string
}

export interface GoogleSearchConsoleSearchAnalyticsQuery {
  startDate: string
  endDate: string
  dimensions?: string[]
  dimensionFilterGroups?: Array<{
    groupType: 'AND' | 'OR'
    filters: Array<{
      dimension: string
      operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS'
      expression: string
    }>
  }>
  rowLimit?: number
  startRow?: number
  searchType?: 'WEB' | 'IMAGE' | 'VIDEO' | 'NEWS' | 'DISCOVER' | 'GOOGLE_NEWS'
}

export interface GoogleSearchConsoleSitemap {
  path: string
  lastSubmitted: string
  isPending: boolean
  isSitemapsIndex: boolean
  type: 'WEB' | 'IMAGE' | 'VIDEO' | 'NEWS' | 'DISCOVER' | 'GOOGLE_NEWS'
  contents: Array<{
    type: 'URL' | 'SITEMAP' | 'FEED'
    submitted: number
    indexed: number
  }>
  warnings: string[]
  errors: string[]
}

export interface GoogleSearchConsoleUrlInspectionResult {
  inspectionResult: {
    indexStatusResult: {
      verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED'
      coverageState: 'COVERED' | 'NOT_COVERED' | 'COVERAGE_STATE_UNSPECIFIED'
      crawledAs: 'MOBILE' | 'DESKTOP' | 'CRAWLED_AS_UNSPECIFIED'
      lastCrawlTime: string
      pageFetchState: 'SUCCESSFUL' | 'SOFT_404' | 'BLOCKED_ROBOTS_TXT' | 'NOT_FOUND' | 'ACCESS_DENIED' | 'SERVER_ERROR' | 'REDIRECT_ERROR' | 'ACCESS_FORBIDDEN' | 'BLOCKED_4XX' | 'INTERNAL_CRAWL_ERROR' | 'INVALID_URL' | 'PAGE_FETCH_STATE_UNSPECIFIED'
      indexingState: 'INDEXING_ALLOWED' | 'INDEXING_FORBIDDEN' | 'INDEXING_STATE_UNSPECIFIED'
      robotsTxtState: 'ALLOWED' | 'DISALLOWED' | 'ROBOTS_TXT_STATE_UNSPECIFIED'
      userAgent: string
    }
    richResultsResult: {
      verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED'
      detectedItems: Array<{
        invalidArgumentNames: string[]
        invalidArgumentValues: string[]
        richResultType: string
        issues: Array<{
          severity: 'ERROR' | 'WARNING' | 'INFO' | 'SEVERITY_UNSPECIFIED'
          message: string
        }>
      }>
    }
    mobileUsabilityResult: {
      verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL' | 'VERDICT_UNSPECIFIED'
      issues: Array<{
        severity: 'ERROR' | 'WARNING' | 'INFO' | 'SEVERITY_UNSPECIFIED'
        message: string
      }>
    }
  }
}

export interface GoogleSearchConsoleMetrics {
  totalClicks: number
  totalImpressions: number
  averageCtr: number
  averagePosition: number
  topQueries: Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  topPages: Array<{
    page: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  topCountries: Array<{
    country: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  topDevices: Array<{
    device: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  searchAppearance: Array<{
    type: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
}

export class GoogleSearchConsoleService {
  private accessToken: string
  private baseUrl: string = 'https://www.googleapis.com/webmasters/v3'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest<T>(
    url: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
  ): Promise<T> {
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`Google Search Console API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get all sites accessible to the user
  async getSites(): Promise<GoogleSearchConsoleSite[]> {
    try {
      const response = await this.makeRequest<{ siteEntry: GoogleSearchConsoleSite[] }>(
        `${this.baseUrl}/sites`
      )
      return response.siteEntry || []
    } catch (error) {
      console.error('Error fetching sites:', error)
      throw error
    }
  }

  // Get search analytics data
  async getSearchAnalytics(
    siteUrl: string,
    query: GoogleSearchConsoleSearchAnalyticsQuery
  ): Promise<GoogleSearchConsoleSearchAnalyticsData> {
    try {
      const response = await this.makeRequest<GoogleSearchConsoleSearchAnalyticsData>(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        'POST',
        query
      )
      return response
    } catch (error) {
      console.error('Error fetching search analytics:', error)
      throw error
    }
  }

  // Get sitemaps for a site
  async getSitemaps(siteUrl: string): Promise<GoogleSearchConsoleSitemap[]> {
    try {
      const response = await this.makeRequest<{ sitemap: GoogleSearchConsoleSitemap[] }>(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/sitemaps`
      )
      return response.sitemap || []
    } catch (error) {
      console.error('Error fetching sitemaps:', error)
      throw error
    }
  }

  // Inspect a URL
  async inspectUrl(
    siteUrl: string,
    url: string
  ): Promise<GoogleSearchConsoleUrlInspectionResult> {
    try {
      const response = await this.makeRequest<GoogleSearchConsoleUrlInspectionResult>(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/urlInspection/index:inspect`,
        'POST',
        { inspectionUrl: url }
      )
      return response
    } catch (error) {
      console.error('Error inspecting URL:', error)
      throw error
    }
  }

  // Get comprehensive metrics for a site
  async getMetrics(
    siteUrl: string,
    startDate: string,
    endDate: string
  ): Promise<GoogleSearchConsoleMetrics> {
    try {
      // Get overall metrics
      const overallData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        rowLimit: 1
      })

      // Get top queries
      const queriesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 100
      })

      // Get top pages
      const pagesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 100
      })

      // Get country data
      const countriesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ['country'],
        rowLimit: 100
      })

      // Get device data
      const devicesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ['device'],
        rowLimit: 100
      })

      // Get search appearance data
      const searchAppearanceData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ['searchAppearance'],
        rowLimit: 100
      })

      // Process the data
      const metrics: GoogleSearchConsoleMetrics = {
        totalClicks: this.calculateTotalClicks(overallData),
        totalImpressions: this.calculateTotalImpressions(overallData),
        averageCtr: this.calculateAverageCtr(overallData),
        averagePosition: this.calculateAveragePosition(overallData),
        topQueries: this.processQueriesData(queriesData),
        topPages: this.processPagesData(pagesData),
        topCountries: this.processCountriesData(countriesData),
        topDevices: this.processDevicesData(devicesData),
        searchAppearance: this.processSearchAppearanceData(searchAppearanceData)
      }

      return metrics
    } catch (error) {
      console.error('Error fetching comprehensive metrics:', error)
      throw error
    }
  }

  // Helper methods for data processing
  private calculateTotalClicks(data: GoogleSearchConsoleSearchAnalyticsData): number {
    return data.rows.reduce((sum, row) => sum + row.clicks, 0)
  }

  private calculateTotalImpressions(data: GoogleSearchConsoleSearchAnalyticsData): number {
    return data.rows.reduce((sum, row) => sum + row.impressions, 0)
  }

  private calculateAverageCtr(data: GoogleSearchConsoleSearchAnalyticsData): number {
    if (data.rows.length === 0) return 0
    const totalCtr = data.rows.reduce((sum, row) => sum + row.ctr, 0)
    return totalCtr / data.rows.length
  }

  private calculateAveragePosition(data: GoogleSearchConsoleSearchAnalyticsData): number {
    if (data.rows.length === 0) return 0
    const totalPosition = data.rows.reduce((sum, row) => sum + row.position, 0)
    return totalPosition / data.rows.length
  }

  private processQueriesData(data: GoogleSearchConsoleSearchAnalyticsData): Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }> {
    return data.rows
      .map(row => ({
        query: row.keys[0] || '',
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 20)
  }

  private processPagesData(data: GoogleSearchConsoleSearchAnalyticsData): Array<{
    page: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }> {
    return data.rows
      .map(row => ({
        page: row.keys[0] || '',
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 20)
  }

  private processCountriesData(data: GoogleSearchConsoleSearchAnalyticsData): Array<{
    country: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }> {
    return data.rows
      .map(row => ({
        country: row.keys[0] || '',
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10)
  }

  private processDevicesData(data: GoogleSearchConsoleSearchAnalyticsData): Array<{
    device: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }> {
    return data.rows
      .map(row => ({
        device: row.keys[0] || '',
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
  }

  private processSearchAppearanceData(data: GoogleSearchConsoleSearchAnalyticsData): Array<{
    type: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }> {
    return data.rows
      .map(row => ({
        type: row.keys[0] || '',
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10)
  }
}
