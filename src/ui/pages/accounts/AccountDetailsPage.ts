import { Page, Locator, expect } from '@playwright/test';

export class AccountDetailsPage {
  readonly page: Page;
  readonly filterTypeSelect: Locator;
  readonly filterButton: Locator;
  readonly transactionRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterTypeSelect = page.locator('#transactionType');
    this.filterButton = page.locator('button#filter');
    this.transactionRows = page.locator('table#transactions tr');
  }

  async open(accountId: string): Promise<void> {
    await this.page.goto(`/parabank/accountdetails.htm`);
  }

  async filterByType(type: string): Promise<void> {
    await this.filterTypeSelect.selectOption(type);
    await this.filterButton.click();
  }

  async assertTransactionVisible(): Promise<void> {
    await expect(this.transactionRows.first()).toBeVisible();
  }
}
