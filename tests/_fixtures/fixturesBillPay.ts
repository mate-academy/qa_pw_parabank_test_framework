import { test as base } from '@playwright/test';

import { createBillPaymentData } from '../../src/common/testData/billPaymentData';
import { BillPayPage } from '../../src/ui/pages/payments/BillPayPage';

export const test = base.extend<{
  billPayPage: BillPayPage;
  billPaymentData;
}>({
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },

  billPaymentData: async ({}, use) => {
    await use(createBillPaymentData());
  },
});
