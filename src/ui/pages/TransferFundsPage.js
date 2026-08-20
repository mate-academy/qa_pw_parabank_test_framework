import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.amountField = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });

    this.successTitle = page.locator('#showResult h1.title');
    this.resultAmount = page.locator('#amountResult');
    this.resultFromAccount = page.locator('#fromAccountIdResult');
    this.resultToAccount = page.locator('#toAccountIdResult');

    this.errorTitle = page.locator('#showError h1.title');
    this.errorMessage = page.locator('#showError p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillAmountField(value) {
    await this.step(`Fill the 'Amount' field with '${value}'`, async () => {
      await this.amountField.fill(value);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select '${accountId}' as the 'From' account`, async () => {
      await this.fromAccountSelect.selectOption({ label: accountId });
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select '${accountId}' as the 'To' account`, async () => {
      await this.toAccountSelect.selectOption({ label: accountId });
    });
  }

  async clickTransferButton() {
    await this.step(`Click the 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async transferFunds(amount, fromAccountId, toAccountId) {
    await this.fillAmountField(amount);
    await this.selectFromAccount(fromAccountId);
    await this.selectToAccount(toAccountId);
    await this.clickTransferButton();
  }

  async assertTransferSuccessful(amount, fromAccountId, toAccountId) {
    await this.step(`Assert the transfer completed successfully`, async () => {
      await expect(this.successTitle).toHaveText('Transfer Complete!');
      await expect(this.resultAmount).toHaveText(amount);
      await expect(this.resultFromAccount).toHaveText(fromAccountId);
      await expect(this.resultToAccount).toHaveText(toAccountId);
    });
  }

  async assertErrorMessage(
    message = 'An internal error has occurred and has been logged.',
  ) {
    await this.step(`Assert the error message is '${message}'`, async () => {
      await expect(this.errorTitle).toHaveText('Error!');
      await expect(this.errorMessage).toHaveText(message);
    });
  }
}
