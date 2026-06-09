import { testStep } from '../../../common/helpers/pwHelpers';
import { expect } from '@playwright/test';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountId = page.locator('#fromAccountId');
    this.toAccountIdDropdown = page.locator('#toAccountId');
    this.transferFundsButton = page.getByRole('button', { name: 'Transfer' });
    this.transferResult = page.locator('#showResult');
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountId() {
    return await this.fromAccountId.inputValue();
  }

  async fillAmountField(amount) {
    await this.step(`Fill amount field with value ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async clickTransferFundsButton() {
    await this.step(`Click on 'Transfer Funds' button`, async () => {
      await this.transferFundsButton.click();
    });
  }

  async selectToAccountId(accountId) {
    await this.step(
      `Select to account 
ID ${accountId} from dropdown`,
      async () => {
        await this.toAccountIdDropdown
          .locator('option')
          .first()
          .waitFor({ state: 'attached' });
        await this.toAccountIdDropdown.selectOption(accountId);
      },
    );
  }

  async assertTransferResult(fromAccountId, toAccountId, amount) {
    await this.step(
      `Assert that transfer result 
      contains correct from account, to account and amount`,
      async () => {
        await expect(this.transferResult).toContainText('Transfer Complete!');
        await expect(this.transferResult).toContainText(
          `$${amount} has been transferred from 
          account #${fromAccountId} to account #${toAccountId}.`,
        );
      },
    );
  }
}