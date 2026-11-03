import { test as base } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/users/generateNewUser';

export const test = base.extend<
  {
    usersNumber;
    contextsNumber;
    pages;
    user;
    users;
  }
>({
  //number of users for test
  usersNumber: [1, { option: true }],

  //number of contexts for test
  contextsNumber: [1, { option: true }],

  //create array of pages (contextsNumber)
  pages: async ({ browser, contextsNumber }, use) => {
    let pages = Array(contextsNumber);

    for (let i = 0; i < contextsNumber; i++) {
      const context = await browser.newContext();

      pages[i] = await context.newPage();
    }
    await use(pages);
  },

  //create new user (1)
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  
  //create array of users
  users: async ({ logger, usersNumber }, use) => {
    const users = Array(usersNumber);

    for (let i = 0; i < usersNumber; i++) {
      users[i] = generateNewUserData(logger);
    }

    await use(users);
  },
});