import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    contextsNumber;
    pages;
    severity;
    infoTestLog;
    addAllureTestHierarchy;
  },
  {
    logger;
  }
>({
  contextsNumber: [1, { option: true }],

  severity: [Severity.NORMAL, { option: true }],

  pages: async ({ browser, contextsNumber }, use) => {
    const contexts = [];
    const pages = [];

    for (let i = 0; i < contextsNumber; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();

      contexts.push(context);
      pages.push(page);
    }

    await use(pages);

    for (const context of contexts) {
      await context.close();
    }
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
    async ({ logger, severity }, use, testInfo) => {
      const fileName = testInfo.file.replaceAll('/', '\\');

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);

      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await allure.severity(severity);

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
