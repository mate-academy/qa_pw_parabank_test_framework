import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanStatus = page.locator('#loanStatus');
    this.fromAccountField = page.locator('#fromAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillLoanAmountField(amount) {
    await this.step(`Fill the 'Loan Amount' field`, async () => {
      await this.loanAmountField.fill(String(amount));
    });
  }

  async filldownPaymentField(amount) {
    await this.step(`Fill the 'Down Payment' field`, async () => {
      await this.downPaymentField.fill(String(amount));
    });
  }

  async selectFromAccount(fromAccount) {
    await this.step(`Select 'From account'`, async () => {
      await this.fromAccountField.selectOption({ value: String(fromAccount) });
    });
  }

  async clickapplyNowButton() {
    await this.step(`Click the 'Apply Now' button`, async () => {
      await this.applyNowButton.click();
    });
  }
  
  async assertLoanApproved() {
    await this.step(`Assert loan status is Approved`, async () => {
      await expect(this.loanStatus).toHaveText('Approved');
    });
  } 

  


  
}