import { test } from '../../../_fixtures/fixtures';
import { INITIAL_BALANCE } from '../../../../src/common/constants/accounts';
import { LOAN_PAGE_MESSAGES } from '../../../../src/common/constants/errors';
import { getCurrentDate } from '../../../../src/common/helpers/dates';

const INVALID_LOANS = [
  { label: 'the amount is empty', amount: '', downPayment: '' },
  { label: 'the amount is blank', amount: '   ', downPayment: '10' },
  { label: 'the amount is letters', amount: 'abc', downPayment: '10' },
  { label: 'the amount contains a comma', amount: '10,5', downPayment: '10' },
  { label: 'the amount is zero', amount: 0, downPayment: 0 },
  { label: 'the down payment is not a number', amount: 100, downPayment: 'abc' },
];

test.describe('Request Loan', () => {
  test.describe.configure({ timeout: 120_000 });

  for (const { label, amount, downPayment } of INVALID_LOANS) {
    test(`Loan request is rejected when ${label}`, async ({
      registeredUser,
      requestLoanPage,
    }) => {
      await requestLoanPage.applyForLoan({
        amount,
        downPayment,
        fromAccountId: registeredUser.accountId,
      });
      await requestLoanPage.assertLoanRejected();
    });
  }

  test('Down payment greater than available funds is denied', async ({
    registeredUser,
    requestLoanPage,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    await requestLoanPage.applyForLoan({
      amount: 100,
      downPayment: INITIAL_BALANCE + 1,
      fromAccountId: registeredUser.accountId,
    });
    await requestLoanPage.assertLoanProcessed({
      status: 'Denied',
      message: LOAN_PAGE_MESSAGES.insufficientDownPayment,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: registeredUser.accountId,
        balance: INITIAL_BALANCE,
        availableBalance: INITIAL_BALANCE,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
    const activity = accountDetailsActivityPage(registeredUser.accountId);
    await activity.open();
    await activity.assertNoTransactions();
  });

  test('Loan larger than available funds is denied', async ({
    registeredUser,
    requestLoanPage,
    overviewPage,
  }) => {
    await requestLoanPage.applyForLoan({
      amount: 10000,
      downPayment: 100,
      fromAccountId: registeredUser.accountId,
    });
    await requestLoanPage.assertLoanProcessed({
      status: 'Denied',
      message: LOAN_PAGE_MESSAGES.insufficientFunds,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: registeredUser.accountId,
        balance: INITIAL_BALANCE,
        availableBalance: INITIAL_BALANCE,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
  });

  test('Approved loan debits the down payment and opens a loan account', async ({
    registeredUser,
    requestLoanPage,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const amount = 1000;
    const downPayment = 100;
    const sourceBalance = INITIAL_BALANCE - downPayment;

    await requestLoanPage.applyForLoan({
      amount,
      downPayment,
      fromAccountId: registeredUser.accountId,
    });
    const loanAccountId = await requestLoanPage.assertLoanProcessed({ status: 'Approved' });

    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: registeredUser.accountId,
        balance: sourceBalance,
        availableBalance: sourceBalance,
      },
      {
        accountId: loanAccountId,
        balance: amount,
        availableBalance: amount,
      },
    ]);
    await overviewPage.assertTotal(sourceBalance + amount);

    const sourceActivity = accountDetailsActivityPage(registeredUser.accountId);
    await sourceActivity.open();
    await sourceActivity.assertTransactions([
      {
        date: getCurrentDate(),
        name: `Down Payment for Loan # ${loanAccountId}`,
        debit: downPayment,
        credit: '',
      },
    ]);

    const loanActivity = accountDetailsActivityPage(loanAccountId);
    await loanActivity.open();
    await loanActivity.assertAccountDetailsVisible({
      accountId: loanAccountId,
      accountType: { label: 'LOAN' },
      balance: amount,
      availableBalance: amount,
    });
    await loanActivity.assertNoTransactions();
  });

  test('Zero down payment is approved and the source balance stays unchanged', async ({
    registeredUser,
    requestLoanPage,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const amount = 100;

    await requestLoanPage.applyForLoan({
      amount,
      downPayment: 0,
      fromAccountId: registeredUser.accountId,
    });
    const loanAccountId = await requestLoanPage.assertLoanProcessed({ status: 'Approved' });

    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: registeredUser.accountId,
        balance: INITIAL_BALANCE,
        availableBalance: INITIAL_BALANCE,
      },
      {
        accountId: loanAccountId,
        balance: amount,
        availableBalance: amount,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE + amount);

    const sourceActivity = accountDetailsActivityPage(registeredUser.accountId);
    await sourceActivity.open();
    await sourceActivity.assertTransactions([
      {
        date: getCurrentDate(),
        name: `Down Payment for Loan # ${loanAccountId}`,
        debit: 0,
        credit: '',
      },
    ]);
  });
});
