// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  // This test is blocked by Cloudflare bot protection (HTTP 429 responses).
  // The sauce-demo.myshopify.com site requires manual verification to allow automated access.
  // To fix this: contact the site admin to whitelist the test IP or disable Cloudflare protection.
  test.fixme('Cart Operations', async ({ page }) => {
    // Go to home in cart scenario
    await page.goto('https://sauce-demo.myshopify.com/');

    // Open product to add to cart
    await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();

    // Add item to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Go to cart page
    await page.getByRole('link', { name: 'Check Out' }).click();

    // Change item quantity to 2
    await page.locator('#cart #updates_611945025').fill('2');

    // Click Update
    await page.getByRole('button', { name: 'Update' }).click();

    // Remove item from cart by clicking x
    await page.getByRole('link', { name: 'x' }).click();

    // Continue shopping to add item for note test
    await page.getByRole('link', { name: 'Continue Shopping' }).click();

    // Add item again for note test
    await page.getByRole('link', { name: 'Grey jacket Grey jacket £' }).click();

    // Add item again
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Return to cart for note
    await page.getByRole('link', { name: 'Check Out' }).click();

    // Add order note
    await page.getByRole('textbox', { name: 'Add a note to your order...' }).fill('Please gift wrap');

    // Update cart note
    await page.getByRole('button', { name: 'Update' }).click();

    // Remove final item to empty cart again
    await page.getByRole('link', { name: 'x' }).click();

    // Verify empty cart message
    await expect(page.getByText('It appears that your cart is currently empty!')).toBeVisible();
  });
});