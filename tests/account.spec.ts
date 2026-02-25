// spec: specs/test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Operations', () => {
  // This test is blocked by Cloudflare bot protection (HTTP 429 responses).
  // The sauce-demo.myshopify.com site requires manual verification to allow automated access.
  // To fix this: contact the site admin to whitelist the test IP or disable Cloudflare protection.
  test.fixme('Account Forms Validation', async ({ page }) => {
    // Go directly to login page
    await page.goto('https://sauce-demo.myshopify.com/account/login');

    // Verify email and password fields exist
    await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

    // Attempt to submit blank login form
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Go to registration page
    await page.goto('https://sauce-demo.myshopify.com/account/register');

    // Verify all registration fields exist
    await expect(page.getByRole('textbox').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();

    // Submit registration with empty fields
    await page.getByRole('button', { name: 'Create' }).click();

    // Verify hCaptcha validation appears
    await expect(page.getByRole('img', { name: 'Protected by hCaptcha' })).toBeVisible();
  });
});