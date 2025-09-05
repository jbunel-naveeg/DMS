import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib/server'
import { stripeCheckoutService } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    const { plan_id, success_url, cancel_url, trial_period_days } = await request.json()

    if (!plan_id || !success_url || !cancel_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
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

    // Create checkout session
    const result = await stripeCheckoutService.createCheckoutSession({
      plan_id,
      customer_email: user.email,
      success_url,
      cancel_url,
      trial_period_days,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      session: result.session
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
