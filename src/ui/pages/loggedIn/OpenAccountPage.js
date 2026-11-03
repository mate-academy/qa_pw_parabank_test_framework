import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';

export const ACCOUNT_TYPES = {
  checking: { label: 'CHECKING', value: '0' },
  savings: { label: 'SAVINGS', value: '1' },
};

export class OpenAccountPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'openaccount.htm';
    this.pageName = 'Open Account page';

    const openAccountForm = this.page.locator('#openAccountForm');
    this.openAccountForm = {
      accountTypeSelect: openAccountForm.locator('#type'),
      fromAccountSelect: openAccountForm.locator('#fromAccountId'),
      openNewAccountButton: openAccountForm.getByRole('button', {
        name: 'Open New Account',
        exact: true,
      }),
    };

    const openAccountResult = this.page.locator('#openAccountResult');
    this.openAccountResult = {
      title: openAccountResult.getByRole('heading', {
        name: 'Account Opened!',
        exact: true,
      }),
      successMessage: openAccountResult.getByText(
        'Congratulations, your account is now open.',
        { exact: true },
      ),
      newAccountNumberLabel: openAccountResult.getByText('Your new account number:', {
        exact: true,
      }),
      newAccountLink: openAccountResult.locator('#newAccountId'),
    };
  }

  async selectAccountType(accountType) {
    await this.step(`Select ${accountType.label} account type`, async () => {
      await this.openAccountForm.accountTypeSelect.selectOption(accountType.value);
    });
  }

  async selectFromAccount(fromAccountId) {
    await this.step(
      fromAccountId
        ? `Select from account ${fromAccountId}`
        : 'Select the existing account',
      async () => {
        const fromAccountSelect = this.openAccountForm.fromAccountSelect;
        let accountId = fromAccountId;

        if (!accountId) {
          const firstOption = fromAccountSelect.locator('option').first();
          await firstOption.waitFor();
          accountId = await firstOption.getAttribute('value');
        }

        await fromAccountSelect.selectOption(accountId);
      },
    );
  }

  async waitForFromAccountSelectLoadOptions() {
    await this.step(`Wait for from account select to load options`, async () => {
      const options = this.openAccountForm.fromAccountSelect.locator('option');
      await expect(options).not.toHaveCount(0);
    });
  }

  async submitAccountForm() {
    await this.step(`Submit account form`, async () => {
      await this.waitForFromAccountSelectLoadOptions();
      await this.openAccountForm.openNewAccountButton.click();
    });
  }

  async assertAccountOpened() {
    await this.step(`Assert account opened`, async () => {
      await expect(this.openAccountResult.title).toBeVisible();
      await expect(this.openAccountResult.successMessage).toBeVisible();
      await expect(this.openAccountResult.newAccountNumberLabel).toBeVisible();
      await expect(this.openAccountResult.newAccountLink).toBeVisible();
    });
  }

  async getNewAccountId() {
    return await this.step('Read new account id', async () => {
      const accountId = await this.openAccountResult.newAccountLink.innerText();

      return accountId.trim();
    });
  }

  async clickNewAccountLink() {
    await this.step(`Click new account link`, async () => {
      await this.openAccountResult.newAccountLink.click();
    });
  }
}
