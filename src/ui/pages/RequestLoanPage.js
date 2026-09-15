import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountDropdown = page.locator('#fromAccountId');

    this.applyNowButton = page.getByRole('button', {
      name: 'Apply Now',
    });
    this.loanStatus = page.locator('#loanStatus');
    this.newAccountNumber = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToRequestLoan() {
    await this.step('Go to Request Loan', async () => {
      await this.page.goto('requestloan.htm');
    });
  }

  async fillLoanAmount(amount) {
    await this.step(`Fill loan amount: ${amount}`, async () => {
      await this.loanAmountField.fill(amount);
    });
  }

  async fillDownPayment(amount) {
    await this.step(`Fill down payment: ${amount}`, async () => {
      await this.downPaymentField.fill(amount);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From account: ${accountNumber}`, async () => {
      await this.fromAccountDropdown.selectOption(accountNumber);
    });
  }

  async clickApplyNow() {
    await this.step('Click Apply Now button', async () => {
      await this.applyNowButton.click();
    });
  }

  async verifyLoanApproved() {
    await this.step('Verify loan was approved', async () => {
      await expect(this.loanStatus).toHaveText('Approved');
      await expect(this.newAccountNumber).toBeVisible();
    });
  }

  async clickNewAccountNumber() {
    await this.step('Click new account number', async () => {
      await this.newAccountNumber.click();
    });
  }

  async verifyLoanDenied() {
    await this.step('Verify loan was denied', async () => {
      await expect(this.loanStatus).toHaveText('Denied');
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify loan error message', async () => {
      await expect(
        this.page
          .locator('.error:visible')
          .filter({ hasText: message })
          .first(),
      ).toBeVisible();
    });
  }
}
