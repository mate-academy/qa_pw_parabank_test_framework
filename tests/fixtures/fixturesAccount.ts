import { test as base } from './fixtures';
import { AccountActions } from '../../src/common/ui/actions/account.actions';
import { testData } from '../../src/config/testData';

export const test = base.extend({
  accountActions: async ({ page }, use) => {
    const actions = new AccountActions(page);
    await use(actions);
  },

  transferData: async ({}, use) => {
    await use(testData.transfers);
  },

  billData: async ({}, use) => {
    await use(testData.bills);
  },
});
