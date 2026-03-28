import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';

export const test = base.extend<
  {
    registerPage: RegisterPage;
    infoTestLog: string;
    addAllureTestHierarchy: string;
  },
  {
    logger: Logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
      await use(logger);
    },
    { scope: 'worker' },
  ],

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
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

      await use('addAllureTestHierarchy');
    },
    { scope: 'test', auto: true },
  ],
});

export { expect } from '@playwright/test';
