import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.fromAccount = this.page.getByRole('combobox');
    this.sendPaymentButton = this.page.getByRole('button', {
      name: 'Send Payment',
    });
    this.payeeName = this.page.locator('#payeeName');
    this.heading = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
    this.amount = this.page.locator('#amount');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  locator(name) {
    return this.page.locator(`input[name="${name}"]`);
  }

  async selectFirstAccount() {
    await this.step('Select the first available account', async () => {
      await this.fromAccount.selectOption({ index: 0 });
    });
  }

  async enterPayeeInformation(name, value) {
    await this.step(`Fill the '${name}' field`, async () => {
      await this.locator(name).fill(value);
    });
  }

  async clickSendPayment() {
    await this.step(`Click 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async verifyHeadingIsVisible() {
    await this.step(`Assert the 'Heading' is visible`, async () => {
      await expect(this.heading).toBeVisible();
    });
  }
  async verifyPayeeNameIsVisible(payeeName) {
    await this.step(`Assert the 'PayeeName' is visible`, async () => {
      await expect(this.payeeName).toHaveText(payeeName);
    });
  }
  async verifyBillPaySuccess(amount) {
    await this.step(`Assert the 'Bill Amount' is executed`, async () => {
      await expect(this.amount).toHaveText(amount);
    });
  }
}
