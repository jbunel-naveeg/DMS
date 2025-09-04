import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProcessFAQRequest {
  website_id: string
  file_path?: string
  content_text?: string
}

interface OpenAIEmbeddingResponse {
  data: Array<{
    embedding: number[]
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website_id, file_path, content_text }: ProcessFAQRequest = await req.json()

    // Validate required fields
    if (!website_id || (!file_path && !content_text)) {
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
      .select('*')
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

    // Get content text if file_path is provided
    let textContent = content_text
    if (file_path && !textContent) {
      // In a real implementation, you would read the file from storage
      // For now, we'll assume the content is provided directly
      textContent = content_text || 'No content provided'
    }

    if (!textContent) {
      return new Response(
        JSON.stringify({ error: 'No content to process' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create FAQ doc record
    const { data: faqDoc, error: faqError } = await supabase
      .from('faq_docs')
      .insert({
        website_id: website_id,
        file_path: file_path,
        content_text: textContent,
        status: 'processing'
      })
      .select()
      .single()

    if (faqError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create FAQ doc record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate embedding using OpenAI
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      // Update status to failed
      await supabase
        .from('faq_docs')
        .update({ status: 'failed' })
        .eq('id', faqDoc.id)

      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    try {
      // Generate embedding
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: textContent,
          model: 'text-embedding-ada-002'
        })
      })

      const embeddingData: OpenAIEmbeddingResponse = await embeddingResponse.json()

      if (!embeddingData.data || !embeddingData.data[0]) {
        throw new Error('Failed to generate embedding')
      }

      const embedding = embeddingData.data[0].embedding

      // Update FAQ doc with embedding
      const { error: updateError } = await supabase
        .from('faq_docs')
        .update({
          embedding: `[${embedding.join(',')}]`,
          status: 'ready'
        })
        .eq('id', faqDoc.id)

      if (updateError) {
        console.error('Error updating FAQ doc with embedding:', updateError)
        await supabase
          .from('faq_docs')
          .update({ status: 'failed' })
          .eq('id', faqDoc.id)
      }

      return new Response(
        JSON.stringify({
          success: true,
          faq_doc: {
            id: faqDoc.id,
            website_id: faqDoc.website_id,
            file_path: faqDoc.file_path,
            status: 'ready'
          }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } catch (error) {
      console.error('Error generating embedding:', error)
      
      // Update status to failed
      await supabase
        .from('faq_docs')
        .update({ status: 'failed' })
        .eq('id', faqDoc.id)

      return new Response(
        JSON.stringify({ error: 'Failed to generate embedding' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error) {
    console.error('Error in process-faq function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
