import { Page, expect } from '@playwright/test';
import { TransferFundsPage } from '../payments/TransferFundsPage';

export async function transferFunds(
  page: Page,
  transferPage: TransferFundsPage,
  amount: number,
) {
  await transferPage.open();
  await page.waitForFunction(
    () => document.querySelector('#fromAccountId')?.childElementCount > 0,
  );
  await transferPage.fromAccount.selectOption({ index: 0 });
  await transferPage.toAccount.selectOption({ index: 1 });
  await transferPage.amountInput.fill(amount.toString());
  await transferPage.transferBtn.click();
}
