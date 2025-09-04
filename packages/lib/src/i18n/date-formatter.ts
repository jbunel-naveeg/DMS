/**
 * Date Formatter
 * Handles date and time formatting for different locales
 */

import { DateOptions, SupportedLocale } from './types'

export class DateFormatter {
  private locale: string
  private timeZone: string

  constructor(locale: SupportedLocale, timeZone?: string) {
    this.locale = locale
    this.timeZone = timeZone || this.getDefaultTimeZone()
  }

  /**
   * Get default timezone for locale
   */
  private getDefaultTimeZone(): string {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch (error) {
      return 'UTC'
    }
  }

  /**
   * Format date
   */
  format(date: Date | string | number, options?: DateOptions): string {
    const dateObj = this.parseDate(date)
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: this.timeZone,
      ...options
    }

    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj)
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateObj.toLocaleDateString()
    }
  }

  /**
   * Format time
   */
  formatTime(date: Date | string | number, options?: DateOptions): string {
    const dateObj = this.parseDate(date)
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: this.timeZone,
      ...options
    }

    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj)
    } catch (error) {
      console.error('Error formatting time:', error)
      return dateObj.toLocaleTimeString()
    }
  }

  /**
   * Format date and time
   */
  formatDateTime(date: Date | string | number, options?: DateOptions): string {
    const dateObj = this.parseDate(date)
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: this.timeZone,
      ...options
    }

    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj)
    } catch (error) {
      console.error('Error formatting date and time:', error)
      return dateObj.toLocaleString()
    }
  }

  /**
   * Format relative time (e.g., "2 hours ago", "in 3 days")
   */
  formatRelative(date: Date | string | number, options?: { numeric?: 'always' | 'auto' }): string {
    const dateObj = this.parseDate(date)
    const now = new Date()
    
    try {
      const rtf = new Intl.RelativeTimeFormat(this.locale, {
        numeric: options?.numeric || 'auto'
      })

      const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1000)
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      const diffInHours = Math.floor(diffInMinutes / 60)
      const diffInDays = Math.floor(diffInHours / 24)
      const diffInWeeks = Math.floor(diffInDays / 7)
      const diffInMonths = Math.floor(diffInDays / 30)
      const diffInYears = Math.floor(diffInDays / 365)

      if (Math.abs(diffInYears) >= 1) {
        return rtf.format(diffInYears, 'year')
      } else if (Math.abs(diffInMonths) >= 1) {
        return rtf.format(diffInMonths, 'month')
      } else if (Math.abs(diffInWeeks) >= 1) {
        return rtf.format(diffInWeeks, 'week')
      } else if (Math.abs(diffInDays) >= 1) {
        return rtf.format(diffInDays, 'day')
      } else if (Math.abs(diffInHours) >= 1) {
        return rtf.format(diffInHours, 'hour')
      } else if (Math.abs(diffInMinutes) >= 1) {
        return rtf.format(diffInMinutes, 'minute')
      } else {
        return rtf.format(diffInSeconds, 'second')
      }
    } catch (error) {
      console.error('Error formatting relative time:', error)
      return this.format(dateObj)
    }
  }

  /**
   * Format date range
   */
  formatRange(startDate: Date | string | number, endDate: Date | string | number, options?: DateOptions): string {
    const start = this.parseDate(startDate)
    const end = this.parseDate(endDate)
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: this.timeZone,
      ...options
    }

    try {
      const formatter = new Intl.DateTimeFormat(this.locale, formatOptions)
      return `${formatter.format(start)} - ${formatter.format(end)}`
    } catch (error) {
      console.error('Error formatting date range:', error)
      return `${this.format(start)} - ${this.format(end)}`
    }
  }

  /**
   * Parse date from various formats
   */
  private parseDate(date: Date | string | number): Date {
    if (date instanceof Date) {
      return date
    }
    
    if (typeof date === 'number') {
      return new Date(date)
    }
    
    if (typeof date === 'string') {
      const parsed = new Date(date)
      if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid date string: ${date}`)
      }
      return parsed
    }
    
    throw new Error('Invalid date input')
  }

  /**
   * Get week start day for locale
   */
  getWeekStartDay(): number {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { weekday: 'long' })
      const weekStart = new Date(2024, 0, 1) // January 1, 2024 (Monday)
      const dayName = formatter.format(weekStart)
      
      // Map day names to numbers (0 = Sunday, 1 = Monday, etc.)
      const dayMap: Record<string, number> = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
      }
      
      return dayMap[dayName] || 1
    } catch (error) {
      return 1 // Default to Monday
    }
  }

  /**
   * Get month names
   */
  getMonthNames(format: 'long' | 'short' | 'narrow' = 'long'): string[] {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { month: format })
      return Array.from({ length: 12 }, (_, i) => 
        formatter.format(new Date(2024, i, 1))
      )
    } catch (error) {
      console.error('Error getting month names:', error)
      return []
    }
  }

  /**
   * Get weekday names
   */
  getWeekdayNames(format: 'long' | 'short' | 'narrow' = 'long'): string[] {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { weekday: format })
      return Array.from({ length: 7 }, (_, i) => 
        formatter.format(new Date(2024, 0, i + 1))
      )
    } catch (error) {
      console.error('Error getting weekday names:', error)
      return []
    }
  }

  /**
   * Get date format pattern
   */
  getDateFormatPattern(): string {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale)
      const parts = formatter.formatToParts(new Date(2024, 11, 25))
      
      return parts.map(part => {
        switch (part.type) {
          case 'year': return 'YYYY'
          case 'month': return 'MM'
          case 'day': return 'DD'
          case 'hour': return 'HH'
          case 'minute': return 'mm'
          case 'second': return 'ss'
          default: return part.value
        }
      }).join('')
    } catch (error) {
      console.error('Error getting date format pattern:', error)
      return 'MM/DD/YYYY'
    }
  }

  /**
   * Get time format pattern
   */
  getTimeFormatPattern(): string {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      })
      const parts = formatter.formatToParts(new Date(2024, 0, 1, 14, 30))
      
      return parts.map(part => {
        switch (part.type) {
          case 'hour': return 'HH'
          case 'minute': return 'mm'
          case 'second': return 'ss'
          default: return part.value
        }
      }).join('')
    } catch (error) {
      console.error('Error getting time format pattern:', error)
      return 'HH:mm'
    }
  }

  /**
   * Check if date is today
   */
  isToday(date: Date | string | number): boolean {
    const dateObj = this.parseDate(date)
    const today = new Date()
    
    return dateObj.toDateString() === today.toDateString()
  }

  /**
   * Check if date is yesterday
   */
  isYesterday(date: Date | string | number): boolean {
    const dateObj = this.parseDate(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    return dateObj.toDateString() === yesterday.toDateString()
  }

  /**
   * Check if date is tomorrow
   */
  isTomorrow(date: Date | string | number): boolean {
    const dateObj = this.parseDate(date)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return dateObj.toDateString() === tomorrow.toDateString()
  }

  /**
   * Update locale and timezone
   */
  updateLocale(locale: SupportedLocale, timeZone?: string): void {
    this.locale = locale
    this.timeZone = timeZone || this.getDefaultTimeZone()
  }

  /**
   * Get current locale
   */
  getCurrentLocale(): string {
    return this.locale
  }

  /**
   * Get current timezone
   */
  getCurrentTimeZone(): string {
    return this.timeZone
  }
}
