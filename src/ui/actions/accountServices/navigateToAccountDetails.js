import * as allure from 'allure-js-commons';

export async function navigateToAccountDetails(page, accountId = null) {
  return await allure.step(
    'Navigate to account details',
    async () => {
      if (accountId) {
        await page.locator(`#accountTable tbody tr td a:has-text("${accountId}")`).click();
      } else {
        const firstAccountLink = page
          .locator('#accountTable tbody tr td:first-child a')
          .first();
        accountId = await firstAccountLink.textContent();
        await firstAccountLink.click();
      }

      await page.waitForLoadState('networkidle');
      return accountId;
    },
  );
}
