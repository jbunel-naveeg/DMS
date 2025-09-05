import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's Google integrations
    const { data: integrations, error } = await supabase
      .from('google_integrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching integrations:', error)
      return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 })
    }

    return NextResponse.json({ integrations: integrations || [] })
  } catch (error) {
    console.error('Error in integrations API:', error)
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

    const { type, accountId, accountName, propertyId, siteUrl, locationId, accessToken, refreshToken, expiresAt } = await request.json()

    if (!type || !['analytics', 'search_console', 'business_profile'].includes(type)) {
      return NextResponse.json({ error: 'Invalid integration type' }, { status: 400 })
    }

    // Create new integration
    const { data: integration, error } = await supabase
      .from('google_integrations')
      .insert({
        user_id: user.id,
        type,
        account_id: accountId || '',
        account_name: accountName || '',
        property_id: propertyId || null,
        site_url: siteUrl || null,
        location_id: locationId || null,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating integration:', error)
      return NextResponse.json({ error: 'Failed to create integration' }, { status: 500 })
    }

    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Error in create integration API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
