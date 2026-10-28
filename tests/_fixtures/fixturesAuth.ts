import { test as base } from '@playwright/test';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';
import { SignInPage } from '../../src/ui/pages/SignInPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { ForgotLoginInfoPage } from '../../src/ui/pages/ForgotLoginInfoPage';

export const test = base.extend<{
  user;
  registerPage;
  signInPage;
  accountsOverviewPage;
  forgotLoginInfoPage;
}>({
  user: async ({}, use) => {
    const user = generateNewUserData();

    await use(user);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },

  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },

  forgotLoginInfoPage: async ({ page }, use) => {
    const forgotLoginInfoPage = new ForgotLoginInfoPage(page);
    await use(forgotLoginInfoPage);
  },
});
