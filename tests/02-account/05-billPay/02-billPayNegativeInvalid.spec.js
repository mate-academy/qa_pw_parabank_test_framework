import { test } from '../../_fixtures/fixtures';
import { INVALID_PAYEE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Bill pay with invalid data in fields`, async ({
  page,
  user,
  accountServicesPanel,
  billPayPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  await test.step(`Bill pay with invalid 'amount' field`, async () => {
    await accountServicesPanel.clickBillPayLink();
    await billPayPage.submitPayeeInfoForm(user, 'trololo', 1709);
    await billPayPage.assertFieldErrorByName(
      'amount',
      INVALID_PAYEE_FORM_ERRORS['amount'],
    );
  });

  await test.step(`Bill pay with invalid 'account' field`, async () => {
    await accountServicesPanel.clickBillPayLink();
    await billPayPage.submitPayeeInfoForm(user, 100, 'trololo');
    await billPayPage.assertFieldErrorByName(
      'account',
      INVALID_PAYEE_FORM_ERRORS['account'],
    );
  });

  await test.step(`Bill pay with invalid confirm 'account' field`, async () => {
    await accountServicesPanel.clickBillPayLink();

    await billPayPage.fillPayeeInfoForm(user, 100, '111');
    await billPayPage.fillAccountField('999');
    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertFieldErrorByName(
      'accountVerify',
      INVALID_PAYEE_FORM_ERRORS['accountVerify'],
    );
  });
});
