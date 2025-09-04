import * as React from "react"
import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "../lib/utils"

export interface DomainFormData {
  domain: string
}

export interface DomainFormProps {
  siteUrl: string
  onSubmit: (data: DomainFormData) => Promise<{ error?: string }>
  onSkip: () => void
  loading?: boolean
  className?: string
}

export function DomainForm({ 
  siteUrl, 
  onSubmit, 
  onSkip, 
  loading = false, 
  className 
}: DomainFormProps) {
  const [formData, setFormData] = useState<DomainFormData>({
    domain: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const { error } = await onSubmit(formData)
      if (error) {
        setError(error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      domain: e.target.value
    }))
  }

  const isValidDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    return domainRegex.test(domain)
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle>Connect Custom Domain</CardTitle>
        <CardDescription>
          Add your own domain to your website. You can skip this step and do it later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Site Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900">Your Website</h4>
            <p className="text-sm text-blue-700 mt-1">
              Currently available at: <span className="font-mono">{siteUrl}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="domain">Custom Domain</Label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={formData.domain}
                onChange={handleInputChange}
                disabled={isSubmitting || loading}
                className={cn(
                  formData.domain && !isValidDomain(formData.domain) && "border-red-300"
                )}
              />
              <p className="text-xs text-gray-500">
                Enter your domain without www (e.g., example.com)
              </p>
              {formData.domain && !isValidDomain(formData.domain) && (
                <p className="text-xs text-red-600">
                  Please enter a valid domain name
                </p>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onSkip}
                disabled={isSubmitting || loading}
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || loading || !formData.domain || !isValidDomain(formData.domain)}
              >
                {isSubmitting ? 'Connecting Domain...' : 'Connect Domain'}
              </Button>
            </div>
          </form>

          {/* Domain Setup Instructions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Domain Setup Instructions</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>To connect your domain, you'll need to update your DNS settings:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Add a CNAME record pointing to <code className="bg-gray-200 px-1 rounded">naveeg.com</code></li>
                <li>Or add an A record pointing to our IP address</li>
                <li>Wait for DNS propagation (usually 5-30 minutes)</li>
              </ol>
              <p className="text-xs text-gray-500 mt-2">
                Need help? Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
