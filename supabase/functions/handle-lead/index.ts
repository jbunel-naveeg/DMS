import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadRequest {
  website_id: string
  name: string
  email: string
  message?: string
  source?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website_id, name, email, message, source }: LeadRequest = await req.json()

    // Validate required fields
    if (!website_id || !name || !email) {
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

    // Create lead record
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        website_id: website_id,
        name: name,
        email: email,
        message: message || null
      })
      .select()
      .single()

    if (leadError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create lead record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Trigger n8n webhook for lead processing
    const n8nWebhookUrl = Deno.env.get('N8N_LEAD_WEBHOOK_URL')
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: lead.id,
          website_id: website_id,
          site_title: website.site_title,
          plan_name: website.plans?.name,
          name: name,
          email: email,
          message: message,
          source: source || 'contact_form',
          created_at: lead.created_at
        })
      }).catch(console.error) // Don't fail if webhook fails
    }

    // Send confirmation email (simplified - in production use a proper email service)
    const confirmationEmail = {
      to: email,
      subject: `Thank you for contacting ${website.site_title}`,
      body: `Hi ${name},\n\nThank you for your interest in ${website.site_title}. We'll get back to you soon!\n\nBest regards,\nThe ${website.site_title} Team`
    }

    // In a real implementation, you would send this email via SendGrid, Resend, etc.
    console.log('Confirmation email:', confirmationEmail)

    return new Response(
      JSON.stringify({
        success: true,
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          created_at: lead.created_at
        },
        message: 'Lead created successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in handle-lead function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
