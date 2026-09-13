import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountType = page.locator('#type');
    this.accountID = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.accountOpened = page.getByRole('heading', { name: 'Account Opened!' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  get firstAvailableAccount() {
    return this.accountID.locator('option').first();
  }

  async selectFirstAvailableAccount() {
    await this.step('Select first available account', async () => {
      const accountId = await this.firstAvailableAccount.getAttribute('value');

      await this.accountID.selectOption({ value: accountId });
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type '${accountType}'`, async () => {
      await this.accountType.selectOption({ label: accountType });
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select account '${accountId}'`, async () => {
      await this.accountID.selectOption({ value: accountId });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click 'Open New Account' button`, async () => {
      await this.openAccountButton.click();
    });
  }

  async assertNewAccountsIsOpened() {
    await this.step(`Assert the 'New Account' is opened`, async () => {
      await expect(this.accountOpened).toBeVisible();
    });
  }
}
