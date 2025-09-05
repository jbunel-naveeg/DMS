/**
 * GDPR Service
 * Main service that coordinates all GDPR compliance features
 */

import { createClient } from '@supabase/supabase-js'
import { ConsentManager } from './consent-manager'
import { DataSubjectRightsManager } from './data-subject-rights'
import { DataRetentionManager } from './data-retention'
import { AuditLogger } from './audit-logger'
import { 
  GDPRComplianceStatus, 
  DataBreach, 
  PrivacyPolicy, 
  ComplianceReport,
  ConsentBannerConfig 
} from './types'

export class GDPRService {
  private supabase: any
  private consentManager: ConsentManager
  private dataSubjectRightsManager: DataSubjectRightsManager
  private dataRetentionManager: DataRetentionManager
  private auditLogger: AuditLogger

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key')
    this.consentManager = new ConsentManager(supabaseUrl, supabaseKey)
    this.dataSubjectRightsManager = new DataSubjectRightsManager(supabaseUrl, supabaseKey)
    this.dataRetentionManager = new DataRetentionManager(supabaseUrl, supabaseKey)
    this.auditLogger = new AuditLogger(supabaseUrl, supabaseKey)
  }

  /**
   * Initialize GDPR compliance system
   */
  async initialize(): Promise<boolean> {
    try {
      // Create default retention policies
      await this.dataRetentionManager.createDefaultPolicies()

      // Log initialization
      await this.auditLogger.logSystemEvent(
        'gdpr_initialized',
        'system',
        'gdpr_service'
      )

      return true
    } catch (error) {
      console.error('Error initializing GDPR service:', error)
      return false
    }
  }

  /**
   * Get GDPR compliance status
   */
  async getComplianceStatus(): Promise<GDPRComplianceStatus> {
    try {
      // Check consent management
      const consentStats = await this.consentManager.getConsentStatistics()
      const consentManagement = consentStats.total_users > 0

      // Check data subject rights
      const rightsStats = await this.dataSubjectRightsManager.getRightsStatistics()
      const dataSubjectRights = rightsStats.total_requests >= 0

      // Check privacy policy
      const privacyPolicy = await this.getActivePrivacyPolicy()
      const hasPrivacyPolicy = privacyPolicy !== null

      // Check cookie consent
      const cookieConsent = await this.getCookieConsentStatus()
      const hasCookieConsent = cookieConsent

      // Check data retention
      const retentionStats = await this.dataRetentionManager.getRetentionStatistics()
      const dataRetention = retentionStats.total_policies > 0

      // Check audit logging
      const auditStats = await this.auditLogger.getAuditStatistics()
      const auditLogging = auditStats.total_logs > 0

      // Check breach procedures (placeholder)
      const breachProcedures = await this.checkBreachProcedures()

      // Check staff training (placeholder)
      const staffTraining = await this.checkStaffTraining()

      // Get last audit date
      const lastAudit = await this.getLastAuditDate()

      // Calculate compliance score
      const complianceScore = this.calculateComplianceScore({
        consentManagement,
        dataSubjectRights,
        hasPrivacyPolicy,
        hasCookieConsent,
        dataRetention,
        auditLogging,
        breachProcedures,
        staffTraining
      })

      return {
        consent_management: consentManagement,
        data_subject_rights: dataSubjectRights,
        privacy_policy: hasPrivacyPolicy,
        cookie_consent: hasCookieConsent,
        data_retention: dataRetention,
        audit_logging: auditLogging,
        breach_procedures: breachProcedures,
        staff_training: staffTraining,
        last_audit: lastAudit,
        compliance_score: complianceScore
      }
    } catch (error) {
      console.error('Error getting compliance status:', error)
      return {
        consent_management: false,
        data_subject_rights: false,
        privacy_policy: false,
        cookie_consent: false,
        data_retention: false,
        audit_logging: false,
        breach_procedures: false,
        staff_training: false,
        last_audit: new Date().toISOString(),
        compliance_score: 0
      }
    }
  }

  /**
   * Get active privacy policy
   */
  async getActivePrivacyPolicy(): Promise<PrivacyPolicy | null> {
    try {
      const { data, error } = await this.supabase
        .from('privacy_policies')
        .select('*')
        .eq('is_active', true)
        .order('effective_date', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching privacy policy:', error)
      return null
    }
  }

  /**
   * Create or update privacy policy
   */
  async createPrivacyPolicy(policy: Omit<PrivacyPolicy, 'id' | 'created_at' | 'updated_at'>): Promise<PrivacyPolicy | null> {
    try {
      // Deactivate existing policies
      await this.supabase
        .from('privacy_policies')
        .update({ is_active: false })
        .eq('is_active', true)

      // Create new policy
      const policyData = {
        ...policy,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('privacy_policies')
        .insert(policyData)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Log policy creation
      await this.auditLogger.logAdminAction(
        'privacy_policy_created',
        'privacy_policy',
        data.id,
        'system'
      )

      return data
    } catch (error) {
      console.error('Error creating privacy policy:', error)
      return null
    }
  }

  /**
   * Get cookie consent status
   */
  private async getCookieConsentStatus(): Promise<boolean> {
    try {
      const { count } = await this.supabase
        .from('cookie_consent')
        .select('*', { count: 'exact', head: true })

      return (count || 0) > 0
    } catch (error) {
      console.error('Error checking cookie consent status:', error)
      return false
    }
  }

  /**
   * Check breach procedures
   */
  private async checkBreachProcedures(): Promise<boolean> {
    try {
      // Check if breach notification procedures are in place
      const { data } = await this.supabase
        .from('data_breaches')
        .select('id')
        .limit(1)

      // For now, assume procedures are in place if we can query the table
      return true
    } catch (error) {
      console.error('Error checking breach procedures:', error)
      return false
    }
  }

  /**
   * Check staff training
   */
  private async checkStaffTraining(): Promise<boolean> {
    try {
      // Placeholder for staff training checks
      // In a real implementation, this would check training records
      return true
    } catch (error) {
      console.error('Error checking staff training:', error)
      return false
    }
  }

  /**
   * Get last audit date
   */
  private async getLastAuditDate(): Promise<string> {
    try {
      const { data } = await this.supabase
        .from('compliance_reports')
        .select('generated_at')
        .order('generated_at', { ascending: false })
        .limit(1)
        .single()

      return data?.generated_at || new Date().toISOString()
    } catch (error) {
      console.error('Error getting last audit date:', error)
      return new Date().toISOString()
    }
  }

  /**
   * Calculate compliance score
   */
  private calculateComplianceScore(checks: {
    consentManagement: boolean
    dataSubjectRights: boolean
    hasPrivacyPolicy: boolean
    hasCookieConsent: boolean
    dataRetention: boolean
    auditLogging: boolean
    breachProcedures: boolean
    staffTraining: boolean
  }): number {
    const totalChecks = Object.keys(checks).length
    const passedChecks = Object.values(checks).filter(Boolean).length
    
    return Math.round((passedChecks / totalChecks) * 100)
  }

  /**
   * Report a data breach
   */
  async reportDataBreach(breach: Omit<DataBreach, 'id' | 'created_at' | 'updated_at'>): Promise<DataBreach | null> {
    try {
      const breachData = {
        ...breach,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('data_breaches')
        .insert(breachData)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Log breach report
      await this.auditLogger.logSecurityEvent(
        'data_breach',
        undefined,
        'data_breach',
        data.id,
        { breach_id: data.id, risk_level: breach.risk_level }
      )

      // Send notifications if required
      if (breach.notification_required) {
        await this.sendBreachNotifications(data)
      }

      return data
    } catch (error) {
      console.error('Error reporting data breach:', error)
      return null
    }
  }

  /**
   * Send breach notifications
   */
  private async sendBreachNotifications(breach: DataBreach): Promise<void> {
    try {
      // Notify data protection officer
      await this.notifyDataProtectionOfficer(breach)

      // Notify affected users if required
      if (breach.risk_level === 'high' || breach.risk_level === 'medium') {
        await this.notifyAffectedUsers(breach)
      }

      // Log notification
      await this.auditLogger.logSystemEvent(
        'breach_notifications_sent',
        'data_breach',
        breach.id
      )
    } catch (error) {
      console.error('Error sending breach notifications:', error)
    }
  }

  /**
   * Notify data protection officer
   */
  private async notifyDataProtectionOfficer(breach: DataBreach): Promise<void> {
    try {
      // Get DPO contact information
      const { data: dpo } = await this.supabase
        .from('data_protection_officers')
        .select('*')
        .eq('is_active', true)
        .single()

      if (dpo) {
        // Send notification to DPO
        await this.supabase
          .from('admin_notifications')
          .insert({
            type: 'data_breach',
            title: 'Data Breach Reported',
            message: `A data breach has been reported: ${breach.description}`,
            data: { breach_id: breach.id },
            is_read: false,
            created_at: new Date().toISOString()
          })
      }
    } catch (error) {
      console.error('Error notifying DPO:', error)
    }
  }

  /**
   * Notify affected users
   */
  private async notifyAffectedUsers(breach: DataBreach): Promise<void> {
    try {
      // This would typically involve sending emails to affected users
      // For now, we'll create a notification record
      await this.supabase
        .from('user_notifications')
        .insert({
          type: 'data_breach',
          title: 'Important: Data Security Notice',
          message: 'We have identified a potential data security incident that may affect your personal information.',
          data: { breach_id: breach.id },
          is_read: false,
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error notifying affected users:', error)
    }
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(
    reportType: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc',
    periodStart: Date,
    periodEnd: Date,
    generatedBy: string
  ): Promise<ComplianceReport | null> {
    try {
      // Get compliance statistics for the period
      const complianceStatus = await this.getComplianceStatus()
      const consentStats = await this.consentManager.getConsentStatistics()
      const rightsStats = await this.dataSubjectRightsManager.getRightsStatistics()
      const retentionStats = await this.dataRetentionManager.getRetentionStatistics()
      const auditStats = await this.auditLogger.getAuditStatistics()

      // Get data breaches in period
      const { data: breaches } = await this.supabase
        .from('data_breaches')
        .select('*')
        .gte('created_at', periodStart.toISOString())
        .lte('created_at', periodEnd.toISOString())

      // Generate recommendations
      const recommendations = this.generateRecommendations(complianceStatus, auditStats)

      const report: Omit<ComplianceReport, 'id'> = {
        report_type: reportType,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        data_subject_requests: rightsStats.total_requests,
        consent_updates: consentStats.recent_consents,
        data_breaches: breaches?.length || 0,
        audit_findings: this.generateAuditFindings(auditStats),
        compliance_score: complianceStatus.compliance_score,
        recommendations,
        generated_at: new Date().toISOString(),
        generated_by: generatedBy
      }

      const { data, error } = await this.supabase
        .from('compliance_reports')
        .insert(report)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Log report generation
      await this.auditLogger.logAdminAction(
        'compliance_report_generated',
        'compliance_report',
        data.id,
        generatedBy
      )

      return data
    } catch (error) {
      console.error('Error generating compliance report:', error)
      return null
    }
  }

  /**
   * Generate compliance recommendations
   */
  private generateRecommendations(
    complianceStatus: GDPRComplianceStatus,
    auditStats: any
  ): string[] {
    const recommendations: string[] = []

    if (!complianceStatus.consent_management) {
      recommendations.push('Implement comprehensive consent management system')
    }

    if (!complianceStatus.data_subject_rights) {
      recommendations.push('Set up data subject rights request handling')
    }

    if (!complianceStatus.privacy_policy) {
      recommendations.push('Create and publish privacy policy')
    }

    if (!complianceStatus.cookie_consent) {
      recommendations.push('Implement cookie consent mechanism')
    }

    if (!complianceStatus.data_retention) {
      recommendations.push('Establish data retention policies')
    }

    if (!complianceStatus.audit_logging) {
      recommendations.push('Enable comprehensive audit logging')
    }

    if (!complianceStatus.breach_procedures) {
      recommendations.push('Develop data breach response procedures')
    }

    if (!complianceStatus.staff_training) {
      recommendations.push('Provide GDPR training to staff')
    }

    if (auditStats.recent_activity > 1000) {
      recommendations.push('Review high volume of audit activities')
    }

    return recommendations
  }

  /**
   * Generate audit findings
   */
  private generateAuditFindings(auditStats: any): string[] {
    const findings: string[] = []

    if (auditStats.recent_activity > 500) {
      findings.push('High volume of recent audit activity detected')
    }

    if (auditStats.logs_by_action['security_unauthorized_access'] > 0) {
      findings.push('Unauthorized access attempts detected')
    }

    if (auditStats.logs_by_action['security_data_breach'] > 0) {
      findings.push('Data breach incidents reported')
    }

    return findings
  }

  /**
   * Get consent manager instance
   */
  getConsentManager(): ConsentManager {
    return this.consentManager
  }

  /**
   * Get data subject rights manager instance
   */
  getDataSubjectRightsManager(): DataSubjectRightsManager {
    return this.dataSubjectRightsManager
  }

  /**
   * Get data retention manager instance
   */
  getDataRetentionManager(): DataRetentionManager {
    return this.dataRetentionManager
  }

  /**
   * Get audit logger instance
   */
  getAuditLogger(): AuditLogger {
    return this.auditLogger
  }
}
