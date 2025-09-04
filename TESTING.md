# Testing Guide for Naveeg

This document provides comprehensive guidance on testing the Naveeg platform, including unit tests, integration tests, and end-to-end tests.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)

## Overview

The Naveeg platform uses a comprehensive testing strategy to ensure reliability, performance, and user experience across all components:

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test interactions between different parts of the system
- **End-to-End Tests**: Test complete user workflows from start to finish
- **Performance Tests**: Test system performance under various conditions
- **Security Tests**: Test for security vulnerabilities and compliance

## Testing Stack

### Core Testing Libraries

- **Jest**: JavaScript testing framework for unit and integration tests
- **React Testing Library**: Testing utilities for React components
- **Playwright**: End-to-end testing framework
- **MSW**: Mock Service Worker for API mocking
- **Testing Library User Event**: User interaction simulation

### Additional Tools

- **Coverage**: Jest coverage reporting
- **ESLint**: Code quality and testing best practices
- **TypeScript**: Type safety in tests
- **Docker**: Containerized testing environments

## Test Types

### 1. Unit Tests

Unit tests focus on testing individual functions, components, and utilities in isolation.

**Location**: `src/__tests__/` or `*.test.ts/tsx`

**Example**:
```typescript
import { render, screen } from '@testing-library/react'
import { LanguageSelector } from '../i18n/language-selector'

describe('LanguageSelector', () => {
  it('renders with default props', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### 2. Integration Tests

Integration tests verify that different parts of the system work together correctly.

**Location**: `src/__tests__/integration/`

**Example**:
```typescript
import { render, screen } from '@testing-library/react'
import { Dashboard } from '../dashboard'
import { mockSupabaseClient } from '../testing/mocks'

describe('Dashboard Integration', () => {
  it('loads user data and displays websites', async () => {
    mockSupabaseClient.from().select.mockResolvedValue({
      data: mockWebsites,
      error: null
    })

    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Website')).toBeInTheDocument()
    })
  })
})
```

### 3. End-to-End Tests

E2E tests simulate real user interactions across the entire application.

**Location**: `tests/e2e/`

**Example**:
```typescript
import { test, expect } from '@playwright/test'

test('user can create a website', async ({ page }) => {
  await page.goto('/dashboard')
  await page.getByText('Create New Website').click()
  await page.getByPlaceholder('Website Name').fill('Test Website')
  await page.getByText('Create Website').click()
  
  await expect(page.getByText('Website created successfully!')).toBeVisible()
})
```

### 4. API Tests

API tests verify that backend endpoints work correctly.

**Location**: `supabase/functions/__tests__/`

**Example**:
```typescript
import { describe, it, expect } from '@jest/globals'

describe('Provision Site API', () => {
  it('should create a new website', async () => {
    const response = await fetch('/api/provision-site', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'user-123',
        websiteName: 'Test Website'
      })
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})
```

## Running Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Set up test environment:
```bash
npm run test:setup
```

### Commands

#### Unit and Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for specific file
npm test -- language-selector.test.tsx

# Run tests for specific pattern
npm test -- --testNamePattern="LanguageSelector"
```

#### End-to-End Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific E2E test
npm run test:e2e -- auth.spec.ts

# Run E2E tests in headed mode
npm run test:e2e -- --headed
```

#### CI/CD Tests

```bash
# Run tests for CI
npm run test:ci

# Run all tests including E2E
npm run test:all
```

## Writing Tests

### Test Structure

Follow the AAA pattern (Arrange, Act, Assert):

```typescript
describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const props = { title: 'Test Title' }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

### Mocking

#### API Mocking

```typescript
import { mockSupabaseClient } from '@naveeg/lib/testing'

beforeEach(() => {
  mockSupabaseClient.from().select.mockResolvedValue({
    data: mockData,
    error: null
  })
})
```

#### Component Mocking

```typescript
jest.mock('../components/expensive-component', () => ({
  ExpensiveComponent: () => <div>Mocked Component</div>
}))
```

#### External Service Mocking

```typescript
import { mockStripe, mockTenWebAPI } from '@naveeg/lib/testing'

beforeEach(() => {
  mockStripe.checkout.sessions.create.mockResolvedValue({
    id: 'session_123',
    url: 'https://checkout.stripe.com/session_123'
  })
})
```

### Test Data

Use fixtures and factories for consistent test data:

```typescript
import { generateUser, generateWebsite } from '@naveeg/lib/testing'

const mockUser = generateUser({ email: 'test@example.com' })
const mockWebsite = generateWebsite({ name: 'Test Website' })
```

### Async Testing

```typescript
it('should load data asynchronously', async () => {
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

### Error Testing

```typescript
it('should handle errors gracefully', async () => {
  mockSupabaseClient.from().select.mockRejectedValue(new Error('API Error'))
  
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })
})
```

## Test Coverage

### Coverage Goals

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:ci && npm run lint"
    }
  }
}
```

## Best Practices

### 1. Test Organization

- Group related tests in describe blocks
- Use descriptive test names
- Keep tests focused and atomic
- Avoid testing implementation details

### 2. Test Data

- Use factories for test data generation
- Keep test data minimal and focused
- Use realistic data when possible
- Clean up test data after tests

### 3. Assertions

- Use specific assertions
- Test behavior, not implementation
- Use meaningful error messages
- Test edge cases and error conditions

### 4. Performance

- Keep tests fast
- Use mocks for slow operations
- Avoid unnecessary async operations
- Use test.only for debugging

### 5. Maintenance

- Update tests when code changes
- Remove obsolete tests
- Keep tests readable and maintainable
- Document complex test scenarios

### 6. Security

- Test authentication and authorization
- Test input validation
- Test error handling
- Test rate limiting

## Debugging Tests

### Jest Debugging

```bash
# Run tests in debug mode
npm test -- --detectOpenHandles

# Run specific test in debug mode
npm test -- --testNamePattern="specific test" --verbose
```

### Playwright Debugging

```bash
# Run tests in headed mode
npm run test:e2e -- --headed

# Run tests with debug mode
npm run test:e2e -- --debug

# Run specific test with debug
npm run test:e2e -- auth.spec.ts --debug
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or use proper async handling
2. **Mock not working**: Check mock setup and cleanup
3. **E2E tests failing**: Verify test environment and data setup
4. **Coverage not accurate**: Check coverage configuration and exclusions

### Getting Help

- Check test logs for detailed error messages
- Use debug mode to step through tests
- Review test documentation and examples
- Ask for help in team channels

## Conclusion

This testing guide provides a comprehensive framework for testing the Naveeg platform. By following these guidelines and best practices, you can ensure that your code is reliable, maintainable, and user-friendly.

Remember to:
- Write tests early and often
- Keep tests simple and focused
- Use appropriate testing tools for each scenario
- Maintain good test coverage
- Follow testing best practices
- Debug and troubleshoot effectively

Happy testing! 🧪
