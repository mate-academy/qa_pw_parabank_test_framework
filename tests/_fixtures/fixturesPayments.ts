import { test as base } from '@playwright/test';
import { BillPayPage } from '../../src/ui/pages/payments/BillPayPage';

export const test = base.extend<{
  billPayPage: BillPayPage;
}>({
  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
});
