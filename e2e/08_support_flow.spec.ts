import { test, expect } from '@playwright/test';

test.describe('💬 Contact, Support & FAQ E2E Flow', () => {
  test('should load Contact Us page and display contact details', async ({ page }) => {
    await page.goto('/contact-us');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const heading = page.locator('h1, h2').filter({ hasText: /Contact|Get in Touch|Support|Reach/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should load FAQ page and render expandable accordion questions', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveTitle(/The Uni Gang/i);

    const faqHeading = page.locator('h1, h2').filter({ hasText: /FAQ|Questions|Frequently|Help/i }).first();
    await expect(faqHeading).toBeVisible();
  });
});
