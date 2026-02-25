// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Material Page Workflows', () => {
  test('Search & filter materials', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/material');

    // Enter keyword
    await page.fill('input[placeholder="Start typing"]', 'metal');
    await page.keyboard.press('Enter');

    // select material filter (reuse same selector as product filter)
    await page.click('.tour-home-personalized-filter-dropdown-wrapper .ant-select-selector');
    const opt = page.locator('.ant-select-dropdown li').first();
    if (await opt.count()) await opt.click();

    // apply search
    await page.click('text=Apply Search & Filter');
    // verify results appear
    await expect(page.locator('table tbody tr')).toHaveCountGreaterThan(0);
  });
});
