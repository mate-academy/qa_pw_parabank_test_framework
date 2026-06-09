import { testStep } from '../../../common/helpers/pwHelpers';

export class OpenAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.openAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.newAccountId = page.locator('#newAccountId');
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountOption = page.locator('#fromAccountId option').first();
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountNumber() {
    await this.newAccountId.waitFor({ state: 'visible' });
    return (await this.newAccountId.textContent()).trim();
  }

  async waitForAccountOptions() {
    await this.fromAccountOption.waitFor({ state: 'attached' });
  }

  async open() {
    await this.step('Open Open Account page', async () => {
      await this.page.goto('/parabank/openaccount.htm');
    });
  }

  async selectAccountType(type) {
    await this.step(`Select ${type} account`, async () => {
      await this.accountTypeDropdown.selectOption(type);
    });
  }

  async clickOpenAccountButton() {
    await this.step(`Click on 'Open New Account' button`, async () => {
      await this.openAccountButton.click();
    });
  }

  async clickAccountIdLink() {
    await this.step('Click on Account Id link', async () => {
      await this.newAccountId.click();
    });
  }
}
