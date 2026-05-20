import { test as base } from '@playwright/test';
import { AccountsOverviewPage } from '../../src/ui/pages/account/AccountsOverviewPage';
import { AccountDetailsPage } from '../../src/ui/pages/account/AccountDetailsPage';
import { OpenAccountPage } from '../../src/ui/pages/account/OpenAccountPage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { UpdateProfilePage } from '../../src/ui/pages/account/UpdateProfilePage';

export const test = base.extend<{
  accountsOverviewPage;
  accountDetailsPage;
  openAccountPage;
  signedUpUserWithOneAccount;
  signedUpUserWithTwoAccounts;
  updateProfilePage;
}>({
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  openAccountPage: async ({ page }, use) => {
    const openAccountPage = new OpenAccountPage(page);

    await use(openAccountPage);
  },

  signedUpUserWithOneAccount: async (
    { userData, signUpPage, accountsOverviewPage },
    use,
  ) => {
    await signUpUser(signUpPage, userData);

    await accountsOverviewPage.open();

    await use({
      accountData: await accountsOverviewPage.getAccountDataFromTableRow(0),
    });
  },
  signedUpUserWithTwoAccounts: async (
    { signUpPage, userData, accountsOverviewPage, openAccountPage },
    use,
  ) => {
    await signUpUser(signUpPage, userData);

    await openAccountPage.open();
    await openAccountPage.selectAccountType('SAVINGS');
    await openAccountPage.selectFromAccountIdByIndex(0);
    await openAccountPage.clickOpenNewAccountButton();

    await accountsOverviewPage.open();

    const accountsData = [
      await accountsOverviewPage.getAccountDataFromTableRow(0),
      await accountsOverviewPage.getAccountDataFromTableRow(1),
    ];

    await use(accountsData);
  },
  updateProfilePage: async ({ page }, use) => {
    const updateProfilePage = new UpdateProfilePage(page);

    await use(updateProfilePage);
  },
});
