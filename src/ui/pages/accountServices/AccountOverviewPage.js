import { testStep } from '../../../common/helpers/pwHelpers';
import { expect } from '@playwright/test';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountOverviewPanel = page.locator('#overviewAccountsApp');
    this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.firstAccountLink = page.locator('#accountTable tbody a').first();
    this.activityPeriodSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.locator('input[value="Go"]');
    this.transactionTable = page.locator('#transactionTable');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountOverviewPanelVisible() {
    await this.step(`Assert that overview panel is visible`, async () => {
      await expect(this.accountOverviewPanel).toBeVisible();
    });
  }

  async assertAccountIdValue(id) {
    await this.step(`Assert account ID value is ${id}`, async () => {
      await expect(this.accountId).toHaveText(id);
    });
  }

  async assertAccountType(type) {
    await this.step(`Assert account type is ${type}`, async () => {
      await expect(this.accountType).toHaveText(type);
    });
  }

  async getFirstAccountId() {
    return (await this.firstAccountLink.textContent()).trim();
  }

  async clickFirstAccountLink() {
    await this.step('Click on first account link', async () => {
      await this.firstAccountLink.click();
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select transaction type '${type}'`, async () => {
      await this.transactionTypeSelect.selectOption(type);
    });
  }

  async clickGoButton() {
    await this.step(`Click on 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertTransactionTableVisible() {
    await this.step(`Assert transaction table is visible`, async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }
}
