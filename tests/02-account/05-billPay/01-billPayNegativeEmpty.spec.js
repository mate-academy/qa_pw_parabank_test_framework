import { test } from '../../_fixtures/fixtures';
import { EMPTY_PAYEE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { logInUser } from '../../../src/ui/actions/auth/logInUser';

const requiredProfileFields = [
  'payeeName',
  'address',
  'city',
  'state',
  'zipCode',
  'phoneNumber',
];

let sharedUser;

test.beforeEach(
  async ({
    page,
    user,
    accountServicesPanel,
    openNewAccountPage,
    billPayPage,
  }) => {
    if (!sharedUser) {
      await signUpUser(page, user);
      sharedUser = structuredClone(user);
      await test.step('Create a new account', async () => {
        await accountServicesPanel.clickOpenNewAccountLink();
        await openNewAccountPage.submitNewAccountForm();
      });
      await accountServicesPanel.clickLogOutButton();
    }
    await logInUser(page, sharedUser);
    await billPayPage.open();
  },
);

test.describe('Bill pay with empty field', () => {
  for (const fieldKey of requiredProfileFields) {
    test(`Bill pay with empty '${fieldKey}' field`, async ({
      billPayPage,
    }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'minor' });

      const invalidPayeeInfo = structuredClone(sharedUser);
      const keys = fieldKey.split('.');
      invalidPayeeInfo[keys[0]] = '';

      await billPayPage.submitPayeeInfoForm(invalidPayeeInfo, 100, 1709);
      await billPayPage.clickSendPaymentButton();
      await billPayPage.assertFieldErrorByName(
        fieldKey,
        EMPTY_PAYEE_FORM_ERRORS[fieldKey],
      );
    });
  }

  test(`Bill pay with empty 'amount' field`, async ({
    billPayPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await billPayPage.submitPayeeInfoForm(sharedUser, '', 1709);
    await billPayPage.assertFieldErrorByName(
      'amount',
      EMPTY_PAYEE_FORM_ERRORS['amount'],
    );
  });

  test(`Bill pay with empty 'acount' field`, async ({
    billPayPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await billPayPage.submitPayeeInfoForm(sharedUser, 100, '');
    await billPayPage.assertFieldErrorByName(
      'account',
      EMPTY_PAYEE_FORM_ERRORS['account'],
    );
  });
});
