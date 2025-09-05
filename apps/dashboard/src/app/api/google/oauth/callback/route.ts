import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'
import { GoogleService, getScopesForServices } from '@naveeg/lib/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', request.url))
    }

    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(new URL('/dashboard/google?error=oauth_error', request.url))
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/dashboard/google?error=missing_parameters', request.url))
    }

    // Parse state parameter
    let stateData
    try {
      stateData = JSON.parse(decodeURIComponent(state))
    } catch (err) {
      console.error('Invalid state parameter:', err)
      return NextResponse.redirect(new URL('/dashboard/google?error=invalid_state', request.url))
    }

    const { userId, service, reconnect, integrationId } = stateData

    // Verify user matches state
    if (userId !== user.id) {
      return NextResponse.redirect(new URL('/dashboard/google?error=user_mismatch', request.url))
    }

    // Get Google OAuth configuration
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.redirect(new URL('/dashboard/google?error=oauth_not_configured', request.url))
    }

    // Exchange code for tokens
    const oauthConfig = {
      clientId,
      clientSecret,
      redirectUri,
      scopes: getScopesForServices([service])
    }

    const tokens = await GoogleService.exchangeCodeForTokens(code, oauthConfig)

    // Calculate expiration time
    const expiresAt = Date.now() + (tokens.expiresIn * 1000)

    if (reconnect && integrationId) {
      // Update existing integration
      const { error: updateError } = await supabase
        .from('google_integrations')
        .update({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: new Date(expiresAt).toISOString(),
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', integrationId)
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Error updating integration:', updateError)
        return NextResponse.redirect(new URL('/dashboard/google?error=update_failed', request.url))
      }
    } else {
      // Create new integration
      const { error: insertError } = await supabase
        .from('google_integrations')
        .insert({
          user_id: user.id,
          type: service,
          account_id: '', // Will be populated when we fetch account info
          account_name: '', // Will be populated when we fetch account info
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: new Date(expiresAt).toISOString(),
          is_active: true
        })

      if (insertError) {
        console.error('Error creating integration:', insertError)
        return NextResponse.redirect(new URL('/dashboard/google?error=create_failed', request.url))
      }
    }

    // Redirect back to Google integrations page with success
    return NextResponse.redirect(new URL('/dashboard/google?success=connected', request.url))
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/dashboard/google?error=callback_failed', request.url))
  }
}
