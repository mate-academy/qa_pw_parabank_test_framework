import { test as base, TestInfo } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

type UserDataType = ReturnType<typeof generateNewUserData>;

export const test = base.extend<
  {
    infoTestLog: string;
    addAllureTestHierarchy: string;
    user: UserDataType;
  },
  {
    logger: Logger;
  }
>({
  logger: [
    async ({}, use: (r: Logger) => Promise<void>) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async (
      { logger }: { logger: Logger },
      use: (r: string) => Promise<void>,
      testInfo: TestInfo,
    ) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  addAllureTestHierarchy: [
    async (
      { logger }: { logger: Logger },
      use: (r: string) => Promise<void>,
      testInfo: TestInfo,
    ) => {
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

  user: async (
    { logger }: { logger: Logger },
    use: (r: UserDataType) => Promise<void>,
  ) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
});
