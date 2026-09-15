import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { TRANSFER_AMOUNT } from '../../../src/ui/constants/accountConstants';
import { BILL_PAY_ERROR_MESSAGES } from '../../../src/ui/constants/billPaymentMessages';

const requiredFields = [
  {
    field: 'payeeNameField',
    message: BILL_PAY_ERROR_MESSAGES.payeeName,
  },
  {
    field: 'addressField',
    message: BILL_PAY_ERROR_MESSAGES.address,
  },
  {
    field: 'cityField',
    message: BILL_PAY_ERROR_MESSAGES.city,
  },
  {
    field: 'stateField',
    message: BILL_PAY_ERROR_MESSAGES.state,
  },
  {
    field: 'zipCodeField',
    message: BILL_PAY_ERROR_MESSAGES.zipCode,
  },
  {
    field: 'phoneField',
    message: BILL_PAY_ERROR_MESSAGES.phone,
  },
  {
    field: 'accountNumberField',
    message: BILL_PAY_ERROR_MESSAGES.accountNumber,
  },
  {
    field: 'verifyAccountNumberField',
    message: BILL_PAY_ERROR_MESSAGES.verifyAccountNumber,
  },
  {
    field: 'amountField',
    message: BILL_PAY_ERROR_MESSAGES.amount,
  },
];

test.beforeEach(async ({ createdAccount, page2, user2 }) => {
  void createdAccount;
  await registerUser(page2, user2, 2);
});

test.describe('Bill Payment with required fields not filled in', () => {
  for (const { field, message } of requiredFields) {
    test(`Bill Payment with empty ${field}`, async ({
      billPayPage,
      user2,
      createdAccount,
    }) => {
      await billPayPage.goToBillPay();
      await billPayPage.fillPayeeInformation(user2, createdAccount);
      await billPayPage.fillAmount(TRANSFER_AMOUNT);
      await billPayPage.clearField(field);
      await billPayPage.clickSendPayment();
      await billPayPage.verifyErrorMessage(message);
    });
  }
});
