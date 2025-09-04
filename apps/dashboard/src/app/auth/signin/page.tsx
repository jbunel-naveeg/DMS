'use client'

import { useState } from 'react'
import { AuthForm, AuthFormData } from '@naveeg/ui'
import { createBrowserClient } from '@naveeg/lib'

export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin')
  const supabase = createBrowserClient()

  const handleAuth = async (data: AuthFormData) => {
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      return { error }
    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      })
      return { error }
    } else if (mode === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { error }
    }
    return { error: null }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    return { error }
  }

  const handleModeChange = (newMode: 'signin' | 'signup' | 'reset') => {
    setMode(newMode)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Naveeg</h1>
          <p className="mt-2 text-sm text-gray-600">
            Your website management platform
          </p>
        </div>
        
        <AuthForm
          mode={mode}
          onSubmit={handleAuth}
          onGoogleSignIn={handleGoogleSignIn}
          onModeChange={handleModeChange}
        />
      </div>
    </div>
  )
}
