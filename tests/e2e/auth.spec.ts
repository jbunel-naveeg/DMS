/**
 * Authentication E2E Tests
 */

import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display sign in and sign up buttons', async ({ page }) => {
    await expect(page.getByText('Sign In')).toBeVisible()
    await expect(page.getByText('Start Free Trial')).toBeVisible()
  })

  test('should navigate to sign in page', async ({ page }) => {
    await page.getByText('Sign In').click()
    await expect(page).toHaveURL(/.*signin/)
    await expect(page.getByText('Welcome back!')).toBeVisible()
  })

  test('should navigate to sign up page', async ({ page }) => {
    await page.getByText('Start Free Trial').click()
    await expect(page).toHaveURL(/.*signup/)
    await expect(page.getByText('Get started with Naveeg today')).toBeVisible()
  })

  test('should show validation errors for invalid sign in', async ({ page }) => {
    await page.getByText('Sign In').click()
    await page.getByPlaceholder('Email Address').fill('invalid-email')
    await page.getByPlaceholder('Password').fill('123')
    await page.getByText('Sign In').click()

    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible()
  })

  test('should show validation errors for invalid sign up', async ({ page }) => {
    await page.getByText('Start Free Trial').click()
    await page.getByPlaceholder('Full Name').fill('')
    await page.getByPlaceholder('Email Address').fill('invalid-email')
    await page.getByPlaceholder('Password').fill('123')
    await page.getByPlaceholder('Confirm Password').fill('456')
    await page.getByText('Create Account').click()

    await expect(page.getByText('This field is required')).toBeVisible()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible()
    await expect(page.getByText('Passwords do not match')).toBeVisible()
  })

  test('should allow valid sign up', async ({ page }) => {
    await page.getByText('Start Free Trial').click()
    await page.getByPlaceholder('Full Name').fill('Test User')
    await page.getByPlaceholder('Email Address').fill('test@example.com')
    await page.getByPlaceholder('Password').fill('password123')
    await page.getByPlaceholder('Confirm Password').fill('password123')
    await page.check('I agree to the Terms of Service and Privacy Policy')
    await page.getByText('Create Account').click()

    // Should show success message or redirect
    await expect(page.getByText('Account created successfully!')).toBeVisible()
  })

  test('should allow valid sign in', async ({ page }) => {
    await page.getByText('Sign In').click()
    await page.getByPlaceholder('Email Address').fill('test@example.com')
    await page.getByPlaceholder('Password').fill('password123')
    await page.getByText('Sign In').click()

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/)
  })

  test('should show forgot password link', async ({ page }) => {
    await page.getByText('Sign In').click()
    await expect(page.getByText('Forgot your password?')).toBeVisible()
  })

  test('should navigate to forgot password page', async ({ page }) => {
    await page.getByText('Sign In').click()
    await page.getByText('Forgot your password?').click()
    await expect(page).toHaveURL(/.*forgot-password/)
    await expect(page.getByText('Enter your email address and we\'ll send you a reset link')).toBeVisible()
  })

  test('should allow password reset', async ({ page }) => {
    await page.getByText('Sign In').click()
    await page.getByText('Forgot your password?').click()
    await page.getByPlaceholder('Email Address').fill('test@example.com')
    await page.getByText('Send Reset Link').click()

    await expect(page.getByText('Check your email for reset instructions')).toBeVisible()
  })

  test('should show Google OAuth option', async ({ page }) => {
    await page.getByText('Sign In').click()
    await expect(page.getByText('Continue with Google')).toBeVisible()
  })

  test('should show GitHub OAuth option', async ({ page }) => {
    await page.getByText('Sign In').click()
    await expect(page.getByText('Continue with GitHub')).toBeVisible()
  })
})
