import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'
import { TeamService } from '@naveeg/lib/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const websiteId = searchParams.get('website_id')

    if (!websiteId) {
      return NextResponse.json({ error: 'Website ID is required' }, { status: 400 })
    }

    // Check if user has permission to view team members
    const teamService = TeamService.createServerInstance(request.cookies)
    const canManageTeam = await teamService.checkPermission(user.id, websiteId, 'can_manage_team')
    
    if (!canManageTeam) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    // Get team members
    const { data: members, error } = await teamService.getTeamMembers(websiteId)

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
    }

    return NextResponse.json({ members })
  } catch (error) {
    console.error('Error in team members API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, role, website_id } = await request.json()

    if (!email || !role || !website_id) {
      return NextResponse.json({ error: 'Email, role, and website_id are required' }, { status: 400 })
    }

    if (!['admin', 'editor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check if user has permission to add team members
    const teamService = TeamService.createServerInstance(request.cookies)
    const canManageTeam = await teamService.checkPermission(user.id, website_id, 'can_manage_team')
    
    if (!canManageTeam) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    // Add team member
    const { data, error } = await teamService.addTeamMember(website_id, email, role, user.id)

    if (error) {
      console.error('Error adding team member:', error)
      return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 })
    }

    return NextResponse.json({ member: data })
  } catch (error) {
    console.error('Error in add team member API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
