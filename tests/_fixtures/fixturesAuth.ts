import { AccountOverviewPage } from '../../src/ui/pages/accounts/AccountOverviewPage';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { RegistrationPage } from '../../src/ui/pages/auth/RegistrationPage';
import { createRegistrationData } from '../../src/common/testData/registrationData';
import { test as registrationTest } from './fixturesRegistration';

const PARABANK_BASE_URL = 'https://parabank.parasoft.com/parabank/';
const REGISTRATION_ATTEMPTS = 2;

async function registerUser(browser) {
  for (let attempt = 1; attempt <= REGISTRATION_ATTEMPTS; attempt += 1) {
    const context = await browser.newContext({
      baseURL: PARABANK_BASE_URL,
    });
    const page = await context.newPage();
    const registrationData = createRegistrationData();
    const registrationPage = new RegistrationPage(page);

    try {
      await registrationPage.open();
      await registrationPage.fillRegistrationForm(registrationData);
      await registrationPage.submitRegistration();
      await registrationPage.assertRegistrationIsSuccessful(
        registrationData.username,
      );

      return registrationData;
    } catch (error) {
      if (attempt === REGISTRATION_ATTEMPTS) {
        throw error;
      }
    } finally {
      await context.close();
    }
  }
}

export const test = registrationTest.extend<
  {
    loginPage: LoginPage;
    accountOverviewPage: AccountOverviewPage;
    loggedInUser;
    registeredUser;
  },
  {
    loggedInUserData;
    registeredUserData;
  }
>({
  loggedInUserData: [
    async ({ browser }, use) => {
      const registrationData = await registerUser(browser);

      await use(registrationData);
    },
    { scope: 'worker' },
  ],

  registeredUserData: [
    async ({ browser }, use) => {
      const registrationData = await registerUser(browser);

      await use(registrationData);
    },
    { scope: 'worker' },
  ],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },

  loggedInUser: async (
    { accountOverviewPage, loggedInUserData, loginPage },
    use,
  ) => {
    await loginPage.open();
    await loginPage.fillCredentials(
      loggedInUserData.username,
      loggedInUserData.password,
    );
    await loginPage.submitLogin();
    await accountOverviewPage.assertAccountOverviewIsVisible();

    await use(loggedInUserData);

    if (await accountOverviewPage.logoutLink.isVisible()) {
      await accountOverviewPage.logout();
    }
  },

  registeredUser: async ({ registeredUserData }, use) => {
    await use(registeredUserData);
  },
});
