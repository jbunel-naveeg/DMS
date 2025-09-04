"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { GoogleAnalyticsDashboard, GoogleAnalyticsMetrics } from "@naveeg/ui"
import { useUserData } from "@naveeg/lib"

export default function AnalyticsPage() {
  const router = useRouter()
  const { loading: userLoading } = useUserData()
  const [metrics, setMetrics] = useState<GoogleAnalyticsMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // Today
  })

  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/google/analytics/metrics?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`)
      if (!response.ok) {
        if (response.status === 404) {
          setError('No Google Analytics integration found. Please connect your Google Analytics account first.')
          return
        }
        throw new Error('Failed to load analytics data')
      }

      const data = await response.json()
      setMetrics(data.metrics)
    } catch (err) {
      console.error('Error loading analytics data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }, [dateRange])

  // Load analytics data on component mount
  useEffect(() => {
    loadAnalyticsData()
  }, [loadAnalyticsData])

  const handleRefresh = () => {
    loadAnalyticsData()
  }

  const handleDateRangeChange = (newDateRange: { startDate: string; endDate: string }) => {
    setDateRange(newDateRange)
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

        {/* Date Range Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={dateRange.startDate}
                onChange={(e) => handleDateRangeChange({ ...dateRange, startDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={dateRange.endDate}
                onChange={(e) => handleDateRangeChange({ ...dateRange, endDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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
                {error.includes('No Google Analytics integration found') && (
                  <div className="mt-2">
                    <button
                      onClick={() => router.push('/dashboard/google')}
                      className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                    >
                      Connect Google Analytics →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        {metrics && (
          <GoogleAnalyticsDashboard
            metrics={metrics}
            loading={loading}
            onRefresh={handleRefresh}
          />
        )}

        {/* Loading State */}
        {loading && !metrics && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics data...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !metrics && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No analytics data available
            </h3>
            <p className="text-gray-500 mb-4">
              Connect your Google Analytics account to view detailed analytics.
            </p>
            <button
              onClick={() => router.push('/dashboard/google')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect Google Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  )
}