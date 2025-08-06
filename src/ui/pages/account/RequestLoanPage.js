import { testStep, expect } from '../../../common/helpers/pwHelpers';
import {
  LOAN_STATUSES,
  LOAN_APPROVED,
  LOAN_DENIED,
} from '../../constants/loanRequest';
import { ERROR_TITLE } from '../../constants/authMessages';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    // Fields
    this.amountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    // Buttons
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    // Loan request result
    this.loanProviderName = page.locator('#loanProviderName');
    this.responseDate = page.locator('#responseDate');
    this.loanStatus = page.locator('#loanStatus');
    this.newAccountLink = page.locator('#newAccountId');
    this.loanRequestApprovedMessage = page.locator('#loanRequestApproved');
    this.loanRequestDeniedMessage = page.locator('#loanRequestDenied .error');
    this.requestLoanErrorTitle = page.locator('#requestLoanError h1');
    this.requestLoanErrorSubtitle = page.locator('#requestLoanError p');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Request Loan' page`, async () => {
      await this.page.goto('parabank/requestloan.htm');
    });
  }

  async fillLoanAmount(amount) {
    await this.step(`Fill the 'Loan Amount' field - ${amount}`, async () => {
      await this.amountInput.fill(amount.toString());
    });
  }

  async fillDownPayment(downPayment) {
    await this.step(
      `Fill the 'Down Payment' field - ${downPayment}`,
      async () => {
        await this.downPaymentInput.fill(downPayment.toString());
      },
    );
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select Account - ${accountNumber}`, async () => {
      await this.fromAccountSelect.waitFor();
      await this.fromAccountSelect.selectOption(accountNumber.toString());
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async submitLoanForm(amount, downPayment, fromAccount) {
    await this.step(`Submit 'Request Loan' form`, async () => {
      await this.fillLoanAmount(amount);
      await this.fillDownPayment(downPayment);
      if (fromAccount) await this.selectFromAccount(fromAccount);
      await this.clickApplyNowButton();
    });
  }

  async getNewAccountNumber() {
    await this.step(`Get created Account number`, async () => {
      await this.newAccountLink.waitFor({ state: 'visible' });
    });
    return await this.newAccountLink.textContent();
  }

  async assertLoanRequestApproved() {
    await this.step(`Assert: Loan Request has been Approved`, async () => {
      await expect(this.loanStatus).toHaveText(LOAN_STATUSES.approved);
      await expect(await this.loanRequestApprovedMessage).toContainText(
        LOAN_APPROVED,
      );
    });
  }

  async assertLoanRequestDenied() {
    await this.step(`Assert: Loan Request has been Denied`, async () => {
      await expect(this.loanStatus).toHaveText(LOAN_STATUSES.denied);
      await expect(await this.loanRequestDeniedMessage).toHaveText(LOAN_DENIED);
    });
  }

  async assertLoanProviderIsVisible() {
    await this.step(`Assert: Loan Provider is shown`, async () => {
      await expect(this.loanProviderName).toBeVisible();

      const text = await this.loanProviderName.innerText();
      expect(text.length).toBeGreaterThan(0);
    });
  }

  async assertResponseDateIsToday(dateString) {
    dateString = dateString || (await this.responseDate.innerText());
    await this.step('Response date is today', async () => {
      const [month, day, year] = dateString.split('-').map(Number);
      const rowDate = new Date(year, month - 1, day);

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      expect(rowDate.getTime()).toBe(today.getTime());
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert 'Loan Request' error is shown`, async () => {
      await this.requestLoanErrorTitle.waitFor({ state: 'visible' });
      await expect(this.requestLoanErrorTitle).toHaveText(ERROR_TITLE);
      await expect(this.requestLoanErrorSubtitle).toHaveText(message);
    });
  }
}
