import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Forward to N8N workflow
    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_URL}/webhook/lead-captured`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        source: 'marketing_site',
        timestamp: new Date().toISOString()
      })
    })

    if (!n8nResponse.ok) {
      throw new Error('Failed to process lead in N8N')
    }

    const result = await n8nResponse.json()
    
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      lead_id: result.lead_id
    })
  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
