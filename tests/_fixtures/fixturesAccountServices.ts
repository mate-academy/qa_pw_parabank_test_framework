import { test as base } from '@playwright/test';
import { AccountOverviewPage } from '../../src/ui/pages/account/AccountOverviewPage';
import { AccountDetailsPage } from '../../src/ui/pages/account/AccountDetailsPage';
import { UpdateProfilePage } from '../../src/ui/pages/account/UpdateProfilePage';
import { TransferFundsPage } from '../../src/ui/pages/account/TransferFundsPage';
import { FindTransactionPage } from '../../src/ui/pages/account/FindTransactionPage';
import { TransactionDetailsPage } from '../../src/ui/pages/account/TransactionDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/account/OpenNewAccountPage';
import { RequestLoanPage } from '../../src/ui/pages/account/RequestLoanPage';

export const test = base.extend<{
  accountDetailsPage;
  accountOverviewPage;
  updateProfilePage;
  transferFundsPage;
  findTransactionPage;
  transactionDetailsPage;
  openNewAccountPage;
  requestLoanPage;
}>({
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  updateProfilePage: async ({ page }, use) => {
    const updateProfilePage = new UpdateProfilePage(page);

    await use(updateProfilePage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  findTransactionPage: async ({ page }, use) => {
    const findTransactionPage = new FindTransactionPage(page);

    await use(findTransactionPage);
  },
  transactionDetailsPage: async ({ page }, use) => {
    const transactionDetailsPage = new TransactionDetailsPage(page);

    await use(transactionDetailsPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
});
