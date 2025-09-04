import * as React from "react"
import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Separator } from "./separator"
import { cn } from "../lib/utils"

export interface AuthFormProps {
  mode: 'signin' | 'signup' | 'reset'
  onSubmit: (data: AuthFormData) => Promise<{ error: any }>
  onGoogleSignIn?: () => Promise<{ error: any }>
  onModeChange: (mode: 'signin' | 'signup' | 'reset') => void
  loading?: boolean
  className?: string
}

export interface AuthFormData {
  email: string
  password: string
  name?: string
}

export function AuthForm({
  mode,
  onSubmit,
  onGoogleSignIn,
  onModeChange,
  loading = false,
  className
}: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: ''
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
        setError(error.message || 'An error occurred')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!onGoogleSignIn) return
    
    setError(null)
    setIsSubmitting(true)

    try {
      const { error } = await onGoogleSignIn()
      if (error) {
        setError(error.message || 'An error occurred')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof AuthFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Sign In'
      case 'signup': return 'Sign Up'
      case 'reset': return 'Reset Password'
      default: return 'Sign In'
    }
  }

  const getDescription = () => {
    switch (mode) {
      case 'signin': return 'Enter your credentials to access your account'
      case 'signup': return 'Create a new account to get started'
      case 'reset': return 'Enter your email to reset your password'
      default: return 'Enter your credentials to access your account'
    }
  }

  const getSubmitText = () => {
    switch (mode) {
      case 'signin': return 'Sign In'
      case 'signup': return 'Create Account'
      case 'reset': return 'Send Reset Email'
      default: return 'Sign In'
    }
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{getTitle()}</CardTitle>
        <CardDescription className="text-center">
          {getDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                disabled={isSubmitting || loading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              disabled={isSubmitting || loading}
            />
          </div>

          {mode !== 'reset' && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                required
                disabled={isSubmitting || loading}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? 'Please wait...' : getSubmitText()}
          </Button>
        </form>

        {mode !== 'reset' && onGoogleSignIn && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting || loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </>
        )}

        <div className="text-center text-sm">
          {mode === 'signin' && (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => onModeChange('signup')}
              >
                Sign up
              </button>
              {' • '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => onModeChange('reset')}
              >
                Forgot password?
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => onModeChange('signin')}
              >
                Sign in
              </button>
            </>
          )}
          {mode === 'reset' && (
            <>
              Remember your password?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => onModeChange('signin')}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
