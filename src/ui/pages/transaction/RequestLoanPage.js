import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.amountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountIdDropdown = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.requestLoanErrorMessage = page.locator('#requestLoanError .error');
    this.requestLoanDeniedMessage = page.locator('#loanRequestDenied .error');
    this.requestLoanApprovedMessage = page
      .locator('#loanRequestApproved p')
      .first();
    this.newAccountIdLink = page.locator('#newAccountId');
    this.loanStatus = page.locator('#loanStatus');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Request Loan' page`, async () => {
      await this.page.goto('requestloan.htm');
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill 'Amount' field with '${amount}'`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async fillDownPaymentField(downPayment) {
    await this.step(
      `Fill 'Down Payment' field with '${downPayment}'`,
      async () => {
        await this.downPaymentField.fill(downPayment);
      },
    );
  }

  async selectFromAccountId(fromAccountId) {
    await this.step(`Select From Account Id='${fromAccountId}'`, async () => {
      await this.fromAccountIdDropdown.selectOption(fromAccountId);
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertNewAccountIdLinkIsVisible() {
    await this.step(`Assert new Account ID link is visible`, async () => {
      await expect(this.newAccountIdLink).toBeVisible();
    });
  }

  async assertLoanApproved() {
    await this.step(`Assert Loan is approved`, async () => {
      await expect(this.loanStatus).toHaveText('Approved');
    });
  }

  async assertLoanDenied() {
    await this.step(`Assert Loan is denied`, async () => {
      await expect(this.loanStatus).toHaveText('Denied');
    });
  }

  async assertLoanStatus(loanStatus) {
    await this.step(`Assert 'Loan Status' is ${loanStatus}`, async () => {
      await expect(this.loanStatus).toHaveText(loanStatus);
    });
  }

  async assertRequestLoanApprovedHasText(messageText) {
    await this.step(
      `Assert 'Request Loan Result' shows '${messageText}' approval message`,
      async () => {
        await expect(this.requestLoanApprovedMessage).toHaveText(messageText);
      },
    );
  }

  async assertRequestLoanDeniedHasText(messageText) {
    await this.step(
      `Assert 'Request Loan Result' shows '${messageText}' denial message`,
      async () => {
        await expect(this.requestLoanDeniedMessage).toHaveText(messageText);
      },
    );
  }

  async assertRequestLoanErrorHasText(messageText) {
    await this.step(
      `Assert 'Request Loan Result' shows '${messageText}' error`,
      async () => {
        await expect(this.requestLoanErrorMessage).toHaveText(messageText);
      },
    );
  }
}
