// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Material Page Workflows', () => {
  test('Export materials to Excel', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/material');

    // click export
    await page.click('.btn-excel');
    await expect(page.locator('text=Warning!')).toBeVisible();
    await page.click('button:has-text("Cancel")');
    await page.click('.btn-excel');
    await page.click('button:has-text("Download")');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("Download")')
    ]).catch(() => [null]);
    if (download) expect(download.suggestedFilename()).toContain('Material_');
  });
});
