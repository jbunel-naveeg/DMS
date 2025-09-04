"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TeamManager } from "@naveeg/ui"
import { useUserData, useTeamMembers, useTeamInvitations, useTeamPermissions, TeamMember } from "@naveeg/lib"

export default function TeamPage() {
  const router = useRouter()
  const { loading: userLoading } = useUserData()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [websiteId, setWebsiteId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Get current user ID and website ID
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('/api/user/me')
        if (response.ok) {
          const userData = await response.json()
          setCurrentUserId(userData.user?.id)
          setWebsiteId(userData.website?.id)
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load user data')
      }
    }

    getUserData()
  }, [])

  // Team management hooks
  const {
    members,
    loading: membersLoading,
    error: membersError,
    refresh: refreshMembers
  } = useTeamMembers(websiteId || '')

  const {
    invitations,
    loading: invitationsLoading,
    error: invitationsError,
    refresh: refreshInvitations
  } = useTeamInvitations(websiteId || '')

  const {
    permissions,
    role,
    loading: permissionsLoading
  } = useTeamPermissions(currentUserId || '', websiteId || '')

  // Check if user has permission to manage team
  const canManageTeam = permissions.can_manage_team || role === 'admin'

  const handleAddMember = async (email: string, memberRole: 'admin' | 'editor') => {
    if (!currentUserId) {
      return { success: false, error: 'User not authenticated' }
    }

    try {
      const response = await fetch('/api/team/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role: memberRole,
          website_id: websiteId
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add team member')
      }

      // Refresh members and invitations
      await Promise.all([refreshMembers(), refreshInvitations()])
      
      return { success: true }
    } catch (err) {
      console.error('Error adding team member:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add team member' 
      }
    }
  }

  const handleUpdateMember = async (
    memberId: string,
    updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Filter out invalid status updates (can't manually set to pending)
      const filteredUpdates = { ...updates }
      if (filteredUpdates.status === 'pending') {
        delete filteredUpdates.status
      }

      const response = await fetch(`/api/team/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredUpdates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update team member')
      }

      // Refresh members
      await refreshMembers()
      
      return { success: true }
    } catch (err) {
      console.error('Error updating team member:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update team member' 
      }
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(`/api/team/members/${memberId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to remove team member')
      }

      // Refresh members
      await refreshMembers()
      
      return { success: true }
    } catch (err) {
      console.error('Error removing team member:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to remove team member' 
      }
    }
  }

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      const response = await fetch(`/api/team/invitations/${invitationId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to revoke invitation')
      }

      // Refresh invitations
      await refreshInvitations()
      
      return { success: true }
    } catch (err) {
      console.error('Error revoking invitation:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to revoke invitation' 
      }
    }
  }

  if (userLoading || permissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUserId || !websiteId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Access Denied
          </h3>
          <p className="text-gray-500">
            You need to be logged in and have a website to access team management.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!canManageTeam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Permission Denied
          </h3>
          <p className="text-gray-500">
            You don&apos;t have permission to manage team members.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Error Display */}
        {(error || membersError || invitationsError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error || membersError || invitationsError}
                </div>
              </div>
            </div>
          </div>
        )}

        <TeamManager
          members={members}
          invitations={invitations}
          currentUserId={currentUserId}
          onAddMember={handleAddMember}
          onUpdateMember={handleUpdateMember}
          onRemoveMember={handleRemoveMember}
          onRevokeInvitation={handleRevokeInvitation}
          loading={membersLoading || invitationsLoading}
        />
      </div>
    </div>
  )
}
