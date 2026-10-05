import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.amountResult = page.locator('#amountResult');
    this.fromAccountIdResult = page.locator('#fromAccountIdResult');
    this.toAccountIdResult = page.locator('#toAccountIdResult');
    this.successMessage = page.getByRole('heading', { name: 'Transfer Complete!' });
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "Transfer Funds" page`, async () => {
      await this.page.goto('/parabank/transfer.htm');
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select from account: ${accountNumber}`, async () => {
      await this.fromAccountDropdown.selectOption(accountNumber);
    });
  }

  async selectToAccount(accountNumber) {
    await this.step(`Select to account: ${accountNumber}`, async () => {
      await this.toAccountDropdown.selectOption(accountNumber);
    });
  }

  async clickTransferButton() {
    await this.step(`Click "Transfer" button`, async () => {
      await this.transferButton.click();
    });
  }
 
  async assertTransferSuccessMessageIsShown() {
    await this.step(`Assert transfer success message is shown`, async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }
  async assertCorrectTransfer(expectedAmount, expectedFromAccount, expectedToAccount) {
  await this.step(`Assert correct transfer`, async () => {
    await expect(this.amountResult).toHaveText(expectedAmount);
    await expect(this.fromAccountIdResult).toHaveText(expectedFromAccount);
    await expect(this.toAccountIdResult).toHaveText(expectedToAccount);
  });
}

async getFromAccountNumber() {
  return await this.step('Get from account number', async () => {
    return await this.fromAccountDropdown.locator('option').nth(0).textContent();
  });
}

async getToAccountNumber() {
  return await this.step('Get to account number', async () => {
    return await this.toAccountDropdown.locator('option').nth(1).textContent();
  });
}
}