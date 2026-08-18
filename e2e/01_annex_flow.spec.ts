import { test, expect } from '@playwright/test';

test.describe('🏠 Annex & Housing E2E User Flow', () => {
  test('should navigate to Annex listings and verify page loads', async ({ page }) => {
    await page.goto('/annex-list');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/annex-list/);
  });

  test('should open Post Ad page form', async ({ page }) => {
    await page.goto('/post-ad');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/post-ad/);
  });
});
