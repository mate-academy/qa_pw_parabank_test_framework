import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/account/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/account/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/account/TransferFundsPage';
import { AccountDetailsPage } from '../../src/ui/pages/account/AccountDetailsPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  accountDetailsPage: AccountDetailsPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },

  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },
});
