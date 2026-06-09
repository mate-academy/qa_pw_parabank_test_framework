import { testStep } from '../../../common/helpers/pwHelpers';
import { expect } from '@playwright/test';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.applyForLoanButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanStatus = page.locator('#loanStatus');
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

 async fillAmountField(amount) {
    await this.step(`Fill 'Amount' field with ${amount} value`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async fillDownPaymentField(amount) {
    await this.step(`Fill 'Down Payment' field 
    with ${amount} value`, async () => {
      await this.downPaymentField.fill(amount);
    });
  }

  async clickApplyForLoanButton() {
    await this.step(`Click on 'Apply for Loan' button`, async () => {
      await this.applyForLoanButton.click();
    });
  }

  async assertLoanStatus(status) {
    await this.step(`Assert that loan status is ${status}`, async () => {
      await expect(this.loanStatus).toHaveText(status);
    });
  }
}
