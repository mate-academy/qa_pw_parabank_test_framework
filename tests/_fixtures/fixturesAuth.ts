import { test as base } from '@playwright/test';
import { RegistrationPage } from '../../src/ui/pages/auth/RegistrationPage';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  registrationPage;
  homePage;
}>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);

    await use(registrationPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  }
});
