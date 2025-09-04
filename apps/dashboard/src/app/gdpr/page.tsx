"use client"

import React, { useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { ConsentBanner } from '@/components/gdpr/consent-banner'
import { DataSubjectRights } from '@/components/gdpr/data-subject-rights'
import { PrivacySettings } from '@/components/gdpr/privacy-settings'
import { GDPRAdminDashboard } from '@/components/gdpr/admin-dashboard'
import { Button } from '@naveeg/ui'
import { 
  Shield, 
  FileText, 
  Settings, 
  BarChart3,
  User,
  Users
} from 'lucide-react'

export default function GDPRPage() {
  const { user, loading: userLoading } = useUser()
  const [activeTab, setActiveTab] = useState('privacy')
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin (in a real app, this would come from user roles)
  React.useEffect(() => {
    if (user) {
      // This is a placeholder - in reality, you'd check user roles
      setIsAdmin(user.email?.includes('admin') || false)
    }
  }, [user])

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please sign in to access your privacy settings.
          </p>
        </div>
      </div>
    )
  }

  const tabs = [
    {
      id: 'privacy',
      label: 'Privacy Settings',
      icon: Settings,
      description: 'Manage your privacy preferences and cookie consent'
    },
    {
      id: 'rights',
      label: 'Data Rights',
      icon: FileText,
      description: 'Exercise your data subject rights under GDPR'
    }
  ]

  if (isAdmin) {
    tabs.push({
      id: 'admin',
      label: 'Admin Dashboard',
      icon: BarChart3,
      description: 'Monitor GDPR compliance across the platform'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Consent Banner */}
      <ConsentBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Privacy & Data Protection
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Manage your privacy settings, exercise your data rights, and learn about how we protect your personal information.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      isActive
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {activeTab === 'privacy' && (
            <div className="p-6">
              <PrivacySettings
                userId={user.id}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
              />
            </div>
          )}

          {activeTab === 'rights' && (
            <div className="p-6">
              <DataSubjectRights
                userId={user.id}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
              />
            </div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <div className="p-6">
              <GDPRAdminDashboard
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
                supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
              />
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <div className="flex items-center space-x-3 mb-3">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Your Rights</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Under GDPR, you have the right to access, rectify, erase, and port your personal data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Data Security</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We implement appropriate security measures to protect your personal information.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Transparency</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We're transparent about how we collect, use, and protect your data.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Questions About Your Privacy?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            If you have any questions about your privacy or data protection, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:privacy@naveeg.com"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              privacy@naveeg.com
            </a>
            <a
              href="/privacy-policy"
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
