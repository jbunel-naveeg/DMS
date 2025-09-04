"use client"

import React, { useState } from 'react'
import { useLocale } from '@naveeg/lib'
import { Button } from '@naveeg/ui'
import { 
  Globe, 
  Check, 
  ChevronDown,
  Loader2
} from 'lucide-react'

interface LanguageSelectorProps {
  className?: string
  showLabel?: boolean
  variant?: 'button' | 'dropdown' | 'select'
}

export function LanguageSelector({ 
  className = '', 
  showLabel = true,
  variant = 'dropdown'
}: LanguageSelectorProps) {
  const { locale, changeLocale, getSupportedLocales, loading } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const supportedLocales = getSupportedLocales()
  const currentLocale = supportedLocales.find(l => l.code === locale)

  const handleLocaleChange = async (localeCode: string) => {
    await changeLocale(localeCode as any)
    setIsOpen(false)
  }

  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLocale?.flag}</span>
          <span className="hidden sm:inline">{currentLocale?.nativeName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              {supportedLocales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                    locale.code === currentLocale?.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{locale.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {locale.nativeName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {locale.name}
                      </div>
                    </div>
                  </div>
                  {locale.code === currentLocale?.code && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'select') {
    return (
      <div className={className}>
        {showLabel && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
        )}
        <select
          value={locale}
          onChange={(e) => handleLocaleChange(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {supportedLocales.map((locale) => (
            <option key={locale.code} value={locale.code}>
              {locale.flag} {locale.nativeName}
            </option>
          ))}
        </select>
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLocale?.flag}</span>
        <span className="hidden sm:inline">{currentLocale?.nativeName}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Select Language
              </div>
              <div className="space-y-1">
                {supportedLocales.map((locale) => (
                  <button
                    key={locale.code}
                    onClick={() => handleLocaleChange(locale.code)}
                    disabled={loading}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors ${
                      locale.code === currentLocale?.code 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{locale.flag}</span>
                      <div>
                        <div className="font-medium">
                          {locale.nativeName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {locale.name}
                        </div>
                      </div>
                    </div>
                    {locale.code === currentLocale?.code && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                    {loading && locale.code !== currentLocale?.code && (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
