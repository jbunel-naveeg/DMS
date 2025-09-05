import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { createServerClient } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('No Stripe signature found')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('No webhook secret configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log('Received Stripe webhook event:', event.type)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as {
          mode: string
          metadata?: {
            website_id?: string
            plan_id?: string
          }
          customer?: string
          subscription?: string
        }
        
        if (session.mode === 'subscription') {
          const websiteId = session.metadata?.website_id
          const planId = session.metadata?.plan_id
          
          if (!websiteId || !planId) {
            console.error('Missing website_id or plan_id in session metadata')
            return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
          }

          // Update the website with the new plan
          const supabase = createServerClient(request)
          const { error } = await supabase
            .from('websites')
            .update({
              plan_id: planId,
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              upgraded_at: new Date().toISOString(),
            })
            .eq('id', websiteId)

          if (error) {
            console.error('Error updating website plan:', error)
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
          }

          console.log(`Successfully upgraded website ${websiteId} to plan ${planId}`)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as {
          subscription?: string
        }
        
        if (invoice.subscription) {
          console.log(`Payment succeeded for subscription ${invoice.subscription}`)
          // You can add logic here to update last_paid_at or send confirmation emails
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as {
          id: string
          status: string
        }
        
        // Handle subscription changes (e.g., plan upgrades/downgrades)
        console.log(`Subscription ${subscription.id} updated:`, subscription.status)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as {
          id: string
        }
        
        // Handle subscription cancellation
        const supabase = createServerClient(request)
        const { error } = await supabase
          .from('websites')
          .update({
            plan_id: 'trial', // Downgrade to trial
            cancelled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Error updating cancelled subscription:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        console.log(`Subscription ${subscription.id} cancelled`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint is active' })
}
