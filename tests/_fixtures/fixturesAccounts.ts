import { test as genericTest } from './fixturesGeneric';
import { AccountOverviewPage } from '../../src/ui/pages/accountPages/AccountOverviewPage';
import { NewAccountPage } from '../../src/ui/pages/accountPages/NewAccountPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/UpdateContactInfo';
import { AccountsDetailsPage } from '../../src/ui/pages/accountPages/AccountsDetailsPage';
import { TransferFundsPage } from '../../src/ui/pages/accountPages/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/accountPages/BillPayPage';  
import { RequestLoanPage } from '../../src/ui/pages/accountPages/RequestLoanPage';
import { FindTransactionsPage } from '../../src/ui/pages/accountPages/FindTransactionsPage';
import { TransactionDetailsPage } from '../../src/ui/pages/accountPages/TransactionDetailsPage';

export const test = genericTest.extend({
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);
    await use(accountOverviewPage);
  },

  accountsDetailsPage: async ({ page }, use) => {
    const accountsDetailsPage = new AccountsDetailsPage(page);
    await use(accountsDetailsPage);
  },

  newAccountPage: async ({ page }, use) => {
    const newAccountPage = new NewAccountPage(page);
    await use(newAccountPage);
  },

  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);
    await use(billPayPage);
  },

  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);
    await use(updateContactInfoPage);
  },

  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);
    await use(transferFundsPage);
  },

  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);
    await use(requestLoanPage);
  },

  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);
    await use(findTransactionsPage);
  },

  transactionDetailsPage: async ({ page }, use) => {
    const transactionDetailsPage = new TransactionDetailsPage(page);
    await use(transactionDetailsPage);
  },
});