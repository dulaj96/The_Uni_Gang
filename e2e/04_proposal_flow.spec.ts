import { test, expect } from '@playwright/test';

test.describe('💖 Proposal Hub & Privacy E2E Flow', () => {
  test('should load Proposal Hub landing entry page', async ({ page }) => {
    await page.goto('/proposals');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const heading = page.locator('h1, h2, h3').filter({ hasText: /Porondam|Proposal|Match|Connect/i }).first();
    await expect(heading).toBeVisible();
  });
});
