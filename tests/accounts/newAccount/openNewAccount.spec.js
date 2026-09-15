import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { ACCOUNT_TYPES } from '../../../src/ui/constants/accountConstants';

const accountTypes = [ACCOUNT_TYPES.checking, ACCOUNT_TYPES.savings];

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('critical');
});

test.describe('User can open a new account', () => {
  for (const accountType of accountTypes) {
    test(`User can open a ${accountType} account`, async ({
      newAccountPage,
    }) => {
      await newAccountPage.goToOpenNewAccount();
      await newAccountPage.selectAccountType(accountType);
      await newAccountPage.clickOpenNewAccount();
      await newAccountPage.verifyAccountCreated();
    });
  }
});
