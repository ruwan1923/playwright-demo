// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filter Settings Modal', () => {
  test('Edit existing filter', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // open filter modal first
    await page.click('.tour-home-personalized-filter-dropdown-icon');
    await expect(page.locator('text=My Filter Settings')).toBeVisible();
    // assume personal filters have edit buttons in table
    const editBtn = page.locator('.ant-modal-content button:has-text("Edit")').first();
    if (await editBtn.count()) {
      await editBtn.click();
      // modify name
      const nameInput = page.locator('.ant-modal-content input').first();
      await nameInput.fill(`edited-${Date.now()}`);
      await page.click('button:has-text("Save")');
      await expect(page.locator('text=Successfully saved.')).toBeVisible();
    }
  });
});
