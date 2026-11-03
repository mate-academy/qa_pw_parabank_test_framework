import { test } from '../../../_fixtures/fixtures';
import { INITIAL_BALANCE } from '../../../../src/common/constants/accounts';

const payee = {
  name: 'Electric Co',
  address: '1 Main St',
  city: 'New York',
  state: 'CA',
  zipCode: '90210',
  phone: '3105551212',
  accountNumber: '12345',
  verifyAccount: '12345',
};

const requiredErrors = [
  'payeeNameRequiredError',
  'addressRequiredError',
  'cityRequiredError',
  'stateRequiredError',
  'zipCodeRequiredError',
  'phoneRequiredError',
  'accountNumberRequiredError',
  'verifyAccountRequiredError',
  'amountRequiredError',
];

test.describe('Bill Pay', () => {
  test.describe.configure({ timeout: 120_000 });

  test('Payment is rejected when required fields are empty', async ({
    registeredUser,
    billPayPage,
  }) => {
    void registeredUser;

    await billPayPage.submitPayment();
    await billPayPage.assertPaymentRejected(requiredErrors);
  });

  test('Payment is rejected when the account number is not a number', async ({
    registeredUser,
    billPayPage,
  }) => {
    await billPayPage.submitPayment({
      ...payee,
      accountNumber: 'abc',
      verifyAccount: 'abc',
      amount: 10,
      fromAccountId: registeredUser.accountId,
    });
    await billPayPage.assertPaymentRejected([
      'accountNumberInvalidError',
      'verifyAccountInvalidError',
    ]);
  });

  test('Payment is rejected when the account numbers do not match', async ({
    registeredUser,
    billPayPage,
  }) => {
    await billPayPage.submitPayment({
      ...payee,
      verifyAccount: '54321',
      amount: 10,
      fromAccountId: registeredUser.accountId,
    });
    await billPayPage.assertPaymentRejected(['verifyAccountMismatchError']);
  });

  test('Payment is rejected when the amount is not a number', async ({
    registeredUser,
    billPayPage,
  }) => {
    await billPayPage.submitPayment({
      ...payee,
      amount: 'abc',
      fromAccountId: registeredUser.accountId,
    });
    await billPayPage.assertPaymentRejected(['amountInvalidError']);
  });

  test('Bill payment completes and the account balance stays unchanged', async ({
    registeredUser,
    billPayPage,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const amount = 25.5;

    await billPayPage.submitPayment({
      ...payee,
      amount,
      fromAccountId: registeredUser.accountId,
    });
    await billPayPage.assertPaymentCompleted({
      name: payee.name,
      amount,
      fromAccountId: registeredUser.accountId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: registeredUser.accountId,
        balance: INITIAL_BALANCE,
        availableBalance: INITIAL_BALANCE,
      },
    ]);
    await overviewPage.openAccount(registeredUser.accountId);
    await accountDetailsActivityPage(registeredUser.accountId).assertNoTransactions();
  });
});
