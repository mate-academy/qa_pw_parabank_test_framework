import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanResultMessage = page.locator('#loanStatus');
    this.newAccountIdLink = page.locator('#newAccountId');
  
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "Request Loan" page`, async () => {
      await this.page.goto('parabank/requestloan.htm');
    });
  } 

  async fillLoanField(loanAmount) {
    await this.step(`Fill loan amount field`, async () => {
      await this.loanAmountField.fill(loanAmount);
    });
  }

  async fillDownPaymentField(downPayment) {
    await this.step(`Fill down payment field`, async () => {
      await this.downPaymentField.fill(downPayment);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select from account: ${accountNumber}`, async () => {
      await this.fromAccountDropdown.selectOption(accountNumber);
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click "Apply Now" button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertLoanIsApproved() {
    await this.step(`Assert loan is approved`, async () => {
      await expect(this.loanResultMessage).toHaveText('Approved');
    });
  }

  async assertLoanIsDenied() {
    await this.step(`Assert loan is denied`, async () => {
      await expect(this.loanResultMessage).toHaveText('Denied');
  });
}

async getNewAccountNumber() {
  return await this.step('Get new account number', async () => {
    return await this.newAccountIdLink.textContent();
  });
}

async clickNewAccountIdLink() {
  await this.step(`Click new account id link`, async () => {
    await this.newAccountIdLink.click();
  }); 
}

async assertNewAccountIdIsVisible() {
  await this.step(`Assert new account id is visible`, async () => {
    await expect(this.newAccountIdLink).toBeVisible();
  });
}

async assertErrorMessageIsShown(expectedError) {
  await this.step(`Assert error message is shown`, async () => {
    const errorMessage = this.page.getByText(expectedError);
    await expect(errorMessage).toBeVisible();
  });
}}