import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.requestLoanLink = page.getByRole('link', {
      name: 'Request Loan',
    });

    this.applyForLoanTitle = page.getByRole('heading', {
      name: 'Apply for a Loan',
    });

    this.loanAmountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');

    this.applyNowButton = page.getByRole('button', {
      name: 'Apply Now',
    });

    this.loanRequestProcessedTitle = page.getByRole('heading', {
      name: 'Loan Request Processed',
    });

    this.loanProviderName = page.locator('#loanProviderName');
    this.responseDate = page.locator('#responseDate');
    this.loanStatus = page.locator('#loanStatus');

    this.loanRequestApproved = page.locator('#loanRequestApproved');
    this.loanRequestDenied = page.locator('#loanRequestDenied');

    this.approvedMessage = page.getByText(
      'Congratulations, your loan has been approved.',
    );

    this.newAccountId = page.locator('#newAccountId');

    this.deniedMessage = page.locator('#loanRequestDenied p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickRequestLoanLink() {
    await this.step(`Click 'Request Loan' link`, async () => {
      await this.requestLoanLink.click();
    });
  }

  async assertApplyForLoanTitleIsVisible() {
    await this.step(`Assert 'Apply for a Loan' title is visible`, async () => {
      await expect(this.applyForLoanTitle).toBeVisible();
    });
  }

  async fillLoanAmountInput(amount) {
    await this.step(`Fill loan amount '${amount}'`, async () => {
      await this.loanAmountInput.fill(String(amount));
    });
  }

  async fillDownPaymentInput(amount) {
    await this.step(`Fill down payment '${amount}'`, async () => {
      await this.downPaymentInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account '${accountId}'`, async () => {
      await this.fromAccountSelect.selectOption(String(accountId));
    });
  }

  async assertSourceAccountIsAvailable() {
    await this.step(`Assert source account is available`, async () => {
      await expect(this.fromAccountSelect).toBeVisible();
      await expect(this.fromAccountSelect.locator('option')).not.toHaveCount(0);
    });
  }

  async getFirstAccountId() {
    return await this.step(`Get first account ID`, async () => {
      return await this.fromAccountSelect
        .locator('option')
        .first()
        .getAttribute('value');
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertLoanRequestProcessedTitleIsVisible() {
    await this.step(
      `Assert 'Loan Request Processed' title is visible`,
      async () => {
        await expect(this.loanRequestProcessedTitle).toBeVisible();
      },
    );
  }

  async assertLoanStatusIs(status) {
    await this.step(`Assert loan status is '${status}'`, async () => {
      await expect(this.loanStatus).toHaveText(status);
    });
  }

  async assertLoanProviderIsVisible() {
    await this.step(`Assert loan provider is visible`, async () => {
      await expect(this.loanProviderName).toBeVisible();
      await expect(this.loanProviderName).not.toHaveText('');
    });
  }

  async assertResponseDateIsVisible() {
    await this.step(`Assert response date is visible`, async () => {
      await expect(this.responseDate).toBeVisible();
      await expect(this.responseDate).not.toHaveText('');
    });
  }

  async assertLoanWasApproved() {
    await this.step(`Assert loan was approved`, async () => {
      await expect(this.loanRequestApproved).toBeVisible();
      await expect(this.approvedMessage).toBeVisible();
      await expect(this.newAccountId).toBeVisible();
    });
  }

  async assertLoanWasDenied() {
    await this.step(`Assert loan was denied`, async () => {
      await expect(this.loanRequestDenied).toBeVisible();
    });
  }

  async assertDeniedMessageContainsText(message) {
    await this.step(`Assert denied loan message`, async () => {
      await expect(this.deniedMessage).toContainText(message);
    });
  }

  async getNewAccountId() {
    return await this.step(`Get new loan account ID`, async () => {
      return await this.newAccountId.textContent();
    });
  }
}
