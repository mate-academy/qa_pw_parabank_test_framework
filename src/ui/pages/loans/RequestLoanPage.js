import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.requestLoanLink = page.getByRole('link', {
      name: 'Request Loan',
    });

    this.requestLoanHeading = page.getByRole('heading', {
      name: 'Apply for a Loan',
    });

    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');

    this.applyNowButton = page.getByRole('button', {
      name: 'Apply Now',
    });

    this.loanRequestProcessedHeading = page.getByRole('heading', {
      name: 'Loan Request Processed',
    });

    this.loanStatus = page.locator('#loanStatus');
    this.newAccountId = page.locator('#newAccountId');
    this.loanResponse = page.locator('#rightPanel');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Request Loan page', async () => {
      await this.requestLoanLink.click();

      await expect(this.requestLoanHeading).toBeVisible();
      await expect(this.loanAmountField).toBeVisible();
      await expect(this.downPaymentField).toBeVisible();
      await expect(this.fromAccountSelect).toBeVisible();
    });
  }

  async fillLoanAmount(amount) {
    await this.step(`Fill loan amount: ${amount}`, async () => {
      await this.loanAmountField.fill(String(amount));
    });
  }

  async fillDownPayment(amount) {
    await this.step(`Fill down payment: ${amount}`, async () => {
      await this.downPaymentField.fill(String(amount));
    });
  }

  async selectFirstAccount() {
    await this.step('Select first account for loan', async () => {
      await expect
        .poll(
          async () => await this.fromAccountSelect.locator('option').count(),
          {
            message: 'Wait for available loan accounts',
            timeout: 15000,
          },
        )
        .toBeGreaterThan(0);

      await this.fromAccountSelect.selectOption({ index: 0 });
    });
  }

  async clickApplyNowButton() {
    await this.step('Click Apply Now button', async () => {
      await this.applyNowButton.click();
    });
  }

  async assertLoanRequestProcessed() {
    await this.step('Assert loan request was processed', async () => {
      await expect(this.loanRequestProcessedHeading).toBeVisible({
        timeout: 15000,
      });

      await expect(this.loanStatus).toBeVisible();
    });
  }

  async assertLoanApproved() {
    await this.step('Assert loan was approved', async () => {
      await expect(this.loanStatus).toHaveText('Approved');
      await expect(this.newAccountId).toBeVisible();
      await expect(this.newAccountId).not.toBeEmpty();
    });
  }

  async assertLoanDenied() {
    await this.step('Assert loan was denied', async () => {
      await expect(this.loanStatus).toHaveText('Denied');
    });
  }
}
