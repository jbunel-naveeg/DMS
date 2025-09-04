/**
 * Locale Detector
 * Detects user's preferred locale from various sources
 */

import { LanguageDetectionResult, SupportedLocale } from './types'

export class LocaleDetector {
  private supportedLocales: SupportedLocale[]
  private fallbackLocale: SupportedLocale

  constructor(supportedLocales: SupportedLocale[], fallbackLocale: SupportedLocale = 'en') {
    this.supportedLocales = supportedLocales
    this.fallbackLocale = fallbackLocale
  }

  /**
   * Detect locale from multiple sources
   */
  detect(): LanguageDetectionResult {
    const detectionOrder = [
      this.detectFromCookie,
      this.detectFromLocalStorage,
      this.detectFromNavigator,
      this.detectFromURL,
      this.detectFromHeader
    ]

    for (const detector of detectionOrder) {
      try {
        const result = detector.call(this)
        if (result && this.isLocaleSupported(result.locale)) {
          return result
        }
      } catch (error) {
        console.warn('Error in locale detection:', error)
      }
    }

    return {
      locale: this.fallbackLocale,
      confidence: 1.0,
      source: 'default'
    }
  }

  /**
   * Detect from cookie
   */
  private detectFromCookie(): LanguageDetectionResult | null {
    if (typeof document === 'undefined') return null

    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'locale' || name === 'lang' || name === 'i18n') {
        const locale = this.normalizeLocale(value)
        if (this.isLocaleSupported(locale)) {
          return {
            locale,
            confidence: 0.9,
            source: 'cookie'
          }
        }
      }
    }

    return null
  }

  /**
   * Detect from localStorage
   */
  private detectFromLocalStorage(): LanguageDetectionResult | null {
    if (typeof window === 'undefined') return null

    const stored = localStorage.getItem('locale') || localStorage.getItem('lang') || localStorage.getItem('i18n')
    if (stored) {
      const locale = this.normalizeLocale(stored)
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.8,
          source: 'localStorage'
        }
      }
    }

    return null
  }

  /**
   * Detect from navigator
   */
  private detectFromNavigator(): LanguageDetectionResult | null {
    if (typeof navigator === 'undefined') return null

    const languages = navigator.languages || [navigator.language]
    
    for (const lang of languages) {
      const locale = this.normalizeLocale(lang)
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.7,
          source: 'navigator'
        }
      }
    }

    return null
  }

  /**
   * Detect from URL
   */
  private detectFromURL(): LanguageDetectionResult | null {
    if (typeof window === 'undefined') return null

    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang') || urlParams.get('locale') || urlParams.get('lng')
    
    if (langParam) {
      const locale = this.normalizeLocale(langParam)
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.6,
          source: 'url'
        }
      }
    }

    // Check pathname for locale
    const pathname = window.location.pathname
    const pathSegments = pathname.split('/')
    if (pathSegments.length > 1) {
      const potentialLocale = this.normalizeLocale(pathSegments[1])
      if (this.isLocaleSupported(potentialLocale)) {
        return {
          locale: potentialLocale,
          confidence: 0.6,
          source: 'url'
        }
      }
    }

    return null
  }

  /**
   * Detect from header (server-side)
   */
  private detectFromHeader(): LanguageDetectionResult | null {
    if (typeof window === 'undefined') return null

    // This would typically be done server-side
    // For client-side, we can't access headers directly
    return null
  }

  /**
   * Normalize locale code
   */
  private normalizeLocale(locale: string): SupportedLocale {
    // Remove region code (e.g., 'en-US' -> 'en')
    const normalized = locale.split('-')[0].toLowerCase()
    
    // Map common variations
    const localeMap: Record<string, SupportedLocale> = {
      'en': 'en',
      'es': 'es',
      'fr': 'fr',
      'de': 'de',
      'it': 'it',
      'pt': 'pt',
      'ru': 'ru',
      'ja': 'ja',
      'ko': 'ko',
      'zh': 'zh',
      'ar': 'ar',
      'hi': 'hi'
    }

    return localeMap[normalized] || 'en'
  }

  /**
   * Check if locale is supported
   */
  private isLocaleSupported(locale: string): boolean {
    return this.supportedLocales.includes(locale as SupportedLocale)
  }

  /**
   * Get best match for locale
   */
  getBestMatch(requestedLocale: string): SupportedLocale {
    const normalized = this.normalizeLocale(requestedLocale)
    
    if (this.isLocaleSupported(normalized)) {
      return normalized
    }

    // Try to find a close match
    const language = normalized.split('-')[0]
    for (const supported of this.supportedLocales) {
      if (supported.startsWith(language)) {
        return supported
      }
    }

    return this.fallbackLocale
  }

  /**
   * Get all supported locales
   */
  getSupportedLocales(): SupportedLocale[] {
    return [...this.supportedLocales]
  }

  /**
   * Add supported locale
   */
  addSupportedLocale(locale: SupportedLocale): void {
    if (!this.supportedLocales.includes(locale)) {
      this.supportedLocales.push(locale)
    }
  }

  /**
   * Remove supported locale
   */
  removeSupportedLocale(locale: SupportedLocale): void {
    const index = this.supportedLocales.indexOf(locale)
    if (index > -1) {
      this.supportedLocales.splice(index, 1)
    }
  }

  /**
   * Set fallback locale
   */
  setFallbackLocale(locale: SupportedLocale): void {
    this.fallbackLocale = locale
  }

  /**
   * Get fallback locale
   */
  getFallbackLocale(): SupportedLocale {
    return this.fallbackLocale
  }
}
