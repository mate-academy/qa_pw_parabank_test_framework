import { test as base } from '@playwright/test';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { ForgotLoginPage } from '../../src/ui/pages/auth/ForgotLoginPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  registerPage;
  signInPage;
  forgotLoginPage;
  user;
}>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  forgotLoginPage: async ({ page }, use) => {
    await use(new ForgotLoginPage(page));
  },

  user: async ({}, use) => {
    await use(generateNewUserData());
  },
});
