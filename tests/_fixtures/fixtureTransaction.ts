import { test as base } from '@playwright/test';
import { TransferFundsPage } from '../../src/ui/pages/transaction/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/transaction/BillPayPage';
import { FindTransactionPage } from '../../src/ui/pages/transaction/FindTransactionPage';
import { RequestLoanPage } from '../../src/ui/pages/transaction/RequestLoanPage';

export const test = base.extend<{
  transferFundsPage;
  billPayPage;
  findTransactionPage;
  requestLoanPage;
}>({
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  findTransactionPage: async ({ page }, use) => {
    const findTransactionPage = new FindTransactionPage(page);

    await use(findTransactionPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
});
