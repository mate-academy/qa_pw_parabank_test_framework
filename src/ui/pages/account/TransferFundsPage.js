import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.transferFundsHeading = page.getByRole('heading', {
      name: 'Transfer Funds',
    });

    this.amount = page.getByRole('textbox');

    this.fromAccount = page.locator('#fromAccountId');

    this.toAccount = page.locator('#toAccountId');

    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
    });

    this.transferCompleteMessage = page.getByText('Transfer Complete!');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillAmount(amount) {
    await this.amount.fill(String(amount));
  }

  async selectFirstFromAccount() {
    await this.fromAccount.selectOption({
      index: 0,
    });
  }

  async selectFirstToAccount() {
    await this.toAccount.selectOption({
      index: 0,
    });
  }

  async clickTransfer() {
    await this.transferButton.click();
  }

  async assertTransferFundsPageIsVisible() {
    await expect(this.transferFundsHeading).toBeVisible();
  }

  async assertTransferCompleteMessageIsVisible() {
    await expect(this.transferCompleteMessage).toBeVisible();
  }
}
