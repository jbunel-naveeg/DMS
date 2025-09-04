/**
 * Data Retention Manager
 * Handles data retention policies and automatic data cleanup
 */

import { createClient } from '@supabase/supabase-js'
import { DataRetentionPolicy, AuditLog } from './types'

export class DataRetentionManager {
  private supabase: any

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  /**
   * Create a new data retention policy
   */
  async createRetentionPolicy(policy: Omit<DataRetentionPolicy, 'id' | 'created_at' | 'updated_at'>): Promise<DataRetentionPolicy | null> {
    try {
      const policyData = {
        ...policy,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('data_retention_policies')
        .insert(policyData)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error creating retention policy:', error)
      return null
    }
  }

  /**
   * Get all data retention policies
   */
  async getRetentionPolicies(): Promise<DataRetentionPolicy[]> {
    try {
      const { data, error } = await this.supabase
        .from('data_retention_policies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching retention policies:', error)
      return []
    }
  }

  /**
   * Update data retention policy
   */
  async updateRetentionPolicy(
    policyId: string,
    updates: Partial<DataRetentionPolicy>
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('data_retention_policies')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', policyId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error updating retention policy:', error)
      return false
    }
  }

  /**
   * Delete data retention policy
   */
  async deleteRetentionPolicy(policyId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('data_retention_policies')
        .delete()
        .eq('id', policyId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting retention policy:', error)
      return false
    }
  }

  /**
   * Process data retention cleanup
   */
  async processDataRetentionCleanup(): Promise<{
    processed_policies: number
    deleted_records: number
    errors: string[]
  }> {
    const results = {
      processed_policies: 0,
      deleted_records: 0,
      errors: [] as string[]
    }

    try {
      const policies = await this.getRetentionPolicies()
      
      for (const policy of policies) {
        if (!policy.auto_delete) continue

        try {
          const deletedCount = await this.applyRetentionPolicy(policy)
          results.deleted_records += deletedCount
          results.processed_policies++
        } catch (error) {
          results.errors.push(`Policy ${policy.id}: ${error.message}`)
        }
      }

      // Log cleanup activity
      await this.logCleanupActivity(results)

    } catch (error) {
      results.errors.push(`General cleanup error: ${error.message}`)
    }

    return results
  }

  /**
   * Apply a specific retention policy
   */
  private async applyRetentionPolicy(policy: DataRetentionPolicy): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.retention_period_days)

    let deletedCount = 0

    switch (policy.data_type) {
      case 'audit_logs':
        deletedCount = await this.cleanupAuditLogs(cutoffDate)
        break
      case 'consent_preferences':
        deletedCount = await this.cleanupConsentPreferences(cutoffDate)
        break
      case 'cookie_consent':
        deletedCount = await this.cleanupCookieConsent(cutoffDate)
        break
      case 'data_exports':
        deletedCount = await this.cleanupDataExports(cutoffDate)
        break
      case 'user_sessions':
        deletedCount = await this.cleanupUserSessions(cutoffDate)
        break
      case 'notification_logs':
        deletedCount = await this.cleanupNotificationLogs(cutoffDate)
        break
      default:
        console.warn(`Unknown data type for retention policy: ${policy.data_type}`)
    }

    return deletedCount
  }

  /**
   * Cleanup audit logs older than cutoff date
   */
  private async cleanupAuditLogs(cutoffDate: Date): Promise<number> {
    try {
      const { count } = await this.supabase
        .from('audit_logs')
        .delete()
        .lt('timestamp', cutoffDate.toISOString())
        .select('*', { count: 'exact', head: true })

      return count || 0
    } catch (error) {
      console.error('Error cleaning up audit logs:', error)
      return 0
    }
  }

  /**
   * Cleanup old consent preferences (keep only latest per user)
   */
  private async cleanupConsentPreferences(cutoffDate: Date): Promise<number> {
    try {
      // Get all users with old consent preferences
      const { data: oldConsents } = await this.supabase
        .from('consent_preferences')
        .select('user_id, id, created_at')
        .lt('created_at', cutoffDate.toISOString())
        .order('user_id, created_at', { ascending: false })

      if (!oldConsents) return 0

      // Group by user and keep only the latest
      const userLatestConsent = new Map()
      oldConsents.forEach(consent => {
        if (!userLatestConsent.has(consent.user_id) || 
            new Date(consent.created_at) > new Date(userLatestConsent.get(consent.user_id).created_at)) {
          userLatestConsent.set(consent.user_id, consent)
        }
      })

      // Delete old consents (excluding the latest for each user)
      const idsToDelete = oldConsents
        .filter(consent => consent.id !== userLatestConsent.get(consent.user_id)?.id)
        .map(consent => consent.id)

      if (idsToDelete.length > 0) {
        const { count } = await this.supabase
          .from('consent_preferences')
          .delete()
          .in('id', idsToDelete)
          .select('*', { count: 'exact', head: true })

        return count || 0
      }

      return 0
    } catch (error) {
      console.error('Error cleaning up consent preferences:', error)
      return 0
    }
  }

  /**
   * Cleanup old cookie consent records
   */
  private async cleanupCookieConsent(cutoffDate: Date): Promise<number> {
    try {
      const { count } = await this.supabase
        .from('cookie_consent')
        .delete()
        .lt('consent_given_at', cutoffDate.toISOString())
        .select('*', { count: 'exact', head: true })

      return count || 0
    } catch (error) {
      console.error('Error cleaning up cookie consent:', error)
      return 0
    }
  }

  /**
   * Cleanup expired data exports
   */
  private async cleanupDataExports(cutoffDate: Date): Promise<number> {
    try {
      const { count } = await this.supabase
        .from('data_exports')
        .delete()
        .lt('expires_at', cutoffDate.toISOString())
        .select('*', { count: 'exact', head: true })

      return count || 0
    } catch (error) {
      console.error('Error cleaning up data exports:', error)
      return 0
    }
  }

  /**
   * Cleanup old user sessions
   */
  private async cleanupUserSessions(cutoffDate: Date): Promise<number> {
    try {
      const { count } = await this.supabase
        .from('user_sessions')
        .delete()
        .lt('last_activity', cutoffDate.toISOString())
        .select('*', { count: 'exact', head: true })

      return count || 0
    } catch (error) {
      console.error('Error cleaning up user sessions:', error)
      return 0
    }
  }

  /**
   * Cleanup old notification logs
   */
  private async cleanupNotificationLogs(cutoffDate: Date): Promise<number> {
    try {
      const { count } = await this.supabase
        .from('notification_logs')
        .delete()
        .lt('created_at', cutoffDate.toISOString())
        .select('*', { count: 'exact', head: true })

      return count || 0
    } catch (error) {
      console.error('Error cleaning up notification logs:', error)
      return 0
    }
  }

  /**
   * Log cleanup activity for audit purposes
   */
  private async logCleanupActivity(results: {
    processed_policies: number
    deleted_records: number
    errors: string[]
  }): Promise<void> {
    try {
      await this.supabase
        .from('audit_logs')
        .insert({
          action: 'data_retention_cleanup',
          resource_type: 'system',
          resource_id: 'retention_cleanup',
          new_values: results,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error logging cleanup activity:', error)
    }
  }

  /**
   * Get data retention statistics
   */
  async getRetentionStatistics(): Promise<{
    total_policies: number
    active_policies: number
    auto_delete_enabled: number
    data_types_covered: string[]
    last_cleanup: string | null
  }> {
    try {
      const policies = await this.getRetentionPolicies()
      
      const stats = {
        total_policies: policies.length,
        active_policies: policies.filter(p => p.auto_delete).length,
        auto_delete_enabled: policies.filter(p => p.auto_delete).length,
        data_types_covered: [...new Set(policies.map(p => p.data_type))],
        last_cleanup: null as string | null
      }

      // Get last cleanup activity
      const { data: lastCleanup } = await this.supabase
        .from('audit_logs')
        .select('timestamp')
        .eq('action', 'data_retention_cleanup')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single()

      if (lastCleanup) {
        stats.last_cleanup = lastCleanup.timestamp
      }

      return stats
    } catch (error) {
      console.error('Error getting retention statistics:', error)
      return {
        total_policies: 0,
        active_policies: 0,
        auto_delete_enabled: 0,
        data_types_covered: [],
        last_cleanup: null
      }
    }
  }

  /**
   * Create default retention policies
   */
  async createDefaultPolicies(): Promise<void> {
    const defaultPolicies = [
      {
        data_type: 'audit_logs',
        retention_period_days: 2555, // 7 years
        auto_delete: true,
        legal_basis: 'legal_obligation',
        description: 'Audit logs for compliance and security monitoring'
      },
      {
        data_type: 'consent_preferences',
        retention_period_days: 365, // 1 year
        auto_delete: false, // Keep for consent history
        legal_basis: 'consent',
        description: 'User consent preferences and history'
      },
      {
        data_type: 'cookie_consent',
        retention_period_days: 90, // 3 months
        auto_delete: true,
        legal_basis: 'consent',
        description: 'Cookie consent session data'
      },
      {
        data_type: 'data_exports',
        retention_period_days: 30, // 30 days
        auto_delete: true,
        legal_basis: 'consent',
        description: 'Data export files and metadata'
      },
      {
        data_type: 'user_sessions',
        retention_period_days: 30, // 30 days
        auto_delete: true,
        legal_basis: 'legitimate_interests',
        description: 'User session data for security'
      },
      {
        data_type: 'notification_logs',
        retention_period_days: 90, // 3 months
        auto_delete: true,
        legal_basis: 'legitimate_interests',
        description: 'Notification delivery logs'
      }
    ]

    for (const policy of defaultPolicies) {
      await this.createRetentionPolicy(policy)
    }
  }

  /**
   * Check if data should be retained based on legal basis
   */
  async shouldRetainData(
    dataType: string,
    legalBasis: string,
    ageInDays: number
  ): Promise<boolean> {
    try {
      const policies = await this.getRetentionPolicies()
      const policy = policies.find(p => p.data_type === dataType)

      if (!policy) {
        // No specific policy, use default retention
        return ageInDays <= 365 // Default 1 year
      }

      // Check if data exceeds retention period
      if (ageInDays > policy.retention_period_days) {
        return false
      }

      // Check for legal exceptions
      if (legalBasis === 'legal_obligation') {
        // Some legal obligations may require longer retention
        return true
      }

      return true
    } catch (error) {
      console.error('Error checking data retention:', error)
      return true // Conservative approach - retain if uncertain
    }
  }
}
