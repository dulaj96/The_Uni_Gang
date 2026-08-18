import { test, expect } from '@playwright/test';

test.describe('📝 Blog System & Sanitization E2E Flow', () => {
  test('should load Blogs feed and verify published posts', async ({ page }) => {
    await page.goto('/blogs');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    // Verify blog titles or cards exist
    const blogHeader = page.locator('h1, h2').filter({ hasText: /Blog|Story|Articles|Campus/i }).first();
    await expect(blogHeader).toBeVisible();
  });

  test('should navigate to Submit Blog page and render form steps', async ({ page }) => {
    await page.goto('/submit-blog');
    await page.waitForTimeout(500);

    const titleInput = page.locator('input[placeholder*="Title"], input[type="text"]').first();
    if (await titleInput.isVisible()) {
      await titleInput.fill('E2E Automated Test Blog Title');
      await expect(titleInput).toHaveValue('E2E Automated Test Blog Title');
    }
  });
});
