import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, tenWebAPI } from '@naveeg/lib/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const websiteId = searchParams.get('website_id')

    if (!websiteId) {
      return NextResponse.json(
        { success: false, error: 'Website ID is required' },
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

    // Verify the website belongs to the user
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('id, user_id')
      .eq('id', websiteId)
      .eq('user_id', user.id)
      .single()

    if (websiteError || !website) {
      return NextResponse.json(
        { success: false, error: 'Website not found' },
        { status: 404 }
      )
    }

    // Get domains from database
    const { data: domains, error: domainsError } = await supabase
      .from('domains')
      .select('*')
      .eq('website_id', websiteId)
      .order('created_at', { ascending: false })

    if (domainsError) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch domains' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      domains: domains || []
    })
  } catch (error) {
    console.error('Error fetching domains:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { website_id, domain } = await request.json()

    if (!website_id || !domain) {
      return NextResponse.json(
        { success: false, error: 'Website ID and domain are required' },
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

    // Verify the website belongs to the user
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('id, user_id, name')
      .eq('id', website_id)
      .eq('user_id', user.id)
      .single()

    if (websiteError || !website) {
      return NextResponse.json(
        { success: false, error: 'Website not found' },
        { status: 404 }
      )
    }

    // Create domain using 10Web API
    const result = await tenWebAPI.createDomain({
      site_id: website_id,
      domain: domain
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create domain' },
        { status: 400 }
      )
    }

    // Save domain to database
    const { data: newDomain, error: dbError } = await supabase
      .from('domains')
      .insert({
        id: result.domain!.id,
        website_id: website_id,
        domain: domain,
        status: result.domain!.status,
        ssl_enabled: result.domain!.ssl_enabled,
        created_at: result.domain!.created_at,
        updated_at: result.domain!.updated_at
      })
      .select()
      .single()

    if (dbError) {
      return NextResponse.json(
        { success: false, error: 'Failed to save domain to database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      domain: newDomain
    })
  } catch (error) {
    console.error('Error creating domain:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
