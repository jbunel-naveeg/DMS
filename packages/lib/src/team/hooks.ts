import { useState, useEffect, useCallback } from 'react'
import { TeamService } from './team-service'
import { TeamMember, TeamInvitation, TeamActivity, TeamSettings } from './types'

export function useTeamMembers(websiteId: string) {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const teamService = new TeamService()

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await teamService.getTeamMembers(websiteId)
      
      if (error) {
        setError(error.message || 'Failed to load team members')
      } else {
        setMembers(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team members')
    } finally {
      setLoading(false)
    }
  }, [websiteId, teamService])

  const addMember = useCallback(async (
    email: string,
    role: 'admin' | 'editor',
    invitedBy: string
  ) => {
    try {
      setError(null)
      const { data, error } = await teamService.addTeamMember(websiteId, email, role, invitedBy)
      
      if (error) {
        setError(error.message || 'Failed to add team member')
        return { success: false, error: error.message }
      }
      
      // Reload members to get updated list
      await loadMembers()
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add team member'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [websiteId, teamService, loadMembers])

  const updateMember = useCallback(async (
    memberId: string,
    updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>
  ) => {
    try {
      setError(null)
      const { data, error } = await teamService.updateTeamMember(memberId, updates)
      
      if (error) {
        setError(error.message || 'Failed to update team member')
        return { success: false, error: error.message }
      }
      
      // Update local state
      setMembers(prev => prev.map(member => 
        member.id === memberId ? { ...member, ...updates } : member
      ))
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update team member'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [teamService])

  const removeMember = useCallback(async (memberId: string) => {
    try {
      setError(null)
      const { error } = await teamService.removeTeamMember(memberId)
      
      if (error) {
        setError(error.message || 'Failed to remove team member')
        return { success: false, error: error.message }
      }
      
      // Update local state
      setMembers(prev => prev.filter(member => member.id !== memberId))
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove team member'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [teamService])

  useEffect(() => {
    if (websiteId) {
      loadMembers()
    }
  }, [websiteId, loadMembers])

  return {
    members,
    loading,
    error,
    addMember,
    updateMember,
    removeMember,
    refresh: loadMembers
  }
}

export function useTeamInvitations(websiteId: string) {
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const teamService = new TeamService()

  const loadInvitations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await teamService.getTeamInvitations(websiteId)
      
      if (error) {
        setError(error.message || 'Failed to load invitations')
      } else {
        setInvitations(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invitations')
    } finally {
      setLoading(false)
    }
  }, [websiteId, teamService])

  const revokeInvitation = useCallback(async (invitationId: string) => {
    try {
      setError(null)
      const { error } = await teamService.revokeInvitation(invitationId)
      
      if (error) {
        setError(error.message || 'Failed to revoke invitation')
        return { success: false, error: error.message }
      }
      
      // Update local state
      setInvitations(prev => prev.map(invitation => 
        invitation.id === invitationId 
          ? { ...invitation, status: 'revoked' as const }
          : invitation
      ))
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to revoke invitation'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [teamService])

  useEffect(() => {
    if (websiteId) {
      loadInvitations()
    }
  }, [websiteId, loadInvitations])

  return {
    invitations,
    loading,
    error,
    revokeInvitation,
    refresh: loadInvitations
  }
}

export function useTeamActivity(websiteId: string) {
  const [activities, setActivities] = useState<TeamActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const teamService = new TeamService()

  const loadActivities = useCallback(async (limit: number = 50, offset: number = 0) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await teamService.getTeamActivity(websiteId, limit, offset)
      
      if (error) {
        setError(error.message || 'Failed to load activities')
      } else {
        if (offset === 0) {
          setActivities(data)
        } else {
          setActivities(prev => [...prev, ...data])
        }
        setHasMore(data.length === limit)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activities')
    } finally {
      setLoading(false)
    }
  }, [websiteId, teamService])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadActivities(50, activities.length)
    }
  }, [loading, hasMore, activities.length, loadActivities])

  useEffect(() => {
    if (websiteId) {
      loadActivities()
    }
  }, [websiteId, loadActivities])

  return {
    activities,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => loadActivities()
  }
}

export function useTeamSettings(websiteId: string) {
  const [settings, setSettings] = useState<TeamSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const teamService = new TeamService()

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await teamService.getTeamSettings(websiteId)
      
      if (error) {
        setError(error.message || 'Failed to load settings')
      } else {
        setSettings(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [websiteId, teamService])

  const updateSettings = useCallback(async (updates: Partial<TeamSettings>) => {
    try {
      setError(null)
      const { data, error } = await teamService.updateTeamSettings(websiteId, updates)
      
      if (error) {
        setError(error.message || 'Failed to update settings')
        return { success: false, error: error.message }
      }
      
      setSettings(data)
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update settings'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [websiteId, teamService])

  useEffect(() => {
    if (websiteId) {
      loadSettings()
    }
  }, [websiteId, loadSettings])

  return {
    settings,
    loading,
    error,
    updateSettings,
    refresh: loadSettings
  }
}

export function useTeamPermissions(userId: string, websiteId: string) {
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [role, setRole] = useState<'admin' | 'editor' | null>(null)
  const [loading, setLoading] = useState(true)

  const teamService = new TeamService()

  const checkPermission = useCallback(async (permission: string) => {
    try {
      const hasPermission = await teamService.checkPermission(userId, websiteId, permission as any)
      setPermissions(prev => ({ ...prev, [permission]: hasPermission }))
      return hasPermission
    } catch (error) {
      return false
    }
  }, [userId, websiteId, teamService])

  const loadPermissions = useCallback(async () => {
    try {
      setLoading(true)
      
      // Get user role
      const userRole = await teamService.getUserRole(userId, websiteId)
      setRole(userRole)
      
      // Check all permissions
      const permissionKeys = [
        'can_manage_website',
        'can_manage_domains',
        'can_manage_analytics',
        'can_manage_billing',
        'can_manage_team',
        'can_manage_integrations',
        'can_manage_content',
        'can_manage_settings'
      ]
      
      const permissionChecks = permissionKeys.map(key => 
        teamService.checkPermission(userId, websiteId, key as any)
      )
      
      const results = await Promise.all(permissionChecks)
      const permissionMap = permissionKeys.reduce((acc, key, index) => {
        acc[key] = results[index]
        return acc
      }, {} as Record<string, boolean>)
      
      setPermissions(permissionMap)
    } catch (error) {
      console.error('Failed to load permissions:', error)
    } finally {
      setLoading(false)
    }
  }, [userId, websiteId, teamService])

  useEffect(() => {
    if (userId && websiteId) {
      loadPermissions()
    }
  }, [userId, websiteId, loadPermissions])

  return {
    permissions,
    role,
    loading,
    checkPermission,
    refresh: loadPermissions
  }
}
