import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/Auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/Auth/SignInPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  user: ReturnType<typeof generateNewUserData>;
}>({
  user: async ({}, use) => {
    const userData = generateNewUserData();
    await use(userData);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
});
