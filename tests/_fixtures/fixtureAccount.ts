import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/clientSide/AccountOverviewPage';
import { OpenAccountPage } from '../../src/ui/pages/clientSide/OpenNewAccountPage';
import { AccountDetailsPage } from '../../src/ui/pages/clientSide/AccountDetailsAndActivityPage';

export const test = base.extend<{
  accountsOverviewPage;
  openAccountPage;
  accountDetailsPage;
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
  }
});
