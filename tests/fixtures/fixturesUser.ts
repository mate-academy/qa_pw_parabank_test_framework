// tests/fixtures/fixturesUser.ts
import { mergeTests } from '@playwright/test';
import { test as base } from './fixturesGeneric';
import { UserActions } from '../../src/common/ui/actions/user.actions';
import testData from '../../src/config/testData';

export const test = mergeTests(base).extend({
  userActions: async ({ page, logger }, use) => {
    const actions = new UserActions(page, logger);
    await use(actions);
  },

  userTestData: async ({}, use) => {
    await use(testData.users); // FIX: expose validUser / test users for specs
  },
});
