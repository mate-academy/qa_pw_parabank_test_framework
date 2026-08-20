import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountSelect = page.locator('#accountId');
    this.amountField = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');

    this.resultTitle = page.locator('#resultContainer h1.title');
    this.resultRows = page.locator('#transactionBody tr');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async selectAccount(accountId) {
    await this.step(`Select account '${accountId}'`, async () => {
      await this.accountSelect.selectOption({ label: accountId });
    });
  }

  async findByAmount(accountId, amount) {
    await this.selectAccount(accountId);
    await this.step(
      `Fill the 'Find by Amount' field with '${amount}'`,
      async () => {
        await this.amountField.fill(amount);
      },
    );
    await this.step(`Click the 'Find Transactions' button`, async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionFound() {
    await this.step(`Assert at least one transaction was found`, async () => {
      await expect(this.resultTitle).toHaveText('Transaction Results');
      await expect(this.resultRows).not.toHaveCount(0);
    });
  }
}
