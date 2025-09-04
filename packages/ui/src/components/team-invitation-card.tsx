import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"
import { TeamInvitation } from "@naveeg/lib"

export interface TeamInvitationCardProps {
  invitation: TeamInvitation
  onRevoke: (invitationId: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function TeamInvitationCard({
  invitation,
  onRevoke,
  loading = false,
  className
}: TeamInvitationCardProps) {
  const [isRevoking, setIsRevoking] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const isExpired = new Date(invitation.expires_at) < new Date()
  const isPending = invitation.status === 'pending'

  const handleRevoke = async () => {
    setIsRevoking(true)
    setError(null)

    try {
      const result = await onRevoke(invitation.id)
      if (!result.success) {
        setError(result.error || 'Failed to revoke invitation')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke invitation')
    } finally {
      setIsRevoking(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'revoked':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800'
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {invitation.email.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900">
                {invitation.email}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Invited to join the team
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getRoleColor(invitation.role)
                )}>
                  {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                </span>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getStatusColor(invitation.status)
                )}>
                  {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                </span>
                {isExpired && isPending && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Expired
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Invited {new Date(invitation.created_at).toLocaleDateString()}
                {invitation.expires_at && (
                  <> • Expires {new Date(invitation.expires_at).toLocaleDateString()}</>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPending && !isExpired && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRevoke}
                disabled={isRevoking || loading}
                className="text-red-600 hover:text-red-700"
              >
                {isRevoking ? 'Revoking...' : 'Revoke'}
              </Button>
            )}
            {isExpired && isPending && (
              <span className="text-sm text-gray-500 italic">Expired</span>
            )}
            {invitation.status === 'accepted' && (
              <span className="text-sm text-green-600 italic">Accepted</span>
            )}
            {invitation.status === 'revoked' && (
              <span className="text-sm text-gray-500 italic">Revoked</span>
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
