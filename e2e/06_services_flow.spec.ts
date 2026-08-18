import { test, expect } from '@playwright/test';

test.describe('🛠️ Student Services Directory E2E Flow', () => {
  test('should load Services page and display provider listings', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const heading = page.locator('h1, h2').filter({ hasText: /Service|Provider|Student|Directory/i }).first();
    await expect(heading).toBeVisible();
  });
});
