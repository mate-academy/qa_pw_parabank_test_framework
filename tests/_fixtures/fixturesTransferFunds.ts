import { test as base } from '@playwright/test';

import { TransferFundsPage } from '../../src/ui/pages/payments/TransferFundsPage';

export const test = base.extend<{
  transferFundsPage: TransferFundsPage;
}>({
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
});
