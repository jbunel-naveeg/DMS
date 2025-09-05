import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@naveeg/lib/server'
import { getOpenAIService } from '@naveeg/lib/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = params.id

    if (!faqId) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
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

    // Get FAQ document
    const { data: faq, error: faqError } = await supabase
      .from('faq_docs')
      .select('*')
      .eq('id', faqId)
      .single()

    if (faqError || !faq) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      )
    }

    // Get OpenAI service
    const openAI = getOpenAIService()

    // Process FAQ document and generate embedding
    const { embedding, processed_content } = await openAI.processFAQDocument({
      title: faq.title,
      content: faq.content,
      category: faq.category
    })

    // Update FAQ document with embedding
    const { error: updateError } = await supabase
      .from('faq_docs')
      .update({
        embedding,
        processed_content,
        updated_at: new Date().toISOString()
      })
      .eq('id', faqId)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Failed to update FAQ with embedding' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ processed successfully'
    })
  } catch (error) {
    console.error('Error processing FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
