'use client'

import { useUserData, useEntitlements } from '@naveeg/lib'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  EntitlementCard,
  FeatureComparison,
  FeatureBadge
} from '@naveeg/ui'
import { useRouter } from 'next/navigation'

export default function EntitlementsPage() {
  const { plan, loading: userDataLoading } = useUserData()
  const { hasFeature } = useEntitlements()
  const router = useRouter()

  const handleUpgrade = () => {
    router.push('/dashboard/billing')
  }

  const features = [
    {
      name: 'Basic Websites',
      feature: 'basic_websites',
      description: 'Create and manage basic websites'
    },
    {
      name: 'Custom Domains',
      feature: 'custom_domains',
      description: 'Connect your own custom domains'
    },
    {
      name: 'SSL Certificates',
      feature: 'ssl_certificates',
      description: 'Automatic SSL certificate management'
    },
    {
      name: 'Priority Support',
      feature: 'priority_support',
      description: 'Get priority customer support'
    },
    {
      name: 'Team Collaboration',
      feature: 'basic_team_collaboration',
      description: 'Invite team members to collaborate'
    },
    {
      name: 'Advanced Analytics',
      feature: 'advanced_analytics',
      description: 'Detailed website analytics and insights'
    },
    {
      name: 'API Access',
      feature: 'api_access',
      description: 'Access to our REST API'
    },
    {
      name: 'Custom Integrations',
      feature: 'custom_integrations',
      description: 'Build custom integrations and workflows'
    },
    {
      name: 'Unlimited Websites',
      feature: 'unlimited_websites',
      description: 'Create unlimited websites'
    },
    {
      name: 'Dedicated Support',
      feature: 'dedicated_support',
      description: 'Dedicated account manager and support'
    }
  ]

  if (userDataLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentPlan = plan?.plan || { id: 'trial', name: 'Trial' }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Feature Entitlements</h1>
        <p className="mt-2 text-gray-600">
          Manage your feature access and plan entitlements.
        </p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Current Plan: </span>
          <span className="text-sm font-medium text-gray-900">{currentPlan.name}</span>
        </div>
      </div>

      {/* Current Plan Overview */}
      <div className="mb-8">
        <EntitlementCard
          title={`${currentPlan.name} Plan Features`}
          description="Features available in your current plan"
          features={features.filter(f => hasFeature(f.feature))}
          onUpgrade={handleUpgrade}
        />
      </div>

      {/* Feature Comparison */}
      <div className="mb-8">
        <FeatureComparison
          features={features}
          onUpgrade={handleUpgrade}
        />
      </div>

      {/* Usage Limits */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Websites</CardTitle>
              <CardDescription>Website creation limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Websites</span>
                  <FeatureBadge feature="basic_websites" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unlimited Websites</span>
                  <FeatureBadge feature="unlimited_websites" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domains</CardTitle>
              <CardDescription>Domain connection limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Domains</span>
                  <FeatureBadge feature="basic_domains" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Custom Domains</span>
                  <FeatureBadge feature="custom_domains" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unlimited Domains</span>
                  <FeatureBadge feature="unlimited_domains" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team</CardTitle>
              <CardDescription>Team collaboration features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Team</span>
                  <FeatureBadge feature="basic_team_collaboration" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Advanced Team</span>
                  <FeatureBadge feature="advanced_team_collaboration" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Need More Features?
          </h3>
          <p className="text-blue-700 mb-4">
            Upgrade your plan to access more features and higher limits.
          </p>
          <Button onClick={handleUpgrade} className="bg-blue-600 hover:bg-blue-700">
            View Plans & Pricing
          </Button>
        </div>
      </div>
    </div>
  )
}
