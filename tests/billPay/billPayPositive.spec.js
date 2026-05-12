import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

const PAYEE_NAME = 'John Doe';
const PAYEE_ACCOUNT = '13344';
const PAYMENT_AMOUNT = 50;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successfully pay a bill to an external payee', async ({
  billPayPage,
  user,
}) => {
  await billPayPage.open();
  await billPayPage.submitBillPayForm({
    payeeName: PAYEE_NAME,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    account: PAYEE_ACCOUNT,
    amount: PAYMENT_AMOUNT,
  });
  await billPayPage.assertBillPayComplete(PAYEE_NAME);
});
