/**
 * Test Helpers
 * Utility functions for testing
 */

export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockFetch = (response: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
      status: 200
    })
  ) as jest.Mock
}

export const mockFetchError = (status = 400) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Test error' }),
      status
    })
  ) as jest.Mock
}

export const cleanup = () => {
  jest.clearAllMocks()
  jest.resetAllMocks()
}
