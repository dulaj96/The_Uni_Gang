import { test, expect } from '@playwright/test';

test.describe('🛠️ Student Services Directory E2E Flow', () => {
  test('should load Services page', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/services/);
  });
});
