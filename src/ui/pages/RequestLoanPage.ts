import { Page } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę Request Loan
  async openPage() {
    await this.page.click('a[href="requestloan.htm"]');
    await this.page.waitForURL('**/requestloan.htm', { timeout: 10000 });
  }

  // Złóż wniosek o pożyczkę
  async requestLoan(amount: string, downPayment: string, fromAccount: string) {
    await this.page.fill('input[name="amount"]', amount);
    await this.page.fill('input[name="downPayment"]', downPayment);

    // Wybierz konto z listy
    await this.page.selectOption('select[name="fromAccountId"]', fromAccount);

    // Kliknij przycisk Apply Now
    await this.page.click('input[value="Apply Now"]');
  }

  // Weryfikacja komunikatu sukcesu
  async verifyLoanApproval() {
    await this.page.waitForSelector('text=Loan Approved', { timeout: 10000 });
  }
}
