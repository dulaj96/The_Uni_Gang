import { test, expect } from '@playwright/test';

test.describe('💬 Contact, Support & FAQ E2E Flow', () => {
  test('should load Contact Us page', async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/contact-us/);
  });

  test('should load FAQ page', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/faq/);
  });
});
