import { test, expect } from '@playwright/test';

test.describe('🛡️ Admin Moderation & RBAC E2E Flow', () => {
  test('should redirect unauthenticated users away from /admin', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(500);

    // Verify unauthenticated access redirects to home / login
    expect(page.url()).not.toContain('/admin');
  });
});
