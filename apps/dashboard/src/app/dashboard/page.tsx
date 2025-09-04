'use client'

import { useUser, useUserData } from '@naveeg/lib'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  PlanBadge,
  UsageBar,
  WebsiteCard,
  DomainCard,
  UpgradeCTA,
  UsageUpgradeCTA
} from '@naveeg/ui'
import { PLANS } from '@naveeg/lib'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user } = useUser()
  const { plan, websites, domains, usage, planUsage, loading, error } = useUserData()
  const router = useRouter()

  const handleCreateWebsite = () => {
    router.push('/onboarding')
  }

  const handleConnectDomain = () => {
    router.push('/dashboard/domains')
  }

  const handleViewAnalytics = () => {
    router.push('/dashboard/analytics')
  }

  const handleUpgrade = () => {
    router.push('/dashboard/billing')
  }

  const handleWebsiteEdit = (websiteId: string) => {
    router.push(`/dashboard/websites/${websiteId}`)
  }

  const handleWebsiteView = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDomainEdit = (domainId: string) => {
    router.push(`/dashboard/domains/${domainId}`)
  }

  const handleDomainView = (url: string) => {
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading dashboard: {error}</div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const currentPlan = plan?.plan || PLANS.find(p => p.id === 'trial')!
  const suggestedPlan = PLANS.find(p => p.id === 'starter')!

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.name || user?.email}!
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your websites, domains, and analytics from your dashboard.
            </p>
          </div>
          <PlanBadge plan={currentPlan} />
        </div>
      </div>

      {/* Usage Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Usage Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <UsageBar
                label="Websites"
                used={planUsage.websites.used}
                limit={planUsage.websites.limit}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <UsageBar
                label="Domains"
                used={planUsage.domains.used}
                limit={planUsage.domains.limit}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <UsageBar
                label="Storage"
                used={planUsage.storage.used}
                limit={planUsage.storage.limit}
                unit="GB"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <UsageBar
                label="Bandwidth"
                used={planUsage.bandwidth.used}
                limit={planUsage.bandwidth.limit}
                unit="GB"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upgrade CTA */}
      {currentPlan.id === 'trial' && (
        <div className="mb-8">
          <UpgradeCTA
            currentPlan={currentPlan}
            suggestedPlan={suggestedPlan}
            onUpgrade={handleUpgrade}
            reason="Your trial is active. Upgrade to unlock more features!"
          />
        </div>
      )}

      {/* Usage-based Upgrade CTAs */}
      {planUsage.websites.used >= planUsage.websites.limit && planUsage.websites.limit !== -1 && (
        <div className="mb-8">
          <UsageUpgradeCTA
            feature="websites"
            currentUsage={planUsage.websites.used}
            limit={planUsage.websites.limit}
            suggestedPlan={suggestedPlan}
            onUpgrade={handleUpgrade}
          />
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.websites_count}</div>
            <p className="text-xs text-muted-foreground">
              {planUsage.websites.limit === -1 ? 'Unlimited' : `of ${planUsage.websites.limit} allowed`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.domains_count}</div>
            <p className="text-xs text-muted-foreground">
              {planUsage.domains.limit === -1 ? 'Unlimited' : `of ${planUsage.domains.limit} allowed`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.storage_used}GB</div>
            <p className="text-xs text-muted-foreground">
              {planUsage.storage.limit === -1 ? 'Unlimited' : `of ${planUsage.storage.limit}GB allowed`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Websites */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Websites</h2>
          <Button onClick={handleCreateWebsite}>
            Create Website
          </Button>
        </div>
        {websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onEdit={() => handleWebsiteEdit(website.id)}
                onView={() => handleWebsiteView(website.url)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No websites yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first website.
                </p>
                <div className="mt-6">
                  <Button onClick={handleCreateWebsite}>
                    Create Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Domains */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Domains</h2>
          <Button variant="outline" onClick={handleConnectDomain}>
            Connect Domain
          </Button>
        </div>
        {domains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onEdit={() => handleDomainEdit(domain.id)}
                onView={() => handleDomainView(domain.website.url)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
                  Connect a custom domain to your website.
                </p>
                <div className="mt-6">
                  <Button variant="outline" onClick={handleConnectDomain}>
                    Connect Domain
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Create Website</CardTitle>
              <CardDescription>
                Set up a new website with our easy-to-use builder
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full" size="sm" onClick={handleCreateWebsite}>
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Connect Domain</CardTitle>
              <CardDescription>
                Add a custom domain to your website
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full" size="sm" onClick={handleConnectDomain}>
                Connect Domain
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">View Analytics</CardTitle>
              <CardDescription>
                Check your website performance and traffic
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full" size="sm" onClick={handleViewAnalytics}>
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Upgrade Plan</CardTitle>
              <CardDescription>
                Unlock more features with a premium plan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full" size="sm" onClick={handleUpgrade}>
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}