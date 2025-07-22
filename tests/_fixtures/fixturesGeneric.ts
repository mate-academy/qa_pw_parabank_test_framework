import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { generateNewUserData } from '../../src/common/test data/generateUser';
import fs from 'fs';
import path from 'path';

export const test = base.extend<
  {
    infoTestLog;
    addAllureTestHierarchy;
    user;
    clearAllureResults;
  },
  {
    logger;
  }
>({
  clearAllureResults: [
    async ({}, use) => {
      const allureResultsPath = path.join(__dirname, '../../../allure-results');

      if (fs.existsSync(allureResultsPath)) {
        fs.rmSync(allureResultsPath, { recursive: true, force: true });
      }

      await use(undefined);
    },
    { scope: 'worker', auto: true },
  ],

  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);
    await use(user);
  },

  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
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
      if (subSuite) await allure.subSuite(subSuite);

      await allure.epic(parentSuite);
      await allure.feature(suite);
      await allure.story(subSuite || 'Default story');
      await allure.severity(Severity.NORMAL);

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
