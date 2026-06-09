import { test as base } from '@playwright/test';
import { AccountOverviewPage } from '../../src/ui/pages/accountServices/AccountOverviewPage';
import { FindTransactionsPage } from '../../src/ui/pages/accountServices/FindTransactionsPage';
import { OpenAccountPage } from '../../src/ui/pages/accountServices/OpenAccountPage';
import { PayBillPage } from '../../src/ui/pages/accountServices/PayBillPage';
import { RequestLoanPage } from '../../src/ui/pages/accountServices/RequestLoanPage';
import { TransferFundsPage } from '../../src/ui/pages/accountServices/TransferFundsPage';

export const test = base.extend<{
  accountOverviewPage: AccountOverviewPage;
  findTransactionsPage: FindTransactionsPage;
  openAccountPage: OpenAccountPage;
  payBillPage: PayBillPage;
  requestLoan: RequestLoanPage;
  transferFundsPage: TransferFundsPage;
}>({
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
  openAccountPage: async ({ page }, use) => {
    const openAccountPage = new OpenAccountPage(page);

    await use(openAccountPage);
  },
  payBillPage: async ({ page }, use) => {
    const payBillPage = new PayBillPage(page);

    await use(payBillPage);
  },
  requestLoan: async ({ page }, use) => {
    const requestLoan = new RequestLoanPage(page);

    await use(requestLoan);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
});
