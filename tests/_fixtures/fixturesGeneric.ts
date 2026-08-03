import { rmSync } from 'fs';
import { test as base, TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from '../../src/common/logger/Logger';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { ALLURE_RESULTS_DIR } from '../../src/common/constants/allurePaths';

export const test = base.extend<
  {
    infoTestLog: void;
    addAllureTestHierarchy: void;
  },
  {
    logger: Logger;
    cleanAllureResults: void;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],

  cleanAllureResults: [
    async ({}, use) => {
      rmSync(ALLURE_RESULTS_DIR, { recursive: true, force: true });

      await use();
    },
    { scope: 'worker', auto: true },
  ],

  infoTestLog: [
    async ({ logger }, use, testInfo: TestInfo) => {
      const normalizedFile = testInfo.file.replace(/\\/g, '/');
      const indexOfTestSubfolderStart = normalizedFile.indexOf('/tests') + 7;
      const fileName = normalizedFile.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use();

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo: TestInfo) => {
      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        testInfo.file,
        logger,
      );

      await allure.parentSuite(parentSuite);
      if (suite) {
        await allure.suite(suite);
      }
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use();
    },
    { scope: 'test', auto: true },
  ],
});
