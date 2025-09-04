/**
 * Data Subject Rights Manager
 * Handles GDPR data subject rights requests (access, rectification, erasure, etc.)
 */

import { createClient } from '@supabase/supabase-js'
import { DataSubjectRequest, DataSubjectRightType, DataExport, DataDeletionRequest } from './types'

export class DataSubjectRightsManager {
  private supabase: any

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  /**
   * Create a new data subject request
   */
  async createDataSubjectRequest(
    userId: string,
    requestType: DataSubjectRightType,
    description?: string
  ): Promise<DataSubjectRequest | null> {
    try {
      const requestData = {
        user_id: userId,
        request_type: requestType,
        status: 'pending',
        description,
        requested_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('data_subject_requests')
        .insert(requestData)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Send notification to admin
      await this.notifyAdmin('data_request', {
        user_id: userId,
        request_type: requestType,
        request_id: data.id
      })

      return data
    } catch (error) {
      console.error('Error creating data subject request:', error)
      return null
    }
  }

  /**
   * Get user's data subject requests
   */
  async getUserRequests(userId: string): Promise<DataSubjectRequest[]> {
    try {
      const { data, error } = await this.supabase
        .from('data_subject_requests')
        .select('*')
        .eq('user_id', userId)
        .order('requested_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user requests:', error)
      return []
    }
  }

  /**
   * Get all pending data subject requests (admin)
   */
  async getPendingRequests(): Promise<DataSubjectRequest[]> {
    try {
      const { data, error } = await this.supabase
        .from('data_subject_requests')
        .select('*')
        .eq('status', 'pending')
        .order('requested_at', { ascending: true })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching pending requests:', error)
      return []
    }
  }

  /**
   * Update request status (admin)
   */
  async updateRequestStatus(
    requestId: string,
    status: DataSubjectRequest['status'],
    adminNotes?: string
  ): Promise<boolean> {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      }

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString()
      }

      if (adminNotes) {
        updateData.admin_notes = adminNotes
      }

