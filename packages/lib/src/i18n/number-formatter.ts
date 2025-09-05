/**
 * Number Formatter
 * Handles number formatting for different locales
 */

import { NumberOptions, SupportedLocale } from './types'

export class NumberFormatter {
  private locale: string

  constructor(locale: SupportedLocale) {
    this.locale = locale
  }

  /**
   * Format number
   */
  format(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting number:', error)
      return number.toString()
    }
  }

  /**
   * Format compact number (e.g., 1.2K, 1.2M)
   */
  formatCompact(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting compact number:', error)
      return this.format(number, options)
    }
  }

  /**
   * Format percentage
   */
  formatPercent(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number / 100)
    } catch (error) {
      console.error('Error formatting percentage:', error)
      return `${number}%`
    }
  }

  /**
   * Format ordinal number (e.g., 1st, 2nd, 3rd)
   */
  formatOrdinal(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting ordinal number:', error)
      return number.toString()
    }
  }

  /**
   * Format scientific notation
   */
  formatScientific(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      notation: 'scientific',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting scientific number:', error)
      return number.toExponential()
    }
  }

  /**
   * Format engineering notation
   */
  formatEngineering(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      notation: 'engineering',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting engineering number:', error)
      return number.toExponential()
    }
  }

  /**
   * Parse number string
   */
  parse(numberString: string): number {
    // Remove non-numeric characters except decimal point and minus sign
    const cleaned = numberString.replace(/[^\d.,-]/g, '')
    
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
   * Format number range
   */
  formatRange(minNumber: number, maxNumber: number, options?: NumberOptions): string {
    const minFormatted = this.format(minNumber, options)
    const maxFormatted = this.format(maxNumber, options)
    
    return `${minFormatted} - ${maxFormatted}`
  }

  /**
   * Format number with unit
   */
  formatWithUnit(number: number, unit: string, options?: NumberOptions): string {
    const formatted = this.format(number, options)
    return `${formatted} ${unit}`
  }

  /**
   * Format number with custom suffix
   */
  formatWithSuffix(number: number, suffix: string, options?: NumberOptions): string {
    const formatted = this.format(number, options)
    return `${formatted}${suffix}`
  }

  /**
   * Format number with custom prefix
   */
  formatWithPrefix(number: number, prefix: string, options?: NumberOptions): string {
    const formatted = this.format(number, options)
    return `${prefix}${formatted}`
  }

  /**
   * Check if number is valid
   */
  isValidNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value) && isFinite(value)
  }

  /**
   * Clamp number to range
   */
  clamp(number: number, min: number, max: number): number {
    return Math.min(Math.max(number, min), max)
  }

  /**
   * Round number to specified decimal places
   */
  round(number: number, decimalPlaces: number = 2): number {
    const factor = Math.pow(10, decimalPlaces)
    return Math.round(number * factor) / factor
  }

  /**
   * Format number as currency (without currency symbol)
   */
  formatCurrencyValue(amount: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount)
    } catch (error) {
      console.error('Error formatting currency value:', error)
      return amount.toFixed(2)
    }
  }

  /**
   * Format number as integer
   */
  formatInteger(number: number, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(Math.floor(number))
    } catch (error) {
      console.error('Error formatting integer:', error)
      return Math.floor(number).toString()
    }
  }

  /**
   * Format number as decimal
   */
  formatDecimal(number: number, decimalPlaces: number = 2, options?: NumberOptions): string {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true,
      ...options
    }

    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number)
    } catch (error) {
      console.error('Error formatting decimal:', error)
      return number.toFixed(decimalPlaces)
    }
  }

  /**
   * Update locale
   */
  updateLocale(locale: SupportedLocale): void {
    this.locale = locale
  }

  /**
   * Get current locale
   */
  getCurrentLocale(): string {
    return this.locale
  }
}
