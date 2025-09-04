/**
 * Cookie Manager
 * Handles cookie consent and management for GDPR compliance
 */

import { CookieConsent, ConsentType } from './types'

export class CookieManager {
  private consent: CookieConsent | null = null
  private onConsentChange?: (consent: CookieConsent) => void

  constructor(onConsentChange?: (consent: CookieConsent) => void) {
    this.onConsentChange = onConsentChange
    this.loadConsentFromStorage()
  }

  /**
   * Load consent from localStorage
   */
  private loadConsentFromStorage(): void {
    try {
      const stored = localStorage.getItem('naveeg_cookie_consent')
      if (stored) {
        this.consent = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading cookie consent from storage:', error)
    }
  }

  /**
   * Save consent to localStorage
   */
  private saveConsentToStorage(consent: CookieConsent): void {
    try {
      localStorage.setItem('naveeg_cookie_consent', JSON.stringify(consent))
    } catch (error) {
      console.error('Error saving cookie consent to storage:', error)
    }
  }

  /**
   * Set cookie consent
   */
  setConsent(consent: Partial<CookieConsent>): void {
    const sessionId = this.generateSessionId()
    
    this.consent = {
      id: this.consent?.id || this.generateId(),
      user_id: consent.user_id || '',
      session_id: sessionId,
      essential: consent.essential ?? true,
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      personalization: consent.personalization ?? false,
      third_party: consent.third_party ?? false,
      consent_given_at: new Date().toISOString(),
      ip_address: consent.ip_address,
      user_agent: consent.user_agent || navigator.userAgent
    }

    this.saveConsentToStorage(this.consent)
    
    if (this.onConsentChange) {
      this.onConsentChange(this.consent)
    }

    // Set actual cookies based on consent
    this.setCookiesBasedOnConsent()
  }

  /**
   * Get current consent
   */
  getConsent(): CookieConsent | null {
    return this.consent
  }

  /**
   * Check if specific consent type is given
   */
  hasConsent(consentType: ConsentType): boolean {
    if (!this.consent) return false

    switch (consentType) {
      case 'essential':
        return this.consent.essential
      case 'analytics':
        return this.consent.analytics
      case 'marketing':
        return this.consent.marketing
      case 'personalization':
        return this.consent.personalization
      case 'third_party':
        return this.consent.third_party
      default:
        return false
    }
  }

  /**
   * Withdraw consent for specific type
   */
  withdrawConsent(consentType: ConsentType): void {
    if (!this.consent) return

    const updatedConsent = { ...this.consent }
    
    switch (consentType) {
      case 'essential':
        // Essential cookies cannot be withdrawn
        return
      case 'analytics':
        updatedConsent.analytics = false
        break
      case 'marketing':
        updatedConsent.marketing = false
        break
      case 'personalization':
        updatedConsent.personalization = false
        break
      case 'third_party':
        updatedConsent.third_party = false
        break
    }

    this.setConsent(updatedConsent)
  }

  /**
   * Withdraw all non-essential consent
   */
  withdrawAllConsent(): void {
    if (!this.consent) return

    this.setConsent({
      ...this.consent,
      analytics: false,
      marketing: false,
      personalization: false,
      third_party: false
    })
  }

  /**
   * Set cookies based on consent
   */
  private setCookiesBasedOnConsent(): void {
    if (!this.consent) return

    // Essential cookies (always set)
    this.setCookie('naveeg_session', this.consent.session_id, 30, true)
    this.setCookie('naveeg_consent', JSON.stringify(this.consent), 365, true)

    // Analytics cookies
    if (this.consent.analytics) {
      this.setCookie('naveeg_analytics', 'enabled', 365, false)
      this.enableAnalytics()
    } else {
      this.deleteCookie('naveeg_analytics')
      this.disableAnalytics()
    }

    // Marketing cookies
    if (this.consent.marketing) {
      this.setCookie('naveeg_marketing', 'enabled', 365, false)
      this.enableMarketing()
    } else {
      this.deleteCookie('naveeg_marketing')
      this.disableMarketing()
    }

    // Personalization cookies
    if (this.consent.personalization) {
      this.setCookie('naveeg_personalization', 'enabled', 365, false)
      this.enablePersonalization()
    } else {
      this.deleteCookie('naveeg_personalization')
      this.disablePersonalization()
    }

    // Third-party cookies
    if (this.consent.third_party) {
      this.setCookie('naveeg_third_party', 'enabled', 365, false)
      this.enableThirdParty()
    } else {
      this.deleteCookie('naveeg_third_party')
      this.disableThirdParty()
    }
  }

  /**
   * Set a cookie
   */
  private setCookie(name: string, value: string, days: number, essential: boolean = false): void {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;${essential ? 'HttpOnly;' : ''}SameSite=Strict`
    
    document.cookie = cookieString
  }

  /**
   * Delete a cookie
   */
  private deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  }

  /**
   * Get a cookie value
   */
  getCookie(name: string): string | null {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    
    return null
  }

  /**
   * Enable analytics tracking
   */
  private enableAnalytics(): void {
    // Enable Google Analytics or other analytics tools
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  /**
   * Disable analytics tracking
   */
  private disableAnalytics(): void {
    // Disable Google Analytics or other analytics tools
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  /**
   * Enable marketing tracking
   */
  private enableMarketing(): void {
    // Enable marketing pixels and tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'grant')
    }
  }

  /**
   * Disable marketing tracking
   */
  private disableMarketing(): void {
    // Disable marketing pixels and tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'revoke')
    }
  }

  /**
   * Enable personalization
   */
  private enablePersonalization(): void {
    // Enable personalization features
    console.log('Personalization enabled')
  }

  /**
   * Disable personalization
   */
  private disablePersonalization(): void {
    // Disable personalization features
    console.log('Personalization disabled')
  }

  /**
   * Enable third-party services
   */
  private enableThirdParty(): void {
    // Enable third-party services
    console.log('Third-party services enabled')
  }

  /**
   * Disable third-party services
   */
  private disableThirdParty(): void {
    // Disable third-party services
    console.log('Third-party services disabled')
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return 'consent_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  /**
   * Clear all cookies
   */
  clearAllCookies(): void {
    const cookies = document.cookie.split(";")
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      this.deleteCookie(name.trim())
    }
  }

  /**
   * Get cookie consent banner HTML
   */
  generateConsentBanner(): string {
    return `
      <div id="cookie-consent-banner" class="cookie-consent-banner" style="display: none;">
        <div class="cookie-consent-content">
          <div class="cookie-consent-header">
            <h3>Cookie Consent</h3>
            <p>We use cookies to enhance your experience and analyze our traffic. Please choose your preferences.</p>
          </div>
          
          <div class="cookie-consent-options">
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-essential" checked disabled>
                Essential Cookies
                <small>Required for basic website functionality</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-analytics">
                Analytics Cookies
                <small>Help us understand how visitors interact with our website</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-marketing">
                Marketing Cookies
                <small>Used to track visitors across websites for advertising</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-personalization">
                Personalization Cookies
                <small>Remember your preferences and settings</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-third-party">
                Third-Party Cookies
                <small>Cookies from external services we use</small>
              </label>
            </div>
          </div>
          
          <div class="cookie-consent-actions">
            <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Reject All</button>
            <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accept All</button>
            <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
    `
  }

  /**
   * Initialize cookie consent banner
   */
  initializeBanner(): void {
    // Check if consent already exists
    if (this.consent) {
      return
    }

    // Show banner
    const banner = document.getElementById('cookie-consent-banner')
    if (banner) {
      banner.style.display = 'block'
    }

    // Add event listeners
    this.addBannerEventListeners()
  }

  /**
   * Add event listeners to consent banner
   */
  private addBannerEventListeners(): void {
    // Accept all button
    const acceptAllBtn = document.getElementById('cookie-accept-all')
    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => {
        this.setConsent({
          essential: true,
          analytics: true,
          marketing: true,
          personalization: true,
          third_party: true
        })
        this.hideBanner()
      })
    }

    // Reject all button
    const rejectAllBtn = document.getElementById('cookie-reject-all')
    if (rejectAllBtn) {
      rejectAllBtn.addEventListener('click', () => {
        this.setConsent({
          essential: true,
          analytics: false,
          marketing: false,
          personalization: false,
          third_party: false
        })
        this.hideBanner()
      })
    }

    // Save preferences button
    const saveBtn = document.getElementById('cookie-save-preferences')
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const essential = (document.getElementById('cookie-essential') as HTMLInputElement)?.checked || true
        const analytics = (document.getElementById('cookie-analytics') as HTMLInputElement)?.checked || false
        const marketing = (document.getElementById('cookie-marketing') as HTMLInputElement)?.checked || false
        const personalization = (document.getElementById('cookie-personalization') as HTMLInputElement)?.checked || false
        const thirdParty = (document.getElementById('cookie-third-party') as HTMLInputElement)?.checked || false

        this.setConsent({
          essential,
          analytics,
          marketing,
          personalization,
          third_party: thirdParty
        })
        this.hideBanner()
      })
    }
  }

  /**
   * Hide consent banner
   */
  private hideBanner(): void {
    const banner = document.getElementById('cookie-consent-banner')
    if (banner) {
      banner.style.display = 'none'
    }
  }
}
