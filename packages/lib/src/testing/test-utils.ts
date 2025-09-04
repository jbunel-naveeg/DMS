/**
 * Test Utilities
 * Common utilities for testing across the platform
 */

import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from '../i18n'
import { I18nService } from '../i18n/i18n-service'

// Mock i18n service for testing
const mockI18nService = {
  getCurrentLocale: () => 'en',
  setLocale: () => {},
  getSupportedLocales: () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
  ],
  isLocaleSupported: () => true,
  getLocale: () => null,
  t: (key: string) => key,
  exists: () => true,
  isRTL: () => false,
  getCurrency: () => 'USD',
  getDateFormat: () => 'MM/DD/YYYY',
  getTimeFormat: () => 'HH:mm',
  getNumberFormat: () => ({ decimal: '.', thousands: ',' }),
  changeLocale: async () => {},
  initialize: async () => {}
} as any

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
    neq: jest.fn().mockReturnThis(),
    gt: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lt: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    like: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    contains: jest.fn().mockReturnThis(),
    containedBy: jest.fn().mockReturnThis(),
    rangeGt: jest.fn().mockReturnThis(),
    rangeGte: jest.fn().mockReturnThis(),
    rangeLt: jest.fn().mockReturnThis(),
    rangeLte: jest.fn().mockReturnThis(),
    rangeAdjacent: jest.fn().mockReturnThis(),
    overlaps: jest.fn().mockReturnThis(),
    textSearch: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    not: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    filter: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    single: jest.fn(),
    maybeSingle: jest.fn(),
    csv: jest.fn(),
    geojson: jest.fn(),
    explain: jest.fn(),
    rollback: jest.fn(),
    returns: jest.fn().mockReturnThis(),
    abortSignal: jest.fn().mockReturnThis(),
    then: jest.fn()
  })),
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(),
      download: jest.fn(),
      remove: jest.fn(),
      list: jest.fn(),
      getPublicUrl: jest.fn(),
      createSignedUrl: jest.fn(),
      createSignedUrls: jest.fn(),
      move: jest.fn(),
      copy: jest.fn(),
      update: jest.fn()
    }))
  },
  functions: {
    invoke: jest.fn()
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
    retrieve: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  subscriptions: {
    create: jest.fn(),
    retrieve: jest.fn(),
    update: jest.fn(),
    cancel: jest.fn(),
    list: jest.fn()
  },
  webhooks: {
    constructEvent: jest.fn()
  }
}

// Mock 10Web API
export const mockTenWebAPI = {
  createSite: jest.fn(),
  getSite: jest.fn(),
  updateSite: jest.fn(),
  deleteSite: jest.fn(),
  listSites: jest.fn(),
  createDomain: jest.fn(),
  getDomain: jest.fn(),
  updateDomain: jest.fn(),
  deleteDomain: jest.fn(),
  listDomains: jest.fn()
}

// Mock OpenAI API
export const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn()
    }
  },
  embeddings: {
    create: jest.fn()
  }
}

// Mock Google APIs
export const mockGoogleAPIs = {
  analytics: {
    data: {
      ga: {
        get: jest.fn()
      }
    }
  },
  searchconsole: {
    searchanalytics: {
      query: jest.fn()
    }
  },
  mybusiness: {
    accounts: {
      locations: {
        get: jest.fn()
      }
    }
  }
}

// Mock n8n
export const mockN8N = {
  trigger: jest.fn(),
  execute: jest.fn()
}

// Test wrapper with all providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <I18nProvider i18nService={mockI18nService}>
          {children}
        </I18nProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Test data generators
export const generateUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
  avatar_url: 'https://example.com/avatar.jpg',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const generateWebsite = (overrides = {}) => ({
  id: 'test-website-id',
  user_id: 'test-user-id',
  name: 'Test Website',
  domain: 'test.example.com',
  subdomain: 'test',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const generatePlan = (overrides = {}) => ({
  id: 'test-plan-id',
  name: 'Starter',
  price: 29,
  currency: 'USD',
  interval: 'month',
  features: ['feature1', 'feature2'],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const generateSubscription = (overrides = {}) => ({
  id: 'test-subscription-id',
  user_id: 'test-user-id',
  plan_id: 'test-plan-id',
  status: 'active',
  current_period_start: '2024-01-01T00:00:00Z',
  current_period_end: '2024-02-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

// Mock API responses
export const mockApiResponses = {
  success: (data: any) => ({
    data,
    error: null,
    status: 200,
    statusText: 'OK'
  }),
  error: (message: string, status = 400) => ({
    data: null,
    error: { message },
    status,
    statusText: 'Bad Request'
  }),
  notFound: () => ({
    data: null,
    error: { message: 'Not found' },
    status: 404,
    statusText: 'Not Found'
  }),
  unauthorized: () => ({
    data: null,
    error: { message: 'Unauthorized' },
    status: 401,
    statusText: 'Unauthorized'
  }),
  forbidden: () => ({
    data: null,
    error: { message: 'Forbidden' },
    status: 403,
    statusText: 'Forbidden'
  })
}

// Test helpers
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockFetch = (response: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      status: 200,
      statusText: 'OK'
    })
  ) as jest.Mock
}

export const mockFetchError = (status = 400, message = 'Error') => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: message }),
      text: () => Promise.resolve(JSON.stringify({ error: message })),
      status,
      statusText: 'Bad Request'
    })
  ) as jest.Mock
}

// Cleanup function
export const cleanup = () => {
  jest.clearAllMocks()
  jest.resetAllMocks()
}

// Test environment setup
export const setupTestEnvironment = () => {
  // Mock environment variables
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  process.env.STRIPE_SECRET_KEY = 'sk_test_123'
  process.env.TENWEB_API_KEY = 'test-tenweb-key'
  process.env.OPENAI_API_KEY = 'sk-test-openai-key'
  
  // Mock console methods to reduce noise in tests
  const originalConsole = console
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
}

// Restore test environment
export const restoreTestEnvironment = () => {
  jest.restoreAllMocks()
  global.console = console
}

// Export everything
export * from '@testing-library/react'
export { customRender as render }
export { AllTheProviders }
