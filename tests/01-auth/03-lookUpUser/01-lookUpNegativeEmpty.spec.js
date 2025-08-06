import { test } from '../../_fixtures/fixtures';
import { EMPTY_PROFILE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';

const requiredProfileFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'ssn',
];
test.describe('Lookup when one of required fields is empty', () => {
  for (const fieldKey of requiredProfileFields) {
    test(`Error is shown when required field "${fieldKey}" is empty`, async ({
      homePage,
      customerInfoForm,
      user,
    }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'minor' });

      const invalidUser = structuredClone(user);

      const keys = fieldKey.split('.');
      invalidUser[keys[0]] = '';

      await homePage.open();
      await homePage.clickForgotLogInLink();
      await customerInfoForm.submitLookupForm(invalidUser);
      await customerInfoForm.assertFieldErrorByName(
        fieldKey,
        EMPTY_PROFILE_FORM_ERRORS[fieldKey],
      );
    });
  }
});
