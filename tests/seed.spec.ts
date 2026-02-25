import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // starting point seed test; navigate to base URL
    await page.goto('https://dev.plmviewerapp.pandoradigital.io/');
    // TODO: add initial assertions or login if required
  });
});
