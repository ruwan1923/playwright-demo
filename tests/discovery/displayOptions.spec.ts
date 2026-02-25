// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Display options toggles', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // 1. Change display level to "Colorway"
    await page.click('.tour-home-display-level-wrapper .ant-select-selector');
    const colorway = page.locator('.ant-select-dropdown li').filter({ hasText: 'Colorway' });
    if (await colorway.count()) await colorway.click();

    // 2. Switch display mode to card
    await page.click('button[aria-label="Grid view"], button:has-text("Grid")');
    await expect(page.locator('.personalized-card-view')).toHaveCountGreaterThan(0);

    // 3. Switch back to table
    await page.click('button[aria-label="List view"], button:has-text("List")');
    await expect(page.locator('table')).toBeVisible();
  });
});
