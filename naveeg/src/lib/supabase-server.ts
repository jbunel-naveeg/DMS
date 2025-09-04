import { createClient } from "@supabase/supabase-js";
// Server-side Supabase helpers

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function getServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env vars missing");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function getServiceSupabaseClient() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRole) {
    throw new Error("Supabase service role env vars missing");
  }
  return createClient(supabaseUrl, serviceRole);
}

