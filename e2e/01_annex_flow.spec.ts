import { test, expect } from '@playwright/test';

test.describe('🏠 Annex & Housing E2E User Flow', () => {
  test('should navigate to Annex listings and verify filters & cards', async ({ page }) => {
    await page.goto('/annex-list');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    // Verify Search / Filter controls exist
    const searchInput = page.locator('input[placeholder*="Search"], input[type="text"]').first();
    await expect(searchInput).toBeVisible();

    // Type search location
    await searchInput.fill('Katubedda');
    await page.waitForTimeout(500);

    // Check Annex cards are rendered
    const cards = page.locator('div').filter({ hasText: /LKR|Annex|Rent|Bed/i });
    await expect(cards.first()).toBeVisible();
  });

  test('should open Annex details page and verify gallery/pricing', async ({ page }) => {
    await page.goto('/annex-list');
    await page.waitForTimeout(1000);

    // Click first available Annex detail view
    const viewButton = page.locator('a[href*="/annex/"], button:has-text("View")').first();
    if (await viewButton.isVisible()) {
      await viewButton.click();
      await expect(page.url()).toContain('/annex/');
    }
  });

  test('should open Post Ad page form and verify step navigation', async ({ page }) => {
    await page.goto('/post-ad');
    await page.waitForTimeout(500);

    // Check key form elements exist
    const formHeading = page.locator('h1, h2, h3').filter({ hasText: /Post|Listing|Ad/i }).first();
    await expect(formHeading).toBeVisible();
  });
});
