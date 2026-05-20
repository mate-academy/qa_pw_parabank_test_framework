import { expect, testStep } from '../../../common/helpers/pwHelpers';

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
    this.fromAccountIdDropdown = page.locator('select[name="fromAccountId"]');

    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });

    this.billPaymentHeading = page.locator('#billpayResult .title');
    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');
    this.fromAccountIdResult = page.locator('#fromAccountId');

    this.payeeNameErrorMessage = page.locator('#validationModel-name');
    this.addressErrorMessage = page.locator('#validationModel-address');
    this.cityErrorMessage = page.locator('#validationModel-city');
    this.stateErrorMessage = page.locator('#validationModel-state');
    this.zipCodeErrorMessage = page.locator('#validationModel-zipCode');
    this.phoneErrorMessage = page.locator('#validationModel-phoneNumber');
    this.accountEmptyErrorMessage = page.locator(
      '#validationModel-account-empty',
    );
    this.accountInvalidErrorMessage = page.locator(
      '#validationModel-account-invalid',
    );
    this.verifyAccountEmptyErrorMessage = page.locator(
      '#validationModel-verifyAccount-empty',
    );
    this.verifyAccountInvalidErrorMessage = page.locator(
      '#validationModel-verifyAccount-invalid',
    );
    this.verifyAccountMismatchedErrorMessage = page.locator(
      '#validationModel-verifyAccount-mismatch',
    );
    this.amountEmptyErrorMessage = page.locator(
      '#validationModel-amount-empty',
    );
    this.amountInvalidErrorMessage = page.locator(
      '#validationModel-amount-invalid',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Bill Pay' page`, async () => {
      await this.page.goto(`billpay.htm`);
    });
  }

  async fillFormInputs({
    payeeName = '',
    address = '',
    city = '',
    state = '',
    zipCode = '',
    phone = '',
    account = '',
    verifyAccount = '',
    amount = '',
  } = {}) {
    await this.step(
      `Fill payee form: name='${payeeName}', address='${address}', ` +
        `city='${city}', state='${state}', zipCode='${zipCode}', ` +
        `phone='${phone}', account='${account}', verifyAccount=` +
        `'${verifyAccount}', amount='${amount}'`,
      async () => {
        await this.payeeNameField.fill(`${payeeName}`);
        await this.addressField.fill(`${address}`);
        await this.cityField.fill(`${city}`);
        await this.stateField.fill(`${state}`);
        await this.zipCodeField.fill(`${zipCode}`);
        await this.phoneField.fill(`${phone}`);
        await this.accountField.fill(`${account}`);
        await this.verifyAccountField.fill(`${verifyAccount}`);
        await this.amountField.fill(`${amount}`);
      },
    );
  }

  async selectFromAccountId(fromAccountId) {
    await this.step(`Select From Account ID='${fromAccountId}'`, async () => {
      await this.fromAccountIdDropdown.selectOption(fromAccountId);
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertErrorMessageHasText(errorMessageLocator, messageText) {
    await this.step(`Assert the '${messageText}' is shown`, async () => {
      await expect(errorMessageLocator).toHaveText(messageText);
    });
  }

  async assertBillPaymentHeadingHasText(message) {
    await this.step(
      `Assert 'Bill Payment' heading shows '${message}'`,
      async () => {
        await expect(this.billPaymentHeading).toHaveText(message);
      },
    );
  }

  async assertPayeeNameResultHasText(payeeName) {
    await this.step(`Assert Payee Name result is '${payeeName}'`, async () => {
      await expect(this.payeeNameResult).toHaveText(payeeName);
    });
  }

  async assertAmountResultHasText(amount) {
    await this.step(`Assert Amount result is '${amount}'`, async () => {
      await expect(this.amountResult).toHaveText(amount);
    });
  }

  async assertFromAccountIdResultHasText(fromAccountId) {
    await this.step(
      `Assert From Account ID result is '${fromAccountId}'`,
      async () => {
        await expect(this.fromAccountIdResult).toHaveText(fromAccountId);
      },
    );
  }
}
