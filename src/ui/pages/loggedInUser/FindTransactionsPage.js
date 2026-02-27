import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class FindTransactionsPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.findByAmountTransactionButton = page.locator('#findByAmount');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async clickFindByAmountTransactionButton() {
    await this.step(`Click the 'Find By Amount transaction' button`, async () => {
      await this.findByAmountTransactionButton.click();
    });
  }

  getTransactionTo(firstName, lastName) {
    return this.page.getByRole('cell', {
      name: `Bill Payment to ${firstName} ${lastName}`,
    });
  }

  async assertBillTransactionIsVisible(firstName, lastName) {
    await this.step(`Assert bill transaction is visible`, async () => {
      await expect(this.getTransactionTo(firstName, lastName)).toBeVisible();
    });
  }

}