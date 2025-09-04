export interface GoogleBusinessProfileAccount {
  name: string
  accountName: string
  type: 'PERSONAL' | 'BUSINESS'
  role: 'OWNER' | 'MANAGER' | 'COMMUNITY_MANAGER' | 'ADMIN'
  state: 'ACCOUNT_STATE_UNSPECIFIED' | 'VERIFIED' | 'UNVERIFIED' | 'VERIFICATION_REQUIRED'
  vettedState: 'VETTED_STATE_UNSPECIFIED' | 'VETTED' | 'NOT_VETTED'
  permissionLevel: 'PERMISSION_LEVEL_UNSPECIFIED' | 'OWNER_LEVEL' | 'MANAGER_LEVEL' | 'COMMUNITY_LEVEL'
}

export interface GoogleBusinessProfileLocation {
  name: string
  title: string
  storefrontAddress: {
    addressLines: string[]
    locality: string
    administrativeArea: string
    postalCode: string
    regionCode: string
  }
  primaryPhone: string
  primaryCategory: {
    name: string
    categoryId: string
  }
  additionalCategories: Array<{
    name: string
    categoryId: string
  }>
  websiteUri: string
  regularHours: {
    weekdayDescriptions: string[]
  }
  specialHours: Array<{
    startDate: {
      year: number
      month: number
      day: number
    }
    endDate: {
      year: number
      month: number
      day: number
    }
    hourType: 'HOUR_TYPE_UNSPECIFIED' | 'OPEN' | 'CLOSED' | 'HOLIDAY'
  }>
  profile: {
    description: string
    attributes: Array<{
      name: string
      values: string[]
    }>
  }
  metrics: {
    totalReviewCount: number
    averageRating: number
    totalPhotoCount: number
  }
  state: 'LOCATION_STATE_UNSPECIFIED' | 'VERIFIED' | 'UNVERIFIED' | 'VERIFICATION_REQUIRED'
  metadata: {
    hasGoogleUpdated: boolean
    hasPendingEdits: boolean
    canDelete: boolean
    canOperateLocalPost: boolean
    canOperateLodgingData: boolean
    canOperateFoodMenu: boolean
    canOperateFoodReservation: boolean
    canOperateLodgingReservation: boolean
    canDuplicate: boolean
    canHaveBusinessCalls: boolean
    canHaveBusinessMessages: boolean
    canModifyServiceList: boolean
    canOperateHealthData: boolean
    canOperateInsuranceData: boolean
  }
}

export interface GoogleBusinessProfileInsight {
  metric: {
    metric: string
    displayName: string
  }
  metricValue: {
    stringValue?: string
    intValue?: number
    doubleValue?: number
    moneyValue?: {
      currencyCode: string
      units: string
      nanos: number
    }
  }
  dimensionalValues: Array<{
    metric: {
      metric: string
      displayName: string
    }
    value: {
      stringValue?: string
      intValue?: number
      doubleValue?: number
    }
  }>
}

export interface GoogleBusinessProfileMetrics {
  totalViews: number
  totalCalls: number
  totalDirectionRequests: number
  totalWebsiteClicks: number
  totalPhotoViews: number
  totalPosts: number
  totalReviews: number
  averageRating: number
  topSearchQueries: Array<{
    query: string
    views: number
  }>
  topPhotoViews: Array<{
    photoUrl: string
    views: number
  }>
  customerActions: Array<{
    action: string
    count: number
  }>
  hourlyViews: Array<{
    hour: number
    views: number
  }>
  dailyViews: Array<{
    date: string
    views: number
  }>
  monthlyViews: Array<{
    month: string
    views: number
  }>
}

export interface GoogleBusinessProfilePost {
  name: string
  languageCode: string
  summary: string
  callToAction: {
    actionType: 'ACTION_TYPE_UNSPECIFIED' | 'BOOK' | 'ORDER_ONLINE' | 'SHOP' | 'LEARN_MORE' | 'SIGN_UP' | 'GET_OFFER' | 'CALL'
    url?: string
  }
  offer?: {
    couponCode?: string
    redeemOnlineUrl?: string
    termsConditions?: string
  }
  event?: {
    title: string
    startTime: string
    endTime: string
  }
  media: Array<{
    mediaFormat: 'MEDIA_FORMAT_UNSPECIFIED' | 'PHOTO' | 'VIDEO'
    sourceUrl: string
    thumbnailUrl?: string
  }>
  state: 'POST_STATE_UNSPECIFIED' | 'LIVE' | 'REJECTED' | 'PENDING_REVIEW'
  createTime: string
  updateTime: string
}

