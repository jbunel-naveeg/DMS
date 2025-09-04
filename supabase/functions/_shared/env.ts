// Shared environment configuration for Edge Functions
export interface EnvConfig {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  TENWEB_API_KEY: string
  TENWEB_API_URL: string
  OPENAI_API_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  N8N_POST_PROVISION_WEBHOOK_URL?: string
  N8N_LEAD_WEBHOOK_URL?: string
}

export function getEnvConfig(): EnvConfig {
  const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'TENWEB_API_KEY',
    'OPENAI_API_KEY',
    'STRIPE_WEBHOOK_SECRET'
  ]

  const missingVars = requiredEnvVars.filter(varName => !Deno.env.get(varName))
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  return {
    SUPABASE_URL: Deno.env.get('SUPABASE_URL')!,
    SUPABASE_SERVICE_ROLE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    TENWEB_API_KEY: Deno.env.get('TENWEB_API_KEY')!,
    TENWEB_API_URL: Deno.env.get('TENWEB_API_URL') || 'https://api.10web.io',
    OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY')!,
    STRIPE_WEBHOOK_SECRET: Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
    N8N_POST_PROVISION_WEBHOOK_URL: Deno.env.get('N8N_POST_PROVISION_WEBHOOK_URL'),
    N8N_LEAD_WEBHOOK_URL: Deno.env.get('N8N_LEAD_WEBHOOK_URL')
  }
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
}

export function createErrorResponse(message: string, status: number = 400) {
  return new Response(
    JSON.stringify({ error: message }),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}

export function createSuccessResponse(data: any, status: number = 200) {
  return new Response(
    JSON.stringify(data),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}
