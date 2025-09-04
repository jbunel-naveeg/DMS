/**
 * Test Fixtures
 * Provides test data fixtures for consistent testing
 */

export const userFixtures = {
  validUser: {
    id: 'user-123',
    email: 'test@example.com',
    full_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  adminUser: {
    id: 'admin-123',
    email: 'admin@example.com',
    full_name: 'Admin User',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  }
}

export const websiteFixtures = {
  activeWebsite: {
    id: 'website-123',
    user_id: 'user-123',
    name: 'Test Website',
    domain: 'test.example.com',
    subdomain: 'test',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z'
  },
  pendingWebsite: {
    id: 'website-456',
    user_id: 'user-123',
    name: 'Pending Website',
    domain: 'pending.example.com',
    status: 'pending',
    created_at: '2024-01-01T00:00:00Z'
  }
}

export const planFixtures = {
  starter: {
    id: 'plan-starter',
    name: 'Starter',
    price: 29,
    currency: 'USD',
    interval: 'month',
    features: ['feature1', 'feature2']
  },
  pro: {
    id: 'plan-pro',
    name: 'Pro',
    price: 99,
    currency: 'USD',
    interval: 'month',
    features: ['feature1', 'feature2', 'feature3']
  }
}
