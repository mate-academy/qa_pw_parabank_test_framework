import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
  page: Page;
  accountType: Locator;
  openBtn: Locator;
  success: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountType = page.locator('#type');
    this.openBtn = page.locator('#openNewAccount');
    this.success = page.locator('.ng-scope');
  }

  async open() {
    await this.page.goto('/parabank/openaccount.htm');
  }
}
