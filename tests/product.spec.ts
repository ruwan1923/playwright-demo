// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  test('Product Details and Add to Cart', async ({ page }) => {
    // Start scenario by navigating to home
    await page.goto('https://sauce-demo.myshopify.com/');

    // Open non-sold-out product
    await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();

    // Verify product title visible on detail
    await expect(page.getByRole('heading', { name: 'Grey jacket' })).toBeVisible();

    // Verify product price visible on detail
    await expect(page.getByRole('heading', { name: '£55.00' })).toBeVisible();

    // Verify Add to Cart enabled
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();

    // Click Add to Cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Verify cart counter shows 1
    await expect(page.getByText('My Cart (1)')).toBeVisible();

    // Return to catalog for sold-out item
    await page.getByRole('link', { name: 'Catalog' }).click();

    // Open sold-out product page
    await page.getByRole('link', { name: 'Sold Out Brown Shades Brown' }).click();

    // Verify sold out button visible
    await expect(page.getByRole('button', { name: 'Sold Out' })).toBeVisible();
  });
});