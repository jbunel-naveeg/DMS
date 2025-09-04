import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib'

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

    // Delete the integration
    const { error } = await supabase
      .from('google_integrations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting integration:', error)
      return NextResponse.json({ error: 'Failed to delete integration' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in delete integration API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    // Update the integration
    const { data: integration, error } = await supabase
      .from('google_integrations')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating integration:', error)
      return NextResponse.json({ error: 'Failed to update integration' }, { status: 500 })
    }

    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Error in update integration API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
