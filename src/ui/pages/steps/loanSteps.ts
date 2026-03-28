import { Page } from '@playwright/test';
import { RequestLoanPage } from '../loans/RequestLoanPage';

export async function requestLoan(
  page: Page,
  loanPage: RequestLoanPage,
  data: { amount: number; downPayment: number },
) {
  await loanPage.open();
  await loanPage.amount.fill(data.amount.toString());
  await loanPage.downPayment.fill(data.downPayment.toString());
  await loanPage.accountFrom.waitFor({ state: 'visible' });
  await page.waitForFunction(
    () => document.querySelector('#fromAccountId')?.childElementCount > 0,
  );
  await loanPage.accountFrom.selectOption({ index: 0 });
  await loanPage.applyBtn.click();
}
