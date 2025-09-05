import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@naveeg/lib/server'
import { getOpenAIService } from '@naveeg/lib/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get the current user
    const supabase = createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get OpenAI service
    const openAI = getOpenAIService()

    // Generate search query from user message
    const searchQuery = openAI.generateSearchQuery(message)

    // Search for relevant FAQ documents
    const { data: faqDocs, error: searchError } = await supabase
      .from('faq_docs')
      .select('*')
      .textSearch('content', searchQuery)
      .limit(5)

    if (searchError) {
      console.error('Error searching FAQs:', searchError)
    }

    // Generate chatbot response
    const response = await openAI.generateChatbotResponse(
      message,
      faqDocs || [],
      [] // No conversation history for now
    )

    return NextResponse.json({
      success: true,
      answer: response.answer,
      sources: response.sources,
      confidence: response.confidence,
      tokens_used: response.tokens_used
    })
  } catch (error) {
    console.error('Error processing chatbot query:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
