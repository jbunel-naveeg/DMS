import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib/server'
import { stripeSubscriptionService } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    const { subscription_id, immediately = false } = await request.json()

    if (!subscription_id) {
      return NextResponse.json(
        { success: false, error: 'Missing subscription ID' },
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

    // Verify the subscription belongs to the user
    const { data: userPlan, error: planError } = await supabase
      .from('user_plans')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .eq('stripe_subscription_id', subscription_id)
      .single()

    if (planError || !userPlan) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Cancel the subscription
    const result = await stripeSubscriptionService.cancelSubscription({
      subscription_id,
      immediately,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      subscription: result.subscription
    })
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
