import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/helpers/testData/generateNewUserData';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successfully update contact information', async ({
  updateContactInfoPage,
}) => {
  const updatedUser = generateNewUserData();

  await updateContactInfoPage.open();
  await updateContactInfoPage.submitUpdateContactInfoForm(updatedUser);
  await updateContactInfoPage.assertProfileUpdated();
});
