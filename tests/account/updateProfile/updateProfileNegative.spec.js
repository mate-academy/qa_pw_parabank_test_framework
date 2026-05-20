import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.describe(`Update Profile negative tests`, () => {
  test(`Shows required-field errors when submitting empty form`, async ({
    signedUpUserWithOneAccount,
    updateProfilePage,
  }) => {
    await allure.severity('normal');

    await updateProfilePage.open();
    await updateProfilePage.clickUpdateProfileButton();
    await updateProfilePage.assertAllRequiredFieldsErrors();
  });
});
