import { test as base } from '@playwright/test';
import { RequestLoanPage } from '../../src/ui/pages/loans/RequestLoanPage';

export const test = base.extend<{
  requestLoanPage: RequestLoanPage;
}>({
  requestLoanPage: async ({ page }, use) => {
    await use(new RequestLoanPage(page));
  },
});
