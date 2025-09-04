import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatbotQueryRequest {
  website_id: string
  question: string
  user_id?: string
}

interface OpenAICompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { website_id, question, user_id }: ChatbotQueryRequest = await req.json()

    // Validate required fields
    if (!website_id || !question) {
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

    // Check if chatbot is enabled for this website
    const { data: chatbotEntitlement } = await supabase
      .from('entitlements')
      .select('value')
      .eq('website_id', website_id)
      .eq('key', 'chatbot')
      .single()

    if (!chatbotEntitlement?.value) {
      return new Response(
        JSON.stringify({ error: 'Chatbot not enabled for this website' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    try {
      // Generate embedding for the question
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: question,
          model: 'text-embedding-ada-002'
        })
      })

      const embeddingData = await embeddingResponse.json()
      const questionEmbedding = embeddingData.data[0].embedding

      // Find similar FAQ docs using vector similarity
      const { data: similarDocs, error: searchError } = await supabase
        .rpc('match_faq_docs', {
          query_embedding: `[${questionEmbedding.join(',')}]`,
          match_threshold: 0.7,
          match_count: 5,
          website_id: website_id
        })

      if (searchError) {
        console.error('Error searching FAQ docs:', searchError)
        return new Response(
          JSON.stringify({ error: 'Failed to search FAQ docs' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Prepare context from similar docs
      const context = similarDocs?.map((doc: any) => doc.content_text).join('\n\n') || ''

      // Generate response using OpenAI
      const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI assistant for the website "${website.site_title}". 
              Use the following context from the FAQ to answer questions accurately and helpfully. 
              If the answer is not in the context, say so and provide general helpful information.
              
              Context:
              ${context}`
            },
            {
              role: 'user',
              content: question
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      const completionData: OpenAICompletionResponse = await completionResponse.json()

      if (!completionData.choices || !completionData.choices[0]) {
        throw new Error('Failed to generate response')
      }

      const answer = completionData.choices[0].message.content

      // Log the query for analytics (optional)
      if (user_id) {
        await supabase
          .from('leads')
          .insert({
            website_id: website_id,
            name: 'Chatbot Query',
            email: `user_${user_id}@chatbot.local`,
            message: `Q: ${question}\nA: ${answer}`
          })
          .catch(console.error) // Don't fail if logging fails
      }

      return new Response(
        JSON.stringify({
          success: true,
          answer: answer,
          sources: similarDocs?.map((doc: any) => ({
            id: doc.id,
            content: doc.content_text.substring(0, 200) + '...',
            similarity: doc.similarity
          })) || []
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } catch (error) {
      console.error('Error generating response:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to generate response' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error) {
    console.error('Error in chatbot-query function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
