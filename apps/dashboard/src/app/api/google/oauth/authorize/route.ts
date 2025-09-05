import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'
import { GoogleService, getScopesForServices } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { service, reconnect = false, integrationId } = await request.json()

    if (!service || !['analytics', 'search_console', 'business_profile'].includes(service)) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
    }

    // Get Google OAuth configuration from environment
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 500 })
    }

    // Get scopes for the specific service
    const scopes = getScopesForServices([service])
    
    // Generate state parameter for OAuth flow
    const state = JSON.stringify({
      userId: user.id,
      service,
      reconnect,
      integrationId: integrationId || null,
      timestamp: Date.now()
    })

    // Create OAuth configuration
    const oauthConfig = {
      clientId,
      clientSecret,
      redirectUri,
      scopes
    }

    // Generate authorization URL
    const authorizationUrl = GoogleService.getAuthorizationUrl(oauthConfig) + 
      `&state=${encodeURIComponent(state)}`

    return NextResponse.json({ authorizationUrl })
  } catch (error) {
    console.error('Error generating authorization URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    )
  }
}
