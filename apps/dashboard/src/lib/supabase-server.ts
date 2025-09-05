import { createClient } from "@supabase/supabase-js";
// Server-side Supabase helpers

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export function getServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function getServiceSupabaseClient() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_key';
  return createClient(supabaseUrl, serviceRole);
}

