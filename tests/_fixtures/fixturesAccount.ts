import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/account/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/account/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/account/TransferFundsPage';
import { AccountDetailsPage } from '../../src/ui/pages/account/AccountDetailsPage';
import { BillPayPage } from '../../src/ui/pages/account/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/account/FindTransactionsPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/account/UpdateContactInfoPage';
import { generateBillPayData } from '../../src/common/testData/account/billPayData';
import { generateUpdateContactInfoData } from '../../src/common/testData/account/updateContactInfoData';

export const test = base.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  accountDetailsPage: AccountDetailsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  updateContactInfoPage: UpdateContactInfoPage;
  billPayData: ReturnType<typeof generateBillPayData>;
  updateContactInfoData: ReturnType<typeof generateUpdateContactInfoData>;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },

  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },

  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },

  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },

  updateContactInfoPage: async ({ page }, use) => {
    await use(new UpdateContactInfoPage(page));
  },

  billPayData: async ({}, use) => {
    await use(generateBillPayData());
  },

  updateContactInfoData: async ({}, use) => {
    await use(generateUpdateContactInfoData());
  },
});
