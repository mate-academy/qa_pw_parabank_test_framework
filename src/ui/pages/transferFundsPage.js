import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.transferButton = page.getByRole('button', {name: 'Transfer'});
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.successfulMessage = page.locator('#showResult h1').first();
    this.transferLink = page.getByRole('link', {name: 'Transfer Funds'});
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async gotoTransferFundsPage() {
    await this.step(`go to transfer funds page`, async () => {
      await this.transferLink.click();
    });
  }

  async fillAmountField(value) {
    await this.step(`fill amount field`, async () => {
      await this.amountField.fill(value.toString());
    });
  }

  async selectOptionFromAccountDropdown() {
    await this.step(`select first option from account dropdown`, async () => {
      const option = await this.fromAccountDropdown.locator('option').nth(0).getAttribute('value');
      this.fromAccount = option;
      await this.fromAccountDropdown.selectOption(option);
    });
  }

  async selectOptionToAccountDropdown() {
    await this.step(`select second option from account dropdown`, async () => {
      const option = await this.toAccountDropdown.locator('option').nth(1).getAttribute('value');
      this.toAccount = option;
      await this.toAccountDropdown.selectOption(option);
    });
  }


  async clickTransferButton() {
    await this.step(`click transfer button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertSuccessfulMessage() {
    await this.step('Assert successful transfer message', async () => {
      await expect(this.successfulMessage).toContainText('Transfer Complete!');
    });
  }

}
