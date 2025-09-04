import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DomainRequest {
  website_id: string
  domain: string
  action: 'add' | 'remove' | 'verify'
}

interface TenWebDomainResponse {
  success: boolean
  data?: {
    id: number
    domain: string
    status: string
    verification_code?: string
  }
  error?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website_id, domain, action }: DomainRequest = await req.json()

    // Validate required fields
    if (!website_id || !domain || !action) {
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

    // Get website details
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('*, plans(*)')
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

    // Check if user has Pro plan for custom domains
    if (website.plan_id !== 'pro') {
      return new Response(
        JSON.stringify({ error: 'Custom domains require Pro plan' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const tenWebApiKey = Deno.env.get('TENWEB_API_KEY')
    if (!tenWebApiKey) {
      return new Response(
        JSON.stringify({ error: '10Web API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    let result: any = {}

    switch (action) {
      case 'add': {
        result = await addDomain(supabase, tenWebApiKey, website, domain)
        break
      }
      case 'remove': {
        result = await removeDomain(supabase, tenWebApiKey, website, domain)
        break
      }
      case 'verify': {
        result = await verifyDomain(supabase, tenWebApiKey, website, domain)
        break
      }
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: result.success ? 200 : 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in manage-domain function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function addDomain(supabase: any, apiKey: string, website: any, domain: string) {
  try {
    // Add domain to 10Web
    const tenWebResponse = await fetch(`https://api.10web.io/websites/${website.tenweb_id}/domains`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: domain
      })
    })

    const tenWebData: TenWebDomainResponse = await tenWebResponse.json()

    if (!tenWebData.success) {
      return {
        success: false,
        error: tenWebData.error || 'Failed to add domain to 10Web'
      }
    }

    // Add domain to database
    const { data: domainRecord, error: domainError } = await supabase
      .from('domains')
      .insert({
        website_id: website.id,
        domain: domain,
        tenweb_domain_id: tenWebData.data!.id,
        status: 'pending'
      })
      .select()
      .single()

    if (domainError) {
      return {
        success: false,
        error: 'Failed to create domain record'
      }
    }

    return {
      success: true,
      domain: {
        id: domainRecord.id,
        domain: domainRecord.domain,
        status: domainRecord.status,
        verification_code: tenWebData.data!.verification_code
      }
    }

  } catch (error) {
    console.error('Error adding domain:', error)
    return {
      success: false,
      error: 'Failed to add domain'
    }
  }
}

async function removeDomain(supabase: any, apiKey: string, website: any, domain: string) {
  try {
    // Get domain record
    const { data: domainRecord } = await supabase
      .from('domains')
      .select('*')
      .eq('website_id', website.id)
      .eq('domain', domain)
      .single()

    if (!domainRecord) {
      return {
        success: false,
        error: 'Domain not found'
      }
    }

    // Remove domain from 10Web
    if (domainRecord.tenweb_domain_id) {
      const tenWebResponse = await fetch(`https://api.10web.io/websites/${website.tenweb_id}/domains/${domainRecord.tenweb_domain_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      })

      if (!tenWebResponse.ok) {
        console.error('Failed to remove domain from 10Web')
      }
    }

    // Remove domain from database
    const { error: deleteError } = await supabase
      .from('domains')
      .delete()
      .eq('id', domainRecord.id)

    if (deleteError) {
      return {
        success: false,
        error: 'Failed to remove domain record'
      }
    }

    return {
      success: true,
      message: 'Domain removed successfully'
    }

  } catch (error) {
    console.error('Error removing domain:', error)
    return {
      success: false,
      error: 'Failed to remove domain'
    }
  }
}

async function verifyDomain(supabase: any, apiKey: string, website: any, domain: string) {
  try {
    // Get domain record
    const { data: domainRecord } = await supabase
      .from('domains')
      .select('*')
      .eq('website_id', website.id)
      .eq('domain', domain)
      .single()

    if (!domainRecord) {
      return {
        success: false,
        error: 'Domain not found'
      }
    }

    // Verify domain with 10Web
    const tenWebResponse = await fetch(`https://api.10web.io/websites/${website.tenweb_id}/domains/${domainRecord.tenweb_domain_id}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    })

    const tenWebData: TenWebDomainResponse = await tenWebResponse.json()

    if (!tenWebData.success) {
      return {
        success: false,
        error: tenWebData.error || 'Failed to verify domain'
      }
    }

    // Update domain status
    const { error: updateError } = await supabase
      .from('domains')
      .update({
        status: tenWebData.data!.status === 'verified' ? 'verified' : 'failed'
      })
      .eq('id', domainRecord.id)

    if (updateError) {
      return {
        success: false,
        error: 'Failed to update domain status'
      }
    }

    return {
      success: true,
      domain: {
        id: domainRecord.id,
        domain: domainRecord.domain,
        status: tenWebData.data!.status === 'verified' ? 'verified' : 'failed'
      }
    }

  } catch (error) {
    console.error('Error verifying domain:', error)
    return {
      success: false,
      error: 'Failed to verify domain'
    }
  }
}
