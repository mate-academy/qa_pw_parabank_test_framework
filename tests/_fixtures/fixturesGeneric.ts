import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import {
  parseTestTreeHierarchy,
  severityForTest,
} from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    infoTestLog;
    addAllureTestHierarchy;
    testGap;
  },
  {
    logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('info');

      await use(logger);
    },
    { scope: 'worker' },
  ],
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
      await allure.severity(severityForTest(testInfo.title));

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
  testGap: [
    async ({}, use) => {
      await use();

      const gap = Number(process.env.TEST_GAP_MS);
      if (gap > 0) {
        await new Promise(resolve => setTimeout(resolve, gap));
      }
    },
    { scope: 'test', auto: true },
  ],
});
