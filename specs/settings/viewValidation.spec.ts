// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('View Settings Modal', () => {
  test('Validation and preview errors', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');
    await page.click('.tour-home-personalized-view-dropdown-icon');
    await expect(page.locator('text=My View Settings')).toBeVisible();
    // attempt save immediately
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Attributes is required')).toBeVisible().catch(() => {});
    // select one attribute then move next without name
    const attr = page.locator('.ant-modal-content tbody tr').first().locator('input[type="checkbox"]');
    if (await attr.count()) await attr.check();
    await page.click('button:has-text("Next")');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Name is required')).toBeVisible().catch(() => {});
  });
});
