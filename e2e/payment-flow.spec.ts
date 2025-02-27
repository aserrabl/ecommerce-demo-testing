import { test, expect } from '@playwright/test';

test.skip('add item to card and successfully purchase', async ({ page }) => {

  await page.routeFromHAR('./e2e/hars/payment-flow-success.har', {
    url: '*/**/api/*',
    update: true, //don't forget to change this
  });

  // Insert magic here

});
