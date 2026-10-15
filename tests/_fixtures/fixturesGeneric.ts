
import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    infoTestLog;
    addAllureTestHierarchy;
  },
  {
    logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const normalizedFileName = testInfo.file.replace(/\\/g, '/');
      const indexOfTestSubfolderStart =
        normalizedFileName.indexOf('/tests/') + 7;

      const fileName = normalizedFileName.substring(
        indexOfTestSubfolderStart,
      );

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        testInfo.file,
        logger,
      );

      if (parentSuite) {
        await allure.parentSuite(parentSuite);
      }

      if (suite) {
        await allure.suite(suite);
      }

      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarchy');
    },
    { scope: 'test', auto: true },
  ],
});

