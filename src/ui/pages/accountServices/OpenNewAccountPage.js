import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, OPEN_NEW_ACCOUNT_ERROR_MESSAGES } from '../../../constants/index.js';

export class OpenNewAccountPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    this.title = page.locator('#rightPanel h1.title').first();
    this.accountTypeDropdown = page.locator('[id="type"]');
    this.fromAccountIdDropdown = page.locator('[id="fromAccountId"]');
    this.openNewAccountButton = page.locator('input[value="Open New Account"]');
    this.successTitle = page.locator('#openAccountResult h1.title');
    this.newAccountIdLink = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Open New Account page`, async () => {
      await this.page.goto('/parabank/openaccount.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillAccountTypeDropdown(accountType) {
    await this.step(`Fill Account Type dropdown`, async () => {
      await this.accountTypeDropdown.selectOption(accountType);
    });
  }

  async fillFromAccountIdDropdown(fromAccountId) {
    await this.step(`Fill From Account ID dropdown`, async () => {
      await this.fromAccountIdDropdown.selectOption(fromAccountId);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click Open New Account button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.openNewAccountButton.click(),
      ]);
    });
  }

  async assertSuccessTitleContainsText() {
    const titleText = PAGE_TITLES.OPEN_NEW_ACCOUNT_SUCCESS;
    await this.step(`Assert the '${titleText}' title is shown`, async () => {
      await expect(this.successTitle).toContainText(titleText);
    });
  }

  async assertNewAccountIdLinkIsVisible() {
    await this.step(`Assert the New Account ID link is visible`, async () => {
      await expect(this.newAccountIdLink).toBeVisible();
    });
  }

  async getNewAccountId() {
    return await this.step('Get newly created Account ID', async () => {
      const id = await this.newAccountIdLink.innerText();
      return id.trim();
    });
  }

  async clickNewAccountIdLink() {
    await this.step('Click on the new account ID link', async () => {
      this.logger?.debug('Clicking new account ID link');
      await this.newAccountIdLink.click();
      await this.page.waitForLoadState('networkidle');
      this.logger?.debug('Navigated to account details');
    });
  }

  async assertAccountDetailsPageDisplayed(accountId) {
    await this.step('Assert Account Details page is displayed', async () => {
      this.logger?.debug('Checking Account Details page');
      const detailsTitle = this.page.locator('#rightPanel h1.title').first();
      const accountIdElement = this.page.locator('#accountId');
      
      await expect(detailsTitle).toContainText('Account Details');
      await expect(accountIdElement).toContainText(accountId);
      this.logger?.debug('Account Details page confirmed');
    });
  }
}