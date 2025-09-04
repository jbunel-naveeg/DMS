import { NextRequest, NextResponse } from 'next/server'
import { createBrowserClient } from '@naveeg/lib'

export async function GET() {
  try {
    // Get the current user
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all FAQ documents
    const { data: faqs, error: faqsError } = await supabase
      .from('faq_docs')
      .select('*')
      .order('created_at', { ascending: false })

    if (faqsError) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch FAQs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      faqs: faqs || []
    })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, category } = await request.json()

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }

    // Get the current user
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create FAQ document
    const { data: faq, error: faqError } = await supabase
      .from('faq_docs')
      .insert({
        title,
        content,
        category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (faqError) {
      return NextResponse.json(
        { success: false, error: 'Failed to create FAQ' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      faq
    })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
