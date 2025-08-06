import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { LogInPage } from '../../src/ui/pages/auth/LogInPage';
import { LookupPage } from '../../src/ui/pages/auth/LookupPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { OverviewPage } from '../../src/ui/pages/account/OverviewPage';
import { AccountDetailsPage } from '../../src/ui/pages/account/AccountDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/account/OpenNewAccountPage';
import { RequestLoanPage } from '../../src/ui/pages/account/RequestLoanPage';
import { TransferFundsPage } from '../../src/ui/pages/account/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/account/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/account/FindTransactionsPage';

export const test = base.extend<{
  signUpPage;
  logInPage;
  lookupPage;
  homePage;
  overviewPage;
  accountDetailsPage;
  openNewAccountPage;
  requestLoanPage;
  transferFundsPage;
  billPayPage;
  findTransactionsPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  logInPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);

    await use(logInPage);
  },
  lookupPage: async ({ page }, use) => {
    const lookupPage = new LookupPage(page);

    await use(lookupPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  overviewPage: async ({ page }, use) => {
    const overviewPage = new OverviewPage(page);

    await use(overviewPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
});
