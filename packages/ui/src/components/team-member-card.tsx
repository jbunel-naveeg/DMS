import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"
import { TeamMember, TEAM_MEMBER_STATUS_COLORS, TEAM_MEMBER_ROLE_COLORS } from "@naveeg/lib"

export interface TeamMemberCardProps {
  member: TeamMember
  currentUserId: string
  onUpdateRole: (memberId: string, role: 'admin' | 'editor') => Promise<{ success: boolean; error?: string }>
  onUpdateStatus: (memberId: string, status: 'active' | 'suspended') => Promise<{ success: boolean; error?: string }>
  onRemove: (memberId: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function TeamMemberCard({
  member,
  currentUserId,
  onUpdateRole,
  onUpdateStatus,
  onRemove,
  loading = false,
  className
}: TeamMemberCardProps) {
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const isCurrentUser = member.user_id === currentUserId
  const canManage = member.role === 'admin' || isCurrentUser

  const handleRoleChange = async (newRole: 'admin' | 'editor') => {
    if (isCurrentUser) return // Can't change own role
    
    setIsUpdating(true)
    setError(null)

    try {
      const result = await onUpdateRole(member.id, newRole)
      if (!result.success) {
        setError(result.error || 'Failed to update role')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleStatusChange = async (newStatus: 'active' | 'suspended') => {
    if (isCurrentUser) return // Can't change own status
    
    setIsUpdating(true)
    setError(null)

    try {
      const result = await onUpdateStatus(member.id, newStatus)
      if (!result.success) {
        setError(result.error || 'Failed to update status')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (isCurrentUser) return // Can't remove self
    
    setIsUpdating(true)
    setError(null)

    try {
      const result = await onRemove(member.id)
      if (!result.success) {
        setError(result.error || 'Failed to remove member')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member')
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    const color = TEAM_MEMBER_STATUS_COLORS[status as keyof typeof TEAM_MEMBER_STATUS_COLORS]
    return color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
           color === 'green' ? 'bg-green-100 text-green-800' :
           color === 'red' ? 'bg-red-100 text-red-800' :
           'bg-gray-100 text-gray-800'
  }

  const getRoleColor = (role: string) => {
    const color = TEAM_MEMBER_ROLE_COLORS[role as keyof typeof TEAM_MEMBER_ROLE_COLORS]
    return color === 'purple' ? 'bg-purple-100 text-purple-800' :
           color === 'blue' ? 'bg-blue-100 text-blue-800' :
           'bg-gray-100 text-gray-800'
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {member.user?.avatar_url ? (
                <img
                  src={member.user.avatar_url}
                  alt={member.user.full_name || member.user.email}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {(member.user?.full_name || member.user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900">
                {member.user?.full_name || 'Unknown User'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {member.user?.email || 'No email'}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getRoleColor(member.role)
                )}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getStatusColor(member.status)
                )}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {member.joined_at ? (
                  <>Joined {new Date(member.joined_at).toLocaleDateString()}</>
                ) : (
                  <>Invited {new Date(member.invited_at).toLocaleDateString()}</>
                )}
                {member.last_active && (
                  <> • Last active {new Date(member.last_active).toLocaleDateString()}</>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isCurrentUser && canManage && (
              <>
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(e.target.value as 'admin' | 'editor')}
                  disabled={isUpdating || loading}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <select
                  value={member.status}
                  onChange={(e) => handleStatusChange(e.target.value as 'active' | 'suspended')}
                  disabled={isUpdating || loading}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUpdating || loading}
                  className="text-red-600 hover:text-red-700"
                >
                  {isUpdating ? '...' : 'Remove'}
                </Button>
              </>
            )}
            {isCurrentUser && (
              <span className="text-sm text-gray-500 italic">You</span>
            )}
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
