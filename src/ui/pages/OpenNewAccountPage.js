import { expect, testStep } from '../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });

    this.successTitle = page.locator('#openAccountResult h1.title');
    this.newAccountIdLink = page.locator('#newAccountId');
    this.errorMessage = page.locator('#openAccountError');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async selectAccountType(type) {
    await this.step(`Select the '${type}' account type`, async () => {
      await this.accountTypeSelect.selectOption({ label: type });
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select the '${accountId}' source account`, async () => {
      await this.fromAccountSelect.selectOption({ label: accountId });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click the 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async openAccount(type, fromAccountId) {
    await this.selectAccountType(type);
    await this.selectFromAccount(fromAccountId);
    await this.clickOpenNewAccountButton();
  }

  async assertAccountOpenedSuccessfully() {
    await this.step(
      `Assert the new account was opened successfully`,
      async () => {
        await expect(this.successTitle).toHaveText('Account Opened!');
        await expect(this.newAccountIdLink).toBeVisible();
      },
    );
  }

  async getNewAccountId() {
    return await this.step(`Get the new account id`, async () => {
      return await this.newAccountIdLink.innerText();
    });
  }
}
