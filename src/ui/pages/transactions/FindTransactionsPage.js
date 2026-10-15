import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.findTransactionsLink = page.getByRole('link', {
      name: 'Find Transactions',
    });

    this.findTransactionsHeading = page.getByRole('heading', {
      name: 'Find Transactions',
    });

    this.accountSelect = page.locator('#accountId');

    this.transactionIdField = page.locator('#transactionId');
    this.transactionDateField = page.locator('#transactionDate');
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.amountField = page.locator('#amount');

    this.findByIdButton = page.locator('#findById');
    this.findByDateButton = page.locator('#findByDate');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.findByAmountButton = page.locator('#findByAmount');

    this.resultsHeading = page.getByRole('heading', {
      name: 'Transaction Results',
    });

    this.transactionsTable = page.locator('#transactionTable');
    this.errorMessages = page.locator('#rightPanel .error');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Find Transactions page', async () => {
      await this.findTransactionsLink.click();

      await expect(this.findTransactionsHeading).toBeVisible();
      await expect(this.accountSelect).toBeVisible();
    });
  }

  async selectFirstAccount() {
    await this.step('Select first account', async () => {
      await expect(this.accountSelect.locator('option').first()).toBeAttached();

      await this.accountSelect.selectOption({ index: 0 });
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select account: ${accountId}`, async () => {
      await expect
        .poll(
          async () => {
            return await this.accountSelect
              .locator(`option[value="${accountId}"]`)
              .count();
          },
          {
            message: `Wait for account ${accountId} in Find Transactions`,
            timeout: 15000,
          },
        )
        .toBeGreaterThan(0);

      await this.accountSelect.selectOption(String(accountId));

      await expect(this.accountSelect).toHaveValue(String(accountId));
    });
  }

  async findByTransactionId(transactionId) {
    await this.step(`Find transaction by ID: ${transactionId}`, async () => {
      await this.transactionIdField.fill(String(transactionId));
      await this.findByIdButton.click();
    });
  }

  async findByDate(date) {
    await this.step(`Find transactions by date: ${date}`, async () => {
      await this.transactionDateField.fill(date);
      await this.findByDateButton.click();
    });
  }

  async findByDateRange(fromDate, toDate) {
    await this.step(
      `Find transactions from ${fromDate} to ${toDate}`,
      async () => {
        await this.fromDateField.fill(fromDate);
        await this.toDateField.fill(toDate);
        await this.findByDateRangeButton.click();
      },
    );
  }

  async findByAmount(amount) {
    await this.step(`Find transactions by amount: ${amount}`, async () => {
      await this.amountField.fill(String(amount));
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionResultsVisible() {
    await this.step('Assert transaction results are visible', async () => {
      await expect(this.resultsHeading).toBeVisible();
      await expect(this.transactionsTable).toBeVisible();
    });
  }

  async assertTransactionWithAmountVisible(amount) {
    await this.step(
      `Assert transaction with amount ${amount} is visible`,
      async () => {
        await expect(this.transactionsTable).toContainText(
          `$${Number(amount).toFixed(2)}`,
        );
      },
    );
  }

  async getFirstTransactionId() {
    return await this.step('Get first transaction ID', async () => {
      const transactionLink = this.transactionsTable.locator('tbody a').first();

      await expect(transactionLink).toBeVisible();

      const href = await transactionLink.getAttribute('href');

      const match = href?.match(/[?&]id=(\d+)/);

      if (!match) {
        throw new Error(`Cannot extract transaction ID from: ${href}`);
      }

      return match[1];
    });
  }

  async getFirstTransactionDate() {
    return await this.step('Get first transaction date', async () => {
      const firstRow = this.transactionsTable.locator('tbody tr').first();

      await expect(firstRow).toBeVisible();

      const date = await firstRow.locator('td').first().innerText();

      return date.trim();
    });
  }
}
