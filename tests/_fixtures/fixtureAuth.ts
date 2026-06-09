import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { LookupPage } from '../../src/ui/pages/auth/LookupPage';
import { UpdateInfoPage } from '../../src/ui/pages/auth/UpdateInfoPage';


export const test = base.extend<{
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  homePage: HomePage;
  lookupPage: LookupPage;
  updateInfoPage: UpdateInfoPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  lookupPage: async ({ page }, use) => {
    const lookupPage = new LookupPage(page);

    await use(lookupPage);
  },
  updateInfoPage: async ({ page }, use) => {
    const updateInfoPage = new UpdateInfoPage(page);

    await use(updateInfoPage);
  },
});