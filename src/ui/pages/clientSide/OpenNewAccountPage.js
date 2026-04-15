import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class OpenAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.pageTitle          = page.locator('#openAccountForm h1.title');
    this.accountTypeSelect  = page.locator('#type').first();
    this.existingAccountSelect  = page.locator('#fromAccountId').first();
    this.openAccountButton  = page.getByRole('button', { name: 'Open New Account' });
    this.accountCreatedTitle = page.locator('#openAccountResult h1.title');
    this.accountCreatedMessage = page.locator('#openAccountResult p').first();
    this.newAccountId = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto(`/parabank/openaccount.htm`);
    });
  }

  async getNewAccountId() {
    return await this.step(`Get new account ID`, async () => {
      await expect(this.newAccountId).not.toBeEmpty();
      return await this.newAccountId.textContent();
    });
  }
  async assertPageTitleIsVisible() {
    await this.step(`Assert 'Open New Account' title is visible`, async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.pageTitle).toHaveText('Open New Account');
    });
  }

  async selectAccountType(type) {
    await this.step(`Select account type '${type}'`, async () => {
      await this.accountTypeSelect.selectOption({ label: type });
    });
  }

  async selectExistingAccount(accountId) {
    await this.step(`Select source account '${accountId}'`, async () => {
      await this.existingAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click the 'Open New Account' button`, async () => {
      await this.openAccountButton.click();
    });
  }

  async clickNewAccountDetailsLink(accountId) {
    await this.step(`Click the 'New Account Details' link`, async () => {
      await this.page.getByRole('link', { name: accountId }).click();
    });
  }

  async assertAccountTypeOptions() {
    await this.step(`Assert account type options are 'CHECKING' and 'SAVINGS'`, async () => {
      await expect(this.accountTypeSelect.locator('option[value="0"]')).toHaveText('CHECKING');
      await expect(this.accountTypeSelect.locator('option[value="1"]')).toHaveText('SAVINGS');
    });
  }

  async assertExistingAccountIsVisible(accountId) {
    await this.step(`Assert source account '${accountId}' is present`, async () => {
      await expect(
        this.existingAccountSelect.locator(`option[value="${accountId}"]`)
      ).toBeAttached();
    });
  }
  async assertAccountCreatedMessageIsVisible(messageText) {
    await this.step(`Assert 'Account Created' message is visible`, async () => {
      await expect(this.accountCreatedMessage).toBeVisible();
      await expect(this.accountCreatedMessage).toHaveText(messageText);
    });
  }
  async assertNewAccountOpenTitleIsVisible(titleText) {
    await this.step(`Assert 'New Account Open' title is visible`, async () => {
      await expect(this.accountCreatedTitle).toBeVisible();
      await expect(this.accountCreatedTitle).toHaveText(titleText);
    });
  }
}