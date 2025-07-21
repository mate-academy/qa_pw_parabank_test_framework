import { expect, testStep } from '../../common/helpers/pwHelpers';

export class ApplyForLoanPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.requestLoanPage = page.getByRole('link', {name: 'Request Loan'});
    this.amountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.applyNowButton = page.getByRole('button', {name: 'Apply Now'});
    this.successfulMessage = page.locator('#loanRequestApproved p').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickRequestLoanButton() {
    await this.step(`go to request loan page`, async () => {
      await this.requestLoanPage.click();
    });
  }

  async fillLoanAmountField(value) {
    await this.step(`fill loan amount field`, async () => {
      await this.amountField.fill(value.toString());
    });
  }

  async fillDownPaymentField(value) {
    await this.step(`fill down payment field`, async () => {
      await this.downPaymentField.fill(value.toString());
    });
  }

  async clickApplyNowButton() {
    await this.step(`click apply now button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertSuccessfulMessage() {
    await this.step(`assert successful text`, async () => {
      await expect(this.successfulMessage).toContainText('Congratulations, your loan has been approved.');
    });
  }
}
