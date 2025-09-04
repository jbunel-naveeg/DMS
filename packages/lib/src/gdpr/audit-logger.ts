/**
 * Audit Logger
 * Comprehensive audit logging for GDPR compliance and security monitoring
 */

import { createClient } from '@supabase/supabase-js'
import { AuditLog } from './types'

export class AuditLogger {
  private supabase: any
  private enabled: boolean

  constructor(supabaseUrl: string, supabaseKey: string, enabled: boolean = true) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
    this.enabled = enabled
  }

  /**
   * Log an audit event
   */
  async log(
    action: string,
    resourceType: string,
    resourceId: string,
    options: {
      userId?: string
      oldValues?: any
      newValues?: any
      ipAddress?: string
      userAgent?: string
      metadata?: any
    } = {}
  ): Promise<boolean> {
    if (!this.enabled) return true

    try {
      const auditLog: Omit<AuditLog, 'id'> = {
        user_id: options.userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        old_values: options.oldValues,
        new_values: options.newValues,
        ip_address: options.ipAddress,
        user_agent: options.userAgent,
        timestamp: new Date().toISOString(),
        metadata: options.metadata
      }

      const { error } = await this.supabase
        .from('audit_logs')
        .insert(auditLog)

      if (error) {
        console.error('Error logging audit event:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in audit logger:', error)
      return false
    }
  }

  /**
   * Log user authentication events
   */
  async logAuthEvent(
    action: 'login' | 'logout' | 'register' | 'password_reset' | 'email_verification',
    userId: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `auth_${action}`,
      'user',
      userId,
      {
        userId,
        metadata: {
          ...metadata,
          event_type: 'authentication'
        }
      }
    )
  }

  /**
   * Log data access events
   */
  async logDataAccess(
    action: 'read' | 'create' | 'update' | 'delete' | 'export',
    resourceType: string,
    resourceId: string,
    userId: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `data_${action}`,
      resourceType,
      resourceId,
      {
        userId,
        metadata: {
          ...metadata,
          event_type: 'data_access'
        }
      }
    )
  }

  /**
   * Log consent events
   */
  async logConsentEvent(
    action: 'given' | 'withdrawn' | 'updated',
    userId: string,
    consentType: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `consent_${action}`,
      'consent',
      userId,
      {
        userId,
        metadata: {
          ...metadata,
          consent_type: consentType,
          event_type: 'consent'
        }
      }
    )
  }

  /**
   * Log data subject rights events
   */
  async logDataSubjectRights(
    action: 'requested' | 'processed' | 'completed' | 'rejected',
    requestType: string,
    userId: string,
    requestId: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `dsr_${action}`,
      'data_subject_request',
      requestId,
      {
        userId,
        metadata: {
          ...metadata,
          request_type: requestType,
          event_type: 'data_subject_rights'
        }
      }
    )
  }

  /**
   * Log admin actions
   */
  async logAdminAction(
    action: string,
    resourceType: string,
    resourceId: string,
    adminUserId: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `admin_${action}`,
      resourceType,
      resourceId,
      {
        userId: adminUserId,
        metadata: {
          ...metadata,
          event_type: 'admin_action'
        }
      }
    )
  }

  /**
   * Log system events
   */
  async logSystemEvent(
    action: string,
    resourceType: string,
    resourceId: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `system_${action}`,
      resourceType,
      resourceId,
      {
        metadata: {
          ...metadata,
          event_type: 'system'
        }
      }
    )
  }

  /**
   * Log security events
   */
  async logSecurityEvent(
    action: 'suspicious_activity' | 'failed_login' | 'unauthorized_access' | 'data_breach',
    userId?: string,
    resourceType?: string,
    resourceId?: string,
    metadata?: any
  ): Promise<boolean> {
    return await this.log(
      `security_${action}`,
      resourceType || 'security',
      resourceId || 'system',
      {
        userId,
        metadata: {
          ...metadata,
          event_type: 'security',
          severity: this.getSecuritySeverity(action)
        }
      }
    )
  }

  /**
   * Get security event severity
   */
  private getSecuritySeverity(action: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (action) {
      case 'suspicious_activity':
        return 'medium'
      case 'failed_login':
        return 'low'
      case 'unauthorized_access':
        return 'high'
      case 'data_breach':
        return 'critical'
      default:
        return 'medium'
    }
  }

  /**
   * Get audit logs for a specific user
   */
  async getUserAuditLogs(
    userId: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const { data, error } = await this.supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user audit logs:', error)
      return []
    }
  }

  /**
   * Get audit logs for a specific resource
   */
  async getResourceAuditLogs(
    resourceType: string,
    resourceId: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const { data, error } = await this.supabase
        .from('audit_logs')
        .select('*')
        .eq('resource_type', resourceType)
        .eq('resource_id', resourceId)
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching resource audit logs:', error)
      return []
    }
  }

  /**
   * Get audit logs by action type
   */
  async getAuditLogsByAction(
    action: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const { data, error } = await this.supabase
        .from('audit_logs')
        .select('*')
        .eq('action', action)
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching audit logs by action:', error)
      return []
    }
  }

  /**
   * Get audit logs within a date range
   */
  async getAuditLogsByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 100,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const { data, error } = await this.supabase
        .from('audit_logs')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching audit logs by date range:', error)
      return []
    }
  }

  /**
   * Get audit statistics
   */
  async getAuditStatistics(): Promise<{
    total_logs: number
    logs_by_action: Record<string, number>
    logs_by_user: Record<string, number>
    logs_by_resource_type: Record<string, number>
    recent_activity: number
  }> {
    try {
      // Get total logs count
      const { count: totalLogs } = await this.supabase
        .from('audit_logs')
        .select('*', { count: 'exact', head: true })

      // Get logs by action
      const { data: actionData } = await this.supabase
        .from('audit_logs')
        .select('action')

      const logsByAction: Record<string, number> = {}
      if (actionData) {
        actionData.forEach(log => {
          logsByAction[log.action] = (logsByAction[log.action] || 0) + 1
        })
      }

      // Get logs by user
      const { data: userData } = await this.supabase
        .from('audit_logs')
        .select('user_id')
        .not('user_id', 'is', null)

      const logsByUser: Record<string, number> = {}
      if (userData) {
        userData.forEach(log => {
          logsByUser[log.user_id] = (logsByUser[log.user_id] || 0) + 1
        })
      }

      // Get logs by resource type
      const { data: resourceData } = await this.supabase
        .from('audit_logs')
        .select('resource_type')

      const logsByResourceType: Record<string, number> = {}
      if (resourceData) {
        resourceData.forEach(log => {
          logsByResourceType[log.resource_type] = (logsByResourceType[log.resource_type] || 0) + 1
        })
      }

      // Get recent activity (last 24 hours)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const { count: recentActivity } = await this.supabase
        .from('audit_logs')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', yesterday.toISOString())

      return {
        total_logs: totalLogs || 0,
        logs_by_action: logsByAction,
        logs_by_user: logsByUser,
        logs_by_resource_type: logsByResourceType,
        recent_activity: recentActivity || 0
      }
    } catch (error) {
      console.error('Error getting audit statistics:', error)
      return {
        total_logs: 0,
        logs_by_action: {},
        logs_by_user: {},
        logs_by_resource_type: {},
        recent_activity: 0
      }
    }
  }

  /**
   * Search audit logs
   */
  async searchAuditLogs(
    query: string,
    filters: {
      userId?: string
      action?: string
      resourceType?: string
      startDate?: Date
      endDate?: Date
    } = {},
    limit: number = 100,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      let supabaseQuery = this.supabase
        .from('audit_logs')
        .select('*')

      // Apply filters
      if (filters.userId) {
        supabaseQuery = supabaseQuery.eq('user_id', filters.userId)
      }
      if (filters.action) {
        supabaseQuery = supabaseQuery.eq('action', filters.action)
      }
      if (filters.resourceType) {
        supabaseQuery = supabaseQuery.eq('resource_type', filters.resourceType)
      }
      if (filters.startDate) {
        supabaseQuery = supabaseQuery.gte('timestamp', filters.startDate.toISOString())
      }
      if (filters.endDate) {
        supabaseQuery = supabaseQuery.lte('timestamp', filters.endDate.toISOString())
      }

      // Apply search query (search in action, resource_type, and metadata)
      if (query) {
        supabaseQuery = supabaseQuery.or(`action.ilike.%${query}%,resource_type.ilike.%${query}%,metadata.ilike.%${query}%`)
      }

      const { data, error } = await supabaseQuery
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error searching audit logs:', error)
      return []
    }
  }

  /**
   * Enable or disable audit logging
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  /**
   * Check if audit logging is enabled
   */
  isEnabled(): boolean {
    return this.enabled
  }
}
