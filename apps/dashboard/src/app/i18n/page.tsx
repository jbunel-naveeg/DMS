"use client"

import React, { useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { I18nProvider } from '@naveeg/lib'
import { LanguageSelector } from '@/components/i18n/language-selector'
import { TranslationEditor } from '@/components/i18n/translation-editor'
import { RTLProvider } from '@/components/i18n/rtl-provider'
import { Button } from '@naveeg/ui'
import { 
  Globe, 
  FileText, 
  Settings, 
  BarChart3,
  Languages,
  Translate,
  Download,
  Upload
} from 'lucide-react'

// Mock i18n service - in a real app, this would be properly initialized
const mockI18nService = {
  getCurrentLocale: () => 'en',
  setLocale: () => {},
  getSupportedLocales: () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
  ],
  isLocaleSupported: () => true,
  getLocale: () => null,
  t: (key: string) => key,
  exists: () => true,
  isRTL: () => false,
  getCurrency: () => 'USD',
  getDateFormat: () => 'MM/DD/YYYY',
  getTimeFormat: () => 'HH:mm',
  getNumberFormat: () => ({ decimal: '.', thousands: ',' }),
  changeLocale: async () => {},
  initialize: async () => {}
}

export default function I18nPage() {
  const { user, loading: userLoading } = useUser()
  const [activeTab, setActiveTab] = useState('translations')
  const [selectedNamespace, setSelectedNamespace] = useState('common')
  const [selectedLocale, setSelectedLocale] = useState('en')

  const namespaces = [
    { id: 'common', name: 'Common', description: 'Common translations used across the application' },
    { id: 'auth', name: 'Authentication', description: 'Authentication and authorization related translations' },
    { id: 'dashboard', name: 'Dashboard', description: 'Dashboard specific translations' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing site translations' },
    { id: 'errors', name: 'Errors', description: 'Error messages and validation messages' },
    { id: 'validation', name: 'Validation', description: 'Form validation messages' },
    { id: 'gdpr', name: 'GDPR', description: 'GDPR and privacy related translations' },
    { id: 'billing', name: 'Billing', description: 'Billing and subscription related translations' },
    { id: 'onboarding', name: 'Onboarding', description: 'User onboarding flow translations' }
  ]

  const locales = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', completion: 100 },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', completion: 85 },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', completion: 75 },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', completion: 60 },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', completion: 45 },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', completion: 30 },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', completion: 25 },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', completion: 20 },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', completion: 15 },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', completion: 10 },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', completion: 5 },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', completion: 0 }
  ]

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
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please sign in to access the translation management.
          </p>
        </div>
      </div>
    )
  }

  return (
    <I18nProvider i18nService={mockI18nService as any}>
      <RTLProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Internationalization
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                      Manage translations and language settings
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSelector variant="dropdown" />
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'translations', label: 'Translations', icon: Translate },
                    { id: 'locales', label: 'Locales', icon: Languages },
                    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((tab) => {
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
              {activeTab === 'translations' && (
                <div className="p-6">
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Namespace
                        </label>
                        <select
                          value={selectedNamespace}
                          onChange={(e) => setSelectedNamespace(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {namespaces.map((namespace) => (
                            <option key={namespace.id} value={namespace.id}>
                              {namespace.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Locale
                        </label>
                        <select
                          value={selectedLocale}
                          onChange={(e) => setSelectedLocale(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {locales.map((locale) => (
                            <option key={locale.code} value={locale.code}>
                              {locale.flag} {locale.nativeName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <TranslationEditor
                    namespace={selectedNamespace}
                    locale={selectedLocale}
                  />
                </div>
              )}

              {activeTab === 'locales' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Supported Locales
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Manage supported languages and their settings
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {locales.map((locale) => (
                      <div
                        key={locale.code}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{locale.flag}</span>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {locale.nativeName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {locale.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {locale.completion}%
                            </div>
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${locale.completion}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'statistics' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Translation Statistics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Overview of translation progress and completion rates
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Total Keys
                          </p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            1,247
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                      <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200">
                            Translated
                          </p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            892
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                      <div className="flex items-center">
                        <AlertCircle className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Missing
                          </p>
                          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                            355
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      i18n Settings
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Configure internationalization settings and preferences
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Default Settings
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Default Locale
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Fallback Locale
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </RTLProvider>
    </I18nProvider>
  )
}
