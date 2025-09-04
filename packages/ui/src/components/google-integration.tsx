import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { cn } from "../lib/utils"

export interface GoogleIntegration {
  id: string
  type: 'analytics' | 'search_console' | 'business_profile'
  accountId: string
  accountName: string
  propertyId?: string
  siteUrl?: string
  locationId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GoogleIntegrationCardProps {
  integration: GoogleIntegration
  onDisconnect: (id: string) => Promise<{ success: boolean; error?: string }>
  onReconnect: (id: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function GoogleIntegrationCard({
  integration,
  onDisconnect,
  onReconnect,
  loading = false,
  className
}: GoogleIntegrationCardProps) {
  const [isDisconnecting, setIsDisconnecting] = React.useState(false)
  const [isReconnecting, setIsReconnecting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'analytics':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )
      case 'search_console':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )
      case 'business_profile':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4285F4"/>
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )
    }
  }

  const getServiceName = (type: string) => {
    switch (type) {
      case 'analytics':
        return 'Google Analytics'
      case 'search_console':
        return 'Google Search Console'
      case 'business_profile':
        return 'Google Business Profile'
      default:
        return 'Google Service'
    }
  }

  const getServiceDescription = (type: string) => {
    switch (type) {
      case 'analytics':
        return 'Track website traffic and user behavior'
      case 'search_console':
        return 'Monitor search performance and indexing'
      case 'business_profile':
        return 'Manage business listings and reviews'
      default:
        return 'Google integration service'
    }
  }

  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    setError(null)

    try {
      const result = await onDisconnect(integration.id)
      if (!result.success) {
        setError(result.error || 'Failed to disconnect')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect')
    } finally {
      setIsDisconnecting(false)
    }
  }

  const handleReconnect = async () => {
    setIsReconnecting(true)
    setError(null)

    try {
      const result = await onReconnect(integration.id)
      if (!result.success) {
        setError(result.error || 'Failed to reconnect')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reconnect')
    } finally {
      setIsReconnecting(false)
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getServiceIcon(integration.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900">
                {getServiceName(integration.type)}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {getServiceDescription(integration.type)}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>Account: {integration.accountName}</span>
                {integration.propertyId && (
                  <span>Property: {integration.propertyId}</span>
                )}
                {integration.siteUrl && (
                  <span>Site: {integration.siteUrl}</span>
                )}
                {integration.locationId && (
                  <span>Location: {integration.locationId}</span>
                )}
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  integration.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}>
                  {integration.isActive ? 'Connected' : 'Disconnected'}
                </span>
                <span className="text-xs text-gray-500">
                  Updated {new Date(integration.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {integration.isActive ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                disabled={isDisconnecting || loading}
                className="text-red-600 hover:text-red-700"
              >
                {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleReconnect}
                disabled={isReconnecting || loading}
              >
                {isReconnecting ? 'Reconnecting...' : 'Reconnect'}
              </Button>
            )}
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export interface GoogleIntegrationManagerProps {
  integrations: GoogleIntegration[]
  onConnect: (type: 'analytics' | 'search_console' | 'business_profile') => Promise<void>
  onDisconnect: (id: string) => Promise<{ success: boolean; error?: string }>
  onReconnect: (id: string) => Promise<{ success: boolean; error?: string }>
  loading?: boolean
  className?: string
}

export function GoogleIntegrationManager({
  integrations,
  onConnect,
  onDisconnect,
  onReconnect,
  loading = false,
  className
}: GoogleIntegrationManagerProps) {
  const [error, setError] = React.useState<string | null>(null)

  const handleConnect = async (type: 'analytics' | 'search_console' | 'business_profile') => {
    setError(null)
    try {
      await onConnect(type)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect')
    }
  }

  const availableServices = [
    {
      type: 'analytics' as const,
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: '📊'
    },
    {
      type: 'search_console' as const,
      name: 'Google Search Console',
      description: 'Monitor search performance and indexing',
      icon: '🔍'
    },
    {
      type: 'business_profile' as const,
      name: 'Google Business Profile',
      description: 'Manage business listings and reviews',
      icon: '🏢'
    }
  ]

  const connectedServices = integrations.map(i => i.type)
  const disconnectedServices = availableServices.filter(s => !connectedServices.includes(s.type))

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Google Integrations</h2>
        <p className="text-gray-600 mt-1">
          Connect your Google services to get comprehensive analytics and insights
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
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

      {/* Connected Integrations */}
      {integrations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Services</h3>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <GoogleIntegrationCard
                key={integration.id}
                integration={integration}
                onDisconnect={onDisconnect}
                onReconnect={onReconnect}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Services */}
      {disconnectedServices.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Available Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disconnectedServices.map((service) => (
              <Card key={service.type} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {service.description}
                    </p>
                    <Button
                      onClick={() => handleConnect(service.type)}
                      disabled={loading}
                      className="w-full"
                    >
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {integrations.length === 0 && disconnectedServices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Google integrations available
            </h3>
            <p className="text-gray-500">
              Google integrations are not configured for this account.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
