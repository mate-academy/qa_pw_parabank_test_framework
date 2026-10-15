import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { testStep } from '../../../src/common/helpers/pwHelpers';

test.describe('Find Transactions tests', () => {
  const amount = 10;

  test.beforeEach(
    async ({
      page,
      user,
      openNewAccountPage,
      transferFundsPage,
      findTransactionsPage,
    }) => {
      await registerUser(page, user);

      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType('CHECKING');
      await openNewAccountPage.selectFirstSourceAccount();
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpenedSuccessfully();

      await transferFundsPage.open();

      const accounts = await transferFundsPage.getAvailableAccounts();

      const fromAccount = accounts[0]?.value;
      const toAccount = accounts[1]?.value;

      await testStep(
        'Assert two different accounts are available',
        async () => {
          if (!fromAccount || !toAccount || fromAccount === toAccount) {
            throw new Error('Two different accounts are required');
          }
        },
      );

      await transferFundsPage.fillAmount(amount);
      await transferFundsPage.selectFromAccount(fromAccount);
      await transferFundsPage.selectToAccount(toAccount);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferSuccessful(amount);

      await findTransactionsPage.open();
      await findTransactionsPage.selectAccount(fromAccount);
    },
  );

  test('Find transferred money by amount', async ({ findTransactionsPage }) => {
    await allure.severity('critical');

    await findTransactionsPage.findByAmount(amount);
    await findTransactionsPage.assertTransactionResultsVisible();
    await findTransactionsPage.assertTransactionWithAmountVisible(amount);
  });

  test('Find transaction by ID', async ({ findTransactionsPage }) => {
    await allure.severity('critical');

    await findTransactionsPage.findByAmount(amount);
    await findTransactionsPage.assertTransactionResultsVisible();

    const transactionId = await findTransactionsPage.getFirstTransactionId();

    await findTransactionsPage.open();
    await findTransactionsPage.findByTransactionId(transactionId);

    await findTransactionsPage.assertTransactionResultsVisible();
    await findTransactionsPage.assertTransactionWithAmountVisible(amount);
  });

  test('Find transaction by date', async ({ findTransactionsPage }) => {
    await allure.severity('normal');

    await findTransactionsPage.findByAmount(amount);
    await findTransactionsPage.assertTransactionResultsVisible();

    const transactionDate =
      await findTransactionsPage.getFirstTransactionDate();

    await findTransactionsPage.open();
    await findTransactionsPage.findByDate(transactionDate);

    await findTransactionsPage.assertTransactionResultsVisible();
    await findTransactionsPage.assertTransactionWithAmountVisible(amount);
  });

  test('Find transactions by date range', async ({ findTransactionsPage }) => {
    await allure.severity('normal');

    await findTransactionsPage.findByAmount(amount);
    await findTransactionsPage.assertTransactionResultsVisible();

    const transactionDate =
      await findTransactionsPage.getFirstTransactionDate();

    await findTransactionsPage.open();
    await findTransactionsPage.findByDateRange(
      transactionDate,
      transactionDate,
    );

    await findTransactionsPage.assertTransactionResultsVisible();
    await findTransactionsPage.assertTransactionWithAmountVisible(amount);
  });
});
