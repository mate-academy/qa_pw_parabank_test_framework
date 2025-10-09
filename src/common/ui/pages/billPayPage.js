import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/billpay.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async fillBillForm(data) {
    await this.step(`Fill bill payment form`, async () => {
      await this.page.fill('input[name="payee.name"]', data.payeeName);
      await this.page.fill('input[name="payee.address.street"]', data.address);
      await this.page.fill('input[name="payee.address.city"]', data.city);
      await this.page.fill('input[name="payee.address.state"]', data.state);
      await this.page.fill('input[name="payee.address.zipCode"]', data.zip);
      await this.page.fill('input[name="payee.phoneNumber"]', data.phone);
      await this.page.fill('input[name="payee.accountNumber"]', data.account);
      await this.page.fill('input[name="verifyAccount"]', data.account);
      await this.page.fill('input[name="amount"]', data.amount);
    });
  }

  async submitPayment() {
    await this.step(`Submit payment`, async () => {
      await this.page.click('input[value="Send Payment"]');
    });
  }

  async verifyPaymentSuccess() {
    await this.step(`Verify payment success`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText('Bill Payment Complete');
    });
  }
}
