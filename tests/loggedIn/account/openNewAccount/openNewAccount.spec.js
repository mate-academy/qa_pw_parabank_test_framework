import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';

test.describe('Open New Account', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  const accountTypes = Object.values(ACCOUNT_TYPES);

  accountTypes.forEach(accountType => {
    test(`User should be able to open a new ${accountType.label} account after registration (with 1 account)`, async ({ page }) => {
      await openNewAccount(page, accountType);
    });
  });

  accountTypes.forEach(accountType => {
    let newAccountId;

    test.beforeEach(async ({ page }) => {
      newAccountId = await openNewAccount(page, accountType);
    });

    test(`User should be able to open a new ${accountType.label} account after registration (with 2 accounts)`, async ({ page }) => {
      await openNewAccount(page, accountType, newAccountId);
    });
  });

});
