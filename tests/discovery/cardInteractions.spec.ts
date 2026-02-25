// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Card interactions', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // switch to card mode
    await page.click('button[aria-label="Grid view"], button:has-text("Grid")');

    // 1. Switch to card mode and click a product card
    const card = page.locator('.personalized-card-view').first();
    if (await card.count()) {
      await card.click();
      await expect(page.locator('.product-tabs-wrapper .ant-tabs-tab')).toHaveCountGreaterThan(0);
    }

    // 2. Use pagination at bottom of cards
    const page2 = page.locator('.ant-pagination li').nth(2);
    if (await page2.count()) {
      await page2.click();
    }
  });
});
