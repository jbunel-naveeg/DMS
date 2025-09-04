import { useState, useEffect, useCallback } from 'react'
import { authService, type AuthUser, type AuthSession } from './auth'

export interface UseAuthReturn {
  user: AuthUser | null
  session: AuthSession | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (password: string) => Promise<{ error: any }>
  updateProfile: (updates: { name?: string; avatar_url?: string }) => Promise<{ error: any }>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    // Get initial session
    authService.getCurrentSession().then(({ session, error }) => {
      if (mounted) {
        if (error) {
          console.error('Error getting session:', error)
        }
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setLoading(true)
    const { error } = await authService.signUp(email, password, name)
    setLoading(false)
    return { error }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    const { error } = await authService.signIn(email, password)
    setLoading(false)
    return { error }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setLoading(true)
    const { error } = await authService.signInWithGoogle()
    setLoading(false)
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    const { error } = await authService.signOut()
    setLoading(false)
    return { error }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true)
    const { error } = await authService.resetPassword(email)
    setLoading(false)
    return { error }
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    setLoading(true)
    const { error } = await authService.updatePassword(password)
    setLoading(false)
    return { error }
  }, [])

  const updateProfile = useCallback(async (updates: { name?: string; avatar_url?: string }) => {
    setLoading(true)
    const { error } = await authService.updateProfile(updates)
    setLoading(false)
    return { error }
  }, [])

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  }
}

// Hook for protecting routes
export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading } = useAuth()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShouldRedirect(true)
    }
  }, [user, loading])

  return {
    user,
    loading,
    shouldRedirect,
    redirectTo
  }
}

// Hook for checking if user is authenticated
export function useIsAuthenticated() {
  const { user, loading } = useAuth()
  return {
    isAuthenticated: !!user,
    loading
  }
}

// Simple hook that matches the expected interface
export function useUser() {
  const { user, loading } = useAuth()
  return { user, loading }
}
