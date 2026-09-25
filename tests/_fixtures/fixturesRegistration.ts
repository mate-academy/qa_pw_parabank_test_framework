import { test as base } from '@playwright/test';

import { createRegistrationData } from '../../src/common/testData/registrationData';
import { RegistrationPage } from '../../src/ui/pages/auth/RegistrationPage';

export const test = base.extend<{
  registrationPage: RegistrationPage;
  registrationData;
  registrationDataWithMismatchedPasswords;
}>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);

    await use(registrationPage);
  },

  registrationData: async ({}, use) => {
    await use(createRegistrationData());
  },

  registrationDataWithMismatchedPasswords: async ({}, use) => {
    const registrationData = createRegistrationData();

    await use({
      ...registrationData,
      confirmPassword: `${registrationData.password}mismatch`,
    });
  },
});
