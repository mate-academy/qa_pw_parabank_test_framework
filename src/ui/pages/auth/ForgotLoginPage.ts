import { Page, Locator } from '@playwright/test';

export class ForgotLoginPage {
  readonly page: Page;
  readonly ssnField: Locator;
  readonly findButton: Locator;
  readonly resultTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ssnField = page.locator('#ssn');
    this.findButton = page.locator('input[value="Find My Login Info"]');
    this.resultTable = page.locator('table');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/lookup.htm');
  }

  async fillSsn(ssn: string): Promise<void> {
    await this.ssnField.fill(ssn);
  }

  async clickFindButton(): Promise<void> {
    await this.findButton.click();
  }

  async assertResultIsVisible(): Promise<void> {
    await this.resultTable.waitFor();
  }
}
