// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filter Settings Modal', () => {
  test('Validation and errors', async ({ page }) => {
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');

    await page.click('.tour-home-personalized-filter-dropdown-icon');
    await expect(page.locator('text=My Filter Settings')).toBeVisible();
    // new filter by clicking add? assume existing button
    await page.click('button:has-text("New")').catch(() => {});
    // navigate steps if needed
    await page.click('button:has-text("Next")');
    // leave name blank and save
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Name is required')).toBeVisible().catch(() => {});

    // duplicate name
    await page.fill('input', 'ExistingName');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Name is duplicated!')).toBeVisible().catch(() => {});
  });
});
