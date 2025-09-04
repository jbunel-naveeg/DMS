import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface Invoice {
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
}

export interface InvoiceListProps {
  invoices: Invoice[]
  onDownload: (invoiceId: string) => void
  onView: (invoiceId: string) => void
  loading?: boolean
  className?: string
}

export function InvoiceList({ 
  invoices, 
  onDownload, 
  onView, 
  loading = false, 
  className 
}: InvoiceListProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100'
      case 'open':
        return 'text-yellow-600 bg-yellow-100'
      case 'void':
        return 'text-gray-600 bg-gray-100'
      case 'uncollectible':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid'
      case 'open':
        return 'Open'
      case 'void':
        return 'Void'
      case 'uncollectible':
        return 'Uncollectible'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (invoices.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your invoices will appear here once you have a paid subscription.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Your billing history</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Invoice #{invoice.number}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(invoice.created)}
                    </p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    getStatusColor(invoice.status)
                  )}>
                    {getStatusText(invoice.status)}
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm font-medium text-gray-900">
                    {formatAmount(invoice.amount_paid, invoice.currency)}
                  </p>
                  {invoice.amount_due > 0 && (
                    <p className="text-xs text-red-600">
                      {formatAmount(invoice.amount_due, invoice.currency)} due
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {invoice.hosted_invoice_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(invoice.id)}
                  >
                    View
                  </Button>
                )}
                {invoice.invoice_pdf && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload(invoice.id)}
                  >
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
