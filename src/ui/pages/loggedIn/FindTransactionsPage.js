import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import { FIND_TRANSACTIONS_ERROR_MESSAGES } from '../../../common/constants/errors';
import { formatCurrency } from '../../../common/helpers/currency';

const TRANSACTION_TABLE_HEADERS = ['Date', 'Transaction', 'Debit (-)', 'Credit (+)'];

function formatTransactionAmount(amount) {
  if (amount == null || amount === '') {
    return '';
  }

  return formatCurrency(amount);
}

export class FindTransactionsPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'findtrans.htm';
    this.pageName = 'Find Transactions page';

    const findTransactionsForm = this.page.locator('#transactionForm');
    this.findTransactionsForm = {
      root: findTransactionsForm,
      accountSelect: findTransactionsForm.locator('#accountId'),
      transactionIdField: findTransactionsForm.locator('#transactionId'),
      transactionIdError: findTransactionsForm.locator('#transactionIdError'),
      findByIdButton: findTransactionsForm.locator('#findById'),
      transactionDateField: findTransactionsForm.locator('#transactionDate'),
      transactionDateError: findTransactionsForm.locator(
        '#transactionDateError',
      ),
      findByDateButton: findTransactionsForm.locator('#findByDate'),
      fromDateField: findTransactionsForm.locator('#fromDate'),
      toDateField: findTransactionsForm.locator('#toDate'),
      dateRangeError: findTransactionsForm.locator('#dateRangeError'),
      findByDateRangeButton: findTransactionsForm.locator('#findByDateRange'),
      amountField: findTransactionsForm.locator('#amount'),
      amountError: findTransactionsForm.locator('#amountError'),
      findByAmountButton: findTransactionsForm.locator('#findByAmount'),
    };

    const transactionResults = this.page.locator('#resultContainer');
    this.transactionResults = {
      root: transactionResults,
      title: transactionResults.getByRole('heading', {
        name: 'Transaction Results',
        exact: true,
      }),
      transactionTable: transactionResults.locator('#transactionTable'),
      transactionRows: transactionResults.locator('#transactionBody tr'),
    };

    this.findTransactionsError = {
      root: this.page.locator('#errorContainer'),
    };
  }

  async selectAccount(accountId) {
    await this.open();
    await this.step('Wait for accounts to load', async () => {
      await expect
        .poll(() => this.findTransactionsForm.accountSelect.locator('option').count())
        .toBeGreaterThan(0);
    });
    await this.step(`Select account ${accountId}`, async () => {
      await this.findTransactionsForm.accountSelect.selectOption(String(accountId));
    });
  }

  async findByTransactionId(accountId, transactionId) {
    await this.selectAccount(accountId);
    await this.fillField(
      this.findTransactionsForm.transactionIdField,
      String(transactionId),
      'Transaction ID',
    );
    await this.click(this.findTransactionsForm.findByIdButton, 'Find by transaction ID');
  }

  async findByDate(accountId, date) {
    await this.selectAccount(accountId);
    await this.fillField(this.findTransactionsForm.transactionDateField, date, 'Transaction Date');
    await this.click(this.findTransactionsForm.findByDateButton, 'Find by date');
  }

  async findByDateRange(accountId, fromDate, toDate) {
    await this.selectAccount(accountId);
    await this.fillField(this.findTransactionsForm.fromDateField, fromDate, 'From Date');
    await this.fillField(this.findTransactionsForm.toDateField, toDate, 'To Date');
    await this.click(this.findTransactionsForm.findByDateRangeButton, 'Find by date range');
  }

  async findByAmount(accountId, amount) {
    await this.selectAccount(accountId);
    await this.fillField(this.findTransactionsForm.amountField, String(amount), 'Amount');
    await this.click(this.findTransactionsForm.findByAmountButton, 'Find by amount');
  }

  async assertTransactions(transactions) {
    await this.step('Assert found transactions', async () => {
      await expect(this.transactionResults.title).toBeVisible();
      await expect(this.transactionResults.transactionTable.locator('thead th')).toHaveText(
        TRANSACTION_TABLE_HEADERS,
      );
      await expect(this.transactionResults.transactionRows).toHaveCount(transactions.length);
      await expect(this.findTransactionsForm.root).toBeHidden();
      await expect(this.findTransactionsError.root).toBeHidden();

      for (const [index, transaction] of transactions.entries()) {
        await expect(this.transactionResults.transactionRows.nth(index).locator('td')).toHaveText([
          transaction.date,
          transaction.name,
          formatTransactionAmount(transaction.debit),
          formatTransactionAmount(transaction.credit),
        ]);
      }
    });
  }

  async assertCriteriaRejected(field) {
    await this.step('Assert search criteria were rejected', async () => {
      await expect(this.findTransactionsForm[field]).toHaveText(
        FIND_TRANSACTIONS_ERROR_MESSAGES[field],
      );
      await expect(this.findTransactionsForm.root).toBeVisible();
      await expect(this.transactionResults.root).toBeHidden();
      await expect(this.findTransactionsError.root).toBeHidden();
    });
  }
}
