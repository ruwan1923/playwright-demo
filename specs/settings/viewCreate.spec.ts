// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('View Settings Modal', () => {
  test('Create a new personalized view', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');
    // open view setting via icon next to view dropdown
    await page.click('.tour-home-personalized-view-dropdown-icon');
    await expect(page.locator('text=My View Settings')).toBeVisible();
    // select first attribute row
    const attr = page.locator('.ant-modal-content tbody tr').first().locator('input[type="checkbox"]');
    if (await attr.count()) await attr.check();
    await page.click('button:has-text("Next")');
    // drag first column header a bit to reorder
    const header = page.locator('.ant-table-thead th').first();
    const box = await header.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 5, box.y + 5);
      await page.mouse.down();
      await page.mouse.move(box.x + 50, box.y + 5);
      await page.mouse.up();
    }
    // freeze first column if checkbox exists
    await page.click('input[type="checkbox"][name="freeze"]').catch(() => {});
    await page.fill('input', `view-${Date.now()}`);
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Successfully saved.')).toBeVisible();
  });
});
