/**
 * Test Data Generators
 * Functions to generate test data
 */

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
