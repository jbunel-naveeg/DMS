import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib'
import { tenWebAPI } from '@naveeg/lib'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const domainId = params.id

    if (!domainId) {
      return NextResponse.json(
        { success: false, error: 'Domain ID is required' },
        { status: 400 }
      )
    }

    // Get the current user
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify the domain belongs to the user
    const { data: domain, error: domainError } = await supabase
      .from('domains')
      .select(`
        id, 
        website_id, 
        websites!inner(
          user_id
        )
      `)
      .eq('id', domainId)
      .single()

    if (domainError || !domain || (domain.websites as { user_id: string }[])[0]?.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Domain not found' },
        { status: 404 }
      )
    }

    // Delete domain using 10Web API
    const success = await tenWebAPI.deleteDomain(domainId)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete domain from 10Web' },
        { status: 400 }
      )
    }

    // Delete domain from database
    const { error: dbError } = await supabase
      .from('domains')
      .delete()
      .eq('id', domainId)

    if (dbError) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete domain from database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error deleting domain:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
