'use client'

import { useState, useEffect } from 'react'
import { useUserData } from '@naveeg/lib'
import { 
  Button,
  PricingCard,
  BillingInfo,
  InvoiceList
} from '@naveeg/ui'
import { PLANS } from '@naveeg/lib'

export default function BillingPage() {
  const { plan, loading: userDataLoading } = useUserData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invoices, setInvoices] = useState<Array<{
    id: string
    number: string
    status: 'paid' | 'open' | 'void' | 'uncollectible'
    amount_paid: number
    amount_due: number
    currency: string
    created: number
    due_date?: number
    hosted_invoice_url?: string
    invoice_pdf?: string
  }>>([])

  const currentPlan = plan?.plan || PLANS.find(p => p.id === 'trial')!

  const handlePlanSelect = async (planId: string) => {
    if (planId === currentPlan.id) return

    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          success_url: `${window.location.origin}/dashboard/billing?success=true`,
          cancel_url: `${window.location.origin}/dashboard/billing?canceled=true`,
        }),
      })

      const data = await response.json()

      if (data.success && data.session?.url) {
        window.location.href = data.session.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout process')
    } finally {
      setLoading(false)
    }
  }

  const handleManageBilling = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create portal session')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open billing portal')
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = () => {
    const suggestedPlan = PLANS.find(p => p.id === 'starter')
    if (suggestedPlan) {
      handlePlanSelect(suggestedPlan.id)
    }
  }

  const handleCancel = async () => {
    if (!plan?.stripe_subscription_id) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: plan.stripe_subscription_id,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh the page to update the plan status
        window.location.reload()
      } else {
        throw new Error(data.error || 'Failed to cancel subscription')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    // This would typically download the invoice PDF
    console.log('Download invoice:', invoiceId)
  }

  const handleViewInvoice = (invoiceId: string) => {
    // This would open the invoice in a new tab
    console.log('View invoice:', invoiceId)
  }

  // Load invoices
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await fetch('/api/stripe/invoices')
        const data = await response.json()
        
        if (data.success) {
          setInvoices(data.invoices || [])
        }
      } catch (err) {
        console.error('Failed to load invoices:', err)
      }
    }

    if (plan?.stripe_subscription_id) {
      loadInvoices()
    }
  }, [plan?.stripe_subscription_id])

  if (userDataLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="mt-2 text-gray-600">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Current Plan Info */}
      {plan && (
        <div className="mb-8">
          <BillingInfo
            subscription={{
              id: plan.stripe_subscription_id || 'trial',
              status: plan.status,
              current_period_start: plan.current_period_start,
              current_period_end: plan.current_period_end,
              cancel_at_period_end: plan.cancel_at_period_end,
              plan: {
                id: plan.plan.id,
                name: plan.plan.name,
                price: plan.plan.price,
                interval: plan.plan.interval,
              }
            }}
            onManageBilling={handleManageBilling}
            onUpgrade={handleUpgrade}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANS.map((planOption) => (
            <PricingCard
              key={planOption.id}
              plan={planOption}
              currentPlanId={currentPlan.id}
              onSelect={handlePlanSelect}
              loading={loading}
            />
          ))}
        </div>
      </div>

      {/* Invoices */}
      {plan?.stripe_subscription_id && (
        <div className="mb-8">
          <InvoiceList
            invoices={invoices}
            onDownload={handleDownloadInvoice}
            onView={handleViewInvoice}
            loading={loading}
          />
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Billing Questions</h4>
            <p className="text-sm text-gray-600 mb-3">
              Have questions about your subscription or billing? We&apos;re here to help.
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Plan Comparison</h4>
            <p className="text-sm text-gray-600 mb-3">
              Not sure which plan is right for you? Compare all features.
            </p>
            <Button variant="outline" size="sm">
              Compare Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}