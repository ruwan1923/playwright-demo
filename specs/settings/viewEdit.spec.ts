// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('View Settings Modal', () => {
  test('Edit an existing view', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');
    await page.click('.tour-home-personalized-view-dropdown-icon');
    await expect(page.locator('text=My View Settings')).toBeVisible();
    const editBtn = page.locator('.ant-modal-content button:has-text("Edit")').first();
    if (await editBtn.count()) {
      await editBtn.click();
      // change name
      const nameInput = page.locator('.ant-modal-content input').first();
      await nameInput.fill(`edited-view-${Date.now()}`);
      await page.click('button:has-text("Save")');
      await expect(page.locator('text=Successfully saved.')).toBeVisible();
    }
  });
});
