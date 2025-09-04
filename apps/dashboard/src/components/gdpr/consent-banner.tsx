"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@naveeg/ui'
import { CookieManager } from '@naveeg/lib'
import { X, Settings, Shield, BarChart3, Target, Users, ExternalLink } from 'lucide-react'

interface ConsentBannerProps {
  onConsentChange?: (consent: any) => void
  config?: {
    theme?: 'light' | 'dark' | 'auto'
    position?: 'top' | 'bottom' | 'modal'
    showDetails?: boolean
  }
}

export function ConsentBanner({ onConsentChange, config = {} }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    third_party: false
  })

  const cookieManager = new CookieManager((newConsent) => {
    setConsent(newConsent)
    if (onConsentChange) {
      onConsentChange(newConsent)
    }
  })

  useEffect(() => {
    // Check if consent already exists
    const existingConsent = cookieManager.getConsent()
    if (existingConsent) {
      setConsent(existingConsent)
    } else {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    cookieManager.setConsent({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      third_party: true
    })
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    cookieManager.setConsent({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      third_party: false
    })
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    cookieManager.setConsent(consent)
    setShowBanner(false)
  }

  const handleConsentChange = (type: string, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (!showBanner) return null

  const theme = config.theme || 'auto'
  const position = config.position || 'bottom'

  return (
    <div className={`fixed inset-0 z-50 ${position === 'modal' ? 'flex items-center justify-center' : ''}`}>
      {/* Backdrop for modal */}
      {position === 'modal' && (
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowBanner(false)} />
      )}
      
      {/* Banner */}
      <div className={`
        ${position === 'modal' ? 'relative max-w-2xl mx-4' : 'absolute left-0 right-0'}
        ${position === 'top' ? 'top-0' : position === 'bottom' ? 'bottom-0' : ''}
        ${theme === 'dark' ? 'bg-gray-900 text-white' : theme === 'light' ? 'bg-white text-gray-900' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white'}
        border-t border-gray-200 dark:border-gray-700 shadow-lg
      `}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Cookie Consent</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to enhance your experience and analyze our traffic. Please choose your preferences.
              </p>

              {/* Cookie Options */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Essential Cookies</div>
                      <div className="text-xs text-gray-500">Required for basic website functionality</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.essential}
                    disabled
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Analytics Cookies</div>
                      <div className="text-xs text-gray-500">Help us understand how visitors interact with our website</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">Marketing Cookies</div>
                      <div className="text-xs text-gray-500">Used to track visitors across websites for advertising</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-4 w-4 text-orange-600" />
                    <div>
                      <div className="font-medium text-sm">Personalization Cookies</div>
                      <div className="text-xs text-gray-500">Remember your preferences and settings</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.personalization}
                    onChange={(e) => handleConsentChange('personalization', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-4 w-4 text-red-600" />
                    <div>
                      <div className="font-medium text-sm">Third-Party Cookies</div>
                      <div className="text-xs text-gray-500">Cookies from external services we use</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.third_party}
                    onChange={(e) => handleConsentChange('third_party', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="flex-1"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1"
                >
                  Save Preferences
                </Button>
              </div>

              {/* Privacy Policy Link */}
              <div className="mt-4 text-center">
                <a
                  href="/privacy-policy"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read our Privacy Policy
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowBanner(false)}
              className="ml-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
