export interface GoogleAnalyticsAccount {
  id: string
  name: string
  displayName: string
  websiteUrl: string
  type: string
  permissions: {
    effective: string[]
  }
  createTime: string
  updateTime: string
}

export interface GoogleAnalyticsProperty {
  id: string
  name: string
  displayName: string
  parent: string
  timeZone: string
  currencyCode: string
  createTime: string
  updateTime: string
}

export interface GoogleAnalyticsDataStream {
  name: string
  type: 'WEB_DATA_STREAM' | 'ANDROID_APP_DATA_STREAM' | 'IOS_APP_DATA_STREAM'
  displayName: string
  webStreamData?: {
    measurementId: string
    defaultUri: string
    firebaseAppId?: string
  }
  androidAppStreamData?: {
    firebaseAppId: string
    packageName: string
  }
  iosAppStreamData?: {
    firebaseAppId: string
    bundleId: string
  }
  createTime: string
  updateTime: string
}

export interface GoogleAnalyticsReport {
  metricHeaders: Array<{
    name: string
    type: string
  }>
  dimensionHeaders: Array<{
    name: string
  }>
  rows: Array<{
    dimensionValues: Array<{
      value: string
    }>
    metricValues: Array<{
      value: string
    }>
  }>
  rowCount: number
  metadata: {
    currencyCode: string
    timeZone: string
  }
}

export interface GoogleAnalyticsMetrics {
  users: number
  sessions: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: number
  newUsers: number
  returningUsers: number
  organicSearch: number
  directTraffic: number
  socialTraffic: number
  referralTraffic: number
  paidSearch: number
  emailTraffic: number
  topPages: Array<{
    page: string
    pageViews: number
    uniquePageViews: number
    avgTimeOnPage: number
    bounceRate: number
  }>
  topSources: Array<{
    source: string
    medium: string
    sessions: number
    users: number
    bounceRate: number
  }>
  topCountries: Array<{
    country: string
    sessions: number
    users: number
  }>
  topDevices: Array<{
    device: string
    sessions: number
    users: number
  }>
  topBrowsers: Array<{
    browser: string
    sessions: number
    users: number
  }>
}

