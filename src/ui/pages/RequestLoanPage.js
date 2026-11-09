import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountfield = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountField = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.messageLoanApproved = page.getByText('Congratulations, your loan');
    this.messageLoanNotApproved = page.getByText('We cannot grant a loan in');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillLoanAmountField(amount = '100') {
    await this.step(`Fill loan amount: ${amount}`, async () => {
      await this.loanAmountfield.fill(String(amount));
    });
  }
  async fillDownPaymentField() {
    await this.step(`Fill down payment field`, async () => {
      await this.downPaymentField.fill('50');
    });
  }
  async selectFromAccount() {
    await this.step(`Select account number`, async () => {
      await this.fromAccountField.selectOption({ index: 0 });
    });
  }
  async clickApplyNowButton() {
    await this.step(`Click Apply now button`, async () => {
      await this.applyNowButton.click();
    });
  }
  async assertMesseLoanApproved() {
    await this.step(`Assert Loan Approved message visible`, async () => {
      await expect(this.messageLoanApproved).toBeVisible();
    });
  }
  async assertMesseLoanNotApproved() {
    await this.step(`Assert Loan not Approved message visible`, async () => {
      await expect(this.messageLoanNotApproved).toBeVisible();
    });
  }
}
