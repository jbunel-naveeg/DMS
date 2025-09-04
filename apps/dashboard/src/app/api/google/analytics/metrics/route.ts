import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib'
import { GoogleAnalyticsService } from '@naveeg/lib'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const propertyId = searchParams.get('propertyId')

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 })
    }

    // Get user's Google Analytics integration
    const { data: integration, error: integrationError } = await supabase
      .from('google_integrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'analytics')
      .eq('is_active', true)
      .single()

    if (integrationError || !integration) {
      return NextResponse.json({ error: 'No active Google Analytics integration found' }, { status: 404 })
    }

    // Check if access token is expired
    const now = Date.now()
    const expiresAt = new Date(integration.expires_at).getTime()
    
    if (now >= expiresAt) {
      // Try to refresh the token
      try {
        const refreshedTokens = await refreshAccessToken(integration.refresh_token)
        
        // Update the integration with new tokens
        await supabase
          .from('google_integrations')
          .update({
            access_token: refreshedTokens.accessToken,
            expires_at: new Date(Date.now() + (refreshedTokens.expiresIn * 1000)).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', integration.id)

        integration.access_token = refreshedTokens.accessToken
      } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError)
        return NextResponse.json({ error: 'Failed to refresh access token' }, { status: 401 })
      }
    }

    // Create Google Analytics service
    const analyticsService = new GoogleAnalyticsService(integration.access_token)

    // Get the property ID to use
    const targetPropertyId = propertyId || integration.property_id

    if (!targetPropertyId) {
      return NextResponse.json({ error: 'No property ID configured for this integration' }, { status: 400 })
    }

    // Get analytics metrics
    const metrics = await analyticsService.getMetrics(targetPropertyId, startDate, endDate)

    return NextResponse.json({ metrics })
  } catch (error) {
    console.error('Error fetching analytics metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics metrics' },
      { status: 500 }
    )
  }
}

async function refreshAccessToken(refreshToken: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth not configured')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in
  }
}
