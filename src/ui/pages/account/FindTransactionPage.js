import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class FindTransactionPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.transID = page.locator('#transactionId');
    this.accountID = page.locator('#accountId');
    this.transDate = page.locator('#transactionDate');
    this.from = page.locator('#fromDate');
    this.to = page.locator('#toDate');
    this.amount = page.locator('#amount');
    this.findById = page.locator('#findById');
    this.findByDate = page.locator('#findByDate');
    this.findByDateRange = page.locator('#findByDateRange');
    this.findByAmount = page.locator('#findByAmount');

    this.transactionLinks = page.getByRole('link', {
      name: /Funds Transfer/,
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async enterTransactionId(value) {
    await this.step(`Fill the 'transactionId' field`, async () => {
      await this.transID.fill(value);
    });
  }
  async enterTransactionDate(value) {
    await this.step(`Fill the 'transactionDate' field`, async () => {
      await this.transDate.fill(value);
    });
  }
  async enterTransactionDateRange(value) {
    await this.step(`Fill the 'transactionDateRange' field`, async () => {
      await this.from.fill(value);
      await this.to.fill(value);
    });
  }
  async enterTransactionAmount(value) {
    await this.step(`Fill the 'transactionAmount' field`, async () => {
      await this.amount.fill(String(value));
    });
  }

  async clickLastTransaction() {
    await this.step('Click the last transaction', async () => {
      await this.transactionLinks.first().click();
    });
  }

  async clickFindTransactionsById() {
    await this.findById.click();
  }
  async clickFindTransactionsByDate() {
    await this.findByDate.click();
  }
  async clickFindTransactionsByDateRange() {
    await this.findByDateRange.click();
  }
  async clickFindTransactionsByAmount() {
    await this.findByAmount.click();
  }
}
