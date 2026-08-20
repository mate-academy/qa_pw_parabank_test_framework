import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.streetField = page.locator('input[name="payee.address.street"]');
    this.cityField = page.locator('input[name="payee.address.city"]');
    this.stateField = page.locator('input[name="payee.address.state"]');
    this.zipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberField = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberField = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });

    this.payeeNameError = page.locator('#validationModel-name');
    this.streetError = page.locator('#validationModel-address');
    this.cityError = page.locator('#validationModel-city');
    this.stateError = page.locator('#validationModel-state');
    this.zipCodeError = page.locator('#validationModel-zipCode');
    this.phoneNumberError = page.locator('#validationModel-phoneNumber');

    this.accountNumberEmptyError = page.locator(
      '#validationModel-account-empty',
    );
    this.accountNumberInvalidError = page.locator(
      '#validationModel-account-invalid',
    );
    this.verifyAccountEmptyError = page.locator(
      '#validationModel-verifyAccount-empty',
    );
    this.verifyAccountInvalidError = page.locator(
      '#validationModel-verifyAccount-invalid',
    );
    this.verifyAccountMismatchError = page.locator(
      '#validationModel-verifyAccount-mismatch',
    );
    this.amountEmptyError = page.locator('#validationModel-amount-empty');
    this.amountInvalidError = page.locator('#validationModel-amount-invalid');

    this.successTitle = page.locator('#billpayResult h1.title');
    this.successMessage = page.locator('#billpayResult p').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillPayeeNameField(value) {
    await this.step(`Fill the 'Payee Name' field`, async () => {
      await this.payeeNameField.fill(value);
    });
  }

  async fillStreetField(value) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.streetField.fill(value);
    });
  }

  async fillCityField(value) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(value);
    });
  }

  async fillStateField(value) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(value);
    });
  }

  async fillZipCodeField(value) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(value);
    });
  }

  async fillPhoneNumberField(value) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.phoneNumberField.fill(value);
    });
  }

  async fillAccountNumberField(value) {
    await this.step(`Fill the 'Account #' field`, async () => {
      await this.accountNumberField.fill(value);
    });
  }

  async fillVerifyAccountField(value) {
    await this.step(`Fill the 'Verify Account #' field`, async () => {
      await this.verifyAccountField.fill(value);
    });
  }

  async fillAmountField(value) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.amountField.fill(value);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select '${accountId}' as the 'From' account`, async () => {
      await this.fromAccountSelect.selectOption({ label: accountId });
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click the 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async submitBillPayForm(payee, fromAccountId) {
    await this.fillPayeeNameField(payee.payeeName);
    await this.fillStreetField(payee.street);
    await this.fillCityField(payee.city);
    await this.fillStateField(payee.state);
    await this.fillZipCodeField(payee.zipCode);
    await this.fillPhoneNumberField(payee.phoneNumber);
    await this.fillAccountNumberField(payee.accountNumber);
    await this.fillVerifyAccountField(payee.verifyAccount);
    await this.fillAmountField(payee.amount);
    await this.selectFromAccount(fromAccountId);
    await this.clickSendPaymentButton();
  }

  async assertPaymentSuccessful(payeeName, amount, fromAccountId) {
    await this.step(
      `Assert the bill payment completed successfully`,
      async () => {
        await expect(this.successTitle).toHaveText('Bill Payment Complete');
        await expect(this.successMessage).toHaveText(
          `Bill Payment to ${payeeName} in the amount of $${amount} from account ${fromAccountId} was successful.`,
        );
      },
    );
  }

  async assertFieldErrorIsVisible(errorLocator, message) {
    await this.step(`Assert the field error is '${message}'`, async () => {
      await expect(errorLocator).toHaveText(message);
    });
  }
}
