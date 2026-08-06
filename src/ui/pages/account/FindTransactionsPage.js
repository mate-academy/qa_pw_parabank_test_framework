import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import { ACCOUNT_ACCESS_DENIED_ERROR } from '../../../common/constants/account/accountMessages';

export class FindTransactionsPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Find Transactions' });
    this.accountSelect = page.locator('#accountId');
    this.transactionIdInput = page.locator('#transactionId');
    this.transactionIdError = page.locator('#transactionIdError');
    this.findByIdButton = page.locator('#findById');
    this.transactionDateInput = page.locator('#transactionDate');
    this.transactionDateError = page.locator('#transactionDateError');
    this.findByDateButton = page.locator('#findByDate');
    this.fromDateInput = page.locator('#fromDate');
    this.toDateInput = page.locator('#toDate');
    this.dateRangeError = page.locator('#dateRangeError');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.amountInput = page.locator('#amount');
    this.amountError = page.locator('#amountError');
    this.findByAmountButton = page.locator('#findByAmount');
    this.resultsHeading = page.getByRole('heading', {
      name: 'Transaction Results',
    });
    this.transactionRows = page.locator('#transactionBody tr');
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.errorText = page.getByText(ACCOUNT_ACCESS_DENIED_ERROR);
  }

  transactionRow(description, amount) {
    const row = this.transactionRows.filter({ hasText: description });

    if (amount === undefined) {
      return row;
    }

    return row.filter({ hasText: `$${Number(amount).toFixed(2)}` });
  }

  async open() {
    await this.step('Open Find Transactions page', async () => {
      await this.page.goto('/parabank/findtrans.htm');
    });
  }

  async selectAccount(accountNumber) {
    await this.step(`Select account "${accountNumber}"`, async () => {
      await this.accountSelect.selectOption(accountNumber);
    });
  }

  async fillTransactionId(value) {
    await this.step(`Fill Transaction ID with "${value}"`, async () => {
      await this.transactionIdInput.fill(String(value));
    });
  }

  async clickFindByIdButton() {
    await this.step('Click Find Transactions (by ID) button', async () => {
      await this.findByIdButton.click();
    });
  }

  async fillTransactionDate(value) {
    await this.step(`Fill Date with "${value}"`, async () => {
      await this.transactionDateInput.fill(value);
    });
  }

  async clickFindByDateButton() {
    await this.step('Click Find Transactions (by Date) button', async () => {
      await this.findByDateButton.click();
    });
  }

  async fillFromDate(value) {
    await this.step(`Fill From Date with "${value}"`, async () => {
      await this.fromDateInput.fill(value);
    });
  }

  async fillToDate(value) {
    await this.step(`Fill To Date with "${value}"`, async () => {
      await this.toDateInput.fill(value);
    });
  }

  async clickFindByDateRangeButton() {
    await this.step(
      'Click Find Transactions (by Date Range) button',
      async () => {
        await this.findByDateRangeButton.click();
      },
    );
  }

  async fillAmount(value) {
    await this.step(`Fill Amount with "${value}"`, async () => {
      await this.amountInput.fill(String(value));
    });
  }

  async clickFindByAmountButton() {
    await this.step('Click Find Transactions (by Amount) button', async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Find Transactions page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertResultsShown() {
    await this.step('Assert transaction results are shown', async () => {
      await expect(this.resultsHeading).toBeVisible();
    });
  }

  async assertTransactionCount(count) {
    await this.step(`Assert ${count} transaction(s) found`, async () => {
      await expect(this.transactionRows).toHaveCount(count);
    });
  }

  async assertTransactionVisible(description, amount, type, date) {
    const formattedAmount = `$${Number(amount).toFixed(2)}`;

    await this.step(
      `Assert transaction "${description}" (${type} ${formattedAmount}, ${date}) is visible`,
      async () => {
        const row = this.transactionRow(description, amount);

        await expect(row).toBeVisible();
        await expect(row.locator('td').nth(0)).toHaveText(date);
        await expect(row.locator('a')).toHaveAttribute(
          'href',
          /\/parabank\/transaction\.htm\?id=\d+/,
        );

        const debitCell = row.locator('td').nth(2);
        const creditCell = row.locator('td').nth(3);

        if (type === 'Debit') {
          await expect(debitCell).toHaveText(formattedAmount);
          await expect(creditCell).toHaveText('');
        } else {
          await expect(debitCell).toHaveText('');
          await expect(creditCell).toHaveText(formattedAmount);
        }
      },
    );
  }

  async getTransactionId(description, amount) {
    return this.step(
      `Read transaction ID for "${description}" (${amount})`,
      async () => {
        const href = await this.transactionRow(description, amount)
          .locator('a')
          .getAttribute('href');

        return href.match(/id=(\d+)/)[1];
      },
    );
  }

  async assertTransactionNotVisible(description, amount) {
    const formattedAmount = `$${Number(amount).toFixed(2)}`;

    await this.step(
      `Assert transaction "${description}" (${formattedAmount}) is not visible`,
      async () => {
        await expect(this.transactionRow(description, amount)).toHaveCount(0);
      },
    );
  }

  async assertFieldError(fieldError, message) {
    await this.step(`Assert field error "${message}"`, async () => {
      await expect(fieldError).toHaveText(message);
    });
  }

  async assertErrorShown() {
    await this.step('Assert generic error is shown', async () => {
      await expect(this.errorHeading).toBeVisible();
      await expect(this.errorText).toBeVisible();
    });
  }
}
