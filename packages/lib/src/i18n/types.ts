/**
 * i18n Types
 * Defines interfaces and types for internationalization
 */

export interface Locale {
  code: string
  name: string
  nativeName: string
  flag: string
  currency: string
  dateFormat: string
  timeFormat: string
  numberFormat: {
    decimal: string
    thousands: string
  }
  rtl: boolean
}

export interface Translation {
  key: string
  value: string
  locale: string
  namespace: string
  context?: string
  plural?: {
    zero?: string
    one?: string
    two?: string
    few?: string
    many?: string
    other?: string
  }
  variables?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface TranslationNamespace {
  name: string
  description: string
  translations: Record<string, Translation>
  created_at: string
  updated_at: string
}

export interface I18nConfig {
  defaultLocale: string
  supportedLocales: string[]
  fallbackLocale: string
  namespaces: string[]
  loadPath: string
  savePath: string
  detection: {
    order: string[]
    caches: string[]
    cookieName: string
    cookieOptions: {
      path: string
      sameSite: string
      secure: boolean
      maxAge: number
    }
  }
  interpolation: {
    escapeValue: boolean
    format: (value: any, format?: string, lng?: string) => string
  }
}

export interface TranslationOptions {
  count?: number
  context?: string
  variables?: Record<string, any>
  defaultValue?: string
  interpolation?: {
    escapeValue?: boolean
  }
}

export interface CurrencyOptions {
  style: 'currency' | 'decimal' | 'percent'
  currency: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  useGrouping?: boolean
}

export interface DateOptions {
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'long' | 'short'
  weekday?: 'long' | 'short' | 'narrow'
  era?: 'long' | 'short' | 'narrow'
}

export interface NumberOptions {
  style?: 'decimal' | 'currency' | 'percent'
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  useGrouping?: boolean
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact'
  compactDisplay?: 'short' | 'long'
}

export interface LanguageDetectionResult {
  locale: string
  confidence: number
  source: 'cookie' | 'localStorage' | 'navigator' | 'url' | 'header' | 'default'
}

export interface TranslationContext {
  locale: string
  namespace: string
  key: string
  options?: TranslationOptions
}

export interface PluralRule {
  locale: string
  rule: (n: number) => string
}

export interface RTLConfig {
  enabled: boolean
  autoDetect: boolean
  fallback: 'ltr' | 'rtl'
}

export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'hi'
export type TranslationNamespace = 'common' | 'auth' | 'dashboard' | 'marketing' | 'errors' | 'validation' | 'gdpr' | 'billing' | 'onboarding'
export type PluralForm = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'
