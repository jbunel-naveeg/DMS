import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CheckEntitlementsRequest {
  website_id: string
  feature_key: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website_id, feature_key }: CheckEntitlementsRequest = await req.json()

    // Validate required fields
    if (!website_id || !feature_key) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get website details with plan
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select(`
        *,
        plans(*),
        entitlements(*)
      `)
      .eq('id', website_id)
      .single()

    if (websiteError || !website) {
      return new Response(
        JSON.stringify({ error: 'Website not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if website is active
    if (website.status !== 'active') {
      return new Response(
        JSON.stringify({ 
          has_access: false, 
          reason: 'Website is not active',
          status: website.status
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check trial status
    const now = new Date()
    const trialEndsAt = website.trial_ends_at ? new Date(website.trial_ends_at) : null
    
    if (website.plan_id === 'trial' && trialEndsAt && now > trialEndsAt) {
      return new Response(
        JSON.stringify({ 
          has_access: false, 
          reason: 'Trial has expired',
          trial_ends_at: website.trial_ends_at
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check specific entitlement
    const entitlement = website.entitlements?.find((e: any) => e.key === feature_key)
    
    if (!entitlement) {
      return new Response(
        JSON.stringify({ 
          has_access: false, 
          reason: 'Feature not available in current plan',
          plan: website.plans?.name
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if entitlement value allows access
    const hasAccess = entitlement.value === true || 
                     (typeof entitlement.value === 'object' && entitlement.value !== null) ||
                     (typeof entitlement.value === 'number' && entitlement.value > 0) ||
                     (typeof entitlement.value === 'string' && entitlement.value !== '')

    return new Response(
      JSON.stringify({
        has_access: hasAccess,
        feature_key: feature_key,
        value: entitlement.value,
        plan: website.plans?.name,
        website_status: website.status,
        trial_ends_at: website.trial_ends_at
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in check-entitlements function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
