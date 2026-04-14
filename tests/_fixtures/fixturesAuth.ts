import { test as base } from '@playwright/test';
import { RegistrationPage } from '../../src/ui/pages/auth/RegistrationPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CustomerLookupPage } from '../../src/ui/pages/CustomerLookupPage';

export const test = base.extend<{
  registrationPage;
  homePage;
  customerLookupPage;
}>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);

    await use(registrationPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  customerLookupPage: async ({ page }, use) => {
    const customerLookupPage = new CustomerLookupPage(page);

    await use(customerLookupPage);
  }
});
