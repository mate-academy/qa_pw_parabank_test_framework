import { test as base } from './fixturesAuth';
import { AccountsOverviewPage } from '../../src/ui/pages/accountServices/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/accountServices/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/accountServices/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/accountServices/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/accountServices/FindTransactionsPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/accountServices/UpdateContactInfoPage';
import { RequestLoanPage } from '../../src/ui/pages/accountServices/RequestLoanPage';
import { AccountDetailsPage } from '../../src/ui/pages/accountServices/AccountDetailsPage';

export const test = base.extend<
  {
    accountsOverviewPage: AccountsOverviewPage;
    openNewAccountPage: OpenNewAccountPage;
    transferFundsPage: TransferFundsPage;
    billPayPage: BillPayPage;
    findTransactionsPage: FindTransactionsPage;
    updateContactInfoPage: UpdateContactInfoPage;
    requestLoanPage: RequestLoanPage;
    accountDetailsPage: AccountDetailsPage;
  },
  {}
>({
  accountsOverviewPage: async ({ page, logger }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page, 0, logger);
    await use(accountsOverviewPage);
  },

  openNewAccountPage: async ({ page, logger }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page, 0, logger);
    await use(openNewAccountPage);
  },

  transferFundsPage: async ({ page, logger }, use) => {
    const transferFundsPage = new TransferFundsPage(page, 0, logger);
    await use(transferFundsPage);
  },

  billPayPage: async ({ page, logger }, use) => {
    const billPayPage = new BillPayPage(page, 0, logger);
    await use(billPayPage);
  },

  findTransactionsPage: async ({ page, logger }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page, 0, logger);
    await use(findTransactionsPage);
  },

  updateContactInfoPage: async ({ page, logger }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page, 0, logger);
    await use(updateContactInfoPage);
  },

  requestLoanPage: async ({ page, logger }, use) => {
    const requestLoanPage = new RequestLoanPage(page, 0, logger);
    await use(requestLoanPage);
  },

  accountDetailsPage: async ({ page, logger }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page, 0, logger);
    await use(accountDetailsPage);
  },
});

export { expect } from '@playwright/test';
