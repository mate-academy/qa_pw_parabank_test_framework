import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/Auth/SignUpPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  signUpPage;
  user;
}>({
  user: async ({}, use) => {
    const userData = generateNewUserData();
    await use(userData);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
});
