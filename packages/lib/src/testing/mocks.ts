/**
 * Mock Data and Services
 * Provides mock implementations for testing
 */

// Mock Supabase client
export const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
    getSession: jest.fn()
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    then: jest.fn()
  })),
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(),
      download: jest.fn(),
      remove: jest.fn()
    }))
  }
}

// Mock Stripe
export const mockStripe = {
  checkout: {
    sessions: {
      create: jest.fn(),
      retrieve: jest.fn()
    }
  },
  customers: {
    create: jest.fn(),
    retrieve: jest.fn()
  }
}

// Mock 10Web API
export const mockTenWebAPI = {
  createSite: jest.fn(),
  getSite: jest.fn(),
  updateSite: jest.fn()
}

// Mock OpenAI
export const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn()
    }
  }
}
