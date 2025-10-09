// src/common/ui/pages/requestLoanPage.js
import { testStep, expect } from '../../helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async navigate() {
    await testStep('Navigate to Request Loan page', async () => {
      await this.page.click('a[href*="requestloan.htm"]');
    }, this.userId);
  }

  async fillLoanForm({ amount, downPayment, fromAccount }) {
    await testStep('Fill loan form', async () => {
      // Normalize and validate inputs
      amount = amount != null ? String(amount) : '';
      downPayment = downPayment != null ? String(downPayment) : '';
      fromAccount = fromAccount || '';

      await this.page.fill('input[name="amount"]', amount);
      await this.page.fill('input[name="downPayment"]', downPayment);
      await this.page.selectOption('select[name="fromAccountId"]', fromAccount);
    }, this.userId);
  }

  async submit() {
    await testStep('Submit loan request', async () => {
      await this.page.click('input[value="Apply Now"]');
    }, this.userId);
  }

  async assertLoanResult() {
    await testStep('Verify loan request result', async () => {
      await expect(this.page.locator('#loanStatus')).toBeVisible();
    }, this.userId);
  }
}
