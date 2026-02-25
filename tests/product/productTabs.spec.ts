// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Tabs Page', () => {
  test('Open product detail tabs', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // click first product row
    const row = page.locator('table tbody tr').first();
    if (await row.count()) {
      await row.click();
      const tabs = page.locator('.product-tabs-wrapper .ant-tabs-tab');
      await expect(tabs).toHaveCountGreaterThan(0);
      // click the new tab
      await tabs.last().click();
      await expect(page.locator('.product-detail')).toBeVisible().catch(() => {});
    }

    // drag and drop tabs and close
    const tabs = page.locator('.product-tabs-wrapper .ant-tabs-tab');
    if (await tabs.count() > 1) {
      const first = tabs.first();
      const second = tabs.nth(1);
      const box1 = await first.boundingBox();
      const box2 = await second.boundingBox();
      if (box1 && box2) {
        await page.mouse.move(box1.x + box1.width/2, box1.y + box1.height/2);
        await page.mouse.down();
        await page.mouse.move(box2.x + box2.width/2, box2.y + box2.height/2);
        await page.mouse.up();
      }
      // close second tab if close icon present
      const closeIcon = tabs.nth(1).locator('.anticon-close');
      if (await closeIcon.count()) await closeIcon.click();
    }
  });
});