      const { error } = await this.supabase
        .from('data_subject_requests')
        .update(updateData)
        .eq('id', requestId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error updating request status:', error)
      return false
    }
  }

  /**
   * Handle data access request
   */
  async handleDataAccessRequest(userId: string): Promise<DataExport | null> {
    try {
      // Create data export
      const exportData = {
        user_id: userId,
        data_types: ['profile', 'websites', 'subscriptions', 'consent', 'audit_logs'],
        format: 'json',
        status: 'pending',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }

      const { data: exportRecord, error: exportError } = await this.supabase
        .from('data_exports')
        .insert(exportData)
        .select()
        .single()

      if (exportError) {
        throw exportError
      }

      // Process the export
      await this.processDataExport(exportRecord.id, userId)

      return exportRecord
    } catch (error) {
      console.error('Error handling data access request:', error)
      return null
    }
  }

  /**
   * Process data export
   */
  private async processDataExport(exportId: string, userId: string): Promise<void> {
    try {
      // Update status to processing
      await this.supabase
        .from('data_exports')
        .update({ status: 'processing' })
        .eq('id', exportId)

      // Collect user data
      const userData = await this.collectUserData(userId)

      // Generate export file
      const exportData = {
        user_id: userId,
        export_id: exportId,
        generated_at: new Date().toISOString(),
        data: userData
      }

      // Store export data (in a real implementation, this would be stored in a secure location)
      const { error: updateError } = await this.supabase
        .from('data_exports')
        .update({
          status: 'ready',
          response_data: exportData,
          file_size: JSON.stringify(exportData).length
        })
        .eq('id', exportId)

      if (updateError) {
        throw updateError
      }

      // Notify user
      await this.notifyUser(userId, 'data_export_ready', {
        export_id: exportId
      })

    } catch (error) {
      console.error('Error processing data export:', error)
      
      // Update status to failed
      await this.supabase
        .from('data_exports')
        .update({ status: 'failed' })
        .eq('id', exportId)
    }
  }

  /**
   * Collect all user data
   */
  private async collectUserData(userId: string): Promise<any> {
    try {
      // Get user profile
      const { data: profile } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      // Get user websites
      const { data: websites } = await this.supabase
        .from('websites')
        .select('*')
        .eq('user_id', userId)

      // Get subscriptions
      const { data: subscriptions } = await this.supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)

      // Get consent preferences
      const { data: consent } = await this.supabase
        .from('consent_preferences')
        .select('*')
        .eq('user_id', userId)

      // Get audit logs
      const { data: auditLogs } = await this.supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId)

      return {
        profile,
        websites: websites || [],
        subscriptions: subscriptions || [],
        consent_preferences: consent || [],
        audit_logs: auditLogs || [],
        export_metadata: {
          generated_at: new Date().toISOString(),
          data_categories: ['personal_data', 'usage_data', 'consent_data', 'audit_data']
        }
      }
    } catch (error) {
      console.error('Error collecting user data:', error)
      return {}
    }
  }

  /**
   * Handle data rectification request
   */
  async handleDataRectificationRequest(
    userId: string,
    corrections: Record<string, any>
  ): Promise<boolean> {
    try {
      // Update user profile with corrections
      const { error } = await this.supabase
        .from('users')
        .update({
          ...corrections,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        throw error
      }

      // Log the rectification
      await this.logDataAction(userId, 'data_rectification', {
        corrections,
        timestamp: new Date().toISOString()
      })

      return true
    } catch (error) {
      console.error('Error handling data rectification:', error)
      return false
    }
  }

  /**
   * Handle data erasure request (right to be forgotten)
   */
  async handleDataErasureRequest(userId: string): Promise<DataDeletionRequest | null> {
    try {
      // Create deletion request
      const deletionRequest = {
        user_id: userId,
        reason: 'User requested data erasure (GDPR Article 17)',
        status: 'pending',
        requested_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase
        .from('data_deletion_requests')
        .insert(deletionRequest)
        .select()
        .single()

      if (error) {
        throw error
      }

      // Notify admin
      await this.notifyAdmin('deletion_request', {
        user_id: userId,
        request_id: data.id
      })

      return data
    } catch (error) {
      console.error('Error handling data erasure request:', error)
      return null
    }
  }

  /**
   * Process data deletion (admin)
   */
  async processDataDeletion(requestId: string, approved: boolean): Promise<boolean> {
    try {
      const { data: request } = await this.supabase
        .from('data_deletion_requests')
        .select('*')
        .eq('id', requestId)
        .single()

      if (!request) {
        throw new Error('Deletion request not found')
      }

      const status = approved ? 'approved' : 'rejected'
      const processedAt = approved ? new Date().toISOString() : null

      // Update request status
      await this.supabase
        .from('data_deletion_requests')
        .update({
          status,
          processed_at: processedAt
        })
        .eq('id', requestId)

      if (approved) {
        // Perform data deletion
        await this.performDataDeletion(request.user_id)
      }

      return true
    } catch (error) {
      console.error('Error processing data deletion:', error)
      return false
    }
  }

  /**
   * Perform actual data deletion
   */
  private async performDataDeletion(userId: string): Promise<void> {
    try {
      // Delete user data from all tables
      const tables = [
        'websites',
        'subscriptions',
        'consent_preferences',
        'cookie_consent',
        'data_subject_requests',
        'data_exports',
        'audit_logs'
      ]

      for (const table of tables) {
        await this.supabase
          .from(table)
          .delete()
          .eq('user_id', userId)
      }

      // Anonymize user profile (keep for legal/audit purposes)
      await this.supabase
        .from('users')
        .update({
          email: `deleted_${userId}@deleted.local`,
          full_name: 'Deleted User',
          avatar_url: null,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      // Log the deletion
      await this.logDataAction(userId, 'data_deletion', {
        deleted_at: new Date().toISOString(),
        tables_affected: tables
      })

    } catch (error) {
      console.error('Error performing data deletion:', error)
      throw error
    }
  }

  /**
   * Handle data portability request
   */
  async handleDataPortabilityRequest(userId: string): Promise<DataExport | null> {
    // Similar to data access request but with specific format for portability
    return await this.handleDataAccessRequest(userId)
  }

  /**
   * Log data action for audit purposes
   */
  private async logDataAction(
    userId: string,
    action: string,
    metadata: any
  ): Promise<void> {
    try {
      await this.supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action,
          resource_type: 'user_data',
          resource_id: userId,
          new_values: metadata,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error logging data action:', error)
    }
  }

  /**
   * Notify admin about data subject request
   */
  private async notifyAdmin(type: string, data: any): Promise<void> {
    try {
      await this.supabase
        .from('admin_notifications')
        .insert({
          type,
          data,
          is_read: false,
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error notifying admin:', error)
    }
  }

  /**
   * Notify user about request status
   */
  private async notifyUser(userId: string, type: string, data: any): Promise<void> {
    try {
      await this.supabase
        .from('user_notifications')
        .insert({
          user_id,
          type,
          data,
          is_read: false,
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error notifying user:', error)
    }
  }

  /**
   * Get data subject rights statistics
   */
  async getRightsStatistics(): Promise<{
    total_requests: number
    pending_requests: number
    completed_requests: number
    request_types: Record<DataSubjectRightType, number>
  }> {
    try {
      const { data: requests } = await this.supabase
        .from('data_subject_requests')
        .select('request_type, status')

      const stats = {
        total_requests: requests?.length || 0,
        pending_requests: requests?.filter(r => r.status === 'pending').length || 0,
        completed_requests: requests?.filter(r => r.status === 'completed').length || 0,
        request_types: {
          access: 0,
          rectification: 0,
          erasure: 0,
          portability: 0,
          restriction: 0,
          objection: 0
        }
      }

      if (requests) {
        requests.forEach(request => {
          stats.request_types[request.request_type as DataSubjectRightType]++
        })
      }

      return stats
    } catch (error) {
      console.error('Error getting rights statistics:', error)
      return {
        total_requests: 0,
        pending_requests: 0,
        completed_requests: 0,
        request_types: {
          access: 0,
          rectification: 0,
          erasure: 0,
          portability: 0,
          restriction: 0,
          objection: 0
        }
      }
    }
  }
}
