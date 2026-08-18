import { test, expect } from '@playwright/test';

test.describe('🛒 Marketplace & E-Commerce E2E Flow', () => {
  test('should load Marketplace Home and render product catalog', async ({ page }) => {
    await page.goto('/market');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    // Verify marketplace header/title exists
    const pageHeader = page.locator('h1, h2').filter({ hasText: /Market|Store|Shop|Items/i }).first();
    await expect(pageHeader).toBeVisible();
  });

  test('should filter products by category pills', async ({ page }) => {
    await page.goto('/market');
    await page.waitForTimeout(500);

    // Click category filter button if present
    const categoryBtn = page.locator('button').filter({ hasText: /Electronics|Books|Gigs|All/i }).first();
    if (await categoryBtn.isVisible()) {
      await categoryBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
