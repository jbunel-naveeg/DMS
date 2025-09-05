import Stripe from 'stripe'
import { UserPlan } from '../types/plans'

export interface Subscription {
  id: string
  customer_id: string
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  canceled_at?: number
  trial_start?: number
  trial_end?: number
  plan_id: string
  price_id: string
  created: number
}

export interface CreateSubscriptionRequest {
  customer_id: string
  price_id: string
  trial_period_days?: number
}

export interface CreateSubscriptionResponse {
  success: boolean
  subscription?: Subscription
  error?: string
}

export interface UpdateSubscriptionRequest {
  subscription_id: string
  price_id?: string
  cancel_at_period_end?: boolean
}

export interface UpdateSubscriptionResponse {
  success: boolean
  subscription?: Subscription
  error?: string
}

export interface CancelSubscriptionRequest {
  subscription_id: string
  immediately?: boolean
}

export interface CancelSubscriptionResponse {
  success: boolean
  subscription?: Subscription
  error?: string
}

export class StripeSubscriptionService {
  private stripe: Stripe

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16',
    })
  }

  async createSubscription(
    request: CreateSubscriptionRequest
  ): Promise<CreateSubscriptionResponse> {
    try {
      const subscriptionParams: Stripe.SubscriptionCreateParams = {
        customer: request.customer_id,
        items: [
          {
            price: request.price_id,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      }

      if (request.trial_period_days && request.trial_period_days > 0) {
        subscriptionParams.trial_period_days = request.trial_period_days
      }

      const subscription = await this.stripe.subscriptions.create(subscriptionParams)

      return {
        success: true,
        subscription: this.mapSubscription(subscription),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create subscription'
      }
    }
  }

  async updateSubscription(
    request: UpdateSubscriptionRequest
  ): Promise<UpdateSubscriptionResponse> {
    try {
      const updateParams: Stripe.SubscriptionUpdateParams = {}

      if (request.price_id) {
        const subscription = await this.stripe.subscriptions.retrieve(request.subscription_id)
        await this.stripe.subscriptions.update(request.subscription_id, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: request.price_id,
            },
          ],
        })
      }

      if (request.cancel_at_period_end !== undefined) {
        updateParams.cancel_at_period_end = request.cancel_at_period_end
      }

      if (Object.keys(updateParams).length > 0) {
        const subscription = await this.stripe.subscriptions.update(
          request.subscription_id,
          updateParams
        )

        return {
          success: true,
          subscription: this.mapSubscription(subscription),
        }
      }

      // If no updates needed, just return the current subscription
      const subscription = await this.stripe.subscriptions.retrieve(request.subscription_id)
      return {
        success: true,
        subscription: this.mapSubscription(subscription),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update subscription'
      }
    }
  }

  async cancelSubscription(
    request: CancelSubscriptionRequest
  ): Promise<CancelSubscriptionResponse> {
    try {
      let subscription: Stripe.Subscription

      if (request.immediately) {
        subscription = await this.stripe.subscriptions.cancel(request.subscription_id)
      } else {
        subscription = await this.stripe.subscriptions.update(request.subscription_id, {
          cancel_at_period_end: true,
        })
      }

      return {
        success: true,
        subscription: this.mapSubscription(subscription),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel subscription'
      }
    }
  }

  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId)
      return this.mapSubscription(subscription)
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      return null
    }
  }

  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
      })

      return subscriptions.data.map(sub => this.mapSubscription(sub))
    } catch (error) {
      console.error('Error retrieving customer subscriptions:', error)
      return []
    }
  }

  async getUpcomingInvoice(customerId: string): Promise<Stripe.Invoice | null> {
    try {
      const invoice = await this.stripe.invoices.retrieveUpcoming({
        customer: customerId,
      })
      return invoice as unknown as Stripe.Invoice
    } catch (error) {
      console.error('Error retrieving upcoming invoice:', error)
      return null
    }
  }

  private mapSubscription(subscription: Stripe.Subscription): Subscription {
    const price = subscription.items.data[0]?.price
    const planId = price?.metadata?.plan_id || 'unknown'

    return {
      id: subscription.id,
      customer_id: subscription.customer as string,
      status: subscription.status as 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid',
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at || undefined,
      trial_start: subscription.trial_start || undefined,
      trial_end: subscription.trial_end || undefined,
      plan_id: planId,
      price_id: price?.id || '',
      created: subscription.created,
    }
  }
}

// Create a singleton instance
export const stripeSubscriptionService = new StripeSubscriptionService(
  process.env.STRIPE_SECRET_KEY || ''
)
