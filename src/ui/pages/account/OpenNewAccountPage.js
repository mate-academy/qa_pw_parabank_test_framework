import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import { OPEN_ACCOUNT_SUCCESS_MESSAGE } from '../../../common/constants/account/accountMessages';

export const ACCOUNT_TYPE = {
  CHECKING: '0',
  SAVINGS: '1',
};

export class OpenNewAccountPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Open New Account' });
    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.successHeading = page.getByRole('heading', {
      name: 'Account Opened!',
    });
    this.successText = page.getByText(OPEN_ACCOUNT_SUCCESS_MESSAGE);
    this.newAccountNumber = page.locator('#newAccountId');
  }

  async open() {
    await this.step('Open "Open New Account" page', async () => {
      await this.page.goto('/parabank/openaccount.htm');
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type "${accountType}"`, async () => {
      await this.accountTypeSelect.selectOption(accountType);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select funding account "${accountNumber}"`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step('Click Open New Account button', async () => {
      await this.openAccountButton.click();
    });
  }

  async getNewAccountNumber() {
    return this.step('Read the new account number', async () => {
      return this.newAccountNumber.textContent();
    });
  }

  async assertOpened() {
    await this.step('Assert Open New Account page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertAccountOpened() {
    await this.step('Assert new account was opened successfully', async () => {
      await expect(this.successHeading).toBeVisible();
      await expect(this.successText).toBeVisible();
    });
  }
}
