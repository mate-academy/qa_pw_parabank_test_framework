import { test as base } from '@playwright/test';
import { LogOutPage } from '../../src/ui/pages/loggedInUser/LogOut';
import { RequestLoanPage } from '../../src/ui/pages/loggedInUser/RequestLoanPage';
import { AccountOverviewPage } from '../../src/ui/pages/loggedInUser/AccountOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/loggedInUser/OpenNewAccount';
import { TransferFundsPage } from '../../src/ui/pages/loggedInUser/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/loggedInUser/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/loggedInUser/FindTransactionsPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/loggedInUser/UpdateContactInfoPage';
import { AccountsActivityFilteringAndDetailsPage } from '../../src/ui/pages/loggedInUser/AccountsActivityFilteringAndDetailsPage';

export const test = base.extend<{
  requestLoanPage: RequestLoanPage;
  logOutPage: LogOutPage;
  accountOverviewPage: AccountOverviewPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  updateContactInfoPage: UpdateContactInfoPage;
  accountsActivityFilteringAndDetailsPage: AccountsActivityFilteringAndDetailsPage;
}>({
  logOutPage: async ({ page }, use) => {
    const logOutPage = new LogOutPage(page);

    await use(logOutPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },
  accountsActivityFilteringAndDetailsPage: async ({ page }, use) => {
    const accountsActivityFilteringAndDetailsPage = new AccountsActivityFilteringAndDetailsPage(page);

    await use(accountsActivityFilteringAndDetailsPage);
  },
});