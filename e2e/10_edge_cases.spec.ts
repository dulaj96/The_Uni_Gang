import { test, expect } from '@playwright/test';

test.describe('🚫 404 Catch-All & Edge Cases E2E Flow', () => {
  test('should render 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/random-non-existent-page-url-12345');
    await page.waitForTimeout(500);

    const notFoundHeader = page.locator('h1, h2').filter({ hasText: /404|Lost|Not Found/i }).first();
    await expect(notFoundHeader).toBeVisible();

    // Verify "Back to Home" button exists
    const homeBtn = page.locator('a[href="/"], button:has-text("Home")').first();
    await expect(homeBtn).toBeVisible();
  });
});
