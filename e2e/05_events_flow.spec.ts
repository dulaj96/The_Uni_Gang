import { test, expect } from '@playwright/test';

test.describe('📅 Campus Events E2E Flow', () => {
  test('should load Events list page and render active campus events', async ({ page }) => {
    await page.goto('/event-list');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const heading = page.locator('h1, h2').filter({ hasText: /Event|Campus|Upcoming|Activities/i }).first();
    await expect(heading).toBeVisible();
  });
});
