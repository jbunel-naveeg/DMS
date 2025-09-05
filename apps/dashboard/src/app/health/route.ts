import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@naveeg/lib/server'

export async function GET() {
  try {
    // Check database connection
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
      .from('plans')
      .select('id')
      .limit(1)

    if (error) {
      throw new Error(`Database connection failed: ${error.message}`)
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'naveeg-dashboard',
      version: '1.0.0',
      database: 'connected',
      checks: {
        database: 'pass',
        api: 'pass'
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'naveeg-dashboard',
        error: error instanceof Error ? error.message : 'Health check failed',
        checks: {
          database: 'fail',
          api: 'pass'
        }
      },
      { status: 500 }
    )
  }
}
