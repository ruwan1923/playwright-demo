// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  // This test is blocked by Cloudflare bot protection (HTTP 429 responses).
  // The sauce-demo.myshopify.com site requires manual verification to allow automated access.
  // To fix this: contact the site admin to whitelist the test IP or disable Cloudflare protection.
  test.fixme('Navigation & Footer Links', async ({ page }) => {
    // Navigate to home page
    await page.goto('https://sauce-demo.myshopify.com/');

    // Click Home link and verify navigation
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveTitle(/Sauce Demo/);

    // Navigate back and click Catalog
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page).toHaveTitle(/Products/);

    // Navigate back and click Blog
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blogs\/news/);

    // Navigate back and click About Us from main nav
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('list').first().getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/pages\/about-us/);

    // Test footer links
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(/\/search/);
  });
});