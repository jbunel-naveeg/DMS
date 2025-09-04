import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib'
import { tenWebAPI } from '@naveeg/lib'

export async function POST(
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
        domain, 
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

    // Request SSL certificate using 10Web API
    const result = await tenWebAPI.requestSSLCertificate(domainId)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to request SSL certificate' },
        { status: 400 }
      )
    }

    // Update domain SSL status in database
    const { error: updateError } = await supabase
      .from('domains')
      .update({
        ssl_status: 'pending',
        ssl_enabled: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', domainId)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Failed to update domain SSL status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error requesting SSL certificate:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
