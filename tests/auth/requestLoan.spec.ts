import { test } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { RequestLoanPage } from '../../src/ui/pages/loans/RequestLoanPage';
import { validUser } from '../_fixtures/user.fixture';

test.describe('Loans - Request Loan', () => {
  let loginPage: LoginPage;
  let loanPage: RequestLoanPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loanPage = new RequestLoanPage(page);
    await loginPage.open();
    await loginPage.signIn(validUser.username, validUser.password);
  });

  test('Request valid loan', async () => {
    await loanPage.open();
    await loanPage.requestLoan('1000', '100');
    await loanPage.assertLoanApproved();
  });
});
