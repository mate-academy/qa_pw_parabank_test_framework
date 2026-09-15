import { test as base } from '@playwright/test';

import { ForgotLoginInfoPage } from '../../src/ui/pages/ForgotLoginInfoPage';
import { LookupPage } from '../../src/ui/pages/LookupPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { NewAccountPage } from '../../src/ui/pages/NewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/FindTransactionsPage';
import { TransactionDetailsPage } from '../../src/ui/pages/TransactionDetailsPage';
import { UpdateProfilePage } from '../../src/ui/pages/UpdateProfilePage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';

export const test = base.extend<{
  forgotLoginInfoPage: ForgotLoginInfoPage;
  lookupPage: LookupPage;
  accountsOverviewPage: AccountsOverviewPage;
  newAccountPage: NewAccountPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  transactionDetailsPage: TransactionDetailsPage;
  updateProfilePage: UpdateProfilePage;
  requestLoanPage: RequestLoanPage;
}>({
  forgotLoginInfoPage: async ({ page }, use) => {
    await use(new ForgotLoginInfoPage(page));
  },

  lookupPage: async ({ page }, use) => {
    await use(new LookupPage(page));
  },

  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  newAccountPage: async ({ page }, use) => {
    await use(new NewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },

  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page, 1));
  },

  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },

  transactionDetailsPage: async ({ page }, use) => {
    await use(new TransactionDetailsPage(page));
  },

  updateProfilePage: async ({ page }, use) => {
    await use(new UpdateProfilePage(page));
  },

  requestLoanPage: async ({ page }, use) => {
    await use(new RequestLoanPage(page));
  },
});
