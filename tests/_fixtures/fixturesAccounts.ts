import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/accounts/AccountsOverviewPage';
import { AccountDetailsPage } from '../../src/ui/pages/accounts/AccountDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/accounts/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/accounts/TransferFundsPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  accountDetailsPage: AccountDetailsPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
});
