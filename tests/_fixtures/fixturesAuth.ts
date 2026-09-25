import { test as base, Page } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { CustomerLookupPage } from '../../src/ui/pages/auth/CustomerLookupPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { OpenNewAcountPage } from '../../src/ui/pages/OpenNewAcountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { UpdateProfilePage } from '../../src/ui/pages/UpdateProfilePage';

export const test = base.extend<{
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  accountsOverviewPage: AccountsOverviewPage;
  customerLookupPage: CustomerLookupPage;
  billPayPage: BillPayPage;
  openNewAcountPage: OpenNewAcountPage;
  transferFundsPage: TransferFundsPage;
  updateProfilePage: UpdateProfilePage;
}>({
  signUpPage: async (
    { page }: { page: Page },
    use: (r: SignUpPage) => Promise<void>,
  ) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  signInPage: async (
    { page }: { page: Page },
    use: (r: SignInPage) => Promise<void>,
  ) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },

  accountsOverviewPage: async (
    { page }: { page: Page },
    use: (r: AccountsOverviewPage) => Promise<void>,
  ) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);
    await use(accountsOverviewPage);
  },

  customerLookupPage: async (
    { page }: { page: Page },
    use: (r: CustomerLookupPage) => Promise<void>,
  ) => {
    const customerLookupPage = new CustomerLookupPage(page);
    await use(customerLookupPage);
  },

  billPayPage: async (
    { page }: { page: Page },
    use: (r: BillPayPage) => Promise<void>,
  ) => {
    const billPayPage = new BillPayPage(page);
    await use(billPayPage);
  },

  openNewAcountPage: async (
    { page }: { page: Page },
    use: (r: OpenNewAcountPage) => Promise<void>,
  ) => {
    const openNewAcountPage = new OpenNewAcountPage(page);
    await use(openNewAcountPage);
  },

  transferFundsPage: async (
    { page }: { page: Page },
    use: (r: TransferFundsPage) => Promise<void>,
  ) => {
    const transferFundsPage = new TransferFundsPage(page);
    await use(transferFundsPage);
  },

  updateProfilePage: async (
    { page }: { page: Page },
    use: (r: UpdateProfilePage) => Promise<void>,
  ) => {
    const updateProfilePage = new UpdateProfilePage(page);
    await use(updateProfilePage);
  },
});
