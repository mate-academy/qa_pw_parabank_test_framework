import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.findTransactionsLink = page.getByRole('link', {
      name: 'Find Transactions',
    });

    this.findTransactionsTitle = page.getByRole('heading', {
      name: 'Find Transactions',
    });

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

    this.transactionResultsTitle = page.getByRole('heading', {
      name: 'Transaction Results',
    });

    this.transactionTable = page.locator('#transactionTable');
    this.transactionRows = page.locator('#transactionBody tr');
    this.transactionLinks = page.locator(
      '#transactionBody a[href*="transaction.htm?id="]',
    );

    this.transactionDates = page.locator('#transactionBody tr td:first-child');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickFindTransactionsLink() {
    await this.step(`Click 'Find Transactions' link`, async () => {
      await this.findTransactionsLink.click();
    });
  }

  async assertFindTransactionsTitleIsVisible() {
    await this.step(`Assert 'Find Transactions' title is visible`, async () => {
      await expect(this.findTransactionsTitle).toBeVisible();
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select account '${accountId}'`, async () => {
      await this.accountSelect.selectOption(String(accountId));
    });
  }

  async assertAccountIsAvailable() {
    await this.step(`Assert account is available`, async () => {
      await expect(this.accountSelect).toBeVisible();
      await expect(this.accountSelect.locator('option')).not.toHaveCount(0);
    });
  }

  async fillTransactionIdInput(transactionId) {
    await this.step(`Fill transaction ID '${transactionId}'`, async () => {
      await this.transactionIdInput.fill(String(transactionId));
    });
  }

  async clickFindByIdButton() {
    await this.step(`Click 'Find Transactions' by ID button`, async () => {
      await this.findByIdButton.click();
    });
  }

  async fillTransactionDateInput(date) {
    await this.step(`Fill transaction date '${date}'`, async () => {
      await this.transactionDateInput.fill(date);
    });
  }

  async clickFindByDateButton() {
    await this.step(`Click 'Find Transactions' by date button`, async () => {
      await this.findByDateButton.click();
    });
  }

  async fillFromDateInput(date) {
    await this.step(`Fill from date '${date}'`, async () => {
      await this.fromDateInput.fill(date);
    });
  }

  async fillToDateInput(date) {
    await this.step(`Fill to date '${date}'`, async () => {
      await this.toDateInput.fill(date);
    });
  }

  async clickFindByDateRangeButton() {
    await this.step(
      `Click 'Find Transactions' by date range button`,
      async () => {
        await this.findByDateRangeButton.click();
      },
    );
  }

  async fillAmountInput(amount) {
    await this.step(`Fill amount '${amount}'`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async clickFindByAmountButton() {
    await this.step(`Click 'Find Transactions' by amount button`, async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionResultsTitleIsVisible() {
    await this.step(
      `Assert 'Transaction Results' title is visible`,
      async () => {
        await expect(this.transactionResultsTitle).toBeVisible();
      },
    );
  }

  async assertTransactionTableIsVisible() {
    await this.step(`Assert transaction table is visible`, async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }

  async assertTransactionIsPresent() {
    await this.step(`Assert transaction is present`, async () => {
      await expect(this.transactionRows.first()).toBeVisible();
    });
  }

  async assertTransactionIdErrorContainsText(message) {
    await this.step(`Assert transaction ID error`, async () => {
      await expect(this.transactionIdError).toContainText(message);
    });
  }

  async assertTransactionDateErrorContainsText(message) {
    await this.step(`Assert transaction date error`, async () => {
      await expect(this.transactionDateError).toContainText(message);
    });
  }

  async assertDateRangeErrorContainsText(message) {
    await this.step(`Assert date range error`, async () => {
      await expect(this.dateRangeError).toContainText(message);
    });
  }

  async assertAmountErrorContainsText(message) {
    await this.step(`Assert amount error`, async () => {
      await expect(this.amountError).toContainText(message);
    });
  }

  async getFirstTransactionId() {
    return await this.step(`Get first transaction ID`, async () => {
      const href = await this.transactionLinks.first().getAttribute('href');

      return href.split('id=')[1];
    });
  }

  async getFirstTransactionDate() {
    return await this.step(`Get first transaction date`, async () => {
      return await this.transactionDates.first().textContent();
    });
  }
}
