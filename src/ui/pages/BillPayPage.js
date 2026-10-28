import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.billPayLink = page.getByRole('link', {
      name: 'Bill Pay',
    });

    this.billPaymentServiceTitle = page.getByRole('heading', {
      name: 'Bill Payment Service',
    });

    this.payeeNameInput = page.locator('[name="payee.name"]');
    this.addressInput = page.locator('[name="payee.address.street"]');
    this.cityInput = page.locator('[name="payee.address.city"]');
    this.stateInput = page.locator('[name="payee.address.state"]');
    this.zipCodeInput = page.locator('[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('[name="verifyAccount"]');
    this.amountInput = page.locator('[name="amount"]');

    this.fromAccountSelect = page.locator('[name="fromAccountId"]');

    this.sendPaymentButton = page.getByRole('button', {
      name: 'Send Payment',
    });

    this.billPaymentCompleteTitle = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });

    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');
    this.fromAccountIdResult = page.locator('#fromAccountId');

    this.payeeNameError = page.locator('#validationModel-name');
    this.addressError = page.locator('#validationModel-address');
    this.cityError = page.locator('#validationModel-city');
    this.stateError = page.locator('#validationModel-state');
    this.zipCodeError = page.locator('#validationModel-zipCode');
    this.phoneNumberError = page.locator('#validationModel-phoneNumber');

    this.accountEmptyError = page.locator('#validationModel-account-empty');
    this.accountInvalidError = page.locator('#validationModel-account-invalid');

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
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickBillPayLink() {
    await this.step(`Click 'Bill Pay' link`, async () => {
      await this.billPayLink.click();
    });
  }

  async assertBillPaymentServiceTitleIsVisible() {
    await this.step(
      `Assert 'Bill Payment Service' title is visible`,
      async () => {
        await expect(this.billPaymentServiceTitle).toBeVisible();
      },
    );
  }

  async fillPayeeNameInput(payeeName) {
    await this.step(`Fill 'Payee Name' field`, async () => {
      await this.payeeNameInput.fill(payeeName);
    });
  }

  async fillAddressInput(address) {
    await this.step(`Fill 'Address' field`, async () => {
      await this.addressInput.fill(address);
    });
  }

  async fillCityInput(city) {
    await this.step(`Fill 'City' field`, async () => {
      await this.cityInput.fill(city);
    });
  }

  async fillStateInput(state) {
    await this.step(`Fill 'State' field`, async () => {
      await this.stateInput.fill(state);
    });
  }

  async fillZipCodeInput(zipCode) {
    await this.step(`Fill 'Zip Code' field`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  async fillPhoneNumberInput(phoneNumber) {
    await this.step(`Fill 'Phone Number' field`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  async fillAccountNumberInput(accountNumber) {
    await this.step(`Fill 'Account Number' field`, async () => {
      await this.accountNumberInput.fill(String(accountNumber));
    });
  }

  async fillVerifyAccountInput(accountNumber) {
    await this.step(`Fill 'Verify Account' field`, async () => {
      await this.verifyAccountInput.fill(String(accountNumber));
    });
  }

  async fillAmountInput(amount) {
    await this.step(`Fill 'Amount' field`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertBillPaymentCompletedSuccessfully() {
    await this.step(
      `Assert bill payment was completed successfully`,
      async () => {
        await expect(this.billPaymentCompleteTitle).toBeVisible();
      },
    );
  }

  async assertPayeeNameResult(payeeName) {
    await this.step(`Assert payee name is '${payeeName}'`, async () => {
      await expect(this.payeeNameResult).toHaveText(payeeName);
    });
  }

  async assertAmountResult(amount) {
    await this.step(
      `Assert payment amount is '$${Number(amount).toFixed(2)}'`,
      async () => {
        await expect(this.amountResult).toHaveText(
          `$${Number(amount).toFixed(2)}`,
        );
      },
    );
  }

  async assertPayeeNameErrorContainsText(message) {
    await this.step(`Assert payee name error`, async () => {
      await expect(this.payeeNameError).toContainText(message);
    });
  }

  async assertAddressErrorContainsText(message) {
    await this.step(`Assert address error`, async () => {
      await expect(this.addressError).toContainText(message);
    });
  }

  async assertCityErrorContainsText(message) {
    await this.step(`Assert city error`, async () => {
      await expect(this.cityError).toContainText(message);
    });
  }

  async assertStateErrorContainsText(message) {
    await this.step(`Assert state error`, async () => {
      await expect(this.stateError).toContainText(message);
    });
  }

  async assertZipCodeErrorContainsText(message) {
    await this.step(`Assert zip code error`, async () => {
      await expect(this.zipCodeError).toContainText(message);
    });
  }

  async assertPhoneNumberErrorContainsText(message) {
    await this.step(`Assert phone number error`, async () => {
      await expect(this.phoneNumberError).toContainText(message);
    });
  }

  async assertAccountEmptyErrorContainsText(message) {
    await this.step(`Assert account number error`, async () => {
      await expect(this.accountEmptyError).toContainText(message);
    });
  }

  async assertAccountInvalidErrorContainsText(message) {
    await this.step(`Assert invalid account number error`, async () => {
      await expect(this.accountInvalidError).toContainText(message);
    });
  }

  async assertVerifyAccountEmptyErrorContainsText(message) {
    await this.step(`Assert verify account error`, async () => {
      await expect(this.verifyAccountEmptyError).toContainText(message);
    });
  }

  async assertVerifyAccountInvalidErrorContainsText(message) {
    await this.step(`Assert invalid verify account error`, async () => {
      await expect(this.verifyAccountInvalidError).toContainText(message);
    });
  }

  async assertVerifyAccountMismatchErrorContainsText(message) {
    await this.step(`Assert account numbers mismatch error`, async () => {
      await expect(this.verifyAccountMismatchError).toContainText(message);
    });
  }

  async assertAmountEmptyErrorContainsText(message) {
    await this.step(`Assert empty amount error`, async () => {
      await expect(this.amountEmptyError).toContainText(message);
    });
  }

  async assertAmountInvalidErrorContainsText(message) {
    await this.step(`Assert invalid amount error`, async () => {
      await expect(this.amountInvalidError).toContainText(message);
    });
  }
}
