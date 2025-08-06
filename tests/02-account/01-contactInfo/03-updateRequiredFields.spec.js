import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ usersNumber: 2 });

test(`Update profile: required field`, async ({
  page,
  accountServicesPanel,
  customerInfoForm,
  users,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, users[0]);

  await test.step(`Check displayed fields before editing`, async () => {
    await accountServicesPanel.clickUpdateContactInfoLink();
    await customerInfoForm.assertCheckProfileFields(users[0]);
  });

  await test.step(`Update user profile: contact info fields`, async () => {
    await customerInfoForm.submitUpdateProfileForm(users[1]);
  });

  await test.step(`Check displayed fields after editing`, async () => {
    await accountServicesPanel.clickUpdateContactInfoLink();
    await customerInfoForm.assertCheckProfileFields(users[1]);
  });
});
