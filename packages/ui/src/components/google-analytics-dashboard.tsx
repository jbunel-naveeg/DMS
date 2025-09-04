import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

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

export interface GoogleAnalyticsDashboardProps {
  metrics: GoogleAnalyticsMetrics
  loading?: boolean
  onRefresh?: () => void
  className?: string
}

export function GoogleAnalyticsDashboard({
  metrics,
  loading = false,
  onRefresh,
  className
}: GoogleAnalyticsDashboardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatPercentage = (num: number): string => {
    return (num * 100).toFixed(1) + '%'
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Google Analytics</h2>
          <p className="text-gray-600">Website traffic and user behavior insights</p>
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : formatNumber(metrics.users)}
                </p>
              </div>
              <div className="text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : formatNumber(metrics.sessions)}
                </p>
              </div>
              <div className="text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : formatNumber(metrics.pageViews)}
                </p>
              </div>
              <div className="text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : formatPercentage(metrics.bounceRate)}
                </p>
              </div>
              <div className="text-orange-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Organic Search</span>
                <span className="font-medium">{formatNumber(metrics.organicSearch)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Direct Traffic</span>
                <span className="font-medium">{formatNumber(metrics.directTraffic)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Media</span>
                <span className="font-medium">{formatNumber(metrics.socialTraffic)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Referral</span>
                <span className="font-medium">{formatNumber(metrics.referralTraffic)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Paid Search</span>
                <span className="font-medium">{formatNumber(metrics.paidSearch)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Types</CardTitle>
            <CardDescription>New vs returning visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Users</span>
                <span className="font-medium">{formatNumber(metrics.newUsers)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Returning Users</span>
                <span className="font-medium">{formatNumber(metrics.returningUsers)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Session Duration</span>
                <span className="font-medium">{formatDuration(metrics.avgSessionDuration)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Countries</CardTitle>
            <CardDescription>Visitor locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topCountries.slice(0, 5).map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{country.country}</span>
                  <span className="font-medium">{formatNumber(country.sessions)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Pages</CardTitle>
          <CardDescription>Most visited pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.topPages.slice(0, 10).map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {page.page}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{formatNumber(page.pageViews)} views</span>
                    <span>{formatNumber(page.uniquePageViews)} unique</span>
                    <span>{formatDuration(page.avgTimeOnPage)} avg time</span>
                    <span>{formatPercentage(page.bounceRate)} bounce rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Traffic Sources</CardTitle>
          <CardDescription>Where your visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.topSources.slice(0, 10).map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {source.source}
                  </p>
                  <p className="text-xs text-gray-500">{source.medium}</p>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{formatNumber(source.sessions)} sessions</span>
                  <span>{formatNumber(source.users)} users</span>
                  <span>{formatPercentage(source.bounceRate)} bounce rate</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
