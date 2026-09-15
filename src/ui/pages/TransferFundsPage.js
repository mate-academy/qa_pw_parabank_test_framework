import { expect, testStep } from '../../common/helpers/pwHelpers';
import { formatAmountToCurrency } from '../../common/helpers/stringHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.transferAmountResult = page.locator('#amountResult');
    this.fromAccountResult = page.locator('#fromAccountIdResult');
    this.toAccountResult = page.locator('#toAccountIdResult');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToTransferFunds() {
    await this.step('Go to Transfer Funds', async () => {
      await this.page.goto('transfer.htm');
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill transfer amount: ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From Account: ${accountNumber}`, async () => {
      await this.fromAccountDropdown.selectOption(accountNumber);
    });
  }

  async selectToAccount(accountNumber) {
    await this.step(`Select To Account: ${accountNumber}`, async () => {
      await this.toAccountDropdown.selectOption(accountNumber);
    });
  }

  async clickTransfer() {
    await this.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  async verifyTransferComplete(amount, fromAccount, toAccount) {
    await this.step('Verify transfer is complete', async () => {
      await expect(this.transferAmountResult).toHaveText(
        formatAmountToCurrency(amount),
      );
      await expect(this.fromAccountResult).toHaveText(fromAccount);
      await expect(this.toAccountResult).toHaveText(toAccount);
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify transfer error message', async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
