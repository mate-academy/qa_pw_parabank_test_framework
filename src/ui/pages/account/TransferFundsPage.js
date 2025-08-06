import { testStep, expect } from '../../../common/helpers/pwHelpers';
import { ERROR_TITLE } from '../../constants/authMessages';
import { TRANSFER_COMPLETE } from '../../constants/accountActions';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    // Fields
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    // Buttons
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    // Transfer Funds result
    this.transferFormErrorTitle = page.locator('#showError h1');
    this.transferFormErrorSubtitle = page.locator('#showError .error');
    this.transferFormCompleteTitle = page.locator('#showResult h1');
    this.transferFormCompleteSubtitle = page.locator('#showResult p').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('parabank/transfer.htm');
    });
  }

  async waitForFormLoading() {
    await this.step(`Wait untill Transfer Form is loaded`, async () => {
      await this.toAccountSelect
        .locator('option')
        .first()
        .waitFor({ state: 'attached' });
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From Account - ${accountNumber}`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber.toString());
    });
  }

  async selectToAccount(accountNumber) {
    await this.step(`Select To Account - ${accountNumber}`, async () => {
      await this.toAccountSelect.selectOption(accountNumber.toString());
    });
  }

  async fillTransferAmount(amount) {
    await this.step(
      `Fill the 'Transfer Amount' field - ${amount}`,
      async () => {
        await this.amountInput.fill(amount.toString());
      },
    );
  }

  async clickTransferButton() {
    await this.step(`Click on the 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async submitTransferFundsForm(amount, fromAccount, toAccount) {
    await this.step(`Submit 'Transfer' form`, async () => {
      await this.waitForFormLoading();
      await this.fillTransferAmount(amount);
      if (fromAccount) await this.selectFromAccount(fromAccount);
      if (toAccount) await this.selectToAccount(toAccount);
      await this.clickTransferButton();
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert 'Transfer Funds' error is shown`, async () => {
      await this.transferFormErrorTitle.waitFor({ state: 'visible' });
      await expect(this.transferFormErrorTitle).toHaveText(ERROR_TITLE);
      await expect(this.transferFormErrorSubtitle).toHaveText(message);
    });
  }

  async assertTransferConfirmationMessage(amount, fromAccount, toAccount) {
    await this.step(`Check successful Transfer Amount message`, async () => {
      await expect(this.transferFormCompleteTitle).toHaveText(
        TRANSFER_COMPLETE,
      );
      const transferedText = `#${fromAccount} to account #${toAccount}`;
      await expect(this.transferFormCompleteSubtitle).toContainText(
        transferedText,
      );
      await expect(this.transferFormCompleteSubtitle).toContainText(
        amount.toString(),
      );
    });
  }
}
