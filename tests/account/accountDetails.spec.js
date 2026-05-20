import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.describe(`Account details`, () => {
  test(`Account info is shown after sign up`, async ({
    accountDetailsPage,
    signedUpUserWithOneAccount,
  }) => {
    await allure.severity('critical');

    const { accountData } = signedUpUserWithOneAccount;
    const accountType = 'CHECKING';

    await accountDetailsPage.open(accountData.accountId);

    await accountDetailsPage.assertAccountIdHasText(accountData.accountId);
    await accountDetailsPage.assertAccountTypeContainsText(accountType);
    await accountDetailsPage.assertBalanceContainsText(accountData.balance);
    await accountDetailsPage.assertAvailableBalanceContainsText(
      accountData.availableBalance,
    );
  });
});
