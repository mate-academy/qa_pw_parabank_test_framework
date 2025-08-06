import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const requiredProfileFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'ssn',
];

test.describe('Check lookup with incorrect data', () => {
  test.beforeAll(async ({ browser, user }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await signUpUser(page, user);

    await page.close();
    await context.close();
  });

  for (const fieldKey of requiredProfileFields) {
    test(`Look up with incorrect "${fieldKey}" field`, async ({
      user,
      lookupPage,
      customerInfoForm,
    }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'critical' });

      const invalidUser = structuredClone(user);

      const keys = fieldKey.split('.');
      invalidUser[keys[0]] = 'wrong_field';

      await lookupPage.open();
      await customerInfoForm.submitLookupForm(invalidUser);
      await lookupPage.assertlookupIsUnsuccessful();
    });
  }
});
