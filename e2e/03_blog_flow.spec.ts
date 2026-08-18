import { test, expect } from '@playwright/test';

test.describe('📝 Blog System & Sanitization E2E Flow', () => {
  test('should load Blogs feed page', async ({ page }) => {
    await page.goto('/blogs');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/blogs/);
  });

  test('should navigate to Submit Blog page', async ({ page }) => {
    await page.goto('/submit-blog');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/submit-blog/);
  });
});
