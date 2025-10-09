import { test as base } from './fixtures';
import { AuthActions } from '../../src/common/ui/actions/auth.actions';
import { testData } from '../../src/config/testData';

export const test = base.extend({
  authActions: async ({ page }, use) => {
    const actions = new AuthActions(page);
    await use(actions);
  },

  validUser: async ({}, use) => {
    await use(testData.users.valid);
  },

  invalidUser: async ({}, use) => {
    await use(testData.users.invalid);
  },
});
