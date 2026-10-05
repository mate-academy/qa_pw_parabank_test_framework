import { test } from '../../_fixtures/fixtures';
import { INVALID_TRANSACTION_ID, INVALID_DATE, INVALID_DATE_RANGE, INVALID_AMOUNT } from '../../../src/ui/constants/transactionErrors';
import { severity, Severity } from 'allure-js-commons';

test('Find Transactions shows error for invalid ID', async ({ 
  existingUser, 
  findTransactionsPage 
}) => {
  await severity(Severity.NORMAL);
  await findTransactionsPage.open();
  await findTransactionsPage.fillByTransactionIdField('invalid');
  await findTransactionsPage.clickFindTransactionsByIdButton();
  await findTransactionsPage.assertTransactionIdErrorIsShown(INVALID_TRANSACTION_ID);
});

test('Find Transactions shows error for invalid date', async ({ 
  existingUser, 
  findTransactionsPage 
}) => {
  await severity(Severity.NORMAL);
  await findTransactionsPage.open();
  await findTransactionsPage.fillByDateField('invalid');
  await findTransactionsPage.clickFindTransactionsByDateButton();
  await findTransactionsPage.assertTransactionDateErrorIsShown(INVALID_DATE);
});

test('Find Transactions shows error for invalid date range', async ({ 
  existingUser, 
  findTransactionsPage 
}) => {
  await severity(Severity.NORMAL);
  await findTransactionsPage.open();
  await findTransactionsPage.fillFromDateField('invalid');
  await findTransactionsPage.fillToDateField('invalid');
  await findTransactionsPage.clickFindTransactionsByDateRangeButton();
  await findTransactionsPage.assertTransactionDateRangeErrorIsShown(
    INVALID_DATE_RANGE
  );
});

test('Find Transactions shows error for invalid amount', async ({ 
  existingUser, 
  findTransactionsPage 
}) => {
  await severity(Severity.NORMAL);
  await findTransactionsPage.open();
  await findTransactionsPage.fillByAmountField('invalid');
  await findTransactionsPage.clickFindTransactionsByAmountButton();
  await findTransactionsPage.assertTransactionAmountErrorIsShown(
    INVALID_AMOUNT
  );
});