// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filter Settings Modal', () => {
  test('Delete a personalized filter', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    await page.click('.tour-home-personalized-filter-dropdown-icon');
    await expect(page.locator('text=My Filter Settings')).toBeVisible();
    const deleteBtn = page.locator('.ant-modal-content button:has-text("Delete")').first();
    if (await deleteBtn.count()) {
      await deleteBtn.click();
      await page.click('button:has-text("Yes")');
    }
  });
});
