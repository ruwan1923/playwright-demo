// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  test('Wish List and Refer a Friend', async ({ page }) => {
    // Navigate to home page
    await page.goto('https://sauce-demo.myshopify.com/');

    // Click Wish list link
    await page.getByRole('link', { name: 'Wish list' }).click();
    
    // Verify URL fragment is set for wish list
    await expect(page).toHaveURL(/#sauce-show-wish-list/);

    // Navigate back to home
    await page.goto('https://sauce-demo.myshopify.com/');

    // Click Refer a friend link
    await page.getByRole('link', { name: 'Refer a friend' }).click();
    
    // Verify URL fragment is set for referral
    await expect(page).toHaveURL(/#sauce-show-refer-friend/);
  });
});