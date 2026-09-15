import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { LOOKUP_ERROR_MESSAGE } from '../../../src/ui/constants/lookupMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

test('User cannot look up login info with non-existing customer info', async ({
  homePage,
  forgotLoginInfoPage,
  lookupPage,
}) => {
  await allure.severity('critical');

  const unknownUser = generateNewUserData();

  await homePage.open();
  await homePage.clickForgotLoginInfo();
  await forgotLoginInfoPage.fillLookupForm(unknownUser);
  await forgotLoginInfoPage.clickFindMyLoginInfo();
  await lookupPage.verifyErrorMessage(LOOKUP_ERROR_MESSAGE);
});
