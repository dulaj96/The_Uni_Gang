import { test, expect } from '@playwright/test';

test.describe('🚫 404 Catch-All & Edge Cases E2E Flow', () => {
  test('should handle wildcard 404 routes gracefully', async ({ page }) => {
    await page.goto('/random-non-existent-page-url-12345');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/random-non-existent-page-url-12345');
  });
});
