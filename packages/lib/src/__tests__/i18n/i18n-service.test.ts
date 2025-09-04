/**
 * I18n Service Tests
 */

import { I18nService } from '../i18n/i18n-service'

describe('I18nService', () => {
  let i18nService: I18nService

  beforeEach(() => {
    i18nService = new I18nService({
      defaultLocale: 'en',
      supportedLocales: ['en', 'es', 'fr'],
      fallbackLocale: 'en',
      namespaces: ['common', 'auth'],
      loadPath: '/translations',
      savePath: '/translations',
      detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage'],
        cookieName: 'locale',
        cookieOptions: {
          path: '/',
          sameSite: 'lax',
          secure: false,
          maxAge: 31536000
        }
      },
      interpolation: {
        escapeValue: false,
        format: (value: any) => value
      }
    })
  })

  describe('getCurrentLocale', () => {
    it('returns default locale', () => {
      expect(i18nService.getCurrentLocale()).toBe('en')
    })
  })

  describe('setLocale', () => {
    it('sets locale if supported', () => {
      i18nService.setLocale('es')
      expect(i18nService.getCurrentLocale()).toBe('es')
    })

    it('does not set locale if not supported', () => {
      i18nService.setLocale('invalid')
      expect(i18nService.getCurrentLocale()).toBe('en')
    })
  })

  describe('getSupportedLocales', () => {
    it('returns supported locales', () => {
      const locales = i18nService.getSupportedLocales()
      expect(locales).toHaveLength(12) // 12 languages supported
      expect(locales[0].code).toBe('en')
    })
  })

  describe('isLocaleSupported', () => {
    it('returns true for supported locale', () => {
      expect(i18nService.isLocaleSupported('en')).toBe(true)
    })

    it('returns false for unsupported locale', () => {
      expect(i18nService.isLocaleSupported('invalid')).toBe(false)
    })
  })

  describe('t', () => {
    it('returns key if translation not found', () => {
      expect(i18nService.t('nonexistent.key')).toBe('nonexistent.key')
    })

    it('returns default value if provided', () => {
      expect(i18nService.t('nonexistent.key', { defaultValue: 'Default' })).toBe('Default')
    })

    it('interpolates variables', () => {
      // Mock translation
      i18nService['translations'].set('en:common', new Map([
        ['welcome', 'Welcome {{name}}!']
      ]))
      
      expect(i18nService.t('welcome', { variables: { name: 'John' } })).toBe('Welcome John!')
    })
  })

  describe('detectLocale', () => {
    it('detects locale from navigator', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'es-ES',
        configurable: true
      })
      
      expect(i18nService.detectLocale()).toBe('es')
    })

    it('returns default locale if detection fails', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'invalid',
        configurable: true
      })
      
      expect(i18nService.detectLocale()).toBe('en')
    })
  })

  describe('isRTL', () => {
    it('returns false for LTR languages', () => {
      expect(i18nService.isRTL()).toBe(false)
    })

    it('returns true for RTL languages', () => {
      i18nService.setLocale('ar')
      expect(i18nService.isRTL()).toBe(true)
    })
  })

  describe('getCurrency', () => {
    it('returns currency for current locale', () => {
      expect(i18nService.getCurrency()).toBe('USD')
    })

    it('returns currency for specific locale', () => {
      i18nService.setLocale('es')
      expect(i18nService.getCurrency()).toBe('EUR')
    })
  })

  describe('getDateFormat', () => {
    it('returns date format for current locale', () => {
      expect(i18nService.getDateFormat()).toBe('MM/DD/YYYY')
    })

    it('returns date format for specific locale', () => {
      i18nService.setLocale('es')
      expect(i18nService.getDateFormat()).toBe('DD/MM/YYYY')
    })
  })

  describe('getTimeFormat', () => {
    it('returns time format for current locale', () => {
      expect(i18nService.getTimeFormat()).toBe('HH:mm')
    })
  })

  describe('getNumberFormat', () => {
    it('returns number format for current locale', () => {
      expect(i18nService.getNumberFormat()).toEqual({
        decimal: '.',
        thousands: ','
      })
    })

    it('returns number format for specific locale', () => {
      i18nService.setLocale('es')
      expect(i18nService.getNumberFormat()).toEqual({
        decimal: ',',
        thousands: '.'
      })
    })
  })
})
