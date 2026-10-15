import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Open New Account tests', () => {
  const accountTypes = ['CHECKING', 'SAVINGS'];

  for (const accountType of accountTypes) {
    test(`Open new ${accountType} account successfully`, async ({
      page,
      user,
      openNewAccountPage,
      accountDetailsPage,
    }) => {
      await allure.severity('critical');

      await registerUser(page, user);

      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType(accountType);
      await openNewAccountPage.selectFirstSourceAccount();
      await openNewAccountPage.clickOpenNewAccountButton();

      await openNewAccountPage.assertAccountOpenedSuccessfully();

      await openNewAccountPage.openCreatedAccount();
      await accountDetailsPage.assertAccountDetailsVisible();
    });
  }
});
