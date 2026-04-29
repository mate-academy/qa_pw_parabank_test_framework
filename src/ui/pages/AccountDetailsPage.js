import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountDetails = page.locator('#accountDetails');
    this.transactionTable = page.locator('#transactionTable');
    this.activityPeriodSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.locator('input[value="Go"]');
    this.noTransactionsMessage = page.getByText('No transactions found.');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async selectActivityPeriod(period) {
    await this.step(`Select activity period '${period}'`, async () => {
      await this.activityPeriodSelect.selectOption(period);
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select transaction type '${type}'`, async () => {
      await this.transactionTypeSelect.selectOption(type);
    });
  }

  async clickGoButton() {
    await this.step(`Click the 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertAccountDetailsVisible() {
    await this.step(`Assert account details are visible`, async () => {
      await expect(this.accountDetails).toBeVisible();
    });
  }

  async assertTransactionTableVisible() {
    await this.step(`Assert transaction table is visible`, async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }

  async assertNoTransactionsFound() {
    await this.step(`Assert no transactions message is visible`, async () => {
      await expect(this.noTransactionsMessage).toBeVisible();
    });
  }
}
