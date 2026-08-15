import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { fillUpdateContactInfoForm } from '../../../src/ui/actions/account/updateContactInfo';

test('should update profile with valid data', async ({
  page,
  user,
  updateContactInfoPage,
  updateContactInfoData,
}) => {
  await allure.severity('critical');

  await registerNewUser(page, user);

  await updateContactInfoPage.openAndAssert();

  await fillUpdateContactInfoForm(updateContactInfoPage, updateContactInfoData);
  await updateContactInfoPage.clickUpdateProfileButton();

  await updateContactInfoPage.assertUpdateSuccessful();
});
