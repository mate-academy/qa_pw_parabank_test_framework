import { test as base, type Page } from '@playwright/test';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { registerUser } from '../../src/ui/actions/auth/registerUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';

type UserData = ReturnType<typeof generateNewUserData>;

export const test = base.extend<{
  page1: Page;
  page2: Page;
  user: UserData;
  user1: UserData;
  user2: UserData;
  homePage: HomePage;
  registerPage: RegisterPage;
  registeredUser: UserData;
}>({
  page1: async ({ page }, use) => {
    await use(page);
  },

  page2: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page2 = await context.newPage();

    await use(page2);
  },

  user: async ({}, use) => {
    const user = generateNewUserData();

    await use(user);
  },

  user1: async ({ user }, use) => {
    await use(user);
  },

  user2: async ({}, use) => {
    const user2 = generateNewUserData();

    await use(user2);
  },

  homePage: async ({ page1 }, use) => {
    await use(new HomePage(page1, 1));
  },

  registerPage: async ({ page1 }, use) => {
    await use(new RegisterPage(page1, 1));
  },

  registeredUser: async ({ page1, user1 }, use) => {
    await registerUser(page1, user1, 1);

    await use(user1);
  },
});
