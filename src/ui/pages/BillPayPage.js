import { testStep, expect } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountsOverview = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
    this.pageTitle = page.getByRole('heading', {
      name: 'Bill Payment Service',
    });
    this.payeeNameField = page.locator('input[name="payee\\.name"]');
    this.addressField = page.locator('input[name="payee\\.address\\.street"]');
    this.cityField = page.locator('input[name="payee\\.address\\.city"]');
    this.stateField = page.locator('input[name="payee\\.address\\.state"]');
    this.zipCodeField = page.locator('input[name="payee\\.address\\.zipCode"]');
    this.phoneField = page.locator('input[name="payee\\.phoneNumber"]');
    this.accountNumberField = page.locator(
      'input[name="payee\\.accountNumber"]',
    );
    this.verifyAccountNumberField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.successfulBillPayment = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageTitleIsVisible() {
    await this.step(
      'Checking the visibility of "Bill Payment Service"',
      async () => {
        await expect(this.pageTitle).toBeVisible();
      },
    );
  }

  async fillPayeeNameField(name) {
    await this.step('Fill the "Payee Name" field', async () => {
      await this.payeeNameField.fill(name);
    });
  }

  async fillAddressField(address) {
    await this.step('Fill the "Address" field', async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step('Fill the "City" field', async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step('Fill the "State" field', async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step('Fill the "Zip Code" field', async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step('Fill the "Phone" field', async () => {
      await this.phoneField.fill(phone);
    });
  }

  async fillAccountNumberField(accountNumber) {
    await this.step('Fill the "Account Number" field', async () => {
      await this.accountNumberField.fill(accountNumber);
    });
  }

  async fillVerifyAccountNumberField(verifyAccountNumber) {
    await this.step('Fill the "Verify Account" field', async () => {
      await this.verifyAccountNumberField.fill(verifyAccountNumber);
    });
  }

  async fillAmountField(amount) {
    await this.step('Fill the "Amount" field', async () => {
      await this.amountField.fill(amount);
    });
  }

  async clickSendPaymentButton() {
    await this.step('Click the "Send Payment" button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertSuccessfulBillPaymentIsVisible() {
    await this.step(
      'Checking the visibility of "Bill Payment Complete"',
      async () => {
        await expect(this.successfulBillPayment).toBeVisible();
      },
    );
  }

  async assertSuccessfulPaymentDetails(payeeName, amount) {
    await this.step(
      'Checking the success payment message and transaction details',
      async () => {
        await expect(
          this.page.getByText(`Bill Payment to ${payeeName} in`),
        ).toBeVisible();

        await expect(this.page.getByText(payeeName)).toBeVisible();

        await expect(this.page.getByText(`$${amount}`)).toBeVisible();

        await expect(this.page.locator('#fromAccountId')).toBeVisible();
      },
    );
  }
}
