/**
 * Date Formatter Tests
 */

import { DateFormatter } from '../i18n/date-formatter'

describe('DateFormatter', () => {
  let formatter: DateFormatter

  beforeEach(() => {
    formatter = new DateFormatter('en', 'UTC')
  })

  describe('format', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatter.format(date)).toBe('January 15, 2024')
    })

    it('formats date with custom options', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatter.format(date, { year: '2-digit', month: 'short' })).toBe('Jan 24')
    })
  })

  describe('formatTime', () => {
    it('formats time correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatter.formatTime(date)).toBe('10:30 AM')
    })

    it('formats time with custom options', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatter.formatTime(date, { hour12: false })).toBe('10:30')
    })
  })

  describe('formatDateTime', () => {
    it('formats date and time correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatter.formatDateTime(date)).toBe('Jan 15, 2024, 10:30 AM')
    })
  })

  describe('formatRelative', () => {
    it('formats relative time', () => {
      const date = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      expect(formatter.formatRelative(date)).toBe('2 hours ago')
    })

    it('formats future relative time', () => {
      const date = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
      expect(formatter.formatRelative(date)).toBe('in 2 hours')
    })
  })

  describe('formatRange', () => {
    it('formats date range', () => {
      const start = new Date('2024-01-15T10:30:00Z')
      const end = new Date('2024-01-16T10:30:00Z')
      expect(formatter.formatRange(start, end)).toBe('Jan 15, 2024 - Jan 16, 2024')
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(formatter.isToday(today)).toBe(true)
    })

    it('returns false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(formatter.isToday(yesterday)).toBe(false)
    })
  })

  describe('isYesterday', () => {
    it('returns true for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(formatter.isYesterday(yesterday)).toBe(true)
    })

    it('returns false for today', () => {
      const today = new Date()
      expect(formatter.isYesterday(today)).toBe(false)
    })
  })

  describe('isTomorrow', () => {
    it('returns true for tomorrow', () => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
      expect(formatter.isTomorrow(tomorrow)).toBe(true)
    })

    it('returns false for today', () => {
      const today = new Date()
      expect(formatter.isTomorrow(today)).toBe(false)
    })
  })

  describe('getMonthNames', () => {
    it('returns month names', () => {
      const months = formatter.getMonthNames()
      expect(months).toHaveLength(12)
      expect(months[0]).toBe('January')
    })

    it('returns short month names', () => {
      const months = formatter.getMonthNames('short')
      expect(months[0]).toBe('Jan')
    })
  })

  describe('getWeekdayNames', () => {
    it('returns weekday names', () => {
      const weekdays = formatter.getWeekdayNames()
      expect(weekdays).toHaveLength(7)
      expect(weekdays[0]).toBe('Monday')
    })

    it('returns short weekday names', () => {
      const weekdays = formatter.getWeekdayNames('short')
      expect(weekdays[0]).toBe('Mon')
    })
  })

  describe('updateLocale', () => {
    it('updates locale and timezone', () => {
      formatter.updateLocale('es', 'Europe/Madrid')
      expect(formatter.getCurrentLocale()).toBe('es')
      expect(formatter.getCurrentTimeZone()).toBe('Europe/Madrid')
    })
  })
})
