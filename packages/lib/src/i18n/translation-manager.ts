/**
 * Translation Manager
 * Manages translation loading, caching, and synchronization
 */

import { createClient } from '@supabase/supabase-js'
import { Translation, TranslationNamespace as TNamespace, SupportedLocale } from './types'

export class TranslationManager {
  private supabase: any
  private cache: Map<string, Translation> = new Map()
  private lastSync: Map<string, number> = new Map()

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key')
  }

  /**
   * Load translations from database
   */
  async loadTranslations(
    locale: SupportedLocale, 
    namespace: TNamespace
  ): Promise<Map<string, Translation>> {
    try {
      const { data, error } = await this.supabase
        .from('translations')
        .select('*')
        .eq('locale', locale)
        .eq('namespace', namespace)

      if (error) {
        throw error
      }

      const translations = new Map<string, Translation>()
      
      if (data) {
        data.forEach((translation: Translation) => {
          translations.set(translation.key, translation)
          this.cache.set(`${locale}:${namespace}:${translation.key}`, translation)
        })
      }

      this.lastSync.set(`${locale}:${namespace}`, Date.now())
      return translations
    } catch (error) {
      console.error('Error loading translations:', error)
      return new Map()
    }
  }

  /**
   * Save translation to database
   */
  async saveTranslation(translation: Omit<Translation, 'created_at' | 'updated_at'>): Promise<boolean> {
    try {
      const translationData = {
        ...translation,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { error } = await this.supabase
        .from('translations')
        .upsert(translationData)

      if (error) {
        throw error
      }

      // Update cache
      this.cache.set(`${translation.locale}:${translation.namespace}:${translation.key}`, translationData as Translation)
      return true
    } catch (error) {
      console.error('Error saving translation:', error)
      return false
    }
  }

  /**
   * Update translation
   */
  async updateTranslation(
    key: string,
    locale: SupportedLocale,
    namespace: TNamespace,
    updates: Partial<Translation>
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('translations')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('key', key)
        .eq('locale', locale)
        .eq('namespace', namespace)

      if (error) {
        throw error
      }

      // Update cache
      const cacheKey = `${locale}:${namespace}:${key}`
      const cached = this.cache.get(cacheKey)
      if (cached) {
        this.cache.set(cacheKey, { ...cached, ...updates })
      }

      return true
    } catch (error) {
      console.error('Error updating translation:', error)
      return false
    }
  }

  /**
   * Delete translation
   */
  async deleteTranslation(
    key: string,
    locale: SupportedLocale,
    namespace: TNamespace
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('translations')
        .delete()
        .eq('key', key)
        .eq('locale', locale)
        .eq('namespace', namespace)

      if (error) {
        throw error
      }

      // Remove from cache
      this.cache.delete(`${locale}:${namespace}:${key}`)
      return true
    } catch (error) {
      console.error('Error deleting translation:', error)
      return false
    }
  }

  /**
   * Get translation from cache
   */
  getCachedTranslation(
    key: string,
    locale: SupportedLocale,
    namespace: TNamespace
  ): Translation | undefined {
    return this.cache.get(`${locale}:${namespace}:${key}`)
  }

  /**
   * Check if translations need sync
   */
  needsSync(locale: SupportedLocale, namespace: TNamespace): boolean {
    const lastSyncTime = this.lastSync.get(`${locale}:${namespace}`)
    if (!lastSyncTime) return true

    // Sync if older than 1 hour
    return Date.now() - lastSyncTime > 3600000
  }

  /**
   * Sync translations with database
   */
  async syncTranslations(locale: SupportedLocale, namespace: TNamespace): Promise<void> {
    if (!this.needsSync(locale, namespace)) return

    await this.loadTranslations(locale, namespace)
  }

  /**
   * Get all translations for a locale
   */
  async getAllTranslations(locale: SupportedLocale): Promise<Map<string, Translation>> {
    try {
      const { data, error } = await this.supabase
        .from('translations')
        .select('*')
        .eq('locale', locale)

      if (error) {
        throw error
      }

      const translations = new Map<string, Translation>()
      
      if (data) {
        data.forEach((translation: Translation) => {
          translations.set(`${translation.namespace}:${translation.key}`, translation)
        })
      }

      return translations
    } catch (error) {
      console.error('Error loading all translations:', error)
      return new Map()
    }
  }

  /**
   * Get missing translations
   */
  async getMissingTranslations(
    sourceLocale: SupportedLocale,
    targetLocale: SupportedLocale,
    namespace: TNamespace
  ): Promise<string[]> {
    try {
      const [sourceTranslations, targetTranslations] = await Promise.all([
        this.loadTranslations(sourceLocale, namespace),
        this.loadTranslations(targetLocale, namespace)
      ])

      const missing: string[] = []
      
      sourceTranslations.forEach((_, key) => {
        if (!targetTranslations.has(key)) {
          missing.push(key)
        }
      })

      return missing
    } catch (error) {
      console.error('Error getting missing translations:', error)
      return []
    }
  }

  /**
   * Bulk import translations
   */
  async bulkImportTranslations(translations: Translation[]): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('translations')
        .upsert(translations)

      if (error) {
        throw error
      }

      // Update cache
      translations.forEach(translation => {
        this.cache.set(
          `${translation.locale}:${translation.namespace}:${translation.key}`,
          translation
        )
      })

      return true
    } catch (error) {
      console.error('Error bulk importing translations:', error)
      return false
    }
  }

  /**
   * Export translations
   */
  async exportTranslations(
    locale: SupportedLocale,
    namespace?: TNamespace
  ): Promise<Record<string, any>> {
    try {
      let query = this.supabase
        .from('translations')
        .select('*')
        .eq('locale', locale)

      if (namespace) {
        query = query.eq('namespace', namespace)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      const exportData: Record<string, any> = {}
      
      if (data) {
        data.forEach((translation: Translation) => {
          if (!exportData[translation.namespace]) {
            exportData[translation.namespace] = {}
          }
          exportData[translation.namespace][translation.key] = translation.value
        })
      }

      return exportData
    } catch (error) {
      console.error('Error exporting translations:', error)
      return {}
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear()
    this.lastSync.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    totalTranslations: number
    namespaces: string[]
    locales: string[]
    lastSyncTimes: Record<string, number>
  } {
    const namespaces = new Set<string>()
    const locales = new Set<string>()
    
    this.cache.forEach((_, key) => {
      const [locale, namespace] = key.split(':')
      locales.add(locale)
      namespaces.add(namespace)
    })

    return {
      totalTranslations: this.cache.size,
      namespaces: Array.from(namespaces),
      locales: Array.from(locales),
      lastSyncTimes: Object.fromEntries(this.lastSync)
    }
  }
}
