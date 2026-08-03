import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/account/AccountsOverviewPage';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
});
