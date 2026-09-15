import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('critical');
});

test('User can update and save profile information', async ({
  updateProfilePage,
  registeredUser,
}) => {
  const updatedUser = {
    ...registeredUser,
    ...generateNewUserData(),
  };

  await updateProfilePage.goToUpdateProfile();

  await updateProfilePage.fillProfileForm(updatedUser);
  await updateProfilePage.clickUpdateProfile();

  await updateProfilePage.goToUpdateProfile();

  await updateProfilePage.verifyProfileForm(updatedUser);
});
