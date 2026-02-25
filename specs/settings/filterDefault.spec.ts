// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filter Settings Modal', () => {
  test('Default filter behavior', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    await page.click('.tour-home-personalized-filter-dropdown-icon');
    await expect(page.locator('text=My Filter Settings')).toBeVisible();
    const switches = page.locator('.ant-modal-content .custom-switch-wrapper');
    if (await switches.count() >= 2) {
      await switches.nth(0).click();
      await switches.nth(1).click();
      await page.reload();
      // after reload only one switch is checked
      const checked = page.locator('.custom-switch-wrapper .ant-switch-checked');
      expect(await checked.count()).toBe(1);
    }
  });
});
