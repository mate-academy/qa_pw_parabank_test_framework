import { test as base } from './fixturesGeneric';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { ForgotLoginPage } from '../../src/ui/pages/auth/ForgotLoginPage';
import { MainPage } from '../../src/ui/pages/MainPage';
import { generateUserData } from '../../src/common/helpers/dataHelpers';

export const test = base.extend<
  {
    newUserData: any;
    registeredUser: any;
    loggedInUser: any;
    mainPage: any;
    loginPage: any;
    registerPage: any;
    forgotLoginPage: any;
  },
  {}
>({

  newUserData: [async ({ logger }, use) => {

    const userData = generateUserData();
    logger.debug(`Generated username: ${userData.username}`);
    await use(userData);
  }, { scope: 'test' }],

  registeredUser: async ({ page, registerPage, newUserData }, use) => {
    const userData = newUserData;

    await registerPage.open();
    await registerPage.fillRegistrationForm(userData);
    await registerPage.clickRegisterButton();

    await use(userData);
  },

  loggedInUser: async ({ page, registerPage, loginPage, newUserData, mainPage }, use) => {
    const userData = newUserData;

    await registerPage.open();
    await registerPage.fillRegistrationForm(userData);
    await registerPage.clickRegisterButton();

    await mainPage.logout();
    await loginPage.open();
    await loginPage.fillUsernameInput(userData.username);
    await loginPage.fillPasswordInput(userData.password);
    await loginPage.clickLoginButton();
    
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    
    await page.locator('#leftPanel').waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('#rightPanel').waitFor({ state: 'visible', timeout: 15000 });
    
    await page.locator('#rightPanel h1.title').first().waitFor({ state: 'visible', timeout: 15000 });
    
    await page.locator('#accountTable, #leftPanel a').first().waitFor({ state: 'visible', timeout: 15000 });
    
    await page.waitForTimeout(2000);

    await use(userData);
  },

  mainPage: async ({ page, logger }, use) => {
    const mainPage = new MainPage(page, 0, logger);
    await use(mainPage);
  },

  loginPage: async ({ page, logger }, use) => {
    const loginPage = new LoginPage(page, 0, logger);
    await use(loginPage);
  },

  registerPage: async ({ page, logger }, use) => {
    const registerPage = new RegisterPage(page, 0, logger);
    await use(registerPage);
  },

  forgotLoginPage: async ({ page, logger }, use) => {
    const forgotLoginPage = new ForgotLoginPage(page, 0, logger);
    await use(forgotLoginPage);
  },
});

export { expect } from '@playwright/test';
