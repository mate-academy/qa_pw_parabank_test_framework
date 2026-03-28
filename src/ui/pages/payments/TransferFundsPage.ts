import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly amountInput: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.amountInput = page.locator('#amount');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successMessage = page.locator('h1:has-text("Transfer Complete")');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/transfer.htm');
  }

  async selectFromAccount(index: number): Promise<void> {
    await this.page.waitForFunction(
      () => document.querySelector('#fromAccountId')?.childElementCount > 0,
    );
    await this.fromAccount.selectOption({ index });
  }

  async selectToAccount(index: number): Promise<void> {
    await this.toAccount.selectOption({ index });
  }

  async fillAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  async clickTransfer(): Promise<void> {
    await this.transferButton.click();
  }

  async assertTransferSuccessful(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}
