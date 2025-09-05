import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export function getBrowserSupabaseClient() {
  // Handle missing environment variables during build time
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
      // Return a mock client during build time
      return createBrowserClient('https://placeholder.supabase.co', 'placeholder_key');
    }
    throw new Error("Supabase env vars missing");
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

