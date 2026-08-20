import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.amountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });

    this.loanStatus = page.locator('#loanStatus');
    this.deniedMessage = page.locator('#loanRequestDenied p.error');
    this.approvedMessage = page.locator('#loanRequestApproved p').first();
    this.newAccountIdLink = page.locator('#newAccountId');

    this.errorTitle = page.locator('#requestLoanError h1.title');
    this.errorMessage = page.locator('#requestLoanError p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillAmountField(value) {
    await this.step(`Fill the 'Amount' field with '${value}'`, async () => {
      await this.amountField.fill(value);
    });
  }

  async fillDownPaymentField(value) {
    await this.step(
      `Fill the 'Down Payment' field with '${value}'`,
      async () => {
        await this.downPaymentField.fill(value);
      },
    );
  }

  async selectFromAccount(accountId) {
    await this.step(`Select '${accountId}' as the 'From' account`, async () => {
      await this.fromAccountSelect.selectOption({ label: accountId });
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click the 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async requestLoan(amount, downPayment, fromAccountId) {
    await this.fillAmountField(amount);
    await this.fillDownPaymentField(downPayment);
    await this.selectFromAccount(fromAccountId);
    await this.clickApplyNowButton();
  }

  async assertLoanApproved() {
    await this.step(`Assert the loan was approved`, async () => {
      await expect(this.loanStatus).toHaveText('Approved');

      await expect(this.approvedMessage).toBeVisible();
    });
  }

  async assertLoanDenied(
    message = 'You do not have sufficient funds for the given down payment.',
  ) {
    await this.step(`Assert the loan was denied`, async () => {
      await expect(this.loanStatus).toHaveText('Denied');

      await expect(this.deniedMessage).toHaveText(message);
    });
  }

  async getNewAccountId() {
    return await this.step(`Get the new account id`, async () => {
      return await this.newAccountIdLink.innerText();
    });
  }

  async assertErrorMessage(
    message = 'An internal error has occurred and has been logged.',
  ) {
    await this.step(`Assert the error message is '${message}'`, async () => {
      await expect(this.errorTitle).toHaveText('Error!');
      await expect(this.errorMessage).toHaveText(message);
    });
  }
}
