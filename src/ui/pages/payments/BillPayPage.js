import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.billPayLink = page.getByRole('link', {
      name: 'Bill Pay',
    });
    this.billPayHeading = page.getByRole('heading', {
      name: 'Bill Payment Service',
    });
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', {
      name: 'Send Payment',
    });
    this.successHeading = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await this.step('Open the bill payment page', async () => {
      await this.billPayLink.click();
      await expect(this.billPayHeading).toBeVisible();
    });
  }

  async fillPaymentForm(paymentData) {
    return await this.step('Fill in the bill payment form', async () => {
      await expect(this.fromAccountSelect).not.toHaveValue('');

      const fromAccountId = await this.fromAccountSelect.inputValue();

      await this.payeeNameInput.fill(paymentData.payeeName);
      await this.addressInput.fill(paymentData.address);
      await this.cityInput.fill(paymentData.city);
      await this.stateInput.fill(paymentData.state);
      await this.zipCodeInput.fill(paymentData.zipCode);
      await this.phoneNumberInput.fill(paymentData.phoneNumber);
      await this.accountNumberInput.fill(paymentData.accountNumber);
      await this.verifyAccountInput.fill(paymentData.verifiedAccountNumber);
      await this.amountInput.fill(paymentData.amount);
      await this.fromAccountSelect.selectOption(fromAccountId);

      return fromAccountId;
    });
  }

  async submitPayment() {
    await this.step('Submit the bill payment', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertPaymentIsSuccessful(paymentData, fromAccountId) {
    await this.step('Verify that the bill payment is successful', async () => {
      await expect(this.successHeading).toBeVisible();
      await expect(this.rightPanel).toContainText(paymentData.payeeName);
      await expect(this.rightPanel).toContainText(`$${paymentData.amount}`);
      await expect(this.rightPanel).toContainText(fromAccountId);
    });
  }
}
