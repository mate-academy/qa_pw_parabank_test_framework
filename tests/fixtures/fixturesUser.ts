import { test as base } from './fixtures';
import { UserActions } from '../../src/common/ui/actions/user.actions';
import { testData } from '../../src/config/testData';

export const test = base.extend({
  userActions: async ({ page }, use) => {
    const actions = new UserActions(page);
    await use(actions);
  },

  contactUpdateData: async ({}, use) => {
    await use(testData.contactUpdates);
  },

  loanData: async ({}, use) => {
    await use(testData.loans);
  },
});
