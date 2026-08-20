import { test as base } from '@playwright/test';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { generateNewCustomerData } from '../../src/common/testData/generateNewCustomerData';
import { registerCustomer } from '../../src/ui/actions/auth/registerCustomer';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { ForgotLoginInfoPage } from '../../src/ui/pages/auth/ForgotLoginInfoPage';

export const test = base.extend<{
  registerPage: RegisterPage;
  forgotLoginInfoPage: ForgotLoginInfoPage;
  customer;
  registeredCustomer;
  signInPage: SignInPage;
}>({
  forgotLoginInfoPage: async ({ page }, use) => {
    const forgotLoginInfoPage = new ForgotLoginInfoPage(page);

    await use(forgotLoginInfoPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },

  customer: async ({ logger }, use) => {
    const customer = generateNewCustomerData(logger);

    await use(customer);
  },

  registeredCustomer: async ({ page, logger }, use) => {
    const customer = generateNewCustomerData(logger);

    await registerCustomer(page, customer);

    await use(customer);
  },
});
