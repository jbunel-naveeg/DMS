/**
 * Currency Formatter
 * Handles currency formatting for different locales
 */

import { CurrencyOptions, SupportedLocale } from './types'

export class CurrencyFormatter {
  private locale: string
  private currency: string

  constructor(locale: SupportedLocale, currency?: string) {
    this.locale = locale
    this.currency = currency || this.getDefaultCurrency(locale)
  }

  /**
   * Get default currency for locale
   */
  private getDefaultCurrency(locale: SupportedLocale): string {
    const currencyMap: Record<SupportedLocale, string> = {
      en: 'USD',
      es: 'EUR',
      fr: 'EUR',
      de: 'EUR',
      it: 'EUR',
      pt: 'EUR',
      ru: 'RUB',
      ja: 'JPY',
      ko: 'KRW',
      zh: 'CNY',
      ar: 'SAR',
      hi: 'INR'
    }

    return currencyMap[locale] || 'USD'
  }

  /**
   * Format currency amount
   */
  format(amount: number, options?: Partial<CurrencyOptions>): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      useGrouping: options?.useGrouping ?? true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount)
    } catch (error) {
      console.error('Error formatting currency:', error)
      return `${this.currency} ${amount.toFixed(2)}`
    }
  }

  /**
   * Format currency with custom currency
   */
  formatWithCurrency(amount: number, currency: string, options?: Partial<CurrencyOptions>): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      useGrouping: options?.useGrouping ?? true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount)
    } catch (error) {
      console.error('Error formatting currency:', error)
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  /**
   * Parse currency string to number
   */
  parse(currencyString: string): number {
    // Remove currency symbols and non-numeric characters except decimal point
    const cleaned = currencyString.replace(/[^\d.,-]/g, '')
    
    // Handle different decimal separators
    const decimalSeparator = this.getDecimalSeparator()
    const thousandsSeparator = this.getThousandsSeparator()
    
    let normalized = cleaned
    if (decimalSeparator !== '.') {
      // Replace decimal separator with dot
      normalized = normalized.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.')
    }
    
    // Remove thousands separators
    if (thousandsSeparator) {
      normalized = normalized.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')
    }
    
    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? 0 : parsed
  }

  /**
   * Get currency symbol
   */
  getCurrencySymbol(currency?: string): string {
    const targetCurrency = currency || this.currency
    
    try {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      
      return formatter.format(0).replace(/\d/g, '').trim()
    } catch (error) {
      console.error('Error getting currency symbol:', error)
      return targetCurrency
    }
  }

  /**
   * Get decimal separator for locale
   */
  private getDecimalSeparator(): string {
    try {
      const formatter = new Intl.NumberFormat(this.locale)
      const parts = formatter.formatToParts(1.1)
      const decimalPart = parts.find(part => part.type === 'decimal')
      return decimalPart?.value || '.'
    } catch (error) {
      return '.'
    }
  }

  /**
   * Get thousands separator for locale
   */
  private getThousandsSeparator(): string {
    try {
      const formatter = new Intl.NumberFormat(this.locale)
      const parts = formatter.formatToParts(1000)
      const groupPart = parts.find(part => part.type === 'group')
      return groupPart?.value || ','
    } catch (error) {
      return ','
    }
  }

  /**
   * Convert currency amount
   */
  convert(amount: number, fromCurrency: string, toCurrency: string, rate: number): number {
    return amount * rate
  }

  /**
   * Format compact currency (e.g., $1.2K, $1.2M)
   */
  formatCompact(amount: number, options?: Partial<CurrencyOptions>): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: this.currency,
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount)
    } catch (error) {
      console.error('Error formatting compact currency:', error)
      return this.format(amount, options)
    }
  }

  /**
   * Format currency range
   */
  formatRange(minAmount: number, maxAmount: number, options?: Partial<CurrencyOptions>): string {
    const minFormatted = this.format(minAmount, options)
    const maxFormatted = this.format(maxAmount, options)
    
    return `${minFormatted} - ${maxFormatted}`
  }

  /**
   * Get supported currencies for locale
   */
  getSupportedCurrencies(): string[] {
    // This would typically come from a more comprehensive list
    const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'RUB', 'INR', 'BRL', 'KRW']
    return commonCurrencies
  }

  /**
   * Check if currency is supported
   */
  isCurrencySupported(currency: string): boolean {
    try {
      new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency
      }).format(0)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Update locale and currency
   */
  updateLocale(locale: SupportedLocale, currency?: string): void {
    this.locale = locale
    this.currency = currency || this.getDefaultCurrency(locale)
  }

  /**
   * Get current currency
   */
  getCurrentCurrency(): string {
    return this.currency
  }

  /**
   * Get current locale
   */
  getCurrentLocale(): string {
    return this.locale
  }
}
