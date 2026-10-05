import { test as genericTest } from './fixturesGeneric';
import { RegistrationPage } from '../../src/ui/pages/RegistrationPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CustomerLookupPage } from '../../src/ui/pages/CustomerLookupPage';
import { generateUserData } from '../../src/common/testData/generateUserInfo';

export const test = genericTest.extend({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  customerLookupPage: async ({ page }, use) => {
    await use(new CustomerLookupPage(page));
  },

  existingUser: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    const userData = generateUserData();

    await registrationPage.open();
    await registrationPage.fillForm(userData);
    await registrationPage.clickRegisterButton();

    await use(userData);
  },

  loggedOutUser: async ({ existingUser, page }, use) => {
    const homePage = new HomePage(page);
    await homePage.clickLogOutLink();
    await use(existingUser);
  },
});