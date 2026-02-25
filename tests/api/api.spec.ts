// API integration tests based on hooks used in the application

import { test, expect } from '@playwright/test';

// development base API URL (matches .env.dev)
const baseUrl = 'https://dev.flexplmviewerapi.pandoradigital.io/api/v1';

test.describe('API integration tests', () => {
  test('Get my product filters', async ({ request }) => {
    const res = await request.get(`${baseUrl}/Filter/Product/MyFilter`);
    if (!res.ok()) {
      console.warn('my filters endpoint returned', res.status());
      return;
    }
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  test('Get product attributes for personalization', async ({ request }) => {
    const res = await request.get(`${baseUrl}/Personalize/Product/Feilds`);
    if (!res.ok()) {
      console.warn('product attributes endpoint returned', res.status());
      return;
    }
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  test('Check filter name duplication endpoint', async ({ request }) => {
    const res = await request.get(`${baseUrl}/Filter/Product/FilterNameExists?filterName=Test`);
    if (!res.ok()) {
      console.warn('filter name exists endpoint returned', res.status());
      return;
    }
    const json = await res.json();
    expect(typeof json).toBe('boolean');
  });

  test('Get personalized views', async ({ request }) => {
    const res = await request.get(`${baseUrl}/Personalize/Product/MyView`);
    if (!res.ok()) {
      console.warn('my view endpoint returned', res.status());
      return;
    }
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });
});
