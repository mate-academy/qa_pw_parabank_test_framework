import { expect, testStep } from '../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.newAccountId = page.locator('#newAccountId');
    this.successTitle = page.getByText('Account Opened!');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto('openaccount.htm');
    });
  }

  async selectAccountType(type) {
    await this.step(`Select account type '${type}'`, async () => {
      await this.accountTypeSelect.selectOption(type);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click the 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async getNewAccountId() {
    return (await this.newAccountId.textContent()).trim();
  }

  async assertAccountOpened() {
    await this.step(`Assert new account was opened successfully`, async () => {
      await expect(this.successTitle).toBeVisible();
      await expect(this.newAccountId).toBeVisible();
    });
  }
}
