import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { TRANSFER_AMOUNT } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ createdAccount, page2, user2 }) => {
  void createdAccount;
  await registerUser(page2, user2, 2);
});

test('User can successfully make a bill payment', async ({
  page1,
  billPayPage,
  user2,
  createdAccount,
}) => {
  await billPayPage.goToBillPay(page1, 1);
  const fromAccount = await billPayPage.getFromAccountId();
  await billPayPage.fillPayeeInformation(user2, createdAccount);
  await billPayPage.fillAmount(TRANSFER_AMOUNT);
  await billPayPage.clickSendPayment();
  await billPayPage.verifyBillPaymentSuccessful(
    `${user2.firstName} ${user2.lastName}`,
    TRANSFER_AMOUNT,
    fromAccount,
  );
});
