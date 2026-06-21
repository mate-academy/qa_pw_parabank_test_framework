import {test as base} from '@playwright/test';
import {SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import {SignInPage} from '../../src/ui/pages/auth/SignInPage';
import {HomePage} from '../../src/ui/pages/HomePage';
import {OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import {AccountDetailsPage } from '../../src/ui/pages/transactions/AccountDetailsPage';
import {OverviewPage } from '../../src/ui/pages/OverviewPage';
import {RequestLoanPage} from '../../src/ui/pages/RequestLoanPage';
import {TransferFundsPage} from '../../src/ui/pages/transactions/TransferFundsPage';
import {BillPayPage} from '../../src/ui/pages/transactions/BillPayPage';
import {LookUpPage} from '../../src/ui/pages/LookUpPage';
import {UpdateProfilePage} from '../../src/ui/pages/UpdateProfilePage';




export const test = base.extend<{
  signUpPage;
  signInPage;
  lookupPage;
  homePage;
  overviewPage;
  accountDetailsPage;
  openNewAccountPage;
  requestLoanPage;
  transferFundsPage;
  billPayPage;
  findTransactionsPage;
  updateProfilePage;
}>({
 signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

 signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },

  updateProfilePage: async ({page},use) =>{
    const updateProfilePage = new UpdateProfilePage(page);

    await use(updateProfilePage)
  },

  lookupPage: async ({ page }, use) => {
    const lookupPage = new LookUpPage(page);

    await use(lookupPage);
  },

 homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  overviewPage: async ({ page }, use) => {
    const overviewPage = new OverviewPage(page);

    await use(overviewPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  }
});
