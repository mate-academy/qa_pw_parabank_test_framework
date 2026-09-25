import { test as base } from '@playwright/test';

import { FindTransactionsPage } from '../../src/ui/pages/transactions/FindTransactionsPage';

export const test = base.extend<{
  findTransactionsPage: FindTransactionsPage;
}>({
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
});
