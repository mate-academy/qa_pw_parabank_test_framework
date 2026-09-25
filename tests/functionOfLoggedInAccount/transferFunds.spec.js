import { test } from '../_fixtures/fixtures';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user, signUpPage, openNewAcountPage }) => {
  client = user;

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
  await signUpPage.clickOpenNewAccountLink();
  await openNewAcountPage.assertPageTitleIsVisible();
  await openNewAcountPage.openNewAccount('checking');
});

test('Transfer Funds', async ({ signUpPage, transferFundsPage }) => {
  const amount = '1.00';

  await signUpPage.clickTransferFundsLink();
  await transferFundsPage.assertPageTitleIsVisible();
  await transferFundsPage.fillTransferAmount(amount);
  await transferFundsPage.selectFromAccount(0);
  await transferFundsPage.selectToAccount(1);
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertSuccessfulTransfer(amount);
});
