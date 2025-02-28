import { test, expect } from '@playwright/test';

test.skip('add item to card and successfully purchase', async ({ page }) => {

  await page.routeFromHAR('./e2e/hars/payment-flow-success.har', {
    url: '*/**/api/*',
    update: false, //don't forget to change this
  });

  await page.goto('http://localhost:3000/');
  await page.getByTestId('add-to-cart-1').click();
  await page.getByTestId('checkout-button').click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).click();
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('alex');
  await page.getByRole('textbox', { name: 'Cardholder Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Card Number' }).fill('1111');
  await page.getByRole('textbox', { name: 'Expiry Date (MM/YY)' }).click();
  await page.getByRole('textbox', { name: 'Expiry Date (MM/YY)' }).fill('11');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');
  await page.getByTestId('submit-payment').click();
  await expect(page.getByTestId('transaction-id')).toBeVisible();

});