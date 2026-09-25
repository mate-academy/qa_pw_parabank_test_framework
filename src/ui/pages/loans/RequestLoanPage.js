import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

const LOCAL_LOAN_PROVIDER = 'local';
const AVAILABLE_FUNDS_PROCESSOR = 'funds';
const LOAN_PROCESSOR_THRESHOLD = '20';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.administrationHeading = page.getByRole('heading', {
      name: 'Administration',
    });
    this.jdbcAccessMode = page.locator('#accessMode4');
    this.loanProviderSelect = page.locator('#loanProvider');
    this.loanProcessorSelect = page.locator('#loanProcessor');
    this.loanProcessorThresholdInput = page.locator('#loanProcessorThreshold');
    this.adminSubmitButton = page.getByRole('button', {
      name: 'Submit',
    });

    this.requestLoanHeading = page.getByRole('heading', {
      name: 'Apply for a Loan',
    });
    this.amountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyButton = page.getByRole('button', {
      name: 'Apply Now',
    });

    this.resultHeading = page.getByRole('heading', {
      name: 'Loan Request Processed',
    });
    this.loanStatus = page.locator('#loanStatus');
    this.newAccountLink = page.locator('#newAccountId');
    this.approvedMessage = page.locator('#loanRequestApproved');
    this.deniedMessage = page.locator('#loanRequestDenied');
  }

  async configureLoanProcessing() {
    await this.step('Configure loan processing', async () => {
      await this.openPage('admin.htm', this.administrationHeading);

      await this.jdbcAccessMode.check();
      await this.loanProviderSelect.selectOption(LOCAL_LOAN_PROVIDER);
      await this.loanProcessorSelect.selectOption(AVAILABLE_FUNDS_PROCESSOR);
      await this.loanProcessorThresholdInput.fill(LOAN_PROCESSOR_THRESHOLD);
      await this.adminSubmitButton.click();

      await expect(this.jdbcAccessMode).toBeChecked();
      await expect(this.loanProviderSelect).toHaveValue(LOCAL_LOAN_PROVIDER);
      await expect(this.loanProcessorSelect).toHaveValue(
        AVAILABLE_FUNDS_PROCESSOR,
      );
      await expect(this.loanProcessorThresholdInput).toHaveValue(
        LOAN_PROCESSOR_THRESHOLD,
      );
    });
  }

  async open() {
    await this.configureLoanProcessing();

    await this.step('Open the request loan page', async () => {
      await this.openPage('requestloan.htm', this.requestLoanHeading);
      await expect(this.fromAccountSelect).not.toHaveValue('');
    });
  }

  async requestLoan(loanData) {
    await this.step(`Request a loan for $${loanData.amount}`, async () => {
      const fromAccountId = await this.fromAccountSelect.inputValue();

      await this.amountInput.fill(loanData.amount);
      await this.downPaymentInput.fill(loanData.downPayment);
      await this.fromAccountSelect.selectOption(fromAccountId);
      await this.applyButton.click();
    });
  }

  async assertLoanWasApproved() {
    return await this.step('Verify that the loan was approved', async () => {
      await expect(this.resultHeading).toBeVisible();
      await expect(this.loanStatus).toHaveText('Approved');
      await expect(this.approvedMessage).toBeVisible();
      await expect(this.newAccountLink).toBeVisible();

      return (await this.newAccountLink.innerText()).trim();
    });
  }

  async assertLoanWasDenied() {
    await this.step('Verify that the loan was denied', async () => {
      await expect(this.resultHeading).toBeVisible();
      await expect(this.loanStatus).toHaveText('Denied');
      await expect(this.deniedMessage).toBeVisible();
    });
  }

  async openLoanAccountDetails() {
    await this.step('Open the loan account details', async () => {
      await this.newAccountLink.click();
    });
  }
}
