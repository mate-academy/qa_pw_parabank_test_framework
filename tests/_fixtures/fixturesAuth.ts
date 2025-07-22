import { test as base } from '@playwright/test';
import { SignUpPage } from "../../src/ui/pages/signUpPage";
import { SignInPage } from '../../src/ui/pages/signInPage';

export const test = base.extend<{
  signUpPage;
  // user;
  signInPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  }
});
