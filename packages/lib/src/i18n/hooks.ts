/**
 * React Hooks for i18n
 * Provides React hooks for internationalization functionality
 */

import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { I18nService } from './i18n-service'
import { CurrencyFormatter } from './currency-formatter'
import { DateFormatter } from './date-formatter'
import { NumberFormatter } from './number-formatter'
import { SupportedLocale, TranslationOptions, CurrencyOptions, DateOptions, NumberOptions } from './types'

// Create i18n context
const I18nContext = createContext<{
  i18n: I18nService
  currencyFormatter: CurrencyFormatter
  dateFormatter: DateFormatter
  numberFormatter: NumberFormatter
} | null>(null)

// Provider component
export function I18nProvider({ 
  children, 
  i18nService 
}: { 
  children: React.ReactNode
  i18nService: I18nService 
}) {
  const [currencyFormatter] = useState(() => new CurrencyFormatter(i18nService.getCurrentLocale() as SupportedLocale))
  const [dateFormatter] = useState(() => new DateFormatter(i18nService.getCurrentLocale() as SupportedLocale))
  const [numberFormatter] = useState(() => new NumberFormatter(i18nService.getCurrentLocale() as SupportedLocale))

  const value = {
    i18n: i18nService,
    currencyFormatter,
    dateFormatter,
    numberFormatter
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook to use i18n context
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Hook for translations
export function useTranslation(namespace?: string) {
  const { i18n } = useI18n()
  const [locale, setLocale] = useState(i18n.getCurrentLocale())

  const t = useCallback((key: string, options?: TranslationOptions) => {
    return i18n.t(key, { ...options, namespace: namespace as any })
  }, [i18n, namespace])

  const changeLocale = useCallback(async (newLocale: SupportedLocale) => {
    await i18n.changeLocale(newLocale)
    setLocale(newLocale)
  }, [i18n])

  const exists = useCallback((key: string) => {
    return i18n.exists(key, { namespace: namespace as any })
  }, [i18n, namespace])

  return {
    t,
    changeLocale,
    exists,
    locale,
    isRTL: i18n.isRTL()
  }
}

// Hook for currency formatting
export function useCurrency() {
  const { currencyFormatter } = useI18n()
  const { i18n } = useI18n()

  const format = useCallback((amount: number, options?: Partial<CurrencyOptions>) => {
    return currencyFormatter.format(amount, options)
  }, [currencyFormatter])

  const formatWithCurrency = useCallback((amount: number, currency: string, options?: Partial<CurrencyOptions>) => {
    return currencyFormatter.formatWithCurrency(amount, currency, options)
  }, [currencyFormatter])

  const formatCompact = useCallback((amount: number, options?: Partial<CurrencyOptions>) => {
    return currencyFormatter.formatCompact(amount, options)
  }, [currencyFormatter])

  const parse = useCallback((currencyString: string) => {
    return currencyFormatter.parse(currencyString)
  }, [currencyFormatter])

  const getCurrencySymbol = useCallback((currency?: string) => {
    return currencyFormatter.getCurrencySymbol(currency)
  }, [currencyFormatter])

  return {
    format,
    formatWithCurrency,
    formatCompact,
    parse,
    getCurrencySymbol,
    currency: i18n.getCurrency()
  }
}

// Hook for date formatting
export function useDate() {
  const { dateFormatter } = useI18n()

  const format = useCallback((date: Date | string | number, options?: DateOptions) => {
    return dateFormatter.format(date, options)
  }, [dateFormatter])

  const formatTime = useCallback((date: Date | string | number, options?: DateOptions) => {
    return dateFormatter.formatTime(date, options)
  }, [dateFormatter])

  const formatDateTime = useCallback((date: Date | string | number, options?: DateOptions) => {
    return dateFormatter.formatDateTime(date, options)
  }, [dateFormatter])

  const formatRelative = useCallback((date: Date | string | number, options?: { numeric?: 'always' | 'auto' }) => {
    return dateFormatter.formatRelative(date, options)
  }, [dateFormatter])

  const formatRange = useCallback((startDate: Date | string | number, endDate: Date | string | number, options?: DateOptions) => {
    return dateFormatter.formatRange(startDate, endDate, options)
  }, [dateFormatter])

  const isToday = useCallback((date: Date | string | number) => {
    return dateFormatter.isToday(date)
  }, [dateFormatter])

  const isYesterday = useCallback((date: Date | string | number) => {
    return dateFormatter.isYesterday(date)
  }, [dateFormatter])

  const isTomorrow = useCallback((date: Date | string | number) => {
    return dateFormatter.isTomorrow(date)
  }, [dateFormatter])

  const getMonthNames = useCallback((format: 'long' | 'short' | 'narrow' = 'long') => {
    return dateFormatter.getMonthNames(format)
  }, [dateFormatter])

  const getWeekdayNames = useCallback((format: 'long' | 'short' | 'narrow' = 'long') => {
    return dateFormatter.getWeekdayNames(format)
  }, [dateFormatter])

  return {
    format,
    formatTime,
    formatDateTime,
    formatRelative,
    formatRange,
    isToday,
    isYesterday,
    isTomorrow,
    getMonthNames,
    getWeekdayNames
  }
}

// Hook for number formatting
export function useNumber() {
  const { numberFormatter } = useI18n()

  const format = useCallback((number: number, options?: NumberOptions) => {
    return numberFormatter.format(number, options)
  }, [numberFormatter])

  const formatCompact = useCallback((number: number, options?: NumberOptions) => {
    return numberFormatter.formatCompact(number, options)
  }, [numberFormatter])

  const formatPercent = useCallback((number: number, options?: NumberOptions) => {
    return numberFormatter.formatPercent(number, options)
  }, [numberFormatter])

  const parse = useCallback((numberString: string) => {
    return numberFormatter.parse(numberString)
  }, [numberFormatter])

  return {
    format,
    formatCompact,
    formatPercent,
    parse
  }
}

// Hook for locale management
export function useLocale() {
  const { i18n } = useI18n()
  const [locale, setLocale] = useState(i18n.getCurrentLocale())
  const [loading, setLoading] = useState(false)

  const changeLocale = useCallback(async (newLocale: SupportedLocale) => {
    setLoading(true)
    try {
      await i18n.changeLocale(newLocale)
      setLocale(newLocale)
    } catch (error) {
      console.error('Error changing locale:', error)
    } finally {
      setLoading(false)
    }
  }, [i18n])

  const getSupportedLocales = useCallback(() => {
    return i18n.getSupportedLocales()
  }, [i18n])

  const isLocaleSupported = useCallback((localeCode: string) => {
    return i18n.isLocaleSupported(localeCode)
  }, [i18n])

  const getLocale = useCallback((localeCode: string) => {
    return i18n.getLocale(localeCode)
  }, [i18n])

  return {
    locale,
    changeLocale,
    getSupportedLocales,
    isLocaleSupported,
    getLocale,
    loading,
    isRTL: i18n.isRTL()
  }
}

// Hook for RTL support
export function useRTL() {
  const { i18n } = useI18n()
  const [isRTL, setIsRTL] = useState(i18n.isRTL())

  useEffect(() => {
    const updateRTL = () => {
      setIsRTL(i18n.isRTL())
    }

    // Listen for locale changes
    const interval = setInterval(updateRTL, 1000)
    return () => clearInterval(interval)
  }, [i18n])

  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr'
  }
}

// Hook for pluralization
export function usePlural() {
  const { i18n } = useI18n()

  const getPluralForm = useCallback((count: number) => {
    // This is a simplified implementation
    // In a real app, you'd use a proper pluralization library
    if (count === 0) return 'zero'
    if (count === 1) return 'one'
    if (count === 2) return 'two'
    if (count >= 3 && count <= 10) return 'few'
    if (count > 10) return 'many'
    return 'other'
  }, [])

  const tPlural = useCallback((key: string, count: number, options?: TranslationOptions) => {
    const pluralForm = getPluralForm(count)
    return i18n.t(`${key}.${pluralForm}`, { ...options, count })
  }, [i18n, getPluralForm])

  return {
    getPluralForm,
    tPlural
  }
}
