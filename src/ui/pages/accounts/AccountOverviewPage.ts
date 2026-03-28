import { Page, Locator } from '@playwright/test';

export class AccountOverviewPage {
  readonly page: Page;
  readonly accountsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsTable = page.locator('#accountTable');
  }

  async open() {
    await this.page.goto('/parabank/overview.htm');
  }
}
