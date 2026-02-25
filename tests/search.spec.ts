// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  // This test is blocked by Cloudflare bot protection (HTTP 429 responses).
  // The sauce-demo.myshopify.com site requires manual verification to allow automated access.
  // To fix this: contact the site admin to whitelist the test IP or disable Cloudflare protection.
  test.fixme('Search Functionality', async ({ page }) => {
    // Go home to start search flow
    await page.goto('https://sauce-demo.myshopify.com/');

    // Enter search query
    await page.getByRole('textbox', { name: 'Search' }).fill('jacket');

    // Submit search form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify first search result present
    await expect(page.getByRole('link', { name: 'Grey jacket Grey jacket £55.00' })).toBeVisible();

    // Enter nonsensical query
    await page.getByRole('textbox', { name: 'Search' }).fill('xyz123');

    // Submit nonsense search
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify no results message
    await expect(page.getByText('No results found for xyz123')).toBeVisible();
  });
});