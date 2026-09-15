import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountDropdown = page.locator('#accountId');
    this.transactionIdField = page.locator('#transactionId');
    this.transactionDateField = page.locator('#transactionDate');
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.amountField = page.locator('#amount');

    this.transactionIdError = page.locator('#transactionIdError');
    this.transactionDateError = page.locator('#transactionDateError');
    this.dateRangeError = page.locator('#dateRangeError');
    this.amountError = page.locator('#amountError');

    this.findTransactionsButton = index =>
      page.getByRole('button', { name: 'Find Transactions' }).nth(index);
    this.firstTransaction = page.locator('#transactionTable tbody a').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToFindTransactions() {
    await this.step('Go to Find Transactions', async () => {
      await this.page.goto('findtrans.htm');
    });
  }

  async selectAccount(accountNumber) {
    await this.step(`Select account: ${accountNumber}`, async () => {
      await this.accountDropdown.selectOption(accountNumber);
    });
  }
  /* 
await findTransactionsPage.findTransactions(0); Id
await findTransactionsPage.findTransactions(1); Date
await findTransactionsPage.findTransactions(2); DateRange
await findTransactionsPage.findTransactions(3); Amount
  */
  async clickFindTransactions(index) {
    await this.step(
      `Click Find Transactions button at index: ${index}`,
      async () => {
        await this.findTransactionsButton(index).click();
      },
    );
  }

  async fillTransactionId(transactionId) {
    await this.step('Fill Transaction ID', async () => {
      await this.transactionIdField.fill(transactionId);
    });
  }

  async fillTransactionDate(date) {
    await this.step('Fill transaction date', async () => {
      await this.transactionDateField.fill(date);
    });
  }

  async fillFromDate(date) {
    await this.step('Fill from date', async () => {
      await this.fromDateField.fill(date);
    });
  }

  async fillToDate(date) {
    await this.step('Fill to date', async () => {
      await this.toDateField.fill(date);
    });
  }

  async fillTransactionAmount(amount) {
    await this.step(`Fill transaction amount: ${amount}`, async () => {
      await this.amountField.fill(amount.replace('$', '').replace('.00', ''));
    });
  }

  async fillSearchFields(fields) {
    for (const [field, value] of Object.entries(fields)) {
      await this.step(`Fill ${field}: "${value}"`, async () => {
        await this[field].fill(value);
      });
    }
  }

  async verifyFieldErrorMessage(errorField, message) {
    await this.step(`Verify ${errorField}: "${message}"`, async () => {
      await expect(this[errorField]).toHaveText(message);
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(
        this.page
          .locator('.error:visible')
          .filter({ hasText: message })
          .first(),
      ).toBeVisible();
    });
  }

  async clickFirstTransaction() {
    await this.step('Click first transaction', async () => {
      await this.firstTransaction.click();
    });
  }
}
