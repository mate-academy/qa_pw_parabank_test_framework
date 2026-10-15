import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });

    this.openNewAccountHeading = page.getByRole('heading', {
      name: 'Open New Account',
    });

    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');

    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });

    this.accountOpenedHeading = page.getByRole('heading', {
      name: 'Account Opened!',
    });

    this.newAccountId = page.locator('#newAccountId');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open New Account page', async () => {
      await this.openNewAccountLink.click();
      await expect(this.openNewAccountHeading).toBeVisible();
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type: ${accountType}`, async () => {
      await this.accountTypeSelect.selectOption({
        label: accountType,
      });
    });
  }

  async selectFirstSourceAccount() {
    await this.step('Select first source account', async () => {
      await expect(
        this.fromAccountSelect.locator('option').first(),
      ).toBeAttached();

      await this.fromAccountSelect.selectOption({
        index: 0,
      });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step('Click Open New Account button', async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertAccountOpenedSuccessfully() {
    await this.step('Assert new account was opened', async () => {
      await expect(this.accountOpenedHeading).toBeVisible();
      await expect(this.newAccountId).toBeVisible();
      await expect(this.newAccountId).not.toBeEmpty();
    });
  }

  async openCreatedAccount() {
    await this.step('Open created account details', async () => {
      await this.newAccountId.click();
    });
  }
}
