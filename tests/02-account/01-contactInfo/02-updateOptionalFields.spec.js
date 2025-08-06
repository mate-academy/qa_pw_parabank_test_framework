import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Update profile: optional field`, async ({
  page,
  accountServicesPanel,
  customerInfoForm,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  await test.step(`Check displayed fields before editing`, async () => {
    await accountServicesPanel.clickUpdateContactInfoLink();
    await customerInfoForm.assertCheckProfileFields(user);
  });

  await test.step(`Update user profile: phone number clear`, async () => {
    user['phoneNumber'] = '';
    await customerInfoForm.fillPhoneField(user);
    await customerInfoForm.clickUpdateProfileButton();
  });

  await test.step(`Check displayed fields after editing`, async () => {
    await accountServicesPanel.clickUpdateContactInfoLink();
    await customerInfoForm.assertCheckProfileFields(user);
  });
});
