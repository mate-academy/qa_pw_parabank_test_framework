import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import { formatCurrency } from '../../../common/helpers/currency';

const TRANSACTION_TABLE_HEADERS = ['Date', 'Transaction', 'Debit (-)', 'Credit (+)'];

function formatTransactionAmount(amount) {
  if (amount == null || amount === '') {
    return '';
  }

  return formatCurrency(amount);
}

export const TRANSACTION_TYPES = {
  all: { label: 'All', value: 'All' },
  credit: { label: 'Credit', value: 'Credit' },
  debit: { label: 'Debit', value: 'Debit' },
};

export class AccountDetailsActivityPage extends LoggedInPage {
  constructor(page, accountId, userId = 0) {
    super(page, userId);
    this.url = `activity.htm?id=${accountId}`;
    this.pageName = 'Account Details page';

    const accountDetails = this.page.locator('#accountDetails');
    this.accountDetails = {
      accountId: accountDetails.locator('#accountId'),
      accountType: accountDetails.locator('#accountType'),
      balance: accountDetails.locator('#balance'),
      availableBalance: accountDetails.locator('#availableBalance'),
    };

    const accountActivity = this.page.locator('#accountActivity');
    const activityForm = accountActivity.locator('#activityForm');
    const transactionTable = accountActivity.locator('#transactionTable');
    this.accountActivity = {
      activityPeriodSelect: activityForm.locator('#month'),
      transactionTypeSelect: activityForm.locator('#transactionType'),
      goButton: activityForm.getByRole('button', { name: 'Go', exact: true }),
      noTransactionsMessage: accountActivity.locator('#noTransactions'),
      transactionTable,
      transactionRows: transactionTable.locator('tbody tr'),
      transactionLinks: transactionTable.locator('tbody a'),
    };
  }

  async assertAccountDetailsVisible(account) {
    await this.step('Assert account details are visible', async () => {
      await expect(this.accountDetails.accountId).toHaveText(`${account.accountId}`);
      await expect(this.accountDetails.accountType).toHaveText(`${account.accountType.label}`);
      await expect(this.accountDetails.balance).toHaveText(formatCurrency(account.balance));
      await expect(this.accountDetails.availableBalance).toHaveText(
        formatCurrency(account.availableBalance),
      );
    });
  }

  async assertTransactions(transactions) {
    await this.step('Assert transaction table', async () => {
      const table = this.accountActivity.transactionTable;

      await expect(table.locator('thead th')).toHaveText(TRANSACTION_TABLE_HEADERS);
      await expect(this.accountActivity.transactionRows).toHaveCount(transactions.length);

      for (const [index, transaction] of transactions.entries()) {
        await expect(this.accountActivity.transactionRows.nth(index).locator('td')).toHaveText([
          transaction.date,
          transaction.name,
          formatTransactionAmount(transaction.debit),
          formatTransactionAmount(transaction.credit),
        ]);
      }
    });
  }

  async showActivity({ periodIndex = 0, transactionType = TRANSACTION_TYPES.all } = {}) {
    await this.step(
      `Show ${transactionType.label} activity for month option ${periodIndex}`,
      async () => {
        await this.accountActivity.activityPeriodSelect.selectOption({ index: periodIndex });
        await this.accountActivity.transactionTypeSelect.selectOption(transactionType.value);
        await this.accountActivity.goButton.click();
      },
    );
  }

  async assertNoTransactions() {
    await this.step('Assert no transactions found', async () => {
      await expect(this.accountActivity.noTransactionsMessage).toBeVisible();
      await expect(this.accountActivity.noTransactionsMessage).toHaveText('No transactions found.');
      await expect(this.accountActivity.transactionTable).toBeHidden();
    });
  }
}
