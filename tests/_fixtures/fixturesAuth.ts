import { test as base } from '@playwright/test';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CustomerLookupPage } from '../../src/ui/pages/auth/CustomerLookupPage';
import { generateRegistrationData } from '../../src/common/testData/auth/registrationData';

type RegistrationData = ReturnType<typeof generateRegistrationData>;

export const test = base.extend<{
  registerPage: RegisterPage;
  homePage: HomePage;
  customerLookupPage: CustomerLookupPage;
  registrationData: RegistrationData;
}>({
  registerPage: async ({ page, registrationData }, use) => {
    await use(new RegisterPage(page, registrationData.username));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  customerLookupPage: async ({ page }, use) => {
    await use(new CustomerLookupPage(page));
  },

  registrationData: async ({}, use) => {
    await use(generateRegistrationData());
  },
});
