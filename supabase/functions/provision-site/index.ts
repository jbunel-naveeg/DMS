import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProvisionSiteRequest {
  user_id: string
  site_title: string
  subdomain: string
  plan_id: string
  business_type?: string
  business_name?: string
  business_description?: string
}

interface TenWebResponse {
  success: boolean
  data?: {
    id: number
    url: string
    status: string
  }
  error?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      user_id, 
      site_title, 
      subdomain, 
      plan_id, 
      business_type = 'business',
      business_name = site_title,
      business_description = `A professional ${business_type} website`
    }: ProvisionSiteRequest = await req.json()

    // Validate required fields
    if (!user_id || !site_title || !subdomain || !plan_id) {
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

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', plan_id)
      .single()

    if (planError || !plan) {
      return new Response(
        JSON.stringify({ error: 'Plan not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user already has a website for this plan
    const { data: existingWebsite } = await supabase
      .from('websites')
      .select('id')
      .eq('owner_id', user_id)
      .eq('plan_id', plan_id)
      .single()

    if (existingWebsite) {
      return new Response(
        JSON.stringify({ error: 'Website already exists for this plan' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create 10Web site
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

    const tenWebResponse = await fetch('https://my.10web.io/api/v1/hosting/website', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tenWebApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        site_title: site_title,
        subdomain: subdomain,
        admin_username: 'admin',
        admin_password: 'TempPassword123!',
        region: 'europe-west3-b'
      })
    })

    const tenWebData: any = await tenWebResponse.json()

    if (tenWebData.status !== 'ok' || !tenWebData.data) {
      return new Response(
        JSON.stringify({ error: tenWebData.message || 'Failed to create 10Web site' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create website record in database
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .insert({
        owner_id: user_id,
        tenweb_id: tenWebData.data.id.toString(),
        site_title,
        subdomain,
        plan_id,
        trial_starts_at: plan_id === 'trial' ? new Date().toISOString() : null,
        trial_ends_at: plan_id === 'trial' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null,
        status: 'active'
      })
      .select()
      .single()

    if (websiteError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create website record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Step 2: Generate sitemap using AI
    const sitemapResponse = await fetch('https://my.10web.io/api/v1/ai/generate_sitemap', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tenWebApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        website_id: tenWebData.data.id,
        params: {
          business_type: business_type,
          business_name: business_name,
          business_description: business_description
        }
      })
    })

    const sitemapData: any = await sitemapResponse.json()
    
    if (sitemapData.status !== 200 || !sitemapData.data) {
      console.error('Sitemap generation failed:', sitemapData)
      // Continue without AI generation if it fails
    } else {
      // Step 3: Generate website from sitemap
      const generateResponse = await fetch('https://my.10web.io/api/v1/ai/generate_site_from_sitemap', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tenWebApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website_id: tenWebData.data.id,
          unique_id: sitemapData.data.unique_id,
          params: {
            business_type: business_type,
            business_name: business_name,
            business_description: business_description,
            pages_meta: sitemapData.data.pages_meta,
            website_description: sitemapData.data.website_description,
            website_keyphrase: sitemapData.data.website_keyphrase,
            website_title: sitemapData.data.website_title,
            website_type: sitemapData.data.website_type,
            template_type: 'basic'
          }
        })
      })

      const generateData: any = await generateResponse.json()
      
      if (generateData.status !== 200) {
        console.error('Site generation failed:', generateData)
        // Continue without AI generation if it fails
      }
    }

    // Step 4: Enable/publish the website
    const enableResponse = await fetch(`https://my.10web.io/api/v1/hosting/websites/${tenWebData.data.id}/enable`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tenWebApiKey}`,
        'Content-Type': 'application/json',
      }
    })

    const enableData: any = await enableResponse.json()
    
    if (enableData.status !== 'ok') {
      console.error('Website enable failed:', enableData)
      // Continue even if enable fails
    }

    // Create entitlements based on plan
    const entitlements = plan.features || {}
    const entitlementEntries = Object.entries(entitlements).map(([key, value]) => ({
      website_id: website.id,
      key,
      value
    }))

    if (entitlementEntries.length > 0) {
      await supabase
        .from('entitlements')
        .insert(entitlementEntries)
    }

    // Add user as admin team member
    await supabase
      .from('team_members')
      .insert({
        website_id: website.id,
        user_id: user_id,
        role: 'admin',
        accepted: true
      })

    // Trigger n8n webhook for post-provisioning
    const n8nWebhookUrl = Deno.env.get('N8N_POST_PROVISION_WEBHOOK_URL')
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website_id: website.id,
          user_id: user_id,
          site_title,
          subdomain,
          plan_id,
          tenweb_id: tenWebData.data.id.toString(),
          tenweb_url: tenWebData.data!.url
        })
      }).catch(console.error) // Don't fail if webhook fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        website: {
          id: website.id,
          site_title: website.site_title,
          subdomain: website.subdomain,
          plan_id: website.plan_id,
          tenweb_id: website.tenweb_id,
          status: website.status,
          trial_ends_at: website.trial_ends_at
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in provision-site function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
