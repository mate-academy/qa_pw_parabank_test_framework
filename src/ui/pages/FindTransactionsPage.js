import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountSelect = page.locator('#accountId');
    this.transactionIdField = page.locator('#criteria\\.transactionId');
    this.findByTransactionIdButton = page.locator('#findById');
    this.dateField = page.locator('#criteria\\.onDate');
    this.findByDateButton = page.locator('#findByDate');
    this.fromDateField = page.locator('#criteria\\.fromDate');
    this.toDateField = page.locator('#criteria\\.toDate');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.amountField = page.locator('#criteria\\.amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.transactionTable = page.locator('#transactionTable');
    this.noResultsMessage = page.getByText('No Transaction Results Found');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Find Transactions' page`, async () => {
      await this.page.goto('findtrans.htm');
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select account '${accountId}'`, async () => {
      await this.accountSelect.selectOption(String(accountId));
    });
  }

  async fillTransactionIdField(transactionId) {
    await this.step(`Fill the 'Transaction ID' field`, async () => {
      await this.transactionIdField.fill(String(transactionId));
    });
  }

  async clickFindByTransactionIdButton() {
    await this.step(`Click the 'Find by Transaction ID' button`, async () => {
      await this.findByTransactionIdButton.click();
    });
  }

  async fillDateField(date) {
    await this.step(`Fill the 'Date' field with '${date}'`, async () => {
      await this.dateField.fill(date);
    });
  }

  async clickFindByDateButton() {
    await this.step(`Click the 'Find by Date' button`, async () => {
      await this.findByDateButton.click();
    });
  }

  async fillFromDateField(date) {
    await this.step(`Fill the 'From Date' field with '${date}'`, async () => {
      await this.fromDateField.fill(date);
    });
  }

  async fillToDateField(date) {
    await this.step(`Fill the 'To Date' field with '${date}'`, async () => {
      await this.toDateField.fill(date);
    });
  }

  async clickFindByDateRangeButton() {
    await this.step(`Click the 'Find by Date Range' button`, async () => {
      await this.findByDateRangeButton.click();
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field with '${amount}'`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async clickFindByAmountButton() {
    await this.step(`Click the 'Find by Amount' button`, async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionTableVisible() {
    await this.step(`Assert transaction results table is visible`, async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }

  async assertNoTransactionResultsFound() {
    await this.step(`Assert 'No Transaction Results Found' message is visible`, async () => {
      await expect(this.noResultsMessage).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
