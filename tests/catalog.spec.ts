// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  test('Catalog Browsing', async ({ page }) => {
    // Navigate to home for catalog browsing
    await page.goto('https://sauce-demo.myshopify.com/');

    // Click the Catalog link
    await page.getByRole('link', { name: 'Catalog' }).click();

    // Verify that Grey jacket product appears
    await expect(page.getByRole('heading', { name: 'Grey jacket' })).toBeVisible();

    // Open first product detail
    await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();

    // Verify product price visible on detail
    await expect(page.getByRole('heading', { name: '£55.00' })).toBeVisible();

    // Click Catalog to return to list
    await page.getByRole('link', { name: 'Catalog' }).click();
  });
});