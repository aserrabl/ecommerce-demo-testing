import { test, expect } from '@playwright/test';

test('the card is cleared after 15 minutes of inactivity', async ({ page }) => {
  await page.clock.install();

  await page.goto('http://localhost:3000/');
  await page.getByTestId('add-to-cart-2').click();
  await page.locator('.MuiBackdrop-root').click();
  await expect(page.getByTestId('cart-count').locator('span')).toContainText('1');

  await page.clock.fastForward("15:01");

  await expect(page.getByTestId('cart-count').locator('span')).not.toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Your cart has been cleared due to inactivity');

});
