import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.addressField = page.locator('input[name="payee.address.street"]');
    this.cityField = page.locator('input[name="payee.address.city"]');
    this.stateField = page.locator('input[name="payee.address.state"]');
    this.zipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.phoneField = page.locator('input[name="payee.phoneNumber"]');
    this.accountField = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.successTitle = page.getByText('Bill Payment Complete!');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Bill Pay' page`, async () => {
      await this.page.goto('billpay.htm');
    });
  }

  async fillPayeeNameField(payeeName) {
    await this.step(`Fill the 'Payee Name' field`, async () => {
      await this.payeeNameField.fill(payeeName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneField.fill(phone);
    });
  }

  async fillAccountField(account) {
    await this.step(`Fill the 'Account' field`, async () => {
      await this.accountField.fill(String(account));
    });
  }

  async fillVerifyAccountField(account) {
    await this.step(`Fill the 'Verify Account' field`, async () => {
      await this.verifyAccountField.fill(String(account));
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field with '${amount}'`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click the 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async submitBillPayForm({ payeeName, address, city, state, zipCode, phone, account, amount }) {
    await this.step(`Fill and submit the 'Bill Pay' form`, async () => {
      await this.fillPayeeNameField(payeeName);
      await this.fillAddressField(address);
      await this.fillCityField(city);
      await this.fillStateField(state);
      await this.fillZipCodeField(zipCode);
      await this.fillPhoneField(phone);
      await this.fillAccountField(account);
      await this.fillVerifyAccountField(account);
      await this.fillAmountField(amount);
      await this.clickSendPaymentButton();
    });
  }

  async assertBillPayComplete(payeeName) {
    await this.step(`Assert bill payment was completed successfully`, async () => {
      await expect(this.successTitle).toBeVisible();
      await expect(this.page.getByText(payeeName)).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
