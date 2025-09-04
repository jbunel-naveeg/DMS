/**
 * i18n Service
 * Main service for internationalization functionality
 */

import { 
  Locale, 
  Translation, 
  I18nConfig, 
  TranslationOptions, 
  SupportedLocale,
  TranslationNamespace as TNamespace
} from './types'

export class I18nService {
  private config: I18nConfig
  private currentLocale: string
  private translations: Map<string, Map<string, Translation>> = new Map()
  private locales: Map<string, Locale> = new Map()

  constructor(config: I18nConfig) {
    this.config = config
    this.currentLocale = config.defaultLocale
    this.initializeLocales()
  }

  /**
   * Initialize supported locales
   */
  private initializeLocales(): void {
    const localeData: Record<string, Locale> = {
      en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: false
      },
      es: {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: '.' },
        rtl: false
      },
      fr: {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: ' ' },
        rtl: false
      },
      de: {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        currency: 'EUR',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: '.' },
        rtl: false
      },
      it: {
        code: 'it',
        name: 'Italian',
        nativeName: 'Italiano',
        flag: '🇮🇹',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: '.' },
        rtl: false
      },
      pt: {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
        flag: '🇵🇹',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: ' ' },
        rtl: false
      },
      ru: {
        code: 'ru',
        name: 'Russian',
        nativeName: 'Русский',
        flag: '🇷🇺',
        currency: 'RUB',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: ',', thousands: ' ' },
        rtl: false
      },
      ja: {
        code: 'ja',
        name: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        currency: 'JPY',
        dateFormat: 'YYYY/MM/DD',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: false
      },
      ko: {
        code: 'ko',
        name: 'Korean',
        nativeName: '한국어',
        flag: '🇰🇷',
        currency: 'KRW',
        dateFormat: 'YYYY.MM.DD',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: false
      },
      zh: {
        code: 'zh',
        name: 'Chinese',
        nativeName: '中文',
        flag: '🇨🇳',
        currency: 'CNY',
        dateFormat: 'YYYY/MM/DD',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: false
      },
      ar: {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        flag: '🇸🇦',
        currency: 'SAR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: true
      },
      hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        currency: 'INR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: { decimal: '.', thousands: ',' },
        rtl: false
      }
    }

    Object.values(localeData).forEach(locale => {
      this.locales.set(locale.code, locale)
    })
  }

  /**
   * Get current locale
   */
  getCurrentLocale(): string {
    return this.currentLocale
  }

  /**
   * Set current locale
   */
  setLocale(locale: string): void {
    if (this.locales.has(locale)) {
      this.currentLocale = locale
      this.saveLocaleToStorage(locale)
    }
  }

  /**
   * Get all supported locales
   */
  getSupportedLocales(): Locale[] {
    return Array.from(this.locales.values())
  }

  /**
   * Get locale information
   */
  getLocale(localeCode: string): Locale | undefined {
    return this.locales.get(localeCode)
  }

  /**
   * Check if locale is supported
   */
  isLocaleSupported(localeCode: string): boolean {
    return this.locales.has(localeCode)
  }

  /**
   * Load translations for a namespace
   */
  async loadTranslations(namespace: TNamespace, locale: string): Promise<void> {
    try {
      const response = await fetch(`${this.config.loadPath}/${locale}/${namespace}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${locale}/${namespace}`)
      }
      
      const translations = await response.json()
      const translationMap = new Map<string, Translation>()
      
      Object.entries(translations).forEach(([key, value]) => {
        translationMap.set(key, {
          key,
          value: value as string,
          locale,
          namespace,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      })
      
      this.translations.set(`${locale}:${namespace}`, translationMap)
    } catch (error) {
      console.error(`Error loading translations for ${locale}/${namespace}:`, error)
      // Fallback to default locale
      if (locale !== this.config.fallbackLocale) {
        await this.loadTranslations(namespace, this.config.fallbackLocale)
      }
    }
  }

  /**
   * Get translation
   */
  t(key: string, options?: TranslationOptions & { namespace?: TNamespace }): string {
    const namespace = options?.namespace || 'common'
    const locale = this.currentLocale
    const translationKey = `${locale}:${namespace}`
    
    const translation = this.translations.get(translationKey)?.get(key)
    
    if (!translation) {
      // Try fallback locale
      const fallbackKey = `${this.config.fallbackLocale}:${namespace}`
      const fallbackTranslation = this.translations.get(fallbackKey)?.get(key)
      
      if (fallbackTranslation) {
        return this.interpolate(fallbackTranslation.value, options)
      }
      
      // Return key if no translation found
      return options?.defaultValue || key
    }

    return this.interpolate(translation.value, options)
  }

  /**
   * Interpolate variables in translation
   */
  private interpolate(text: string, options?: TranslationOptions): string {
    if (!options?.variables) return text

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return options.variables![key] || match
    })
  }

  /**
   * Check if translation exists
   */
  exists(key: string, options?: { namespace?: TNamespace }): boolean {
    const namespace = options?.namespace || 'common'
    const locale = this.currentLocale
    const translationKey = `${locale}:${namespace}`
    
    return this.translations.get(translationKey)?.has(key) || false
  }

  /**
   * Get all translations for a namespace
   */
  getTranslations(namespace: TNamespace, locale?: string): Map<string, Translation> {
    const targetLocale = locale || this.currentLocale
    const translationKey = `${targetLocale}:${namespace}`
    
    return this.translations.get(translationKey) || new Map()
  }

  /**
   * Save locale to storage
   */
  private saveLocaleToStorage(locale: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.config.detection.cookieName, locale)
    }
  }

  /**
   * Load locale from storage
   */
  loadLocaleFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.config.detection.cookieName)
    }
    return null
  }

  /**
   * Detect user's preferred locale
   */
  detectLocale(): string {
    // Check storage first
    const storedLocale = this.loadLocaleFromStorage()
    if (storedLocale && this.isLocaleSupported(storedLocale)) {
      return storedLocale
    }

    // Check browser language
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLang = window.navigator.language.split('-')[0]
      if (this.isLocaleSupported(browserLang)) {
        return browserLang
      }
    }

    // Check URL parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const urlLocale = urlParams.get('lang')
      if (urlLocale && this.isLocaleSupported(urlLocale)) {
        return urlLocale
      }
    }

    // Return default locale
    return this.config.defaultLocale
  }

  /**
   * Initialize i18n service
   */
  async initialize(): Promise<void> {
    const detectedLocale = this.detectLocale()
    this.setLocale(detectedLocale)

    // Load common translations
    await this.loadTranslations('common', this.currentLocale)
  }

  /**
   * Change locale and reload translations
   */
  async changeLocale(locale: string): Promise<void> {
    if (!this.isLocaleSupported(locale)) {
      throw new Error(`Locale ${locale} is not supported`)
    }

    this.setLocale(locale)
    
    // Reload all namespaces for new locale
    for (const namespace of this.config.namespaces) {
      await this.loadTranslations(namespace as TNamespace, locale)
    }
  }

  /**
   * Get RTL status for current locale
   */
  isRTL(): boolean {
    const locale = this.getLocale(this.currentLocale)
    return locale?.rtl || false
  }

  /**
   * Get currency for current locale
   */
  getCurrency(): string {
    const locale = this.getLocale(this.currentLocale)
    return locale?.currency || 'USD'
  }

  /**
   * Get date format for current locale
   */
  getDateFormat(): string {
    const locale = this.getLocale(this.currentLocale)
    return locale?.dateFormat || 'MM/DD/YYYY'
  }

  /**
   * Get time format for current locale
   */
  getTimeFormat(): string {
    const locale = this.getLocale(this.currentLocale)
    return locale?.timeFormat || 'HH:mm'
  }

  /**
   * Get number format for current locale
   */
  getNumberFormat(): { decimal: string; thousands: string } {
    const locale = this.getLocale(this.currentLocale)
    return locale?.numberFormat || { decimal: '.', thousands: ',' }
  }
}
