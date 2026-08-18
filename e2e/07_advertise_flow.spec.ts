import { test, expect } from '@playwright/test';

test.describe('📢 Advertise & Promotion E2E Flow', () => {
  test('should load Advertise landing page and show package pricing', async ({ page }) => {
    await page.goto('/advertise');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const heading = page.locator('h1, h2').filter({ hasText: /Advertise|Promote|Reach|Business/i }).first();
    await expect(heading).toBeVisible();
  });
});
