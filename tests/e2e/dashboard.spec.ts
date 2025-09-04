/**
 * Dashboard E2E Tests
 */

import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/dashboard')
    // In a real test, you would set up authentication cookies or tokens
  })

  test('should display dashboard navigation', async ({ page }) => {
    await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByText('Websites')).toBeVisible()
    await expect(page.getByText('Settings')).toBeVisible()
  })

  test('should display user profile', async ({ page }) => {
    await expect(page.getByText('Test User')).toBeVisible()
    await expect(page.getByText('test@example.com')).toBeVisible()
  })

  test('should display plan information', async ({ page }) => {
    await expect(page.getByText('Starter Plan')).toBeVisible()
    await expect(page.getByText('$29/month')).toBeVisible()
  })

  test('should display website list', async ({ page }) => {
    await expect(page.getByText('Your Websites')).toBeVisible()
    await expect(page.getByText('Create New Website')).toBeVisible()
  })

  test('should allow creating new website', async ({ page }) => {
    await page.getByText('Create New Website').click()
    await expect(page.getByText('Create Website')).toBeVisible()
    
    await page.getByPlaceholder('Website Name').fill('Test Website')
    await page.getByPlaceholder('Domain').fill('test.example.com')
    await page.getByText('Create Website').click()

    await expect(page.getByText('Website created successfully!')).toBeVisible()
  })

  test('should display website cards', async ({ page }) => {
    await expect(page.getByText('Test Website')).toBeVisible()
    await expect(page.getByText('test.example.com')).toBeVisible()
    await expect(page.getByText('Active')).toBeVisible()
  })

  test('should allow editing website', async ({ page }) => {
    await page.getByText('Edit').first().click()
    await expect(page.getByText('Edit Website')).toBeVisible()
    
    await page.getByPlaceholder('Website Name').fill('Updated Website')
    await page.getByText('Save Changes').click()

    await expect(page.getByText('Website updated successfully!')).toBeVisible()
  })

  test('should allow deleting website', async ({ page }) => {
    await page.getByText('Delete').first().click()
    await expect(page.getByText('Are you sure you want to delete this website?')).toBeVisible()
    
    await page.getByText('Confirm Delete').click()
    await expect(page.getByText('Website deleted successfully!')).toBeVisible()
  })

  test('should display upgrade CTA for starter plan', async ({ page }) => {
    await expect(page.getByText('Upgrade to Pro')).toBeVisible()
    await expect(page.getByText('Get more features')).toBeVisible()
  })

  test('should navigate to upgrade page', async ({ page }) => {
    await page.getByText('Upgrade to Pro').click()
    await expect(page).toHaveURL(/.*pricing/)
    await expect(page.getByText('Choose Your Plan')).toBeVisible()
  })

  test('should display language selector', async ({ page }) => {
    await expect(page.getByText('🇺🇸')).toBeVisible()
    await expect(page.getByText('English')).toBeVisible()
  })

  test('should allow changing language', async ({ page }) => {
    await page.getByText('🇺🇸').click()
    await expect(page.getByText('Español')).toBeVisible()
    
    await page.getByText('Español').click()
    await expect(page.getByText('🇪🇸')).toBeVisible()
  })

  test('should display settings page', async ({ page }) => {
    await page.getByText('Settings').click()
    await expect(page).toHaveURL(/.*settings/)
    await expect(page.getByText('Account Settings')).toBeVisible()
  })

  test('should allow updating profile', async ({ page }) => {
    await page.getByText('Settings').click()
    await page.getByPlaceholder('Full Name').fill('Updated Name')
    await page.getByText('Save Changes').click()

    await expect(page.getByText('Profile updated successfully!')).toBeVisible()
  })

  test('should display billing information', async ({ page }) => {
    await page.getByText('Settings').click()
    await page.getByText('Billing').click()
    await expect(page.getByText('Billing Information')).toBeVisible()
    await expect(page.getByText('Current Plan: Starter')).toBeVisible()
  })

  test('should allow changing password', async ({ page }) => {
    await page.getByText('Settings').click()
    await page.getByText('Security').click()
    await page.getByPlaceholder('Current Password').fill('oldpassword')
    await page.getByPlaceholder('New Password').fill('newpassword123')
    await page.getByPlaceholder('Confirm New Password').fill('newpassword123')
    await page.getByText('Change Password').click()

    await expect(page.getByText('Password changed successfully!')).toBeVisible()
  })
})
