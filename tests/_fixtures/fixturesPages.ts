import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/homePage';
import { CustomerLookupPage } from '../../src/ui/pages/customerLokupPage';
import { OpenNewAccountPage } from '../../src/ui/pages/openNewAccountPage';
import { AccountOverviewPage } from '../../src/ui/pages/accountOverviewPage';
import { TransferFundsPage } from '../../src/ui/pages/transferFundsPage';
import { BillPaymentPage } from '../../src/ui/pages/billPaymentPage';
import { FindTransactionsPage } from '../../src/ui/pages/findTransactionsPage';
import { ApplyForLoanPage } from '../../src/ui/pages/applyForLoanPage';

export const test = base.extend<{
  user;
  homePage;
  customerLookupPage;
  openNewAccountPage;
  accountOverviewPage;
  transferFundsPage;
  billPaymentPage;
  findTransactionsPage;
  applyForLoanPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  customerLookupPage: async ({ page }, use) => {
    const customerLookupPage = new CustomerLookupPage(page);

    await use(customerLookupPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPaymentPage: async ({ page }, use) => {
    const billPaymentPage = new BillPaymentPage(page);

    await use(billPaymentPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
  applyForLoanPage: async ({ page }, use) => {
    const applyForLoanPage = new ApplyForLoanPage(page);

    await use(applyForLoanPage);
  }
});
