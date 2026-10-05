import { expect, testStep } from '../../../common/helpers/pwHelpers';

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
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.billPaymentCompleteHeading = page.getByRole('heading', { name: 'Bill Payment Complete' });
    this.payeeNameResult = page.locator('#payeeName');
    this.amountResult = page.locator('#amount');
    this.fromAccountIdResult = page.locator('#fromAccountId');
  
 
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "Bill Pay" page`, async () => {
      await this.page.goto('/parabank/billpay.htm');
    });
  }

  async fillForm(payeeData) {
    await this.step('Fill bill pay form', async () => {
      await this.payeeNameField.fill(payeeData.firstName + ' ' + payeeData.lastName);
      await this.addressField.fill(payeeData.address);
      await this.cityField.fill(payeeData.city);
      await this.stateField.fill(payeeData.state);
      await this.zipCodeField.fill(payeeData.zipCode);
      await this.phoneField.fill(payeeData.phone);
      await this.accountNumberField.fill(payeeData.accountNumber);
      await this.verifyAccountNumberField.fill(payeeData.verifyAccountNumber);
      await this.amountField.fill(payeeData.amount);
      await this.fromAccountDropdown.selectOption({ index: 0 });
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click "Send Payment" button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertPaymentComplete() {
    await this.step(`Assert payment complete`, async () => {
      await expect(this.billPaymentCompleteHeading).toBeVisible();
      await expect(this.payeeNameResult).toBeVisible();
      await expect(this.amountResult).toBeVisible();
      await expect(this.fromAccountIdResult).toBeVisible(); 
    });
  }

  async assertErrorMessageIsShown(expectedError) {
  await this.step(`Assert error message is shown`, async () => {
    const errorMessage = this.page.locator('.error:visible').filter({ hasText: expectedError });
    await expect(errorMessage).toBeVisible();
  });
}
}