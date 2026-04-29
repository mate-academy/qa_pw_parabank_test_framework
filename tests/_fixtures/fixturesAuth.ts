import { test as base } from './fixturesGeneric';
import { SignInPage } from '../../src/ui/pages/SignInPage';
import { SignUpPage } from '../../src/ui/pages/SignUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ForgotLoginPage } from '../../src/ui/pages/ForgotLoginPage';
import { AccountOverviewPage } from '../../src/ui/pages/AccountOverviewPage';
import { AccountDetailsPage } from '../../src/ui/pages/AccountDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/FindTransactionsPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/UpdateContactInfoPage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';

export const test = base.extend<{
  pageIndex: number;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  homePage: HomePage;
  forgotLoginPage: ForgotLoginPage;
  accountOverviewPage: AccountOverviewPage;
  accountDetailsPage: AccountDetailsPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  updateContactInfoPage: UpdateContactInfoPage;
  requestLoanPage: RequestLoanPage;
}>({
  pageIndex: [0, { option: true }],

  signUpPage: async ({ pages, pageIndex }, use) => {
    await use(new SignUpPage(pages[pageIndex]));
  },
  signInPage: async ({ pages, pageIndex }, use) => {
    await use(new SignInPage(pages[pageIndex]));
  },
  homePage: async ({ pages, pageIndex }, use) => {
    await use(new HomePage(pages[pageIndex]));
  },
  forgotLoginPage: async ({ pages, pageIndex }, use) => {
    await use(new ForgotLoginPage(pages[pageIndex]));
  },
  accountOverviewPage: async ({ pages, pageIndex }, use) => {
    await use(new AccountOverviewPage(pages[pageIndex]));
  },
  accountDetailsPage: async ({ pages, pageIndex }, use) => {
    await use(new AccountDetailsPage(pages[pageIndex]));
  },
  openNewAccountPage: async ({ pages, pageIndex }, use) => {
    await use(new OpenNewAccountPage(pages[pageIndex]));
  },
  transferFundsPage: async ({ pages, pageIndex }, use) => {
    await use(new TransferFundsPage(pages[pageIndex]));
  },
  billPayPage: async ({ pages, pageIndex }, use) => {
    await use(new BillPayPage(pages[pageIndex]));
  },
  findTransactionsPage: async ({ pages, pageIndex }, use) => {
    await use(new FindTransactionsPage(pages[pageIndex]));
  },
  updateContactInfoPage: async ({ pages, pageIndex }, use) => {
    await use(new UpdateContactInfoPage(pages[pageIndex]));
  },
  requestLoanPage: async ({ pages, pageIndex }, use) => {
    await use(new RequestLoanPage(pages[pageIndex]));
  },
});
