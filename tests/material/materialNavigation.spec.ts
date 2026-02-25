// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Material Page Workflows', () => {
  test('Navigate to material page', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // Click material tab or navigate via URL to /material
    const materialTab = page.locator('text=Material').first();
    if (await materialTab.count()) {
      await materialTab.click();
      await expect(page).toHaveURL(/\/material/);
    } else {
      await page.goto('https://dev.plmviewerapp.pandoradigital.io/material');
      await expect(page).toHaveURL(/\/material/);
    }
  });
});
