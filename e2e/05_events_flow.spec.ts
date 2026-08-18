import { test, expect } from '@playwright/test';

test.describe('📅 Campus Events E2E Flow', () => {
  test('should load Events list page', async ({ page }) => {
    await page.goto('/event-list');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/event-list/);
  });
});
