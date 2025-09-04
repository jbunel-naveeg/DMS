import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "../lib/utils"

export interface DomainManagerProps {
  websiteId: string
  domains: Array<{
    id: string
    domain: string
    status: 'active' | 'inactive' | 'pending' | 'failed' | 'suspended'
    ssl_status: 'pending' | 'active' | 'failed' | 'expired'
    ssl_enabled: boolean
    verified_at?: string
    expires_at?: string
    nameservers?: string[]
    dns_records?: Array<{
      type: string
      name: string
      value: string
      ttl: number
    }>
  }>
  onAddDomain: (domain: string) => Promise<{ success: boolean; error?: string }>
  onRemoveDomain: (domainId: string) => Promise<{ success: boolean; error?: string }>
  onVerifyDomain: (domainId: string) => Promise<{ success: boolean; error?: string }>
  onRequestSSL: (domainId: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function DomainManager({
  websiteId,
  domains,
  onAddDomain,
  onRemoveDomain,
  onVerifyDomain,
  onRequestSSL,
  loading = false,
  className
}: DomainManagerProps) {
  const [newDomain, setNewDomain] = React.useState('')
  const [isAdding, setIsAdding] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDomain.trim()) return

    setIsAdding(true)
    setError(null)

    try {
      const result = await onAddDomain(newDomain.trim())
      if (result.success) {
        setNewDomain('')
      } else {
        setError(result.error || 'Failed to add domain')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add domain')
    } finally {
      setIsAdding(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
      case 'suspended':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'pending':
        return 'Pending'
      case 'failed':
        return 'Failed'
      case 'suspended':
        return 'Suspended'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const getSSLStatusColor = (sslStatus: string) => {
    switch (sslStatus) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
      case 'expired':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getSSLStatusText = (sslStatus: string) => {
    switch (sslStatus) {
      case 'active':
        return 'Active'
      case 'pending':
        return 'Pending'
      case 'failed':
        return 'Failed'
      case 'expired':
        return 'Expired'
      default:
        return sslStatus.charAt(0).toUpperCase() + sslStatus.slice(1)
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Add Domain Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Custom Domain</CardTitle>
          <CardDescription>
            Connect your own domain to your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddDomain} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                disabled={isAdding || loading}
              />
              <p className="text-sm text-gray-500">
                Enter your domain name without http:// or https://
              </p>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={!newDomain.trim() || isAdding || loading}
              className="w-full"
            >
              {isAdding ? 'Adding Domain...' : 'Add Domain'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Domains List */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Domains</CardTitle>
          <CardDescription>
            Manage your connected domains and SSL certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {domains.length === 0 ? (
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No domains connected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a custom domain to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {domains.map((domain) => (
                <div key={domain.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{domain.domain}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(domain.status)
                        )}>
                          {getStatusText(domain.status)}
                        </span>
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          getSSLStatusColor(domain.ssl_status)
                        )}>
                          SSL {getSSLStatusText(domain.ssl_status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {domain.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onVerifyDomain(domain.id)}
                        >
                          Verify
                        </Button>
                      )}
                      {domain.ssl_status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRequestSSL(domain.id)}
                        >
                          Request SSL
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRemoveDomain(domain.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  {domain.nameservers && domain.nameservers.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Nameservers</h4>
                      <div className="space-y-1">
                        {domain.nameservers.map((ns, index) => (
                          <div key={index} className="text-sm text-gray-600 font-mono">
                            {ns}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {domain.dns_records && domain.dns_records.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">DNS Records</h4>
                      <div className="space-y-1">
                        {domain.dns_records.map((record, index) => (
                          <div key={index} className="text-sm text-gray-600 font-mono">
                            {record.name} {record.type} {record.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
