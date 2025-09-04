import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response('Missing stripe-signature header', { status: 400 })
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!webhookSecret) {
      return new Response('Webhook secret not configured', { status: 500 })
    }

    // Verify webhook signature (simplified for demo - in production use Stripe's verification)
    const event: StripeWebhookEvent = JSON.parse(body)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Processing Stripe webhook:', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        await handleCheckoutCompleted(supabase, session)
        break
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        await handleSubscriptionChange(supabase, subscription)
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await handleSubscriptionDeleted(supabase, subscription)
        break
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        await handlePaymentSucceeded(supabase, invoice)
        break
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        await handlePaymentFailed(supabase, invoice)
        break
      }
      
      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in stripe-webhook function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function handleCheckoutCompleted(supabase: any, session: any) {
  const { customer_id, subscription_id, metadata } = session
  
  if (!customer_id || !subscription_id) {
    console.log('Missing customer_id or subscription_id in session')
    return
  }

  // Update website with Stripe customer and subscription IDs
  const { error } = await supabase
    .from('websites')
    .update({
      stripe_customer_id: customer_id,
      stripe_subscription_id: subscription_id,
      upgraded_at: new Date().toISOString()
    })
    .eq('id', metadata.website_id)

  if (error) {
    console.error('Error updating website with Stripe IDs:', error)
  } else {
    console.log('Updated website with Stripe customer and subscription IDs')
  }
}

async function handleSubscriptionChange(supabase: any, subscription: any) {
  const { customer, status, items } = subscription
  
  // Get the price ID from the subscription
  const priceId = items.data[0]?.price?.id
  if (!priceId) {
    console.log('No price ID found in subscription')
    return
  }

  // Find the plan by Stripe price ID
  const { data: plan } = await supabase
    .from('plans')
    .select('id, features')
    .eq('stripe_price_id', priceId)
    .single()

  if (!plan) {
    console.log('Plan not found for price ID:', priceId)
    return
  }

  // Update website plan and entitlements
  const { data: website } = await supabase
    .from('websites')
    .select('id')
    .eq('stripe_customer_id', customer)
    .single()

  if (!website) {
    console.log('Website not found for customer:', customer)
    return
  }

  // Update website plan
  await supabase
    .from('websites')
    .update({ plan_id: plan.id })
    .eq('id', website.id)

  // Update entitlements
  const entitlements = plan.features || {}
  const entitlementEntries = Object.entries(entitlements).map(([key, value]) => ({
    website_id: website.id,
    key,
    value
  }))

  // Delete existing entitlements and insert new ones
  await supabase
    .from('entitlements')
    .delete()
    .eq('website_id', website.id)

  if (entitlementEntries.length > 0) {
    await supabase
      .from('entitlements')
      .insert(entitlementEntries)
  }

  console.log('Updated website plan and entitlements')
}

async function handleSubscriptionDeleted(supabase: any, subscription: any) {
  const { customer } = subscription
  
  // Downgrade website to trial plan
  const { data: website } = await supabase
    .from('websites')
    .select('id')
    .eq('stripe_customer_id', customer)
    .single()

  if (!website) {
    console.log('Website not found for customer:', customer)
    return
  }

  // Update to trial plan
  await supabase
    .from('websites')
    .update({
      plan_id: 'trial',
      trial_starts_at: new Date().toISOString(),
      trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq('id', website.id)

  // Update entitlements to trial features
  const { data: trialPlan } = await supabase
    .from('plans')
    .select('features')
    .eq('id', 'trial')
    .single()

  if (trialPlan) {
    await supabase
      .from('entitlements')
      .delete()
      .eq('website_id', website.id)

    const entitlements = trialPlan.features || {}
    const entitlementEntries = Object.entries(entitlements).map(([key, value]) => ({
      website_id: website.id,
      key,
      value
    }))

    if (entitlementEntries.length > 0) {
      await supabase
        .from('entitlements')
        .insert(entitlementEntries)
    }
  }

  console.log('Downgraded website to trial plan')
}

async function handlePaymentSucceeded(supabase: any, invoice: any) {
  const { customer, subscription } = invoice
  
  // Update website status to active
  await supabase
    .from('websites')
    .update({ status: 'active' })
    .eq('stripe_customer_id', customer)

  console.log('Payment succeeded, website activated')
}

async function handlePaymentFailed(supabase: any, invoice: any) {
  const { customer } = invoice
  
  // Update website status to payment_failed
  await supabase
    .from('websites')
    .update({ status: 'payment_failed' })
    .eq('stripe_customer_id', customer)

  console.log('Payment failed, website status updated')
}
