import { testStep, expect } from '../../common/helpers/pwHelpers';

export class OpenNewAcountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.pageTitle = page.getByRole('heading', { name: 'Open New Account' });
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openButton = page.getByRole('button', { name: 'Open New Account' });
    this.successMessage = page.getByRole('heading', {
      name: 'Account Opened!',
    });
    this.congratulationsText = page.getByText('Congratulations, your account');
    this.newAccountLink = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageTitleIsVisible() {
    await this.step(
      'Checking the visibility of "Open New Account"',
      async () => {
        await expect(this.pageTitle).toBeVisible();
      },
    );
  }

  async selectAccountType(type) {
    await this.step(`Select account type: ${type}`, async () => {
      await this.accountTypeDropdown.selectOption({
        label: type.toUpperCase(),
      });
    });
  }

  async selectFromAccount() {
    await this.step('Select source account', async () => {
      await this.fromAccountDropdown.selectOption({ index: 0 });
    });
  }

  async clickOpenAccountButton() {
    await this.step('Click "Open New Account" button', async () => {
      await this.openButton.click();
    });
  }

  async assertSuccessfulAccountCreation() {
    await this.step(
      'Checking success message and new account details',
      async () => {
        await expect(this.successMessage).toBeVisible();
        await expect(this.congratulationsText).toBeVisible();
        await expect(this.newAccountLink).toBeVisible();
      },
    );
  }

  async openNewAccount(type = 'checking') {
    await this.step(`Open new ${type} account prerequisite`, async () => {
      await this.selectAccountType(type);
      await this.selectFromAccount();
      await this.clickOpenAccountButton();
      await this.assertSuccessfulAccountCreation();
    });
  }
}
