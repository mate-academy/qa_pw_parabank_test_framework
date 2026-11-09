import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.selectFromAccount = page.locator('#fromAccountId');
    this.selectToAccount = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.messageTransferComplete = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillAmountField(amount = '100') {
    await this.step(`Fill amount field: ${amount}`, async () => {
      await this.amountField.fill(String(amount));
    });
  }
  async clickSelectFromAccount() {
    await this.step(`Select from account`, async () => {
      await this.selectFromAccount.selectOption({ index: 0 });
    });
  }
  async clickSelectToAccount() {
    await this.step(`Select To account`, async () => {
      await this.selectToAccount.selectOption({ index: 1 });
    });
  }
  async clickTransferButton() {
    await this.step(`Click Transfer button`, async () => {
      await this.transferButton.click();
    });
  }
  async assertMessageTransferComplete() {
    await this.step(` Assert mesage transfer complete`, async () => {
      await expect(this.messageTransferComplete).toBeVisible();
    });
  }
}
