import { test, expect } from '@playwright/test';

test.describe('🛒 Marketplace & E-Commerce E2E Flow', () => {
  test('should load Marketplace Home', async ({ page }) => {
    await page.goto('/market');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/market/);
  });
});
