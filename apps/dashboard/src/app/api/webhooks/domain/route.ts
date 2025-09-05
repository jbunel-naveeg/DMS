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
    if (!body.action || !body.domain) {
      return NextResponse.json(
        { error: 'Action and domain are required' },
        { status: 400 }
      )
    }

    // Validate action
    const validActions = ['verify', 'ssl_request', 'delete']
    if (!validActions.includes(body.action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be one of: verify, ssl_request, delete' },
        { status: 400 }
      )
    }

    // Forward to N8N workflow
    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_URL}/webhook/domain-webhook`, {
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
      throw new Error('Failed to process domain action in N8N')
    }

    const result = await n8nResponse.json()
    
    return NextResponse.json({
      success: true,
      message: 'Domain action processed successfully',
      domain: result.domain,
      status: result.status
    })
  } catch (error) {
    console.error('Error processing domain action:', error)
    return NextResponse.json(
      { error: 'Failed to process domain action' },
      { status: 500 }
    )
  }
}
