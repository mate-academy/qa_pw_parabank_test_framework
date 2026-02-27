import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class BillPayPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
    this.payeeNameField = page.locator('input[name="payee\\.name"]');
    this.payeeAddressStreetField = page.locator('input[name="payee\\.address\\.street"]');
    this.payeeAddressCityField = page.locator('input[name="payee\\.address\\.city"]');
    this.payeeAddressStateField = page.locator('input[name="payee\\.address\\.state"]');
    this.payeeAddressZipCodeField = page.locator('input[name="payee\\.address\\.zipCode"]');
    this.payeePhoneNumberField = page.locator('input[name="payee\\.phoneNumber"]');
    this.payeeAccountNumberField = page.locator('input[name="payee\\.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountField  = page.getByRole('combobox');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.billPaymentCompleteHeader = page.getByRole('heading', { name: 'Bill Payment Complete' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickAccountsOverviewLink() {
    await this.step(`Click the 'Accounts Overview' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async fillPayeeNameField(fullName) {
    await this.step(`Fill the 'Payee Name' field`, async () => {
      await this.payeeNameField.fill(fullName);
    });
  }

  async fillPayeeAddressStreetField(addressStreet) {
    await this.step(`Fill the 'Address Street' field`, async () => {
      await this.payeeAddressStreetField.fill(addressStreet);
    });
  }

  async fillPayeeAddressCityField(addressCity) {
    await this.step(`Fill the 'Address City' field`, async () => {
      await this.payeeAddressCityField.fill(addressCity);
    });
  }

  async fillPayeeAddressStateField(addressState) {
    await this.step(`Fill the 'Address State' field`, async () => {
      await this.payeeAddressStateField.fill(addressState);
    });
  }
  
  async fillPayeeAddressZipCodeField(addressZipCode) {
    await this.step(`Fill the 'Address Zip Code' field`, async () => {
      await this.payeeAddressZipCodeField.fill(addressZipCode);
    });
  }

  async fillPayeePhoneNumberField(phoneNumber) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.payeePhoneNumberField.fill(phoneNumber);
    });
  }

  async fillPayeeAccountNumberField(recipientAccountNumber) {
    await this.step(`Fill the 'Account' field`, async () => {
      await this.payeeAccountNumberField.fill(String(recipientAccountNumber));
    });
  }

  async fillVerifyAccountField(recipientAccountNumber) {
    await this.step(`Fill the 'Verify Account' field`, async () => {
      await this.verifyAccountField.fill(String(recipientAccountNumber));
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async selectFromAccount(fromAccount) {
    await this.step(`Select 'From account'`, async () => {
      await this.fromAccountField.selectOption({ value: String(fromAccount) });
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click the 'SEND PAYMENT' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async clickFindTransactionsLink() {
    await this.step(`Click the 'Find Transactions' link`, async () => {
      await this.findTransactionsLink.click();
    });
  }

  async assertBillPaymentCompleteHeaderIsVisible() {
    await this.step(`Assert the 'Bill Payment Complete' header is visible`, async () => {
      await expect(this.billPaymentCompleteHeader).toBeVisible();
    });
  }
}