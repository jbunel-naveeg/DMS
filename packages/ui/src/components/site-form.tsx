import * as React from "react"
import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "../lib/utils"

export interface SiteFormData {
  name: string
  subdomain: string
  template: string
  description?: string
}

export interface SiteFormProps {
  onSubmit: (data: SiteFormData) => Promise<{ error?: string }>
  loading?: boolean
  className?: string
}

const TEMPLATES = [
  { id: 'business', name: 'Business', description: 'Professional business website' },
  { id: 'portfolio', name: 'Portfolio', description: 'Creative portfolio showcase' },
  { id: 'blog', name: 'Blog', description: 'Content-focused blog site' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online store with shopping cart' },
  { id: 'restaurant', name: 'Restaurant', description: 'Restaurant with menu and reservations' },
  { id: 'agency', name: 'Agency', description: 'Marketing agency website' },
]

export function SiteForm({ onSubmit, loading = false, className }: SiteFormProps) {
  const [formData, setFormData] = useState<SiteFormData>({
    name: '',
    subdomain: '',
    template: 'business',
    description: ''
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

  const handleInputChange = (field: keyof SiteFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const generateSubdomain = () => {
    const subdomain = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    setFormData(prev => ({ ...prev, subdomain }))
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle>Create Your Website</CardTitle>
        <CardDescription>
          Let's set up your new WordPress website. Choose a name, subdomain, and template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="My Awesome Website"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                disabled={isSubmitting || loading}
              />
              <p className="text-xs text-gray-500">
                This will be the title of your website
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain *</Label>
              <div className="flex space-x-2">
                <Input
                  id="subdomain"
                  type="text"
                  placeholder="my-awesome-website"
                  value={formData.subdomain}
                  onChange={handleInputChange('subdomain')}
                  required
                  disabled={isSubmitting || loading}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateSubdomain}
                  disabled={isSubmitting || loading || !formData.name}
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Your site will be available at: {formData.subdomain ? `${formData.subdomain}.naveeg.com` : 'subdomain.naveeg.com'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template *</Label>
            <select
              id="template"
              value={formData.template}
              onChange={handleInputChange('template')}
              disabled={isSubmitting || loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.description}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <textarea
              id="description"
              placeholder="Brief description of your website..."
              value={formData.description}
              onChange={handleInputChange('description')}
              disabled={isSubmitting || loading}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || loading || !formData.name || !formData.subdomain}
            >
              {isSubmitting ? 'Creating Website...' : 'Create Website'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
