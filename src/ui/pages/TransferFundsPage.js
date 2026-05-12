import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.successTitle = page.getByText('Transfer Complete!');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('transfer.htm');
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field with '${amount}'`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account '${accountId}'`, async () => {
      await this.fromAccountSelect.selectOption(String(accountId));
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select to account '${accountId}'`, async () => {
      await this.toAccountSelect.selectOption(String(accountId));
    });
  }

  async clickTransferButton() {
    await this.step(`Click the 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertTransferComplete() {
    await this.step(`Assert transfer was completed successfully`, async () => {
      await expect(this.successTitle).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
