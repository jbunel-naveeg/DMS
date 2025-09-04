/**
 * Currency Formatter Tests
 */

import { CurrencyFormatter } from '../i18n/currency-formatter'

describe('CurrencyFormatter', () => {
  let formatter: CurrencyFormatter

  beforeEach(() => {
    formatter = new CurrencyFormatter('en', 'USD')
  })

  describe('format', () => {
    it('formats currency correctly', () => {
      expect(formatter.format(99.99)).toBe('$99.99')
    })

    it('formats currency with custom options', () => {
      expect(formatter.format(99.99, { minimumFractionDigits: 0 })).toBe('$100')
    })

    it('formats currency with different currency', () => {
      expect(formatter.formatWithCurrency(99.99, 'EUR')).toBe('€99.99')
    })
  })

  describe('formatCompact', () => {
    it('formats compact currency', () => {
      expect(formatter.formatCompact(1200)).toBe('$1.2K')
    })

    it('formats compact currency for millions', () => {
      expect(formatter.formatCompact(1200000)).toBe('$1.2M')
    })
  })

  describe('parse', () => {
    it('parses currency string', () => {
      expect(formatter.parse('$99.99')).toBe(99.99)
    })

    it('parses currency string with commas', () => {
      expect(formatter.parse('$1,234.56')).toBe(1234.56)
    })
  })

  describe('getCurrencySymbol', () => {
    it('returns currency symbol', () => {
      expect(formatter.getCurrencySymbol()).toBe('$')
    })

    it('returns currency symbol for different currency', () => {
      expect(formatter.getCurrencySymbol('EUR')).toBe('€')
    })
  })

  describe('formatRange', () => {
    it('formats currency range', () => {
      expect(formatter.formatRange(100, 200)).toBe('$100.00 - $200.00')
    })
  })

  describe('isCurrencySupported', () => {
    it('returns true for supported currency', () => {
      expect(formatter.isCurrencySupported('USD')).toBe(true)
    })

    it('returns false for unsupported currency', () => {
      expect(formatter.isCurrencySupported('INVALID')).toBe(false)
    })
  })

  describe('updateLocale', () => {
    it('updates locale and currency', () => {
      formatter.updateLocale('es', 'EUR')
      expect(formatter.getCurrentLocale()).toBe('es')
      expect(formatter.getCurrentCurrency()).toBe('EUR')
    })
  })
})
