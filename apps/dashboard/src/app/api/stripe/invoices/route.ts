import { NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib'
import { stripeSubscriptionService } from '@naveeg/lib'

export async function GET() {
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
        { success: true, invoices: [] }
      )
    }

    // Get upcoming invoice
    const upcomingInvoice = await stripeSubscriptionService.getUpcomingInvoice(
      userPlan.stripe_customer_id
    )

    // For now, return empty array - in a real implementation, you'd fetch invoices from Stripe
    // This would require additional Stripe API calls to list invoices
    const invoices = upcomingInvoice ? [upcomingInvoice] : []

    return NextResponse.json({
      success: true,
      invoices: invoices.map(invoice => ({
        id: invoice.id,
        number: invoice.number,
        status: invoice.status,
        amount_paid: invoice.amount_paid,
        amount_due: invoice.amount_due,
        currency: invoice.currency,
        created: invoice.created,
        due_date: invoice.due_date,
        hosted_invoice_url: invoice.hosted_invoice_url,
        invoice_pdf: invoice.invoice_pdf,
      }))
    })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
