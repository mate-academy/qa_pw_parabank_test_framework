import * as allure from 'allure-js-commons';
import { expect } from 'allure-playwright';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }
  async step(title, stepToRun) {
    return await allure.step(title, stepToRun);
  }
  async fillPayeeName(user1, page = this.page) {
    await this.step(`Fill Payee name field`, async () => {
      await page.locator('input[name="payee\\.name"]').fill(user1.username);
    });
  }
  async fillAddressField(user1, page = this.page) {
    await this.step(`Fill Address field`, async () => {
      await page
        .locator('input[name="payee\\.address\\.street"]')
        .fill(user1.address);
    });
  }
  async fillCityField(user1, page = this.page) {
    await this.step(`Fill City field`, async () => {
      await page
        .locator('input[name="payee\\.address\\.city"]')
        .fill(user1.city);
    });
  }
  async fillStateField(user1, page = this.page) {
    await this.step(`Fill State field`, async () => {
      await page
        .locator('input[name="payee\\.address\\.state"]')
        .fill(user1.state);
    });
  }
  async fillZipCodeField(user1, page = this.page) {
    await this.step(`Fill Zip code field`, async () => {
      await page
        .locator('input[name="payee\\.address\\.zipCode"]')
        .fill(user1.zipCode);
    });
  }
  async fillPhoneNumberField(user1, page = this.page) {
    await this.step(`Fill phone number field`, async () => {
      await page.locator('input[name="payee\\.phoneNumber"]').fill(user1.phone);
    });
  }
  async fillAmountField(amount = '100', page = this.page) {
    await this.step(`Fill amount field: ${amount}`, async () => {
      await page.locator('input[name="amount"]').fill(String(amount));
    });
  }
  async clickSendPaymentButton(page = this.page) {
    await this.step(`Click Send Payment button`, async () => {
      await page.getByRole('button', { name: 'Send Payment' }).click();
    });
  }
  async fillAccountNumberField(user1AccountId, page = this.page) {
    await this.step(`Fill account id field`, async () => {
      await page
        .locator('input[name="payee\\.accountNumber"]')
        .fill(user1AccountId);
    });
  }
  async fillVeryAccountNumberField(user1AccountId, page = this.page) {
    await this.step(`Fill very account id field`, async () => {
      await page.locator('input[name="verifyAccount"]').fill(user1AccountId);
    });
  }
  async assertBillPaymentCompleted(page = this.page) {
    await this.step(`assert bill payment complete`, async () => {
      await expect(
        page.getByRole('heading', { name: 'Bill Payment Complete' }),
      ).toBeVisible();
    });
  }
}
