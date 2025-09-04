import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { TeamMemberCard } from "./team-member-card"
import { TeamInvitationCard } from "./team-invitation-card"
import { cn } from "../lib/utils"
import { TeamMember, TeamInvitation } from "@naveeg/lib"

export interface TeamManagerProps {
  members: TeamMember[]
  invitations: TeamInvitation[]
  currentUserId: string
  onAddMember: (email: string, role: 'admin' | 'editor') => Promise<{ success: boolean; error?: string }>
  onUpdateMember: (memberId: string, updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>) => Promise<{ success: boolean; error?: string }>
  onRemoveMember: (memberId: string) => Promise<{ success: boolean; error?: string }>
  onRevokeInvitation: (invitationId: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function TeamManager({
  members,
  invitations,
  currentUserId,
  onAddMember,
  onUpdateMember,
  onRemoveMember,
  onRevokeInvitation,
  loading = false,
  className
}: TeamManagerProps) {
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [newMemberEmail, setNewMemberEmail] = React.useState('')
  const [newMemberRole, setNewMemberRole] = React.useState<'admin' | 'editor'>('editor')
  const [isAdding, setIsAdding] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMemberEmail.trim()) {
      setError('Email is required')
      return
    }

    setIsAdding(true)
    setError(null)

    try {
      const result = await onAddMember(newMemberEmail.trim(), newMemberRole)
      if (result.success) {
        setNewMemberEmail('')
        setNewMemberRole('editor')
        setShowAddForm(false)
      } else {
        setError(result.error || 'Failed to add team member')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add team member')
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdateMember = async (
    memberId: string,
    updates: Partial<Pick<TeamMember, 'role' | 'permissions' | 'status'>>
  ) => {
    setError(null)
    return await onUpdateMember(memberId, updates)
  }

  const handleRemoveMember = async (memberId: string) => {
    setError(null)
    return await onRemoveMember(memberId)
  }

  const handleRevokeInvitation = async (invitationId: string) => {
    setError(null)
    return await onRevokeInvitation(invitationId)
  }

  const activeMembers = members.filter(member => member.status === 'active')
  const pendingInvitations = invitations.filter(invitation => invitation.status === 'pending')

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-1">
            Manage team members and their permissions
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={loading}
        >
          Add Team Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
            <CardDescription>
              Invite a new team member by email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as 'admin' | 'editor')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {newMemberRole === 'admin' 
                    ? 'Admins can manage all aspects of the website including team members and billing'
                    : 'Editors can manage content and analytics but cannot manage team or billing'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  disabled={isAdding || loading}
                >
                  {isAdding ? 'Adding...' : 'Add Member'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewMemberEmail('')
                    setError(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Team Members ({activeMembers.length})
        </h3>
        <div className="space-y-4">
          {activeMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              currentUserId={currentUserId}
              onUpdateRole={(memberId, role) => handleUpdateMember(memberId, { role })}
              onUpdateStatus={(memberId, status) => handleUpdateMember(memberId, { status })}
              onRemove={handleRemoveMember}
              loading={loading}
            />
          ))}
          {activeMembers.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No team members yet
                </h3>
                <p className="text-gray-500">
                  Add team members to collaborate on your website.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Pending Invitations ({pendingInvitations.length})
          </h3>
          <div className="space-y-4">
            {pendingInvitations.map((invitation) => (
              <TeamInvitationCard
                key={invitation.id}
                invitation={invitation}
                onRevoke={handleRevokeInvitation}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Team Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Team Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {activeMembers.length}
              </div>
              <div className="text-sm text-gray-500">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {members.filter(m => m.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-500">Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {pendingInvitations.length}
              </div>
              <div className="text-sm text-gray-500">Pending Invitations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
