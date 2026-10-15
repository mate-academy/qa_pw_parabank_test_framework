import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.billPayLink = page.getByRole('link', {
      name: 'Bill Pay',
    });

    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.addressField = page.locator('input[name="payee.address.street"]');
    this.cityField = page.locator('input[name="payee.address.city"]');
    this.stateField = page.locator('input[name="payee.address.state"]');
    this.zipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.phoneField = page.locator('input[name="payee.phoneNumber"]');

    this.accountNumberField = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');

    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');

    this.sendPaymentButton = page.getByRole('button', {
      name: 'Send Payment',
    });

    this.paymentCompleteHeading = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });

    this.errorMessages = page.locator('#rightPanel .error:visible');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Bill Pay page', async () => {
      await this.billPayLink.click();
      await expect(this.payeeNameField).toBeVisible();
    });
  }

  async fillPaymentForm(payee) {
    await this.step('Fill Bill Pay form', async () => {
      await this.payeeNameField.fill(payee.name);
      await this.addressField.fill(payee.address);
      await this.cityField.fill(payee.city);
      await this.stateField.fill(payee.state);
      await this.zipCodeField.fill(payee.zipCode);
      await this.phoneField.fill(payee.phone);
      await this.accountNumberField.fill(payee.accountNumber);
      await this.verifyAccountField.fill(payee.verifyAccount);
      await this.amountField.fill(String(payee.amount));
    });
  }

  async selectFirstSourceAccount() {
    await this.step('Select source account', async () => {
      await expect(
        this.fromAccountSelect.locator('option').first(),
      ).toBeAttached();

      await this.fromAccountSelect.selectOption({ index: 0 });
    });
  }

  async clickSendPaymentButton() {
    await this.step('Click Send Payment button', async () => {
      await expect(this.sendPaymentButton).toBeEnabled();
      await this.sendPaymentButton.click();
    });
  }

  async assertPaymentSuccessful() {
    await this.step('Assert bill payment was successful', async () => {
      await expect(this.paymentCompleteHeading).toBeVisible({
        timeout: 15000,
      });
    });
  }

  async assertPaymentNotCompleted() {
    await this.step('Assert bill payment was not completed', async () => {
      await expect(this.paymentCompleteHeading).not.toBeVisible();
      await expect(this.sendPaymentButton).toBeVisible();
    });
  }

  async assertErrorMessage(message) {
    await this.step(`Assert Bill Pay error: ${message}`, async () => {
      await expect(
        this.errorMessages.filter({ hasText: message }).first(),
      ).toBeVisible({
        timeout: 15000,
      });
    });
  }
}
