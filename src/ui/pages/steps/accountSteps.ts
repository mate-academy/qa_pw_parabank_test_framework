import { Page, Locator } from '@playwright/test';

export class AccountDetailsPage {
  page: Page;
  filterType: Locator;
  filterBtn: Locator;
  transactionRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterType = page.locator('#transactionType');
    this.filterBtn = page.locator('button#filter');
    this.transactionRows = page.locator('table#transactions tr');
  }

  async open() {
    await this.page.goto(
      'https://parabank.parasoft.com/parabank/accountdetails.htm',
    );
  }
}
