import { testStep, expect } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.pageTitle = page.getByRole('heading', { name: 'Transfer Funds' });
    this.transferAmountField = page.locator('#amount');
    this.fromAccountList = page.locator('#fromAccountId');
    this.toAccountList = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.completeTransferText = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
    this.fromAccountResult = page.locator('#fromAccountIdResult');
    this.toAccountResult = page.locator('#toAccountIdResult');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageTitleIsVisible() {
    await this.step('Checking the visibility of "Transfer Funds"', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  async fillTransferAmount(amount) {
    await this.step(`Fill transfer amount: $${amount}`, async () => {
      await this.transferAmountField.fill(amount);
    });
  }

  async selectFromAccount(index = 0) {
    await this.step('Select source account from dropdown', async () => {
      await this.fromAccountList.selectOption({ index });
    });
  }

  async selectToAccount(index = 1) {
    await this.step('Select destination account from dropdown', async () => {
      await this.toAccountList.selectOption({ index });
    });
  }

  async clickTransferButton() {
    await this.step('Click "Transfer" button', async () => {
      await this.transferButton.click();
    });
  }

  async assertSuccessfulTransfer(amount) {
    await this.step(
      'Checking transfer complete message and account details',
      async () => {
        await expect(this.completeTransferText).toBeVisible();
        await expect(this.page.getByText(`$${amount}`)).toBeVisible();
        await expect(this.fromAccountResult).toBeVisible();
        await expect(this.toAccountResult).toBeVisible();
      },
    );
  }
}
