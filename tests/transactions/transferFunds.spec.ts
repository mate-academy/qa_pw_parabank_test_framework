import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';

test.describe('Account', () => {
  test.describe('Transfer Funds', () => {
    test('User can transfer funds automatically after login', async ({
      page,
    }) => {
      allure.parentSuite('Account');
      allure.suite('Transfer Funds');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const transferPage = new TransferFundsPage(page);

      // 1️⃣ Otwórz stronę Transfer Funds
      await test.step('Open Transfer Funds page', async () => {
        await transferPage.open();
      });

      // 2️⃣ Wykonaj przelew automatycznie
      await test.step('Transfer funds automatically', async () => {
        await transferPage.transferFunds('50');
      });

      // 3️⃣ Weryfikacja sukcesu
      await test.step('Verify transfer success message', async () => {
        await transferPage.verifySuccess();
      });
    });
  });
});
