import { Page } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę Bill Pay
  async openPage() {
    await this.page.click('a[href="billpay.htm"]');
    await this.page.waitForURL('**/billpay.htm', { timeout: 10000 });
  }

  // Wypełnij formularz płatności rachunku
  async payBill(details: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
    verifyAccount: string;
    amount: string;
  }) {
    await this.page.fill('input[name="payee.name"]', details.payeeName);
    await this.page.fill('input[name="payee.address.street"]', details.address);
    await this.page.fill('input[name="payee.address.city"]', details.city);
    await this.page.fill('input[name="payee.address.state"]', details.state);
    await this.page.fill(
      'input[name="payee.address.zipCode"]',
      details.zipCode,
    );
    await this.page.fill('input[name="payee.phoneNumber"]', details.phone);
    await this.page.fill(
      'input[name="payee.accountNumber"]',
      details.accountNumber,
    );
    await this.page.fill('input[name="verifyAccount"]', details.verifyAccount);
    await this.page.fill('input[name="amount"]', details.amount);

    await this.page.click('input[value="Send Payment"]');

    // Poczekaj na potwierdzenie
    await this.page.waitForSelector('text=Bill Payment Complete', {
      timeout: 10000,
    });
  }
}
