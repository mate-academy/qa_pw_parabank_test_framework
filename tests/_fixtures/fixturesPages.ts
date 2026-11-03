import { test as base } from '@playwright/test';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { AdminPage } from '../../src/ui/pages/admin/AdminPage';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { LookupPage } from '../../src/ui/pages/auth/LookupPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { AccountDetailsActivityPage } from '../../src/ui/pages/loggedIn/AccountDetailsActivity';
import { BillPayPage } from '../../src/ui/pages/loggedIn/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/loggedIn/FindTransactionsPage';
import { OpenAccountPage } from '../../src/ui/pages/loggedIn/OpenAccountPage';
import { OverviewPage } from '../../src/ui/pages/loggedIn/OverviewPage';
import { RequestLoanPage } from '../../src/ui/pages/loggedIn/RequestLoanPage';
import { TransferPage } from '../../src/ui/pages/loggedIn/TransferPage';
import { UpdateProfilePage } from '../../src/ui/pages/loggedIn/UpdateProfilePage';

export const test = base.extend<
  {
    adminPage;

    loginPage;
    lookupPage;
    registerPage;

    homePage;

    accountDetailsActivityPage;
    billPayPage;
    findTransactionsPage;
    openAccountPage;
    overviewPage;
    requestLoanPage;
    transferPage;
    updateProfilePage;
  }
>({
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  lookupPage: async ({ page }, use) => {
    const lookupPage = new LookupPage(page);
    await use(lookupPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  accountDetailsActivityPage: async ({ page }, use) => {
    await use(accountId => new AccountDetailsActivityPage(page, accountId));
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);
    await use(billPayPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);
    await use(findTransactionsPage);
  },
  openAccountPage: async ({ page }, use) => {
    const openAccountPage = new OpenAccountPage(page);
    await use(openAccountPage);
  },
  overviewPage: async ({ page }, use) => {
    const overviewPage = new OverviewPage(page);
    await use(overviewPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);
    await use(requestLoanPage);
  },
  transferPage: async ({ page }, use) => {
    const transferPage = new TransferPage(page);
    await use(transferPage);
  },
  updateProfilePage: async ({ page }, use) => {
    const updateProfilePage = new UpdateProfilePage(page);
    await use(updateProfilePage);
  },
});