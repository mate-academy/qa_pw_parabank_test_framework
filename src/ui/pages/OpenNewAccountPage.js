import { expect, testStep } from '../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });

    this.openNewAccountTitle = page.getByRole('heading', {
      name: 'Open New Account',
    });

    this.accountTypeSelect = page.locator('#type');

    this.fromAccountSelect = page.locator('#fromAccountId');

    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });

    this.accountOpenedTitle = page.getByRole('heading', {
      name: 'Account Opened!',
    });

    this.successMessage = page.getByText(
      'Congratulations, your account is now open.',
    );

    this.newAccountId = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickOpenNewAccountLink() {
    await this.step(`Click 'Open New Account' link`, async () => {
      await this.openNewAccountLink.click();
    });
  }

  async assertOpenNewAccountTitleIsVisible() {
    await this.step(`Assert 'Open New Account' title is visible`, async () => {
      await expect(this.openNewAccountTitle).toBeVisible();
    });
  }

  async selectAccountType(type) {
    await this.step(`Select account type '${type}'`, async () => {
      await this.accountTypeSelect.selectOption({
        label: type,
      });
    });
  }

  async assertSourceAccountIsAvailable() {
    await this.step(`Assert source account is available`, async () => {
      await expect(this.fromAccountSelect).toBeVisible();
      await expect(this.fromAccountSelect.locator('option')).not.toHaveCount(0);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertAccountOpenedSuccessfully() {
    await this.step(`Assert account was opened successfully`, async () => {
      await expect(this.accountOpenedTitle).toBeVisible();
      await expect(this.successMessage).toBeVisible();
      await expect(this.newAccountId).toBeVisible();
    });
  }

  async clickNewAccountId() {
    await this.step(`Click new account number`, async () => {
      await this.newAccountId.click();
    });
  }

  async assertOpenNewAccountLinkIsVisible() {
    await this.step(`Assert 'Open New Account' link is visible`, async () => {
      await expect(this.openNewAccountLink).toBeVisible();
    });
  }
  async getNewAccountId() {
    return await this.step(`Get new account number`, async () => {
      return await this.newAccountId.textContent();
    });
  }
}
