import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/requestloan.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async fillLoanRequestForm(data) {
    await this.step(`Fill loan request form`, async () => {
      await this.page.fill('input#amount', data.amount.toString());
      await this.page.fill('input#downPayment', data.downPayment.toString());
      await this.page.selectOption('select#fromAccountId', data.fromAccount.toString());
    });
  }

  async submit() {
    await this.step(`Submit loan request`, async () => {
      await this.page.click('input[value="Apply Now"]');
    });
  }

  async verifyLoanRequestResult() {
    await this.step(`Verify loan request result`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText('Loan Request Processed');
    });
  }
}
