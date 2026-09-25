import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class OpenNewAccountPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });
    this.accountTypeSelect = page.locator('#type');
    this.fundingAccountSelect = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.successHeading = page.getByRole('heading', {
      name: 'Account Opened!',
    });
    this.successMessage = page.getByText(
      'Congratulations, your account is now open.',
    );
    this.newAccountLink = page.locator('#newAccountId');
  }

  async open() {
    await this.step('Open the new account page', async () => {
      await this.openNewAccountLink.click();
    });
  }

  async createAccount(accountType) {
    await this.step(`Create a ${accountType} account`, async () => {
      await expect(this.fundingAccountSelect).toBeVisible();
      await expect(this.fundingAccountSelect).not.toHaveValue('');

      const fundingAccountId = await this.fundingAccountSelect.inputValue();

      await this.accountTypeSelect.selectOption({
        label: accountType,
      });
      await this.fundingAccountSelect.selectOption(fundingAccountId);
      await this.openAccountButton.click();
    });
  }

  async assertAccountWasOpened() {
    return await this.step(
      'Verify that the new account was opened',
      async () => {
        await expect(this.successHeading).toBeVisible();
        await expect(this.successMessage).toBeVisible();
        await expect(this.newAccountLink).toBeVisible();

        return (await this.newAccountLink.innerText()).trim();
      },
    );
  }

  async openCreatedAccountDetails() {
    await this.step('Open the created account details', async () => {
      await this.newAccountLink.click();
    });
  }
}
