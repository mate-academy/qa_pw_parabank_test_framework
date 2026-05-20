import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { LogOutPage } from '../../src/ui/pages/auth/LogOutPage';
import { CustomerLookupPage } from '../../src/ui/pages/auth/CustomerLookupPage';

export const test = base.extend<{
  signUpPage;
  signInPage;
  logOutPage;
  customerLookupPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  logOutPage: async ({ page }, use) => {
    const logOutPage = new LogOutPage(page);

    await use(logOutPage);
  },
  customerLookupPage: async ({ page }, use) => {
    const customerLookupPage = new CustomerLookupPage(page);

    await use(customerLookupPage);
  },
});
