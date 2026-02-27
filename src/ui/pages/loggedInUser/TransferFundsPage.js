import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.amountField = page.locator('#amount');
    this.fromAccountId =page.locator('#fromAccountId');
    this.toAccountId = page.locator('#toAccountId');
    this.transferFundsButton = page.getByRole('button', { name: 'Transfer' });
    this.transferComplete = page.getByRole('heading', { name: 'Transfer Complete!' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickAccountsOverviewLink() {
    await this.step(`Click the 'Accounts Overview' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickTransferFundsLink() {
    await this.step(`Click the 'Transfer Funds' link`, async () => {
      await this.transferFundsLink.click();
    });
  }
  
  async fillRandomAmount() {
    return await this.step(`Fill the 'Amount' field with random value`, async () => {
      const amount = Math.floor(Math.random() * 100) + 1; 
      await this.amountField.fill(String(amount));
      return amount;
    });
  }

  async selectFromAccountIdOption(mainAccountNumber) {
    await this.step(`Select 'From Account Id' option`, async() => {
      await this.fromAccountId.selectOption({ value: String(mainAccountNumber) });
    });
  }

  async selectToAccountIdOption(secondAccountNumber) {
    await this.step(`Select 'To Account Id' option`, async() => {
      await this.toAccountId.selectOption({ value: String(secondAccountNumber) });
    });
  }

  async clickTransferFundsButton() {
    await this.step(`Click the 'Transfer Funds' button`, async () => {
      await this.transferFundsButton.click();
    });
  }


  async assertTransferCompleteIsVisible() {
    await this.step(`Assert the 'Transfer Complete' header is visible`, async () => {
      await expect(this.transferComplete).toBeVisible();
    });
  }

  
}