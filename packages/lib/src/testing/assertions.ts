/**
 * Custom Assertions
 * Extended assertions for testing
 */

export const expectToBeValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  expect(emailRegex.test(email)).toBe(true)
}

export const expectToBeValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  expect(uuidRegex.test(uuid)).toBe(true)
}

export const expectToBeValidURL = (url: string) => {
  try {
    new URL(url)
    expect(true).toBe(true)
  } catch {
    expect(false).toBe(true)
  }
}

export const expectToBeValidDate = (date: string | Date) => {
  const dateObj = new Date(date)
  expect(dateObj instanceof Date && !isNaN(dateObj.getTime())).toBe(true)
}
