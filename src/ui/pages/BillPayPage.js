import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.payeeNameField = page.locator('[name="payee.name"]');
    this.addressField = page.locator('[name="payee.address.street"]');
    this.cityField = page.locator('[name="payee.address.city"]');
    this.stateField = page.locator('[name="payee.address.state"]');
    this.zipCodeField = page.locator('[name="payee.address.zipCode"]');
    this.phoneField = page.locator('[name="payee.phoneNumber"]');
    this.accountNumberField = page.locator('[name="payee.accountNumber"]');
    this.verifyAccountNumberField = page.locator('[name="verifyAccount"]');
    this.amountField = page.locator('[name="amount"]');
    this.fromAccountDropdown = page.locator('[name="fromAccountId"]');

    this.sendPaymentButton = page.getByRole('button', {
      name: 'Send Payment',
    });
    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');
    this.fromAccountResult = page.locator('#fromAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToBillPay() {
    await this.step('Go to Bill Pay', async () => {
      await this.page.goto('billpay.htm');
    });
  }

  async fillPayeeInformation(user, accountNumber) {
    await this.step('Fill payee information', async () => {
      await this.payeeNameField.fill(`${user.firstName} ${user.lastName}`);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneField.fill(user.phone);
      await this.accountNumberField.fill(accountNumber);
      await this.verifyAccountNumberField.fill(accountNumber);
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill payment amount: ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async clickSendPayment() {
    await this.step('Click Send Payment button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async verifyBillPaymentSuccessful(payeeName, amount, fromAccount) {
    await this.step('Verify bill payment was successful', async () => {
      await expect(this.payeeNameResult).toHaveText(payeeName);
      await expect(this.amountResult).toHaveText(`$${amount}.00`);
      await expect(this.fromAccountResult).toHaveText(fromAccount);
    });
  }

  async getFromAccountId() {
    return await this.step('Get From account ID', async () => {
      return await this.fromAccountDropdown
        .locator('option:checked')
        .textContent();
    });
  }

  async clearField(field) {
    await this.step(`Clear ${field} field`, async () => {
      await this[field].fill('');
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(
        this.page
          .locator('.error:visible')
          .filter({ hasText: message })
          .first(),
      ).toBeVisible();
    });
  }

  async fillVerifyAccountNumber(accountNumber) {
    await this.step('Fill verify account number', async () => {
      await this.verifyAccountNumberField.fill(accountNumber);
    });
  }
}
