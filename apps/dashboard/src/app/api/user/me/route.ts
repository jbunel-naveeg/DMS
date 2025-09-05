import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@naveeg/lib/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient(request.cookies)
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's website (assuming one website per user for now)
    const { data: website } = await supabase
      .from('websites')
      .select('id, name, url')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url
      },
      website: website || null
    })
  } catch (error) {
    console.error('Error in user me API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
