import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BillPaymentPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeName = page.locator('[name="payee.name"]');
    this.address = page.locator('[name="payee.address.street"]');
    this.city = page.locator('[name="payee.address.city"]');
    this.state = page.locator('[name="payee.address.state"]');
    this.zip = page.locator('[name="payee.address.zipCode"]');
    this.phone = page.locator('[name="payee.phoneNumber"]');
    this.account = page.locator('[name="payee.accountNumber"]');
    this.verifyAccount = page.locator('[name="verifyAccount"]');
    this.amount = page.locator('[name="amount"]');
    this.fromAccountDropdown = page.locator('[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', {name: 'Send Payment'});
    this.successfulMessage = page.locator('#billpayResult p').first();
    this.billPayLink = page.getByRole('link', {name: 'Bill Pay'});
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async gotoBillPaymentPage() {
    await this.step(`go to bill payment page`, async () => {
      await this.billPayLink.click();
    });
  }

  async fillPayeeNameField(value) {
    await this.step('Fill payee name field', async () => {
      await this.payeeName.fill(value);
    });
  }

  async fillAddressField(value) {
    await this.step('Fill address field', async () => {
      await this.address.fill(value);
    });
  }

  async fillCityField(value) {
    await this.step('Fill city field', async () => {
      await this.city.fill(value);
    });
  }

  async fillStateField(value) {
    await this.step('Fill state field', async () => {
      await this.state.fill(value);
    });
  }

  async fillZipField(value) {
    await this.step('Fill ZIP code field', async () => {
      await this.zip.fill(value);
    });
  }

  async fillPhoneField(value) {
    await this.step('Fill phone number field', async () => {
      await this.phone.fill(value);
    });
  }

  async fillAccountField(value) {
    await this.step('Fill account number field', async () => {
      await this.account.fill(value);
    });
  }

  async fillVerifyAccountField(value) {
    await this.step('Fill verify account field', async () => {
      await this.verifyAccount.fill(value);
    });
  }

  async fillAmountField(value) {
    await this.step('Fill amount field', async () => {
      await this.amount.fill(value.toString());
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step('Select from account in dropdown', async () => {
      await this.fromAccountDropdown.selectOption(accountNumber.toString());
    });
  }

  async clickSendPaymentButton() {
    await this.step('Click Send Payment button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertSuccessfulMessage(amount, fromAccount, payeeName) {
    await this.step('Assert successful bill payment message', async () => {
      const expectedMessage = `Bill Payment to ${payeeName} in the amount of $${amount}.00 from account ${fromAccount} was successful.`;

      await expect(this.successfulMessage).toHaveText(expectedMessage);
    });
  }
}
