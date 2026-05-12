import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanRequestProcessed = page.getByText('Loan Request Processed');
    this.loanApproved = page.getByText('Congratulations, your loan has been approved.');
    this.loanDenied = page.getByText('We cannot currently approve your loan.');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Request Loan' page`, async () => {
      await this.page.goto('requestloan.htm');
    });
  }

  async fillLoanAmountField(amount) {
    await this.step(`Fill the 'Loan Amount' field with '${amount}'`, async () => {
      await this.loanAmountField.fill(String(amount));
    });
  }

  async fillDownPaymentField(amount) {
    await this.step(`Fill the 'Down Payment' field with '${amount}'`, async () => {
      await this.downPaymentField.fill(String(amount));
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click the 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertLoanRequestProcessed() {
    await this.step(`Assert loan request was processed`, async () => {
      await expect(this.loanRequestProcessed).toBeVisible();
    });
  }

  async assertLoanApproved() {
    await this.step(`Assert loan was approved`, async () => {
      await expect(this.loanApproved).toBeVisible();
    });
  }

  async assertLoanDenied() {
    await this.step(`Assert loan was denied`, async () => {
      await expect(this.loanDenied).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
