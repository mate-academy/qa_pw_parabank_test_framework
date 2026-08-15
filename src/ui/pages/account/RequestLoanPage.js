import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import {
  ACCOUNT_ACCESS_DENIED_ERROR,
  LOAN_APPROVED_MESSAGE,
} from '../../../common/constants/account/accountMessages';

export class RequestLoanPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Apply for a Loan' });
    this.amountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyButton = page.getByRole('button', { name: 'Apply Now' });
    this.resultHeading = page.getByRole('heading', {
      name: 'Loan Request Processed',
    });
    this.loanProviderName = page.locator('#loanProviderName');
    this.responseDate = page.locator('#responseDate');
    this.loanStatus = page.locator('#loanStatus');
    this.approvedText = page.getByText(LOAN_APPROVED_MESSAGE);
    this.newAccountLink = page.locator('#newAccountId');
    this.deniedErrorText = page.locator('#loanRequestDenied p.error');
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.errorText = page.getByText(ACCOUNT_ACCESS_DENIED_ERROR);
  }

  async open() {
    await this.step('Open Request Loan page', async () => {
      await this.page.goto('/parabank/requestloan.htm');
    });
  }

  async fillAmount(value) {
    await this.step(`Fill Loan Amount with "${value}"`, async () => {
      await this.amountInput.fill(String(value));
    });
  }

  async fillDownPayment(value) {
    await this.step(`Fill Down Payment with "${value}"`, async () => {
      await this.downPaymentInput.fill(String(value));
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From account "${accountNumber}"`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async clickApplyNowButton() {
    await this.step('Click Apply Now button', async () => {
      await this.applyButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Request Loan page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertLoanApproved() {
    await this.step('Assert loan request was approved', async () => {
      await expect(this.resultHeading).toBeVisible();
      await expect(this.loanStatus).toHaveText('Approved');
      await expect(this.approvedText).toBeVisible();
      await expect(this.newAccountLink).toHaveAttribute(
        'href',
        /\/parabank\/activity\.htm\?id=\d+/,
      );
    });
  }

  async assertAccessDenied() {
    await this.step(
      'Assert Request Loan page is not accessible without login',
      async () => {
        await expect(this.errorHeading).toBeVisible();
        await expect(this.errorText).toBeVisible();
      },
    );
  }

  async assertLoanNotApproved() {
    await this.step('Assert loan request was not approved', async () => {
      await expect(this.resultHeading).toBeVisible();
      await expect(this.loanStatus).not.toHaveText('Approved');
    });
  }

  async assertLoanDenied(message) {
    await this.step(`Assert loan request was denied: "${message}"`, async () => {
      await expect(this.resultHeading).toBeVisible();
      await expect(this.loanStatus).toHaveText('Denied');
      await expect(this.deniedErrorText).toHaveText(message);
    });
  }
}
