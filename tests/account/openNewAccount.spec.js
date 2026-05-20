import { test } from '../_fixtures/fixtures';
import { OPEN_NEW_ACCOUNT_SUCCESS_MESSAGE } from '../../src/ui/constants/accountMessages';
import * as allure from 'allure-js-commons';

const testParameters = [
  { accountType: 'CHECKING' },
  { accountType: 'SAVINGS' },
];

test.describe(`Open New Account`, () => {
  testParameters.forEach(({ accountType }) => {
    test(`Create '${accountType}' account from existing account`, async ({
      openAccountPage,
      signedUpUserWithOneAccount,
    }) => {
      await allure.severity('critical');

      const { accountData } = signedUpUserWithOneAccount;
      const fromAccountId = accountData.accountId;
      await openAccountPage.open();
      await openAccountPage.selectAccountType(accountType);
      await openAccountPage.selectFromAccountId(fromAccountId);
      await openAccountPage.clickOpenNewAccountButton();
      await openAccountPage.assertOpenAccountResultContainsText(
        OPEN_NEW_ACCOUNT_SUCCESS_MESSAGE,
      );
      await openAccountPage.assertNewAccountIdIsVisible();
    });
  });
});
