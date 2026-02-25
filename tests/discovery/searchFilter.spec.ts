// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Search and filter workflow', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // 1. Type a keyword into the search input and press Enter
    await page.fill('input[placeholder="Start typing"]', 'sample');
    await page.keyboard.press('Enter');

    // 2. Click "Apply Search & Filter"
    await page.click('text=Apply Search & Filter');

    // 3. Select a personalized filter from dropdown
    await page.click('.tour-home-personalized-filter-dropdown-wrapper .ant-select-selector');
    const firstFilter = page.locator('.ant-select-dropdown li').first();
    if (await firstFilter.count()) await firstFilter.click();

    // 4. Click the expand/collapse toggle
    const expandBtn = page.locator('.tour-home-personalized-filter-expand-btn');
    await expandBtn.click();
    await expect(page.locator('.home-filter-section')).toHaveClass(/animate__fadeOut/);
    await expandBtn.click();
    await expect(page.locator('.home-filter-section')).toHaveClass(/animate__fadeIn/);

    // 5. Choose values for one of the dynamic filters and apply search
    const dynamicInput = page.locator('.dynamic-filter-select input').first();
    if (await dynamicInput.count()) {
      await dynamicInput.fill('value');
    }
    await page.click('text=Apply Search & Filter');
  });
});
