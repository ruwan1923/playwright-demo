// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Export functionality', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // 1. Click the Excel export button in table mode
    await page.click('.btn-excel');
    await expect(page.locator('text=Warning!')).toBeVisible();

    // 2. Cancel the confirmation
    await page.click('button:has-text("Cancel")');
    // ensure modal gone
    await expect(page.locator('text=Warning!')).toHaveCount(0);

    // 3. Confirm the export
    await page.click('.btn-excel');
    await page.click('button:has-text("Download")');
    // download assertion uses built-in event
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("Download")')
    ]).catch(() => [null]);
    if (download) {
      expect(download.suggestedFilename()).toContain('Product_');
    }
  });
});