export class GoogleAnalyticsService {
  private accessToken: string
  private baseUrl: string = 'https://analyticsdata.googleapis.com/v1beta'
  private managementUrl: string = 'https://analyticsadmin.googleapis.com/v1beta'

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
      throw new Error(`Google Analytics API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get all accounts accessible to the user
  async getAccounts(): Promise<GoogleAnalyticsAccount[]> {
    try {
      const response = await this.makeRequest<{ accounts: GoogleAnalyticsAccount[] }>(
        `${this.managementUrl}/accounts`
      )
      return response.accounts || []
    } catch (error) {
      console.error('Error fetching accounts:', error)
      throw error
    }
  }

  // Get properties for an account
  async getProperties(accountId: string): Promise<GoogleAnalyticsProperty[]> {
    try {
      const response = await this.makeRequest<{ properties: GoogleAnalyticsProperty[] }>(
        `${this.managementUrl}/accounts/${accountId}/properties`
      )
      return response.properties || []
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  }

  // Get data streams for a property
  async getDataStreams(propertyId: string): Promise<GoogleAnalyticsDataStream[]> {
    try {
      const response = await this.makeRequest<{ dataStreams: GoogleAnalyticsDataStream[] }>(
        `${this.managementUrl}/properties/${propertyId}/dataStreams`
      )
      return response.dataStreams || []
    } catch (error) {
      console.error('Error fetching data streams:', error)
      throw error
    }
  }

  // Get analytics data for a property
  async getAnalyticsData(
    propertyId: string,
    startDate: string,
    endDate: string,
    metrics: string[] = ['activeUsers', 'sessions', 'screenPageViews'],
    dimensions: string[] = ['date']
  ): Promise<GoogleAnalyticsReport> {
    try {
      const requestBody = {
        requests: [{
          property: `properties/${propertyId}`,
          dateRanges: [{
            startDate,
            endDate
          }],
          metrics: metrics.map(metric => ({ name: metric })),
          dimensions: dimensions.map(dimension => ({ name: dimension })),
          keepEmptyRows: false
        }]
      }

      const response = await this.makeRequest<{ reports: GoogleAnalyticsReport[] }>(
        `${this.baseUrl}/properties/${propertyId}:runReport`,
        'POST',
        requestBody
      )

      return response.reports[0]
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      throw error
    }
  }

  // Get comprehensive metrics for a property
  async getMetrics(
    propertyId: string,
    startDate: string,
    endDate: string
  ): Promise<GoogleAnalyticsMetrics> {
    try {
      // Get basic metrics
      const basicMetrics = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['activeUsers', 'sessions', 'screenPageViews', 'bounceRate', 'averageSessionDuration', 'newUsers']
      )

      // Get traffic source data
      const trafficSourceData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['sessions', 'activeUsers', 'bounceRate'],
        ['sessionDefaultChannelGrouping']
      )

      // Get top pages data
      const topPagesData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['screenPageViews', 'uniquePageviews', 'averageSessionDuration', 'bounceRate'],
        ['pagePath']
      )

      // Get geographic data
      const geoData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['sessions', 'activeUsers'],
        ['country']
      )

      // Get device data
      const deviceData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['sessions', 'activeUsers'],
        ['deviceCategory']
      )

      // Get browser data
      const browserData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ['sessions', 'activeUsers'],
        ['browser']
      )

      // Process the data into our metrics format
      const metrics: GoogleAnalyticsMetrics = {
        users: this.extractMetricValue(basicMetrics, 'activeUsers') || 0,
        sessions: this.extractMetricValue(basicMetrics, 'sessions') || 0,
        pageViews: this.extractMetricValue(basicMetrics, 'screenPageViews') || 0,
        bounceRate: this.extractMetricValue(basicMetrics, 'bounceRate') || 0,
        avgSessionDuration: this.extractMetricValue(basicMetrics, 'averageSessionDuration') || 0,
        newUsers: this.extractMetricValue(basicMetrics, 'newUsers') || 0,
        returningUsers: 0, // Calculate as users - newUsers
        organicSearch: this.extractTrafficSourceValue(trafficSourceData, 'Organic Search') || 0,
        directTraffic: this.extractTrafficSourceValue(trafficSourceData, 'Direct') || 0,
        socialTraffic: this.extractTrafficSourceValue(trafficSourceData, 'Social') || 0,
        referralTraffic: this.extractTrafficSourceValue(trafficSourceData, 'Referral') || 0,
        paidSearch: this.extractTrafficSourceValue(trafficSourceData, 'Paid Search') || 0,
        emailTraffic: this.extractTrafficSourceValue(trafficSourceData, 'Email') || 0,
        topPages: this.processTopPagesData(topPagesData),
        topSources: this.processTrafficSourceData(trafficSourceData),
        topCountries: this.processGeoData(geoData),
        topDevices: this.processDeviceData(deviceData),
        topBrowsers: this.processBrowserData(browserData)
      }

      // Calculate returning users
      metrics.returningUsers = Math.max(0, metrics.users - metrics.newUsers)

      return metrics
    } catch (error) {
      console.error('Error fetching comprehensive metrics:', error)
      throw error
    }
  }

  // Helper method to extract metric values
  private extractMetricValue(report: GoogleAnalyticsReport, metricName: string): number {
    const metricIndex = report.metricHeaders.findIndex(header => header.name === metricName)
    if (metricIndex === -1) return 0

    const totalValue = report.rows.reduce((sum, row) => {
      const value = parseFloat(row.metricValues[metricIndex]?.value || '0')
      return sum + value
    }, 0)

    return totalValue
  }

  // Helper method to extract traffic source values
  private extractTrafficSourceValue(report: GoogleAnalyticsReport, sourceName: string): number {
    const sourceIndex = report.dimensionHeaders.findIndex(header => header.name === 'sessionDefaultChannelGrouping')
    if (sourceIndex === -1) return 0

    const sessionsIndex = report.metricHeaders.findIndex(header => header.name === 'sessions')
    if (sessionsIndex === -1) return 0

    const row = report.rows.find(row => 
      row.dimensionValues[sourceIndex]?.value === sourceName
    )

    return row ? parseFloat(row.metricValues[sessionsIndex]?.value || '0') : 0
  }

  // Process top pages data
  private processTopPagesData(report: GoogleAnalyticsReport): Array<{
    page: string
    pageViews: number
    uniquePageViews: number
    avgTimeOnPage: number
    bounceRate: number
  }> {
    const pageIndex = report.dimensionHeaders.findIndex(header => header.name === 'pagePath')
    const pageViewsIndex = report.metricHeaders.findIndex(header => header.name === 'screenPageViews')
    const uniquePageViewsIndex = report.metricHeaders.findIndex(header => header.name === 'uniquePageviews')
    const avgTimeIndex = report.metricHeaders.findIndex(header => header.name === 'averageSessionDuration')
    const bounceRateIndex = report.metricHeaders.findIndex(header => header.name === 'bounceRate')

    return report.rows
      .map(row => ({
        page: row.dimensionValues[pageIndex]?.value || '',
        pageViews: parseFloat(row.metricValues[pageViewsIndex]?.value || '0'),
        uniquePageViews: parseFloat(row.metricValues[uniquePageViewsIndex]?.value || '0'),
        avgTimeOnPage: parseFloat(row.metricValues[avgTimeIndex]?.value || '0'),
        bounceRate: parseFloat(row.metricValues[bounceRateIndex]?.value || '0')
      }))
      .sort((a, b) => b.pageViews - a.pageViews)
      .slice(0, 10)
  }

  // Process traffic source data
  private processTrafficSourceData(report: GoogleAnalyticsReport): Array<{
    source: string
    medium: string
    sessions: number
    users: number
    bounceRate: number
  }> {
    const sourceIndex = report.dimensionHeaders.findIndex(header => header.name === 'sessionDefaultChannelGrouping')
    const sessionsIndex = report.metricHeaders.findIndex(header => header.name === 'sessions')
    const usersIndex = report.metricHeaders.findIndex(header => header.name === 'activeUsers')
    const bounceRateIndex = report.metricHeaders.findIndex(header => header.name === 'bounceRate')

    return report.rows
      .map(row => ({
        source: row.dimensionValues[sourceIndex]?.value || '',
        medium: 'Unknown', // This would need additional dimension
        sessions: parseFloat(row.metricValues[sessionsIndex]?.value || '0'),
        users: parseFloat(row.metricValues[usersIndex]?.value || '0'),
        bounceRate: parseFloat(row.metricValues[bounceRateIndex]?.value || '0')
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10)
  }

  // Process geographic data
  private processGeoData(report: GoogleAnalyticsReport): Array<{
    country: string
    sessions: number
    users: number
  }> {
    const countryIndex = report.dimensionHeaders.findIndex(header => header.name === 'country')
    const sessionsIndex = report.metricHeaders.findIndex(header => header.name === 'sessions')
    const usersIndex = report.metricHeaders.findIndex(header => header.name === 'activeUsers')

    return report.rows
      .map(row => ({
        country: row.dimensionValues[countryIndex]?.value || '',
        sessions: parseFloat(row.metricValues[sessionsIndex]?.value || '0'),
        users: parseFloat(row.metricValues[usersIndex]?.value || '0')
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10)
  }

  // Process device data
  private processDeviceData(report: GoogleAnalyticsReport): Array<{
    device: string
    sessions: number
    users: number
  }> {
    const deviceIndex = report.dimensionHeaders.findIndex(header => header.name === 'deviceCategory')
    const sessionsIndex = report.metricHeaders.findIndex(header => header.name === 'sessions')
    const usersIndex = report.metricHeaders.findIndex(header => header.name === 'activeUsers')

    return report.rows
      .map(row => ({
        device: row.dimensionValues[deviceIndex]?.value || '',
        sessions: parseFloat(row.metricValues[sessionsIndex]?.value || '0'),
        users: parseFloat(row.metricValues[usersIndex]?.value || '0')
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 5)
  }

  // Process browser data
  private processBrowserData(report: GoogleAnalyticsReport): Array<{
    browser: string
    sessions: number
    users: number
  }> {
    const browserIndex = report.dimensionHeaders.findIndex(header => header.name === 'browser')
    const sessionsIndex = report.metricHeaders.findIndex(header => header.name === 'sessions')
    const usersIndex = report.metricHeaders.findIndex(header => header.name === 'activeUsers')

    return report.rows
      .map(row => ({
        browser: row.dimensionValues[browserIndex]?.value || '',
        sessions: parseFloat(row.metricValues[sessionsIndex]?.value || '0'),
        users: parseFloat(row.metricValues[usersIndex]?.value || '0')
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 5)
  }
}
