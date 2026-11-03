import { test } from '../../../_fixtures/fixtures';
import { generateNewUserData } from '../../../../src/common/testData/users/generateNewUser';

const requiredFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'ssn',
];

test.describe('Forgot Login Negative', () => {
  test.describe('Forgot Login with empty fields', () => {
    requiredFields.forEach(field => {
      test(`User should not be able to look up login info with empty ${field} field`, async ({
        lookupPage,
        user,
      }) => {
        await lookupPage.open();
        await lookupPage.submitLookupForm({ ...user, [field]: '' });
        await lookupPage.assertLookupRejected(field);
      });
    });

    test('User should not be able to look up login info with all required fields empty', async ({
      lookupPage,
      user,
    }) => {
      const emptyRequired = Object.fromEntries(requiredFields.map(field => [field, '']));

      await lookupPage.open();
      await lookupPage.submitLookupForm({ ...user, ...emptyRequired });
      await lookupPage.assertLookupRejected(requiredFields[0]);

      for (const field of requiredFields.slice(1)) {
        await lookupPage.assertErrorMessage(field);
      }
    });
  });

  test('User should not be able to restore access to their account if the information is incorrect', async ({
    lookupPage,
  }) => {
    const incorrectUser = generateNewUserData();

    await lookupPage.open();
    await lookupPage.submitLookupForm(incorrectUser);
    await lookupPage.assertCustomerNotFound();
  });
});
