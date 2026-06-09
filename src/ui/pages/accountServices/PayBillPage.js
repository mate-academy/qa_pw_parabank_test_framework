import { testStep } from '../../../common/helpers/pwHelpers';
import { expect } from '@playwright/test';

export class PayBillPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.addressField = page.locator('input[name="payee.address.street"]');
    this.cityField = page.locator('input[name="payee.address.city"]');
    this.stateField = page.locator('input[name="payee.address.state"]');
    this.zipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberField = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberField = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.billPayResult = page.locator('#billpayResult');
    this.fromAccountOption = page.locator('select[name="fromAccountId"]');
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountId() {
    return await this.fromAccountOption.inputValue();
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

  async fillPhoneNumberField(phoneNumber) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.phoneNumberField.fill(phoneNumber);
    });
  }

  async fillAccountNumberField(accountNumber) {
    await this.step(`Fill the 'Account Number' field`, async () => {
      await this.accountNumberField.fill(accountNumber);
    });
  }

  async fillVerifyAccountField(accountNumber) {
    await this.step(`Fill the 'Verify Account' field`, async () => {
      await this.verifyAccountField.fill(accountNumber);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click on 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertBillPayResultHasCorrectValues(name, amount, accountId) {
    await this.step(
      `Assert that bill pay result has correct values`,
      async () => {
        await expect(this.billPayResult).toContainText(
          `Bill Payment to ${name} in the amount of $${amount} from account ${accountId} was successful.`,
        );
      },
    );
  }
}
