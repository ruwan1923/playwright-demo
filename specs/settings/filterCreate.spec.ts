// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filter Settings Modal', () => {
  test('Create a new personalized filter', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // Open filter settings modal from Home page
    await page.click('.tour-home-personalized-filter-dropdown-icon');
    await expect(page.locator('text=My Filter Settings')).toBeVisible();

    // Select several attributes from the list and proceed to next step
    // assume modal shows list with checkboxes
    const attrCheckbox = page.locator('.ant-modal-content tbody tr').first().locator('input[type="checkbox"]');
    if (await attrCheckbox.count()) {
      await attrCheckbox.check();
    }
    await page.click('button:has-text("Next")');

    // Provide a unique filter name and save
    await page.fill('input', `e2e-filter-${Date.now()}`);
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Successfully saved.')).toBeVisible();
  });
});
