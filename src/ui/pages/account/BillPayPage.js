import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import {
  ACCOUNT_ACCESS_DENIED_ERROR,
  TRANSFER_COMPLETE_HELP_TEXT,
  billPaymentCompleteMessage,
} from '../../../common/constants/account/accountMessages';

export class BillPayPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Bill Payment Service' });

    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.streetInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountNumberInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });

    this.successHeading = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');
    this.fromAccountResult = page.locator('#fromAccountId');
    this.helpText = page.getByText(TRANSFER_COMPLETE_HELP_TEXT);

    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.errorText = page.getByText(ACCOUNT_ACCESS_DENIED_ERROR);
  }

  fieldError(key) {
    return this.page.locator(`#validationModel-${key}`);
  }

  async open() {
    await this.step('Open Bill Pay page', async () => {
      await this.page.goto('/parabank/billpay.htm');
    });
  }

  async fillPayeeName(value) {
    await this.step(`Fill Payee Name with "${value}"`, async () => {
      await this.payeeNameInput.fill(value);
    });
  }

  async fillStreet(value) {
    await this.step(`Fill Address with "${value}"`, async () => {
      await this.streetInput.fill(value);
    });
  }

  async fillCity(value) {
    await this.step(`Fill City with "${value}"`, async () => {
      await this.cityInput.fill(value);
    });
  }

  async fillState(value) {
    await this.step(`Fill State with "${value}"`, async () => {
      await this.stateInput.fill(value);
    });
  }

  async fillZipCode(value) {
    await this.step(`Fill Zip Code with "${value}"`, async () => {
      await this.zipCodeInput.fill(value);
    });
  }

  async fillPhoneNumber(value) {
    await this.step(`Fill Phone # with "${value}"`, async () => {
      await this.phoneNumberInput.fill(value);
    });
  }

  async fillAccountNumber(value) {
    await this.step(`Fill Account # with "${value}"`, async () => {
      await this.accountNumberInput.fill(value);
    });
  }

  async fillVerifyAccountNumber(value) {
    await this.step(`Fill Verify Account # with "${value}"`, async () => {
      await this.verifyAccountNumberInput.fill(value);
    });
  }

  async fillAmount(value) {
    await this.step(`Fill Amount with "${value}"`, async () => {
      await this.amountInput.fill(String(value));
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From account "${accountNumber}"`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async clickSendPaymentButton() {
    await this.step('Click Send Payment button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Bill Pay page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertFieldError(key, message) {
    await this.step(`Assert field error "${message}"`, async () => {
      await expect(this.fieldError(key)).toBeVisible();
      await expect(this.fieldError(key)).toHaveText(message);
    });
  }

  async assertPaymentComplete(payeeName, amount, fromAccount) {
    await this.step(
      `Assert bill payment to "${payeeName}" completed`,
      async () => {
        await expect(this.successHeading).toBeVisible();
        await expect(this.page.getByText(
          billPaymentCompleteMessage(payeeName, amount, fromAccount),
        )).toBeVisible();
        await expect(this.helpText).toBeVisible();
      },
    );
  }

  async assertInternalError() {
    await this.step('Assert internal error is shown', async () => {
      await expect(this.errorHeading).toBeVisible();
      await expect(this.errorText).toBeVisible();
    });
  }
}
