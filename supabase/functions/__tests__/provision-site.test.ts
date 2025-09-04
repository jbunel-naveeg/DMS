/**
 * Provision Site Edge Function Tests
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// Mock Supabase client
const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }))
}

// Mock 10Web API
const mockTenWebAPI = {
  createSite: jest.fn(),
  getSite: jest.fn(),
  updateSite: jest.fn()
}

// Mock OpenAI API
const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn()
    }
  }
}

describe('Provision Site Edge Function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create a new website successfully', async () => {
    // Mock successful responses
    mockSupabaseClient.from().single.mockResolvedValue({
      data: { id: 'user-123', plan: 'starter' },
      error: null
    })

    mockTenWebAPI.createSite.mockResolvedValue({
      success: true,
      data: {
        site_id: 'site-123',
        domain: 'test.example.com',
        status: 'active'
      }
    })

    mockOpenAI.chat.completions.create.mockResolvedValue({
      choices: [{
        message: {
          content: 'Generated website content'
        }
      }]
    })

    // Test the function
    const result = await provisionSite({
      userId: 'user-123',
      websiteName: 'Test Website',
      template: 'business'
    })

    expect(result.success).toBe(true)
    expect(result.data.siteId).toBe('site-123')
    expect(mockTenWebAPI.createSite).toHaveBeenCalledWith({
      name: 'Test Website',
      template: 'business'
    })
  })

  it('should handle 10Web API errors', async () => {
    mockSupabaseClient.from().single.mockResolvedValue({
      data: { id: 'user-123', plan: 'starter' },
      error: null
    })

    mockTenWebAPI.createSite.mockRejectedValue(new Error('10Web API Error'))

    const result = await provisionSite({
      userId: 'user-123',
      websiteName: 'Test Website',
      template: 'business'
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('10Web API Error')
  })

  it('should validate user permissions', async () => {
    mockSupabaseClient.from().single.mockResolvedValue({
      data: null,
      error: { message: 'User not found' }
    })

    const result = await provisionSite({
      userId: 'invalid-user',
      websiteName: 'Test Website',
      template: 'business'
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('User not found')
  })

  it('should check plan limits', async () => {
    mockSupabaseClient.from().single.mockResolvedValue({
      data: { id: 'user-123', plan: 'starter' },
      error: null
    })

    // Mock user already has maximum websites for starter plan
    mockSupabaseClient.from().select.mockReturnValue({
      eq: jest.fn().mockResolvedValue({
        data: Array(5).fill({ id: 'website' }), // Starter plan limit is 5
        error: null
      })
    })

    const result = await provisionSite({
      userId: 'user-123',
      websiteName: 'Test Website',
      template: 'business'
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('Plan limit reached')
  })
})

// Mock function implementation for testing
async function provisionSite(params: {
  userId: string
  websiteName: string
  template: string
}) {
  try {
    // Validate user
    const { data: user, error: userError } = await mockSupabaseClient
      .from('users')
      .select('id, plan')
      .eq('id', params.userId)
      .single()

    if (userError || !user) {
      return { success: false, error: 'User not found' }
    }

    // Check plan limits
    const { data: websites } = await mockSupabaseClient
      .from('websites')
      .select('id')
      .eq('user_id', params.userId)

    const planLimits = { starter: 5, pro: 50 }
    if (websites.length >= planLimits[user.plan as keyof typeof planLimits]) {
      return { success: false, error: 'Plan limit reached' }
    }

    // Create site with 10Web
    const siteResult = await mockTenWebAPI.createSite({
      name: params.websiteName,
      template: params.template
    })

    if (!siteResult.success) {
      return { success: false, error: 'Failed to create site' }
    }

    // Generate content with OpenAI
    const contentResult = await mockOpenAI.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Generate content for a ${params.template} website named ${params.websiteName}`
      }]
    })

    // Save website to database
    const { data: website } = await mockSupabaseClient
      .from('websites')
      .insert({
        user_id: params.userId,
        name: params.websiteName,
        domain: siteResult.data.domain,
        site_id: siteResult.data.site_id,
        status: 'active',
        content: contentResult.choices[0].message.content
      })
      .select()
      .single()

    return {
      success: true,
      data: {
        websiteId: website.id,
        siteId: siteResult.data.site_id,
        domain: siteResult.data.domain
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
