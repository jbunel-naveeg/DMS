import { test, expect } from '@playwright/test';

test('homepage and pricing visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Naveeg')).toBeVisible();
  await page.goto('/pricing');
  await expect(page.getByText('Pricing')).toBeVisible();
});

test('onboarding steps render', async ({ page }) => {
  await page.context().addCookies([
    { name: 'sb-access-token', value: 'dev', domain: 'localhost', path: '/' },
  ]);
  await page.goto('/onboarding');
  await expect(page.getByText('Onboarding')).toBeVisible();
  await page.getByPlaceholder('Business name').fill('Acme');
  await page.getByText('Next').click();
  await expect(page.getByText('Design')).toBeVisible();
});

