import { Page, Locator, expect } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;
  readonly payeeNameInput: Locator;
  readonly payeeAddressInput: Locator;
  readonly payeeCityInput: Locator;
  readonly payeeStateInput: Locator;
  readonly payeeZipCodeInput: Locator;
  readonly payeePhoneInput: Locator;
  readonly payeeAccountInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput: Locator;
  readonly sendPaymentButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.payeeAddressInput = page.locator('input[name="payee.address.street"]');
    this.payeeCityInput = page.locator('input[name="payee.address.city"]');
    this.payeeStateInput = page.locator('input[name="payee.address.state"]');
    this.payeeZipCodeInput = page.locator(
      'input[name="payee.address.zipCode"]',
    );
    this.payeePhoneInput = page.locator('input[name="payee.phoneNumber"]');
    this.payeeAccountInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    this.successMessage = page.locator('#billpayResult h1');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/billpay.htm');
  }

  async payBill(data: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    account: string;
    amount: string;
  }): Promise<void> {
    await this.payeeNameInput.fill(data.name);
    await this.payeeAddressInput.fill(data.address);
    await this.payeeCityInput.fill(data.city);
    await this.payeeStateInput.fill(data.state);
    await this.payeeZipCodeInput.fill(data.zip);
    await this.payeePhoneInput.fill(data.phone);
    await this.payeeAccountInput.fill(data.account);
    await this.verifyAccountInput.fill(data.account);
    await this.amountInput.fill(data.amount);
    await this.sendPaymentButton.click();
  }

  async assertPaymentSuccessful(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}
