import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@naveeg/lib/server'
import { tenWebAPI } from '@naveeg/lib/server'

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
    const supabase = createServerSupabaseClient()
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

    // Verify domain ownership using 10Web API
    const result = await tenWebAPI.verifyDomainOwnership(domain.domain)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to verify domain' },
        { status: 400 }
      )
    }

    if (!result.verified) {
      return NextResponse.json(
        { success: false, error: 'Domain ownership verification failed' },
        { status: 400 }
      )
    }

    // Update domain status in database
    const { error: updateError } = await supabase
      .from('domains')
      .update({
        status: 'active',
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', domainId)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Failed to update domain status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error verifying domain:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
