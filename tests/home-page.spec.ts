// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  test('Home Page Accessibility', async ({ page }) => {
    // Navigate to the home page
    await page.goto('https://sauce-demo.myshopify.com/');

    // Verify logo heading visible
    await expect(page.getByRole('heading', { name: 'Sauce Demo' })).toBeVisible();

    // Verify search bar visible
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();

    // Verify footer About Us link
    await expect(page.locator('footer').getByRole('link', { name: 'About Us' }).first()).toBeVisible();

    // Verify payment icon present
    await expect(page.getByRole('img', { name: 'We accept Amex' })).toBeVisible();
  });
});