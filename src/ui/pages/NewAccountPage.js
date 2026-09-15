import { expect, testStep } from '../../common/helpers/pwHelpers';

export class NewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeDropdown = page.locator('#type');
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.newAccountNumber = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToOpenNewAccount() {
    await this.step('Go to Open New Account', async () => {
      await this.page.goto('openaccount.htm');
    });
  }

  async selectAccountType(type) {
    await this.step(`Select account type: ${type}`, async () => {
      await this.accountTypeDropdown.selectOption(type);
    });
  }

  async clickOpenNewAccount() {
    await this.step('Click Open New Account button', async () => {
      await this.openNewAccountButton.click();
    });
  }

  async getNewAccountNumber() {
    return await this.step('Get new account number', async () => {
      await expect(this.newAccountNumber).toBeVisible();

      const accountNumber = await this.newAccountNumber.textContent();

      return accountNumber.trim();
    });
  }

  async verifyAccountCreated() {
    await this.step('Verify account was created successfully', async () => {
      await expect(this.newAccountNumber).toBeVisible();
    });
  }

  async clickNewAccountNumber() {
    await this.step('Click new account number', async () => {
      await this.newAccountNumber.click();
    });
  }
}
