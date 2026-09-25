import { test as base } from '@playwright/test';

import {
  APPROVED_LOAN_DATA,
  DENIED_LOAN_DATA,
} from '../../src/common/testData/loanData';
import { RequestLoanPage } from '../../src/ui/pages/loans/RequestLoanPage';

export const test = base.extend<{
  requestLoanPage: RequestLoanPage;
  approvedLoanData;
  deniedLoanData;
}>({
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },

  approvedLoanData: async ({}, use) => {
    await use(APPROVED_LOAN_DATA);
  },

  deniedLoanData: async ({}, use) => {
    await use(DENIED_LOAN_DATA);
  },
});
