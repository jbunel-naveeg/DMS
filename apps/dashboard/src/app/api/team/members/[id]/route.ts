import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib'
import { TeamService } from '@naveeg/lib'

export async function PUT(
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
    const updates = await request.json()

    // Get the team member to check permissions
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('website_id, user_id')
      .eq('id', id)
      .single()

    if (memberError || !member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    // Check if user has permission to manage team members
    const teamService = TeamService.createServerInstance(request.cookies)
    const canManageTeam = await teamService.checkPermission(user.id, member.website_id, 'can_manage_team')
    
    if (!canManageTeam) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    // Update the team member
    const { data, error } = await teamService.updateTeamMember(id, updates)

    if (error) {
      console.error('Error updating team member:', error)
      return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
    }

    return NextResponse.json({ member: data })
  } catch (error) {
    console.error('Error in update team member API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    // Get the team member to check permissions
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('website_id, user_id')
      .eq('id', id)
      .single()

    if (memberError || !member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    // Check if user has permission to manage team members
    const teamService = TeamService.createServerInstance(request.cookies)
    const canManageTeam = await teamService.checkPermission(user.id, member.website_id, 'can_manage_team')
    
    if (!canManageTeam) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    // Prevent users from removing themselves
    if (member.user_id === user.id) {
      return NextResponse.json({ error: 'Cannot remove yourself from the team' }, { status: 400 })
    }

    // Remove the team member
    const { error } = await teamService.removeTeamMember(id)

    if (error) {
      console.error('Error removing team member:', error)
      return NextResponse.json({ error: 'Failed to remove team member' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in remove team member API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
