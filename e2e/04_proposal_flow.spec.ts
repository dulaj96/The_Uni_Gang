import { test, expect } from '@playwright/test';

test.describe('💖 Proposal Hub & Privacy E2E Flow', () => {
  test('should load Proposal Hub landing page', async ({ page }) => {
    await page.goto('/proposals');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/proposals/);
  });
});
