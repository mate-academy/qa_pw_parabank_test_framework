import { test } from '../../_fixtures/fixtures';
import { USERNAME_IS_TAKEN } from '../../../src/ui/constants/authMessages';

test(`User name has been taken`, async ({
  signUpPage,
  customerInfoForm,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // The first sign up
  await signUpPage.open();
  await customerInfoForm.submitRegisterForm(user);

  // The second sign up
  await signUpPage.open();
  await customerInfoForm.submitRegisterForm(user);

  await customerInfoForm.assertFieldErrorByName('username', USERNAME_IS_TAKEN);
});
