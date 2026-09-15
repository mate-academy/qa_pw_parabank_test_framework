import { test as userTest } from './fixturesUsers';

import { openNewAccount } from '../../src/ui/actions/accounts/openNewAccount';
import { ACCOUNT_TYPES } from '../../src/ui/constants/accountConstants';

export const test = userTest.extend<{
  createdAccount: string;
}>({
  createdAccount: async ({ page1, registeredUser }, use) => {
    void registeredUser;

    const accountNumber = await openNewAccount(
      page1,
      ACCOUNT_TYPES.checking,
      1,
    );

    await use(accountNumber);
  },
});
