"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@naveeg/ui'
import { ConsentManager } from '@naveeg/lib'
import { 
  Shield, 
  BarChart3, 
  Target, 
  Settings, 
  ExternalLink, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  RefreshCw
} from 'lucide-react'

interface PrivacySettingsProps {
  userId: string
  supabaseUrl: string
  supabaseKey: string
}

interface ConsentPreferences {
  id: string
  essential: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
  third_party: boolean
  created_at: string
  updated_at: string
}

export function PrivacySettings({ userId, supabaseUrl, supabaseKey }: PrivacySettingsProps) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  const consentManager = new ConsentManager(supabaseUrl, supabaseKey)

  useEffect(() => {
    loadConsentPreferences()
  }, [userId])

  const loadConsentPreferences = async () => {
    try {
      setLoading(true)
      const preferences = await consentManager.getConsentPreferences(userId)
      setConsent(preferences)
    } catch (error) {
      console.error('Error loading consent preferences:', error)
      setMessage({ type: 'error', text: 'Failed to load privacy settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleConsentChange = async (type: keyof ConsentPreferences, value: boolean) => {
    if (!consent) return

    const updatedConsent = {
      ...consent,
      [type]: value,
      updated_at: new Date().toISOString()
    }

    setConsent(updatedConsent)
  }

  const handleSavePreferences = async () => {
    if (!consent) return

    try {
      setSaving(true)
      const success = await consentManager.saveConsentPreferences(userId, consent)
      
      if (success) {
        setMessage({ type: 'success', text: 'Privacy settings saved successfully' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save privacy settings' })
      }
    } catch (error) {
      console.error('Error saving consent preferences:', error)
      setMessage({ type: 'error', text: 'Failed to save privacy settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleWithdrawConsent = async (type: string) => {
    try {
      const success = await consentManager.withdrawConsent(type as any, 'analytics')
      
      if (success) {
        setMessage({ type: 'success', text: `Withdrew consent for ${type} cookies` })
        await loadConsentPreferences()
      } else {
        setMessage({ type: 'error', text: 'Failed to withdraw consent' })
      }
    } catch (error) {
      console.error('Error withdrawing consent:', error)
      setMessage({ type: 'error', text: 'Failed to withdraw consent' })
    }
  }

  const handleAcceptAll = async () => {
    if (!consent) return

    const allConsent = {
      ...consent,
      analytics: true,
      marketing: true,
      personalization: true,
      third_party: true,
      updated_at: new Date().toISOString()
    }

    setConsent(allConsent)
    await handleSavePreferences()
  }

  const handleRejectAll = async () => {
    if (!consent) return

    const minimalConsent = {
      ...consent,
      analytics: false,
      marketing: false,
      personalization: false,
      third_party: false,
      updated_at: new Date().toISOString()
    }

    setConsent(minimalConsent)
    await handleSavePreferences()
  }

  const getConsentIcon = (type: string) => {
    switch (type) {
      case 'essential':
        return <Shield className="h-5 w-5 text-green-600" />
      case 'analytics':
        return <BarChart3 className="h-5 w-5 text-blue-600" />
      case 'marketing':
        return <Target className="h-5 w-5 text-purple-600" />
      case 'personalization':
        return <Settings className="h-5 w-5 text-orange-600" />
      case 'third_party':
        return <ExternalLink className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getConsentDescription = (type: string) => {
    switch (type) {
      case 'essential':
        return 'Required for basic website functionality and security. These cannot be disabled.'
      case 'analytics':
        return 'Help us understand how visitors interact with our website to improve performance.'
      case 'marketing':
        return 'Used to track visitors across websites for advertising and marketing purposes.'
      case 'personalization':
        return 'Remember your preferences and settings to provide a personalized experience.'
      case 'third_party':
        return 'Cookies from external services we use for enhanced functionality.'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!consent) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Privacy Settings Found
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We couldn't load your privacy settings. Please try again.
        </p>
        <Button onClick={loadConsentPreferences}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your privacy preferences and cookie consent
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleRejectAll}>
            Reject All
          </Button>
          <Button onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' :
          message.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200' :
          'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Consent Settings */}
      <div className="space-y-4">
        {Object.entries(consent).map(([key, value]) => {
          if (key === 'id' || key === 'created_at' || key === 'updated_at') return null

          const isEssential = key === 'essential'
          const isEnabled = value as boolean

          return (
            <div
              key={key}
              className={`p-6 rounded-lg border ${
                isEnabled 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getConsentIcon(key)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {key.replace('_', ' ')} Cookies
                      </h3>
                      {isEnabled ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {getConsentDescription(key)}
                    </p>
                    {!isEssential && (
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={(e) => handleConsentChange(key as keyof ConsentPreferences, e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </label>
                        {isEnabled && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWithdrawConsent(key)}
                          >
                            Withdraw Consent
                          </Button>
                        )}
                      </div>
                    )}
                    {isEssential && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Essential cookies cannot be disabled as they are required for basic functionality.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSavePreferences}
          disabled={saving}
          className="min-w-[120px]"
        >
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Last updated: {new Date(consent.updated_at).toLocaleString()}
      </div>

      {/* Information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          About Your Privacy
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>
            We respect your privacy and give you control over your personal data. You can change your 
            privacy settings at any time by updating your preferences above.
          </p>
          <p>
            For more information about how we collect, use, and protect your data, please read our 
            <a href="/privacy-policy" className="underline hover:no-underline ml-1">
              Privacy Policy
            </a>.
          </p>
          <p>
            If you have any questions or concerns about your privacy, please contact us at 
            <a href="mailto:privacy@naveeg.com" className="underline hover:no-underline ml-1">
              privacy@naveeg.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
