"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@naveeg/ui'
import { GDPRService } from '@naveeg/lib'
import { 
  Shield, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Download,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'

interface AdminDashboardProps {
  supabaseUrl: string
  supabaseKey: string
}

interface ComplianceStatus {
  consent_management: boolean
  data_subject_rights: boolean
  privacy_policy: boolean
  cookie_consent: boolean
  data_retention: boolean
  audit_logging: boolean
  breach_procedures: boolean
  staff_training: boolean
  last_audit: string
  compliance_score: number
}

interface ConsentStats {
  total_users: number
  consent_rates: Record<string, number>
  recent_consents: number
}

interface RightsStats {
  total_requests: number
  pending_requests: number
  completed_requests: number
  request_types: Record<string, number>
}

export function GDPRAdminDashboard({ supabaseUrl, supabaseKey }: AdminDashboardProps) {
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus | null>(null)
  const [consentStats, setConsentStats] = useState<ConsentStats | null>(null)
  const [rightsStats, setRightsStats] = useState<RightsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const gdprService = new GDPRService(supabaseUrl, supabaseKey)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [compliance, consent, rights] = await Promise.all([
        gdprService.getComplianceStatus(),
        gdprService.getConsentManager().getConsentStatistics(),
        gdprService.getDataSubjectRightsManager().getRightsStatistics()
      ])

      setComplianceStatus(compliance)
      setConsentStats(consent)
      setRightsStats(rights)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const getComplianceIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-red-600" />
    )
  }

  const getComplianceColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600'
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4" />
    if (score >= 60) return <Minus className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">GDPR Compliance Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and manage GDPR compliance across your platform
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {/* Compliance Score */}
      {complianceStatus && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance Score</h3>
            <div className={`flex items-center space-x-2 ${getScoreColor(complianceStatus.compliance_score)}`}>
              {getScoreIcon(complianceStatus.compliance_score)}
              <span className="text-2xl font-bold">{complianceStatus.compliance_score}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                complianceStatus.compliance_score >= 80 ? 'bg-green-600' :
                complianceStatus.compliance_score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${complianceStatus.compliance_score}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Last audit: {new Date(complianceStatus.last_audit).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Compliance Status Grid */}
      {complianceStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(complianceStatus).map(([key, value]) => {
            if (key === 'last_audit' || key === 'compliance_score') return null

            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            
            return (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
                  {getComplianceIcon(value as boolean)}
                </div>
                <p className={`text-sm ${getComplianceColor(value as boolean)}`}>
                  {value ? 'Compliant' : 'Needs Attention'}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consent Statistics */}
        {consentStats && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Consent Statistics</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Users</span>
                <span className="font-semibold text-gray-900 dark:text-white">{consentStats.total_users}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Recent Consents</span>
                <span className="font-semibold text-gray-900 dark:text-white">{consentStats.recent_consents}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Consent Rates</h4>
                {Object.entries(consentStats.consent_rates).map(([type, rate]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                      {type.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Data Subject Rights Statistics */}
        {rightsStats && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Subject Rights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {rightsStats.total_requests}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {rightsStats.pending_requests}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Pending</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Request Types</h4>
                {Object.entries(rightsStats.request_types).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                      {type.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Manage Consent Settings
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Review Data Requests
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="h-4 w-4 mr-2" />
            Generate Compliance Report
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="h-4 w-4 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">New data access request received</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Consent preferences updated</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Monthly compliance report generated</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
