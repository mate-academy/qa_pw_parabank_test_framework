import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { TRANSFER_AMOUNT } from '../../../src/ui/constants/accountConstants';
import {
  BILL_PAY_ERROR_MESSAGES,
  INVALID_ACCOUNT_NUMBER,
} from '../../../src/ui/constants/billPaymentMessages';

test.beforeEach(async ({ createdAccount, page2, user2 }) => {
  void createdAccount;
  await registerUser(page2, user2, 2);
});

test('Payment fails when account numbers do not match', async ({
  page1,
  billPayPage,
  user2,
  createdAccount,
}) => {
  await billPayPage.goToBillPay(page1, 1);
  await billPayPage.fillPayeeInformation(user2, createdAccount);
  await billPayPage.fillAmount(TRANSFER_AMOUNT);
  await billPayPage.fillVerifyAccountNumber(INVALID_ACCOUNT_NUMBER);
  await billPayPage.clickSendPayment();
  await billPayPage.verifyErrorMessage(
    BILL_PAY_ERROR_MESSAGES.accountNumbersMismatch,
  );
});
