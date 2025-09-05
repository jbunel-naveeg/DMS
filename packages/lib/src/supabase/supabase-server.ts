import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// Server-side Supabase helpers

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export function getServerSupabaseClient() {
  // Handle missing environment variables during build time
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
      // Return a mock client during build time
      return createClient('https://placeholder.supabase.co', 'placeholder_key');
    }
    throw new Error("Supabase env vars missing");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabaseClient(request?: any) {
  // Handle missing environment variables during build time
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
      // Return a mock client during build time
      return createClient('https://placeholder.supabase.co', 'placeholder_key');
    }
    throw new Error("Supabase env vars missing");
  }
  
  // If request is provided, use it for cookie handling
  if (request) {
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
        },
      },
    });
  }
  
  // Fallback to regular client
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function getServiceSupabaseClient() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRole) {
    throw new Error("Supabase service role env vars missing");
  }
  return createClient(supabaseUrl, serviceRole);
}

