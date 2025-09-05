import { createClient } from '@supabase/supabase-js'
import type { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthUser extends User {
  user_metadata: {
    name?: string
    avatar_url?: string
  }
}

export interface AuthSession extends Session {
  user: AuthUser
}

export interface AuthResponse {
  user: AuthUser | null
  session: AuthSession | null
  error: AuthError | null
}

// Create Supabase client for authentication
export function createAuthClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Authentication utilities
export class AuthService {
  private supabase = createAuthClient()

  // Sign up with email and password
  async signUp(email: string, password: string, name?: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0]
        }
      }
    })

    return { data, error }
  }

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })

    return { data, error }
  }

  // Sign in with Google
  async signInWithGoogle() {
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/auth/callback'
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo
      }
    })

    return { data, error }
  }

  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    return { error }
  }

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    return { user, error }
  }

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession()
    return { session, error }
  }

  // Reset password
  async resetPassword(email: string) {
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/reset-password` : '/auth/reset-password'
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    })

    return { data, error }
  }

  // Update password
  async updatePassword(password: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password
    })

    return { data, error }
  }

  // Update user profile
  async updateProfile(updates: { name?: string; avatar_url?: string }) {
    const { data, error } = await this.supabase.auth.updateUser({
      data: updates
    })

    return { data, error }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: AuthSession | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  // Get the Supabase client
  getClient() {
    return this.supabase
  }
}

// Create a singleton instance
export const authService = new AuthService()

// Simple auth functions for backward compatibility
export const createBrowserClient = () => createAuthClient()

export const createServerClient = (cookies: any) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}
