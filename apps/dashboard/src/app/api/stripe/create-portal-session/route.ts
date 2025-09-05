import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib/server'
import { stripeCheckoutService } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's Stripe customer ID
    const { data: userPlan, error: planError } = await supabase
      .from('user_plans')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (planError || !userPlan?.stripe_customer_id) {
      return NextResponse.json(
        { success: false, error: 'No billing information found' },
        { status: 404 }
      )
    }

    // Create customer portal session
    const returnUrl = `${request.nextUrl.origin}/dashboard/billing`
    const result = await stripeCheckoutService.createCustomerPortalSession(
      userPlan.stripe_customer_id,
      returnUrl
    )

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Failed to create portal session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      url: result.url
    })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
