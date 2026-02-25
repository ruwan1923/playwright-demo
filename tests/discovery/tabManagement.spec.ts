// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Tab management and navigation', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');
    // 1. default season tab exists
    const tabs = page.locator('.ant-tabs-nav .ant-tabs-tab');
    await expect(tabs.first()).toBeVisible();

    // 2. add a new cycle via plus icon
    await page.hover('.tour-home-tab-add-btn');
    await page.click('.tour-home-tab-add-btn');
    const option = page.locator('.ant-select-dropdown li').first();
    if (await option.count()) {
      await option.click();
      await expect(tabs).toHaveCountGreaterThan(1);
    }

    // 3. refresh tab
    const settings = page.locator('.ant-tabs-nav .anticon');
    if (await settings.count()) {
      await settings.first().click();
      const refresh = page.locator('text=Refresh Tab');
      if (await refresh.count()) await refresh.click();
    }

    // 4. close a tab if more than one
    if ((await tabs.count()) > 1) {
      await tabs.nth(1).locator('.anticon').click();
      const close = page.locator('text=Close Tab');
      if (await close.count()) await close.click();
    }

    // 5. try exceed max cycles
    for (let i = 0; i < 7; i++) {
      await page.click('.tour-home-tab-add-btn');
      const opt = page.locator('.ant-select-dropdown li').nth(i);
      if (await opt.count()) await opt.click();
    }
    if (await tabs.count() >= 6) {
      await expect(page.locator('.tour-home-tab-add-btn')).toHaveCount(0);
    }

    // 6. drag-and-drop tabs
    if ((await tabs.count()) > 1) {
      const first = tabs.first();
      const second = tabs.nth(1);
      const box1 = await first.boundingBox();
      const box2 = await second.boundingBox();
      if (box1 && box2) {
        await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
        await page.mouse.down();
        await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
        await page.mouse.up();
      }
    }
  });
});
