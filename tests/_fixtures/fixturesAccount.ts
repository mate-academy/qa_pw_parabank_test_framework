import { test as base } from '@playwright/test';
import { AccountServicesNavPage } from '../../src/ui/pages/AccountServicesNavPage';
import { AccountOverviewPage } from '../../src/ui/pages/AccountOverviewPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/UpdateContactInfoPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/FindTransactionsPage';
import { AccountDetailsPage } from '../../src/ui/pages/AccountDetailsPage';

export const test = base.extend<{
  accountServicesNavPage: AccountServicesNavPage;
  accountOverviewPage: AccountOverviewPage;
  updateContactInfoPage: UpdateContactInfoPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  requestLoanPage: RequestLoanPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  accountDetailsPage: AccountDetailsPage;
}>({
  accountServicesNavPage: async ({ page }, use) => {
    const accountServicesNavPage = new AccountServicesNavPage(page);

    await use(accountServicesNavPage);
  },

  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },

  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },

  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },

  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },

  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },

  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },

  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);
    await use(findTransactionsPage);
  },

  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);
    await use(accountDetailsPage);
  },
});
