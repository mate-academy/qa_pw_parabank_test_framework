import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/clientSide/AccountOverviewPage';
import { OpenAccountPage } from '../../src/ui/pages/clientSide/OpenNewAccountPage';
import { AccountDetailsPage } from '../../src/ui/pages/clientSide/AccountDetailsAndActivityPage';
import { TransferFundsPage } from '../../src/ui/pages/clientSide/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/clientSide/BillPayPage';

export const test = base.extend<{
  accountsOverviewPage;
  openAccountPage;
  accountDetailsPage;
  transferFundsPage;
  billPayPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
  openAccountPage: async ({ page }, use) => {
    const openAccountPage = new OpenAccountPage(page);

    await use(openAccountPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  }
});
