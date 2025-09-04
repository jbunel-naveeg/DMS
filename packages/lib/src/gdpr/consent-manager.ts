/**
 * Consent Manager
 * Handles user consent collection, storage, and management
 */

import { createClient } from '@supabase/supabase-js'
import { ConsentPreferences, ConsentType, CookieConsent, ConsentBannerConfig } from './types'

export class ConsentManager {
  private supabase: any
  private config: ConsentBannerConfig

  constructor(supabaseUrl: string, supabaseKey: string, config?: Partial<ConsentBannerConfig>) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
    this.config = {
      enabled: true,
      theme: 'auto',
      position: 'bottom',
      show_essential_only: false,
      allow_reject_all: true,
      allow_accept_all: true,
      show_details: true,
      languages: ['en'],
      ...config
    }
  }

  /**
   * Get user's current consent preferences
   */
  async getConsentPreferences(userId: string): Promise<ConsentPreferences | null> {
    try {
      const { data, error } = await this.supabase
        .from('consent_preferences')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching consent preferences:', error)
      return null
    }
  }

  /**
   * Save user's consent preferences
   */
  async saveConsentPreferences(
    userId: string,
    preferences: Partial<ConsentPreferences>,
    metadata?: { ip_address?: string; user_agent?: string }
  ): Promise<boolean> {
    try {
      const consentData = {
        user_id: userId,
        essential: preferences.essential ?? true, // Essential cookies are always true
        analytics: preferences.analytics ?? false,
        marketing: preferences.marketing ?? false,
        personalization: preferences.personalization ?? false,
        third_party: preferences.third_party ?? false,
        ip_address: metadata?.ip_address,
        user_agent: metadata?.user_agent,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { error } = await this.supabase
        .from('consent_preferences')
        .upsert(consentData)

      if (error) {
        throw error
      }

      // Also save cookie consent for session tracking
      await this.saveCookieConsent(userId, preferences, metadata)

      return true
    } catch (error) {
      console.error('Error saving consent preferences:', error)
      return false
    }
  }

  /**
   * Save cookie consent for session tracking
   */
  private async saveCookieConsent(
    userId: string,
    preferences: Partial<ConsentPreferences>,
    metadata?: { ip_address?: string; user_agent?: string }
  ): Promise<void> {
    try {
      const sessionId = this.generateSessionId()
      
      const cookieConsent = {
        user_id: userId,
        session_id: sessionId,
        essential: preferences.essential ?? true,
        analytics: preferences.analytics ?? false,
        marketing: preferences.marketing ?? false,
        personalization: preferences.personalization ?? false,
        third_party: preferences.third_party ?? false,
        consent_given_at: new Date().toISOString(),
        ip_address: metadata?.ip_address,
        user_agent: metadata?.user_agent
      }

      await this.supabase
        .from('cookie_consent')
        .insert(cookieConsent)
    } catch (error) {
      console.error('Error saving cookie consent:', error)
    }
  }

  /**
   * Check if user has given specific consent
   */
  async hasConsent(userId: string, consentType: ConsentType): Promise<boolean> {
    try {
      const preferences = await this.getConsentPreferences(userId)
      if (!preferences) return false

      switch (consentType) {
        case 'essential':
          return preferences.essential
        case 'analytics':
          return preferences.analytics
        case 'marketing':
          return preferences.marketing
        case 'personalization':
          return preferences.personalization
        case 'third_party':
          return preferences.third_party
        default:
          return false
      }
    } catch (error) {
      console.error('Error checking consent:', error)
      return false
    }
  }

  /**
   * Withdraw user consent
   */
  async withdrawConsent(userId: string, consentType: ConsentType): Promise<boolean> {
    try {
      const preferences = await this.getConsentPreferences(userId)
      if (!preferences) return false

      const updatedPreferences = {
        ...preferences,
        [consentType]: false,
        updated_at: new Date().toISOString()
      }

      return await this.saveConsentPreferences(userId, updatedPreferences)
    } catch (error) {
      console.error('Error withdrawing consent:', error)
      return false
    }
  }

  /**
   * Get consent banner configuration
   */
  getBannerConfig(): ConsentBannerConfig {
    return this.config
  }

  /**
   * Update consent banner configuration
   */
  updateBannerConfig(config: Partial<ConsentBannerConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Generate consent banner HTML
   */
  generateConsentBanner(language: string = 'en'): string {
    if (!this.config.enabled) return ''

    const texts = this.getBannerTexts(language)
    
    return `
      <div id="consent-banner" class="consent-banner consent-banner-${this.config.position} consent-banner-${this.config.theme}" style="display: none;">
        <div class="consent-banner-content">
          <div class="consent-banner-header">
            <h3>${texts.title}</h3>
            <p>${texts.description}</p>
          </div>
          
          <div class="consent-banner-options">
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-essential" checked disabled>
                ${texts.essential}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-analytics">
                ${texts.analytics}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-marketing">
                ${texts.marketing}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-personalization">
                ${texts.personalization}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-third-party">
                ${texts.third_party}
              </label>
            </div>
          </div>
          
          <div class="consent-banner-actions">
            ${this.config.allow_reject_all ? `<button id="consent-reject-all" class="consent-btn consent-btn-secondary">${texts.reject_all}</button>` : ''}
            ${this.config.allow_accept_all ? `<button id="consent-accept-all" class="consent-btn consent-btn-primary">${texts.accept_all}</button>` : ''}
            <button id="consent-save-preferences" class="consent-btn consent-btn-primary">${texts.save_preferences}</button>
          </div>
        </div>
      </div>
    `
  }

  /**
   * Get banner texts for specific language
   */
  private getBannerTexts(language: string) {
    const defaultTexts = {
      title: 'Cookie Consent',
      description: 'We use cookies to enhance your experience and analyze our traffic. Please choose your preferences.',
      accept_all: 'Accept All',
      reject_all: 'Reject All',
      save_preferences: 'Save Preferences',
      essential: 'Essential Cookies',
      analytics: 'Analytics Cookies',
      marketing: 'Marketing Cookies',
      personalization: 'Personalization Cookies',
      third_party: 'Third-Party Cookies'
    }

    if (this.config.custom_text) {
      return { ...defaultTexts, ...this.config.custom_text }
    }

    return defaultTexts
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  /**
   * Get consent statistics
   */
  async getConsentStatistics(): Promise<{
    total_users: number
    consent_rates: Record<ConsentType, number>
    recent_consents: number
  }> {
    try {
      // Get total users
      const { count: totalUsers } = await this.supabase
        .from('consent_preferences')
        .select('*', { count: 'exact', head: true })

      // Get consent rates
      const { data: consentData } = await this.supabase
        .from('consent_preferences')
        .select('essential, analytics, marketing, personalization, third_party')

      const consentRates = {
        essential: 0,
        analytics: 0,
        marketing: 0,
        personalization: 0,
        third_party: 0
      }

      if (consentData && consentData.length > 0) {
        const total = consentData.length
        consentRates.essential = (consentData.filter(c => c.essential).length / total) * 100
        consentRates.analytics = (consentData.filter(c => c.analytics).length / total) * 100
        consentRates.marketing = (consentData.filter(c => c.marketing).length / total) * 100
        consentRates.personalization = (consentData.filter(c => c.personalization).length / total) * 100
        consentRates.third_party = (consentData.filter(c => c.third_party).length / total) * 100
      }

      // Get recent consents (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { count: recentConsents } = await this.supabase
        .from('consent_preferences')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString())

      return {
        total_users: totalUsers || 0,
        consent_rates: consentRates,
        recent_consents: recentConsents || 0
      }
    } catch (error) {
      console.error('Error getting consent statistics:', error)
      return {
        total_users: 0,
        consent_rates: {
          essential: 0,
          analytics: 0,
          marketing: 0,
          personalization: 0,
          third_party: 0
        },
        recent_consents: 0
      }
    }
  }
}
