import { test } from '../../_fixtures/fixtures';
import { INVALID_CONFIRM_PASSWORD } from '../../../src/ui/constants/authMessages';

test(`Confirmation password is wrong`, async ({
  signUpPage,
  customerInfoForm,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'critical' });

  user['repeatPassword'] = '101';

  await signUpPage.open();
  await customerInfoForm.submitRegisterForm(user);
  await customerInfoForm.assertFieldErrorByName(
    'repeatPassword',
    INVALID_CONFIRM_PASSWORD,
  );
});
