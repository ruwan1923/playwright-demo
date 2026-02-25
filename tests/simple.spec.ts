import { test, expect } from '@playwright/test';

console.log('simple spec loaded');

test('basic', async ({ page }) => {
  console.log('running basic');
});
