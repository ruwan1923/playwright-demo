// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

console.log('viewSelection.spec.ts: module loaded');

test.describe('Discovery Home Page - Products', () => {
  test('Personalized view selection', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // 1. Open view dropdown and select an alternative view
    await page.click('.tour-home-personalized-view-dropdown-wrapper .ant-select-selector');
    const viewOpt = page.locator('.ant-select-dropdown li').nth(1);
    if (await viewOpt.count()) await viewOpt.click();
    // assert at least one column header exists in table
    await expect(page.locator('table thead th')).toHaveCountGreaterThan(0);

    // 2. Open the view settings modal by clicking its settings icon
    await page.click('.tour-home-personalized-view-dropdown-icon');
    await expect(page.locator('text=My View Settings')).toBeVisible();
  });
});
