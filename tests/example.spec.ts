import { test, expect } from '@playwright/test';

// Define the expected title based on src/config/site.ts
const expectedTitle = "Lumo Studios | Your Web Design Partner";

test('homepage has correct title', async ({ page }) => {
  // Navigate to the base URL defined in playwright.config.ts
  await page.goto('/');

  // Expect the page to have the title defined in siteConfig.name
  await expect(page).toHaveTitle(expectedTitle);
});


test('main navigation links work correctly', async ({ page }) => {
  // Define expected navigation links based on src/config/site.ts
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Go to the homepage first
  await page.goto('/');

  for (const link of navLinks) {
    // Find the main navigation container first (assuming aria-label="Main")
    const mainNav = page.getByLabel('Main');
    // Find the link by its text *within* the main navigation
    const linkLocator = mainNav.getByRole('link', { name: link.name });

    // Assert the link is visible
    await expect(linkLocator).toBeVisible();

    // Assert the link has the correct href attribute
    await expect(linkLocator).toHaveAttribute('href', link.href);

    // Optional: Click the link and verify the URL changes (can be a separate test for deeper validation)
    // await linkLocator.click();
    // await expect(page).toHaveURL(new RegExp(`${link.href}$`));
    // await page.goBack(); // Go back for the next iteration
  }
});

// Add more tests here later based on the QA Plan
// e.g., test('navigation links work correctly', async ({ page }) => { ... });
// e.g., test('contact form submits successfully', async ({ page }) => { ... });