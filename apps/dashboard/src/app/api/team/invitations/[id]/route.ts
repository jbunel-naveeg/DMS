import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib'
import { TeamService } from '@naveeg/lib'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Get the invitation to check permissions
    const { data: invitation, error: invitationError } = await supabase
      .from('team_invitations')
      .select('website_id')
      .eq('id', id)
      .single()

    if (invitationError || !invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Check if user has permission to manage team invitations
    const teamService = TeamService.createServerInstance(request.cookies)
    const canManageTeam = await teamService.checkPermission(user.id, invitation.website_id, 'can_manage_team')
    
    if (!canManageTeam) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    // Revoke the invitation
    const { error } = await teamService.revokeInvitation(id)

    if (error) {
      console.error('Error revoking invitation:', error)
      return NextResponse.json({ error: 'Failed to revoke invitation' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in revoke invitation API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
