import { test, expect } from '@playwright/test';

test.describe('📢 Advertise & Promotion E2E Flow', () => {
  test('should load Advertise landing page', async ({ page }) => {
    await page.goto('/advertise');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/advertise/);
  });
});
