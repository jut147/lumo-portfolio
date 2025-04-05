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


test('contact form submits successfully with valid data', async ({ page }) => {
  // Navigate to the contact page
  await page.goto('/contact');

  // Fill in the form fields
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('This is a test message longer than ten characters.');

  // Click the submit button
  await page.getByRole('button', { name: 'Send Message' }).click();

  // Wait for the success toast to appear and check its content
  const successToast = page.locator('[data-sonner-toast][data-type="success"]'); // Adjust selector if needed
  await expect(successToast).toBeVisible({ timeout: 10000 }); // Wait up to 10s for action/toast
  await expect(successToast.getByText('Message Sent!')).toBeVisible(); // Assuming this is the title
  await expect(successToast.getByText('Message submitted successfully!')).toBeVisible(); // Assuming this is the description
});

test('theme toggle changes theme correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  const htmlLocator = page.locator('html');
  // Update selector to match the actual aria-label pattern
  const themeToggleButton = page.getByRole('button', { name: /Switch to (light|dark) mode/i });

  // 1. Check initial theme (should be dark by default)
  await expect(htmlLocator).toHaveAttribute('class', expect.stringContaining('dark')); // Check for dark class

  // 2. Click toggle to switch to light mode
  await themeToggleButton.click();

  // 3. Verify theme changed to light
  await expect(htmlLocator).toHaveAttribute('class', expect.stringContaining('light')); // Check for light class

  // 4. Click toggle again to switch back to dark mode
  await themeToggleButton.click();

  // 5. Verify theme changed back to dark
  await expect(htmlLocator).toHaveAttribute('class', expect.stringContaining('dark')); // Check for dark class
});

// Add more tests here later based on the QA Plan
// e.g., test('navigation links work correctly', async ({ page }) => { ... });
// e.g., test('contact form submits successfully', async ({ page }) => { ... });
