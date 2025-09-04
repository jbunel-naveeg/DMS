'use client'

import { useUser } from '@naveeg/lib'
import { UserMenu, ProtectedRoute } from '@naveeg/ui'
import { createBrowserClient } from '@naveeg/lib'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useUser()
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
  }

  const handleProfileClick = () => {
    router.push('/dashboard/profile')
  }

  const handleSettingsClick = () => {
    router.push('/dashboard/settings')
  }

  return (
    <ProtectedRoute user={user} loading={loading}>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-gray-900">Naveeg</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="/dashboard"
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/dashboard/websites"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Websites
                  </a>
                  <a
                    href="/dashboard/domains"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Domains
                  </a>
                  <a
                    href="/dashboard/analytics"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Analytics
                  </a>
                  <a
                    href="/dashboard/billing"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Billing
                  </a>
                  <a
                    href="/dashboard/entitlements"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Features
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                {user && (
                  <UserMenu
                    user={{
                      id: user.id,
                      email: user.email,
                      name: user.user_metadata?.name,
                      avatar_url: user.user_metadata?.avatar_url,
                    }}
                    onSignOut={handleSignOut}
                    onProfileClick={handleProfileClick}
                    onSettingsClick={handleSettingsClick}
                  />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}