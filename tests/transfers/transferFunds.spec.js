import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../src/ui/actions/auth/registerUser';

test.describe('Transfer Funds tests', () => {
  const transferAmounts = [1, 10, 50];

  for (const amount of transferAmounts) {
    test(`Transfer $${amount} between own accounts`, async ({
      page,
      user,
      openNewAccountPage,
      transferFundsPage,
    }) => {
      await allure.severity('critical');

      await registerUser(page, user);

      // Create a second account for the transfer.
      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType('CHECKING');
      await openNewAccountPage.selectFirstSourceAccount();
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpenedSuccessfully();

      // Open the transfer form.
      await transferFundsPage.open();

      const accounts = await transferFundsPage.getAvailableAccounts();

      if (accounts.length < 2) {
        throw new Error('At least two accounts are required to transfer funds');
      }

      const fromAccount = accounts[0].value;
      const toAccount = accounts[1].value;

      await transferFundsPage.fillAmount(amount);
      await transferFundsPage.selectFromAccount(fromAccount);
      await transferFundsPage.selectToAccount(toAccount);

      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferSuccessful(amount);
    });
  }
});
