import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage should match screenshot', async ({ page }) => {
    // Start the app
    await page.goto('http://localhost:3000');
    
    // Wait for products to load
    await page.waitForSelector('button[data-testid="add-to-cart-1"]');
    
    // Take a screenshot of the entire page
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('cart drawer should match screenshot', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('button[data-testid="add-to-cart-1"]');
    
    // Add item to cart
    await page.click('button[data-testid="add-to-cart-1"]');
    
    // Wait for cart drawer animation
    await page.waitForTimeout(500);
    
    // Take screenshot of the cart drawer
    await expect(page).toHaveScreenshot('cart-drawer.png', {
      threshold: 0.2
    });
  });
});
