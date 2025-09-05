import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@naveeg/lib/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faqId = params.id
    const { title, content, category } = await request.json()

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

    // Update FAQ document
    const { data: faq, error: faqError } = await supabase
      .from('faq_docs')
      .update({
        title,
        content,
        category,
        updated_at: new Date().toISOString()
      })
      .eq('id', faqId)
      .select()
      .single()

    if (faqError) {
      return NextResponse.json(
        { success: false, error: 'Failed to update FAQ' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      faq
    })
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    // Delete FAQ document
    const { error: faqError } = await supabase
      .from('faq_docs')
      .delete()
      .eq('id', faqId)

    if (faqError) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete FAQ' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
