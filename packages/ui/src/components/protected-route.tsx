import * as React from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

export interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
  className?: string
  user?: any
  loading?: boolean
}

export function ProtectedRoute({
  children,
  fallback,
  requireAuth = true,
  className,
  user,
  loading = false
}: ProtectedRouteProps) {

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className || ''}`}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className={`flex items-center justify-center min-h-screen p-4 ${className || ''}`}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to be signed in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => window.location.href = '/auth/signin'}
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/auth/signup'}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!requireAuth && user) {
    // User is authenticated but this route doesn't require auth
    // Redirect to dashboard or show appropriate content
    return <>{children}</>
  }

  return <>{children}</>
}
