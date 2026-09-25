import { test as base } from '@playwright/test';

import { AccountDetailsPage } from '../../src/ui/pages/accounts/AccountDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/accounts/OpenNewAccountPage';

export const test = base.extend<{
  accountDetailsPage: AccountDetailsPage;
  openNewAccountPage: OpenNewAccountPage;
}>({
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },

  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
});
