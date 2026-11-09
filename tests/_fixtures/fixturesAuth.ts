import { test as base } from '@playwright/test';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { SingUpPage } from '../../src/ui/pages/singUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CustomerLookupPage } from '../../src/ui/pages/CustomerLookupPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { ContactInfoPage } from '../../src/ui/pages/ContactInfoPage';
import { FindTransactionPage } from '../../src/ui/pages/FindTransactionsPage';

export const test = base.extend<{
  singUpPage: SingUpPage;
  homePage: HomePage;
  customerLookupPage: CustomerLookupPage;
  openNewAccuontPage: OpenNewAccountPage;
  requestLoanPage: RequestLoanPage;
  transferFundsPage: TransferFundsPage;
  accountsOverviewPage: AccountsOverviewPage;
  billPayPage: BillPayPage;
  contactInfoPage: ContactInfoPage;
  findTransactionPage: FindTransactionPage;
}>({
  singUpPage: async ({ page }, use) => {
    const singUpPage = new SingUpPage(page);

    await use(singUpPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  customerLookupPage: async ({ page }, use) => {
    const customerLookupPage = new CustomerLookupPage(page);

    await use(customerLookupPage);
  },

  openNewAccuontPage: async ({ page }, use) => {
    const openNewAccuontPage = new OpenNewAccountPage(page);

    await use(openNewAccuontPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  contactInfoPage: async ({ page }, use) => {
    const contactInfoPage = new ContactInfoPage(page);

    await use(contactInfoPage);
  },
  findTransactionPage: async ({ page }, use) => {
    const findTarnsactionPage = new FindTransactionPage(page);

    await use(findTarnsactionPage);
  },
});
