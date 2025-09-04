import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export interface WebhookEvent {
  id: string
  type: string
  data: any
  created: number
}

export interface ProcessWebhookResponse {
  success: boolean
  error?: string
}

export class StripeWebhookService {
  private stripe: Stripe
  private supabase: any

  constructor(stripeSecretKey: string, supabaseUrl: string, supabaseServiceKey: string) {
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })
    this.supabase = createClient(supabaseUrl, supabaseServiceKey)
  }

  async processWebhook(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
  ): Promise<ProcessWebhookResponse> {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)
      
      switch (event.type) {
        case 'checkout.session.completed':
          return await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        
        case 'customer.subscription.created':
          return await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        
        case 'customer.subscription.updated':
          return await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        
        case 'customer.subscription.deleted':
          return await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        
        case 'invoice.payment_succeeded':
          return await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        
        case 'invoice.payment_failed':
          return await this.handlePaymentFailed(event.data.object as Stripe.Invoice)
        
        case 'customer.created':
          return await this.handleCustomerCreated(event.data.object as Stripe.Customer)
        
        case 'customer.updated':
          return await this.handleCustomerUpdated(event.data.object as Stripe.Customer)
        
        default:
          console.log(`Unhandled event type: ${event.type}`)
          return { success: true }
      }
    } catch (error) {
      console.error('Webhook processing error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook processing failed'
      }
    }
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<ProcessWebhookResponse> {
    try {
      const customerId = session.customer as string
      const subscriptionId = session.subscription as string
      const planId = session.metadata?.plan_id

      if (!customerId || !subscriptionId || !planId) {
        throw new Error('Missing required session data')
      }

      // Get the subscription details
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId)
      
      // Create or update user plan in database
      const { error } = await this.supabase
        .from('user_plans')
        .upsert({
          user_id: customerId, // Assuming customer_id maps to user_id
          plan_id: planId,
          stripe_subscription_id: subscriptionId,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling checkout session completed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process checkout session'
      }
    }
  }

  private async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<ProcessWebhookResponse> {
    try {
      const customerId = subscription.customer as string
      const planId = subscription.metadata?.plan_id || 'unknown'

      // Update user plan status
      const { error } = await this.supabase
        .from('user_plans')
        .update({
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling subscription created:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process subscription created'
      }
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<ProcessWebhookResponse> {
    try {
      // Update user plan with new subscription details
      const { error } = await this.supabase
        .from('user_plans')
        .update({
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling subscription updated:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process subscription updated'
      }
    }
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<ProcessWebhookResponse> {
    try {
      // Mark subscription as canceled
      const { error } = await this.supabase
        .from('user_plans')
        .update({
          status: 'canceled',
          canceled_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling subscription deleted:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process subscription deleted'
      }
    }
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<ProcessWebhookResponse> {
    try {
      const subscriptionId = invoice.subscription as string
      
      if (subscriptionId) {
        // Update subscription status to active
        const { error } = await this.supabase
          .from('user_plans')
          .update({
            status: 'active',
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling payment succeeded:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process payment succeeded'
      }
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<ProcessWebhookResponse> {
    try {
      const subscriptionId = invoice.subscription as string
      
      if (subscriptionId) {
        // Update subscription status to past_due
        const { error } = await this.supabase
          .from('user_plans')
          .update({
            status: 'past_due',
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error handling payment failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process payment failed'
      }
    }
  }

  private async handleCustomerCreated(customer: Stripe.Customer): Promise<ProcessWebhookResponse> {
    try {
      // Store customer information if needed
      // This could be used to sync customer data with your user records
      console.log('Customer created:', customer.id)
      return { success: true }
    } catch (error) {
      console.error('Error handling customer created:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process customer created'
      }
    }
  }

  private async handleCustomerUpdated(customer: Stripe.Customer): Promise<ProcessWebhookResponse> {
    try {
      // Update customer information if needed
      console.log('Customer updated:', customer.id)
      return { success: true }
    } catch (error) {
      console.error('Error handling customer updated:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process customer updated'
      }
    }
  }
}

// Create a singleton instance
export const stripeWebhookService = new StripeWebhookService(
  process.env.STRIPE_SECRET_KEY || '',
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)
