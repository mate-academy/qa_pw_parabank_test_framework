import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class NewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeDropdown = page.locator('#type');
    this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.newAccountMessage = page.getByText('Congratulations, your account is now open.');
    this.accountNumberDropdown = page.locator('#fromAccountId');
    
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "New Account" page`, async () => {
      await this.page.goto('/parabank/openaccount.htm');
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type: ${accountType}`, async () => {
      await this.accountTypeDropdown.selectOption(accountType);
    });
  }

  async selectAvailableAccount() {
  await this.step(`Select an available account`, async () => {
    await this.accountNumberDropdown.selectOption({ index: 0 });
  });
}

  async clickOpenNewAccountButton() {
    await this.step(`Click "Open New Account" button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertNewAccountIsCreated() {
    await this.step(`Assert new account is created`, async () => {
      await expect(this.newAccountMessage).toBeVisible();
    });
  }

  async getNewAccountNumber() {
     return await this.step(`Get new account number`, async () => {
       return await this.page.locator('#newAccountId').textContent();
     });
   }
}