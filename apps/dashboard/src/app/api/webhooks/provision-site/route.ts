import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.site_name || !body.subdomain) {
      return NextResponse.json(
        { error: 'Site name and subdomain are required' },
        { status: 400 }
      )
    }

    // Forward to N8N workflow
    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_URL}/webhook/provision-site`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        user_id: user.id,
        timestamp: new Date().toISOString()
      })
    })

    if (!n8nResponse.ok) {
      throw new Error('Failed to provision site in N8N')
    }

    const result = await n8nResponse.json()
    
    return NextResponse.json({
      success: true,
      message: 'Site provisioning initiated',
      site_url: result.site_url,
      tenweb_site_id: result.tenweb_site_id
    })
  } catch (error) {
    console.error('Error provisioning site:', error)
    return NextResponse.json(
      { error: 'Failed to provision site' },
      { status: 500 }
    )
  }
}
