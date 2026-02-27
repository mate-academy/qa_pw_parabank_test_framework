import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { ForgotLoginInfo } from '../../src/ui/pages/auth/ForgotLoginInfo';


export const test = base.extend<{
  signUpPage;
  signInPage;
  forgotLoginInfo;
 
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  forgotLoginInfo: async ({ page }, use) => {
    const forgotLoginInfo = new ForgotLoginInfo(page);

    await use(forgotLoginInfo);
  },

 
});