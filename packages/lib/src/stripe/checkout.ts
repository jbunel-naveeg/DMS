import Stripe from 'stripe'
import { PLANS } from '../types/plans'

export interface CheckoutSession {
  id: string
  url: string
  customer_email?: string
  customer_id?: string
  subscription_id?: string
}

export interface CreateCheckoutSessionRequest {
  plan_id: string
  customer_id?: string
  customer_email?: string
  success_url: string
  cancel_url: string
  trial_period_days?: number
}

export interface CreateCheckoutSessionResponse {
  success: boolean
  session?: CheckoutSession
  error?: string
}

export class StripeCheckoutService {
  private stripe: Stripe

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16',
    })
  }

  async createCheckoutSession(
    request: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    try {
      const plan = PLANS.find(p => p.id === request.plan_id)
      if (!plan) {
        return {
          success: false,
          error: 'Plan not found'
        }
      }

      if (!plan.stripe_price_id) {
        return {
          success: false,
          error: 'Plan does not support Stripe checkout'
        }
      }

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: plan.stripe_price_id,
            quantity: 1,
          },
        ],
        success_url: request.success_url,
        cancel_url: request.cancel_url,
        metadata: {
          plan_id: plan.id,
        },
      }

      // Add customer information if provided
      if (request.customer_id) {
        sessionParams.customer = request.customer_id
      } else if (request.customer_email) {
        sessionParams.customer_email = request.customer_email
      }

      // Add trial period if specified
      if (request.trial_period_days && request.trial_period_days > 0) {
        sessionParams.subscription_data = {
          trial_period_days: request.trial_period_days,
        }
      }

      const session = await this.stripe.checkout.sessions.create(sessionParams)

      return {
        success: true,
        session: {
          id: session.id,
          url: session.url!,
          customer_email: session.customer_email || undefined,
          customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
          subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create checkout session'
      }
    }
  }

  async retrieveCheckoutSession(sessionId: string): Promise<CheckoutSession | null> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      
      return {
        id: session.id,
        url: session.url!,
        customer_email: session.customer_email || undefined,
        customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
        subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
      }
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return null
    }
  }

  async createCustomerPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string } | null> {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      })

      return { url: session.url }
    } catch (error) {
      console.error('Error creating customer portal session:', error)
      return null
    }
  }
}

// Create a singleton instance
export const stripeCheckoutService = new StripeCheckoutService(
  process.env.STRIPE_SECRET_KEY || ''
)
