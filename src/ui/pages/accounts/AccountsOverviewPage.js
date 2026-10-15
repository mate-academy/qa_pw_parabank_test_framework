import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountsOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
    });

    this.accountsTable = page.locator('#accountTable');

    this.accountRows = page.locator('#accountTable tbody tr');

    this.accountLinks = page.locator('#accountTable a');

    this.totalBalance = page
      .locator('#accountTable tbody tr')
      .filter({ hasText: 'Total' });
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Accounts Overview page', async () => {
      await this.page.goto('/parabank/overview.htm');
    });
  }

  async assertAccountsOverviewVisible() {
    await this.step('Assert Accounts Overview is visible', async () => {
      await expect(this.accountsOverviewHeading).toBeVisible();
      await expect(this.accountsTable).toBeVisible();
    });
  }

  async assertAccountExists() {
    await this.step('Assert at least one account exists', async () => {
      await expect(this.accountLinks.first()).toBeVisible();
    });
  }

  async assertTotalBalanceVisible() {
    await this.step('Assert total balance is visible', async () => {
      await expect(this.totalBalance).toBeVisible();
      await expect(this.totalBalance).toContainText('Total');
    });
  }

  async openFirstAccount() {
    await this.step('Open first account', async () => {
      await this.accountLinks.first().click();
    });
  }
}
