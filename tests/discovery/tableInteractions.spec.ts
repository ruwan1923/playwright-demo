// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Discovery Home Page - Products', () => {
  test('Table interactions', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    // 1. Click on a column header to sort ascending
    const header = page.locator('table thead th').first();
    await header.click();

    // 2. Click on a table row
    await page.click('table tbody tr:first-child');
    // verify product tab opened by checking new tab item
    await expect(page.locator('.product-tabs-wrapper .ant-tabs-tab')).toHaveCountGreaterThan(0);

    // 3. Resize a column by dragging the resize handle
    const handle = page.locator('.react-resizable-handle').first();
    if (await handle.count()) {
      const box = await handle.boundingBox();
      if (box) {
        await page.mouse.move(box.x + 1, box.y + 1);
        await page.mouse.down();
        await page.mouse.move(box.x + 50, box.y + 1);
        await page.mouse.up();
      }
    }

    // 4. Navigate through pagination controls
    const nextBtn = page.locator('.ant-pagination-next');
    if (await nextBtn.count()) {
      await nextBtn.click();
    }
  });
});
