import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { BILL_PAY_COMPLETE } from '../../constants/accountActions';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.payeeNameField = page.locator('[name="payee.name"]');
    this.addressStreetField = page.locator(
      'input[name="payee\\.address\\.street"]',
    );
    this.addressCityField = page.locator(
      'input[name="payee\\.address\\.city"]',
    );
    this.addressStateField = page.locator(
      'input[name="payee\\.address\\.state"]',
    );
    this.addressZipCodeField = page.locator(
      'input[name="payee\\.address\\.zipCode"]',
    );
    this.phoneNumberField = page.locator('input[name="payee\\.phoneNumber"]');
    this.accountField = page.locator('input[name="payee\\.accountNumber"]');
    this.accountVerifyField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('#fromAccountId');

    // Buttons
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });

    // Results
    this.billPayCompleteTitle = page.locator('#billpayResult h1');
    this.billPayCompleteSubtitle = page.locator('#billpayResult p').first();

    // Map for dynamic field access
    this.fieldMap = {
      payeeName: this.payeeNameField,
      address: this.addressStreetField,
      city: this.addressCityField,
      state: this.addressStateField,
      zipCode: this.addressZipCodeField,
      phoneNumber: this.phoneNumberField,

      account: this.accountField,
      accountVerify: this.accountVerifyField,
      amount: this.amountField,
    };
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Bill Pay' page`, async () => {
      await this.page.goto('parabank/billpay.htm');
    });
  }

  async fillPayeeNameField(user) {
    await this.step(`Fill 'Payee name' field`, async () => {
      //await this.payeeNameField.waitFor({ state: 'visible' });
      await this.payeeNameField.fill(user.payeeName);
    });
  }

  async fillAddressStreetField(user) {
    await this.step(`Fill 'Address: Street' field`, async () => {
      await this.addressStreetField.fill(user.address);
    });
  }

  async fillAddressCityField(user) {
    await this.step(`Fill 'Address: City' field`, async () => {
      await this.addressCityField.fill(user.city);
    });
  }
  async fillAddressStateField(user) {
    await this.step(`Fill 'Address: State' field`, async () => {
      await this.addressStateField.fill(user.state);
    });
  }

  async fillAddressZipCodeField(user) {
    await this.step(`Fill 'Address: Zip' field`, async () => {
      await this.addressZipCodeField.fill(user.zipCode);
    });
  }

  async fillPhoneField(user) {
    await this.step(`Fill 'Phone' field`, async () => {
      await this.phoneNumberField.fill(user.phoneNumber);
    });
  }

  async fillAccountFields(accountNumber) {
    accountNumber = accountNumber.toString();
    await this.step(`Fill 'Account' field with verification`, async () => {
      await this.accountField.fill(accountNumber);
      await this.accountVerifyField.fill(accountNumber);
    });
  }

  async fillAccountField(accountNumber) {
    await this.step(`Fill 'Account' field`, async () => {
      await this.accountField.fill(accountNumber.toString());
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill 'Amount' field`, async () => {
      await this.amountField.fill(amount.toString());
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From Account - ${accountNumber}`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber.toString());
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click on 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async fillPayeeInfoForm(user, amount, toAccount, fromAccount) {
    await this.step('Enter payee information', async () => {
      await this.fillPayeeNameField(user);
      await this.fillAddressStreetField(user);
      await this.fillAddressCityField(user);
      await this.fillAddressStateField(user);
      await this.fillAddressZipCodeField(user);
      await this.fillPhoneField(user);
      await this.fillAccountFields(toAccount);
      await this.fillAmountField(amount);
      if (fromAccount) await this.selectFromAccount(fromAccount);
    });
  }

  async submitPayeeInfoForm(user, amount, toAccount, fromAccount) {
    await this.step(`Submit 'Bill Pay' form`, async () => {
      await this.fillPayeeInfoForm(user, amount, toAccount, fromAccount);
      await this.clickSendPaymentButton();
    });
  }

  async assertFieldErrorByName(fieldKey, expectedText) {
    const inputLocator = this.fieldMap[fieldKey];

    if (!inputLocator) {
      throw new Error(`No locator found for fieldKey: ${fieldKey}`);
    }
    await this.step(`Check displayed fields erros`, async () => {
      const inputLocators =
        fieldKey === 'account'
          ? [this.accountField, this.accountVerifyField]
          : [inputLocator];

      for (const locator of inputLocators) {
        const rowLocator = this.page.locator('tr', { has: locator });
        const errorLocator = rowLocator.locator('.error:visible');
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });

        await expect.soft(errorLocator).toHaveText(expectedText);
      }
    });
  }

  async assertBillPayCompleteMessage(amount, fromAccount) {
    await this.step(`Check successful Bill Pay message`, async () => {
      await expect(this.billPayCompleteTitle).toHaveText(BILL_PAY_COMPLETE);
      await expect(this.billPayCompleteSubtitle).toContainText(
        fromAccount.toString(),
      );
      await expect(this.billPayCompleteSubtitle).toContainText(
        amount.toString(),
      );
    });
  }
}
