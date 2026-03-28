import { Page, Locator, expect } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly downPaymentInput: Locator;
  readonly accountFrom: Locator;
  readonly applyButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.accountFrom = page.locator('#fromAccountId');
    this.applyButton = page.locator('input[value="Apply Now"]');
    this.successMessage = page.locator('h1:has-text("Loan Request Processed")');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/requestloan.htm');
  }

  async requestLoan(amount: string, downPayment: string): Promise<void> {
    await this.amountInput.fill(amount);
    await this.downPaymentInput.fill(downPayment);
    await this.page.waitForFunction(
      () => document.querySelector('#fromAccountId')?.childElementCount > 0,
    );
    await this.accountFrom.selectOption({ index: 0 });
    await this.applyButton.click();
  }

  async assertLoanApproved(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}
