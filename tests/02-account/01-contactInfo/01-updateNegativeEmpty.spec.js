import { test } from '../../_fixtures/fixtures';
import { EMPTY_PROFILE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const requiredProfileFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
];

test(`Update profile with empty field`, async ({
  page,
  accountServicesPanel,
  customerInfoForm,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'critical' });

  // Create new user
  await signUpUser(page, user);

  for (const fieldKey of requiredProfileFields) {
    await test.step(`Update with empty ${fieldKey} field`, async () => {
      // Reopen form for before every test
      await accountServicesPanel.clickUpdateContactInfoLink();

      const invalidUser = structuredClone(user);
      const keys = fieldKey.split('.');
      invalidUser[keys[0]] = '';

      await customerInfoForm.submitUpdateProfileForm(invalidUser);
      await customerInfoForm.assertFieldErrorByName(
        fieldKey,
        EMPTY_PROFILE_FORM_ERRORS[fieldKey],
      );
    });
  }
});
