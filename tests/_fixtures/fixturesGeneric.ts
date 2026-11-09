import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    infoTestLog;
    addAllureTestHierarchy;
    user;
    user1;
    user2;
    page1;
    page2;
  },
  {
    logger;
  }
>({
  page1: async ({ page }, use) => {
    await use(page);
  },
  page2: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page2 = await context.newPage();

    await use(page2);
  },
  user1: async ({ user }, use) => {
    await use(user);
  },
  user2: async ({ logger }, use) => {
    const user2 = generateNewUserData(logger);

    await use(user2);
  },

  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],

  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);

      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
