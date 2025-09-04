import { createBrowserClient, createServerClient } from '../auth/auth'
import { TeamMember, TeamInvitation, TeamActivity, TeamSettings, DEFAULT_ROLE_PERMISSIONS } from './types'

export class TeamService {
  private supabase: any

  constructor(serverClient?: any) {
    this.supabase = serverClient || createBrowserClient()
  }

  // Team Members Management
  async getTeamMembers(websiteId: string): Promise<{ data: TeamMember[]; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_members')
        .select(`
          *,
          user:user_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `)
        .eq('website_id', websiteId)
        .order('created_at', { ascending: false })

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  }

  async addTeamMember(
    websiteId: string,
    email: string,
    role: 'admin' | 'editor',
    invitedBy: string
  ): Promise<{ data: TeamInvitation | null; error: any }> {
    try {
      // Check if user already exists
      const { data: existingUser } = await this.supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (existingUser) {
        // User exists, add directly to team
        const { data, error } = await this.supabase
          .from('team_members')
          .insert({
            user_id: existingUser.id,
            website_id: websiteId,
            role,
            permissions: DEFAULT_ROLE_PERMISSIONS[role],
            invited_by: invitedBy,
            status: 'active',
            joined_at: new Date().toISOString()
          })
          .select()
          .single()

        return { data: null, error }
      } else {
        // User doesn't exist, create invitation
        const invitationToken = this.generateInvitationToken()
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

        const { data, error } = await this.supabase
          .from('team_invitations')
          .insert({
            email,
            website_id: websiteId,
            role,
            permissions: DEFAULT_ROLE_PERMISSIONS[role],
            invited_by: invitedBy,
            token: invitationToken,
            expires_at: expiresAt.toISOString()
          })
          .select()
          .single()

        // Send invitation email (this would integrate with your email service)
        await this.sendInvitationEmail(email, invitationToken, websiteId)

        return { data, error }
      }
    } catch (error) {
      return { data: null, error }
    }
  }

  async updateTeamMember(
    memberId: string,
    updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>
  ): Promise<{ data: TeamMember | null; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_members')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', memberId)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  async removeTeamMember(memberId: string): Promise<{ error: any }> {
    try {
      const { error } = await this.supabase
        .from('team_members')
        .delete()
        .eq('id', memberId)

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Team Invitations Management
  async getTeamInvitations(websiteId: string): Promise<{ data: TeamInvitation[]; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_invitations')
        .select('*')
        .eq('website_id', websiteId)
        .order('created_at', { ascending: false })

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  }

  async acceptInvitation(token: string, userId: string): Promise<{ data: TeamMember | null; error: any }> {
    try {
      // Get invitation details
      const { data: invitation, error: invitationError } = await this.supabase
        .from('team_invitations')
        .select('*')
        .eq('token', token)
        .eq('status', 'pending')
        .single()

      if (invitationError || !invitation) {
        return { data: null, error: 'Invalid or expired invitation' }
      }

      // Check if invitation is expired
      if (new Date(invitation.expires_at) < new Date()) {
        return { data: null, error: 'Invitation has expired' }
      }

      // Add user to team
      const { data: teamMember, error: memberError } = await this.supabase
        .from('team_members')
        .insert({
          user_id: userId,
          website_id: invitation.website_id,
          role: invitation.role,
          permissions: invitation.permissions,
          invited_by: invitation.invited_by,
          status: 'active',
          joined_at: new Date().toISOString()
        })
        .select()
        .single()

      if (memberError) {
        return { data: null, error: memberError }
      }

      // Update invitation status
      await this.supabase
        .from('team_invitations')
        .update({ status: 'accepted' })
        .eq('id', invitation.id)

      return { data: teamMember, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async revokeInvitation(invitationId: string): Promise<{ error: any }> {
    try {
      const { error } = await this.supabase
        .from('team_invitations')
        .update({ status: 'revoked' })
        .eq('id', invitationId)

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Team Activity Logging
  async logActivity(
    websiteId: string,
    userId: string,
    action: string,
    resourceType: string,
    resourceId?: string,
    details?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ error: any }> {
    try {
      const { error } = await this.supabase
        .from('team_activities')
        .insert({
          website_id: websiteId,
          user_id: userId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details: details || {},
          ip_address: ipAddress,
          user_agent: userAgent
        })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  async getTeamActivity(
    websiteId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ data: TeamActivity[]; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_activities')
        .select(`
          *,
          user:user_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `)
        .eq('website_id', websiteId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  }

  // Team Settings Management
  async getTeamSettings(websiteId: string): Promise<{ data: TeamSettings | null; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_settings')
        .select('*')
        .eq('website_id', websiteId)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  async updateTeamSettings(
    websiteId: string,
    settings: Partial<TeamSettings>
  ): Promise<{ data: TeamSettings | null; error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('team_settings')
        .upsert({
          website_id: websiteId,
          ...settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Permission Checking
  async checkPermission(
    userId: string,
    websiteId: string,
    permission: string
  ): Promise<boolean> {
    try {
      const { data: member } = await this.supabase
        .from('team_members')
        .select('permissions')
        .eq('user_id', userId)
        .eq('website_id', websiteId)
        .eq('status', 'active')
        .single()

      return member?.permissions?.[permission] || false
    } catch (error) {
      return false
    }
  }

  async getUserRole(userId: string, websiteId: string): Promise<'admin' | 'editor' | null> {
    try {
      const { data: member } = await this.supabase
        .from('team_members')
        .select('role')
        .eq('user_id', userId)
        .eq('website_id', websiteId)
        .eq('status', 'active')
        .single()

      return member?.role || null
    } catch (error) {
      return null
    }
  }

  // Utility Methods
  private generateInvitationToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  private async sendInvitationEmail(email: string, token: string, websiteId: string): Promise<void> {
    // This would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll just log it
    console.log(`Sending invitation email to ${email} with token ${token} for website ${websiteId}`)
    
    // In a real implementation, you would:
    // 1. Get website details
    // 2. Create email template
    // 3. Send email with invitation link
    // 4. Handle email delivery status
  }

  // Static method to create server-side instance
  static createServerInstance(cookies: any): TeamService {
    return new TeamService(createServerClient(cookies))
  }
}