export class GoogleBusinessProfileService {
  private accessToken: string
  private baseUrl: string = 'https://mybusinessaccountmanagement.googleapis.com/v1'
  private businessUrl: string = 'https://mybusinessbusinessinformation.googleapis.com/v1'
  private insightsUrl: string = 'https://mybusinessinsights.googleapis.com/v1'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
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
      throw new Error(`Google Business Profile API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get all accounts accessible to the user
  async getAccounts(): Promise<GoogleBusinessProfileAccount[]> {
    try {
      const response = await this.makeRequest<{ accounts: GoogleBusinessProfileAccount[] }>(
        `${this.baseUrl}/accounts`
      )
      return response.accounts || []
    } catch (error) {
      console.error('Error fetching accounts:', error)
      throw error
    }
  }

  // Get locations for an account
  async getLocations(accountId: string): Promise<GoogleBusinessProfileLocation[]> {
    try {
      const response = await this.makeRequest<{ locations: GoogleBusinessProfileLocation[] }>(
        `${this.businessUrl}/accounts/${accountId}/locations`
      )
      return response.locations || []
    } catch (error) {
      console.error('Error fetching locations:', error)
      throw error
    }
  }

  // Get insights for a location
  async getInsights(
    locationId: string,
    startDate: string,
    endDate: string,
    metricRequests: Array<{
      metric: string
      options: string[]
    }>
  ): Promise<GoogleBusinessProfileInsight[]> {
    try {
      const requestBody = {
        locationNames: [`locations/${locationId}`],
        basicRequest: {
          metricRequests,
          startDate: {
            year: parseInt(startDate.split('-')[0]),
            month: parseInt(startDate.split('-')[1]),
            day: parseInt(startDate.split('-')[2])
          },
          endDate: {
            year: parseInt(endDate.split('-')[0]),
            month: parseInt(endDate.split('-')[1]),
            day: parseInt(endDate.split('-')[2])
          }
        }
      }

      const response = await this.makeRequest<{ locationMetrics: Array<{ metricValues: GoogleBusinessProfileInsight[] }> }>(
        `${this.insightsUrl}/locations/${locationId}:reportInsights`,
        'POST',
        requestBody
      )

      return response.locationMetrics[0]?.metricValues || []
    } catch (error) {
      console.error('Error fetching insights:', error)
      throw error
    }
  }

  // Get posts for a location
  async getPosts(locationId: string): Promise<GoogleBusinessProfilePost[]> {
    try {
      const response = await this.makeRequest<{ posts: GoogleBusinessProfilePost[] }>(
        `${this.businessUrl}/locations/${locationId}/localPosts`
      )
      return response.posts || []
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  // Get comprehensive metrics for a location
  async getMetrics(
    locationId: string,
    startDate: string,
    endDate: string
  ): Promise<GoogleBusinessProfileMetrics> {
    try {
      // Get basic metrics
      const basicInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: 'QUERIES_DIRECT', options: [] },
        { metric: 'QUERIES_INDIRECT', options: [] },
        { metric: 'QUERIES_CHAIN', options: [] },
        { metric: 'VIEWS_MAPS', options: [] },
        { metric: 'VIEWS_SEARCH', options: [] },
        { metric: 'ACTIONS_PHONE', options: [] },
        { metric: 'ACTIONS_WEBSITE', options: [] },
        { metric: 'ACTIONS_DRIVING_DIRECTIONS', options: [] },
        { metric: 'PHOTOS_VIEWS_MERCHANT', options: [] },
        { metric: 'PHOTOS_VIEWS_CUSTOMERS', options: [] },
        { metric: 'PHOTOS_COUNT_MERCHANT', options: [] },
        { metric: 'PHOTOS_COUNT_CUSTOMERS', options: [] },
        { metric: 'POSTS_VIEWS', options: [] },
        { metric: 'REVIEWS', options: [] }
      ])

      // Get hourly views
      const hourlyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: 'QUERIES_DIRECT', options: ['HOUR'] }
      ])

      // Get daily views
      const dailyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: 'QUERIES_DIRECT', options: ['DAY'] }
      ])

      // Get monthly views
      const monthlyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: 'QUERIES_DIRECT', options: ['MONTH'] }
      ])

      // Process the data
      const metrics: GoogleBusinessProfileMetrics = {
        totalViews: this.extractMetricValue(basicInsights, 'QUERIES_DIRECT') + 
                   this.extractMetricValue(basicInsights, 'QUERIES_INDIRECT') + 
                   this.extractMetricValue(basicInsights, 'QUERIES_CHAIN'),
        totalCalls: this.extractMetricValue(basicInsights, 'ACTIONS_PHONE'),
        totalDirectionRequests: this.extractMetricValue(basicInsights, 'ACTIONS_DRIVING_DIRECTIONS'),
        totalWebsiteClicks: this.extractMetricValue(basicInsights, 'ACTIONS_WEBSITE'),
        totalPhotoViews: this.extractMetricValue(basicInsights, 'PHOTOS_VIEWS_MERCHANT') + 
                        this.extractMetricValue(basicInsights, 'PHOTOS_VIEWS_CUSTOMERS'),
        totalPosts: this.extractMetricValue(basicInsights, 'POSTS_VIEWS'),
        totalReviews: this.extractMetricValue(basicInsights, 'REVIEWS'),
        averageRating: 0, // This would need to be calculated from review data
        topSearchQueries: this.processSearchQueries(basicInsights),
        topPhotoViews: this.processPhotoViews(basicInsights),
        customerActions: this.processCustomerActions(basicInsights),
        hourlyViews: this.processHourlyViews(hourlyInsights),
        dailyViews: this.processDailyViews(dailyInsights),
        monthlyViews: this.processMonthlyViews(monthlyInsights)
      }

      return metrics
    } catch (error) {
      console.error('Error fetching comprehensive metrics:', error)
      throw error
    }
  }

  // Helper methods for data processing
  private extractMetricValue(insights: GoogleBusinessProfileInsight[], metric: string): number {
    const insight = insights.find(i => i.metric.metric === metric)
    if (!insight) return 0

    if (insight.metricValue.intValue !== undefined) {
      return insight.metricValue.intValue
    }
    if (insight.metricValue.doubleValue !== undefined) {
      return insight.metricValue.doubleValue
    }
    return 0
  }

  private processSearchQueries(insights: GoogleBusinessProfileInsight[]): Array<{
    query: string
    views: number
  }> {
    // This would need to be implemented based on the actual API response structure
    return []
  }

  private processPhotoViews(insights: GoogleBusinessProfileInsight[]): Array<{
    photoUrl: string
    views: number
  }> {
    // This would need to be implemented based on the actual API response structure
    return []
  }

  private processCustomerActions(insights: GoogleBusinessProfileInsight[]): Array<{
    action: string
    count: number
  }> {
    const actions = [
      { action: 'Phone Calls', count: this.extractMetricValue(insights, 'ACTIONS_PHONE') },
      { action: 'Website Clicks', count: this.extractMetricValue(insights, 'ACTIONS_WEBSITE') },
      { action: 'Directions', count: this.extractMetricValue(insights, 'ACTIONS_DRIVING_DIRECTIONS') }
    ]

    return actions.filter(action => action.count > 0)
  }

  private processHourlyViews(insights: GoogleBusinessProfileInsight[]): Array<{
    hour: number
    views: number
  }> {
    // This would need to be implemented based on the actual API response structure
    return []
  }

  private processDailyViews(insights: GoogleBusinessProfileInsight[]): Array<{
    date: string
    views: number
  }> {
    // This would need to be implemented based on the actual API response structure
    return []
  }

  private processMonthlyViews(insights: GoogleBusinessProfileInsight[]): Array<{
    month: string
    views: number
  }> {
    // This would need to be implemented based on the actual API response structure
    return []
  }
}
