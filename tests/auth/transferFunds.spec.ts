import { test } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { TransferFundsPage } from '../../src/ui/pages/payments/TransferFundsPage';
import { validUser } from '../_fixtures/user.fixture';

test.describe('Payments - Transfer Funds', () => {
  let loginPage: LoginPage;
  let transferPage: TransferFundsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    transferPage = new TransferFundsPage(page);
    await loginPage.open();
    await loginPage.signIn(validUser.username, validUser.password);
  });

  test('Transfer funds successfully', async () => {
    await transferPage.open();
    await transferPage.selectFromAccount(0);
    await transferPage.selectToAccount(1);
    await transferPage.fillAmount('100');
    await transferPage.clickTransfer();
    await transferPage.assertTransferSuccessful();
  });
});
