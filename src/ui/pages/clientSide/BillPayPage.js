import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeNameInput       = page.locator('input[name="payee.name"]');
    this.addressInput         = page.locator('input[name="payee.address.street"]');
    this.cityInput            = page.locator('input[name="payee.address.city"]');
    this.stateInput           = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput         = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberInput     = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput   = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput   = page.locator('input[name="verifyAccount"]');
    this.amountInput          = page.locator('input[name="amount"]');
    this.fromAccountSelect    = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton    = page.getByRole('button', { name: 'Send Payment' });

    this.errorName            = page.locator('#validationModel-name');
    this.errorAddress         = page.locator('#validationModel-address');
    this.errorCity            = page.locator('#validationModel-city');
    this.errorState           = page.locator('#validationModel-state');
    this.errorZipCode         = page.locator('#validationModel-zipCode');
    this.errorPhone           = page.locator('#validationModel-phoneNumber');
    this.errorAccountNumberEmpty   = page.locator('#validationModel-account-empty');
    this.errorAccountNumberInvalid = page.locator('#validationModel-account-invalid');
    this.errorAccountNumberMismatch = page.locator('#validationModel-account-mismatch');
    this.errorVerifyAccountEmpty   = page.locator('#validationModel-verifyAccount-empty');
    this.errorVerifyAccountInvalid = page.locator('#validationModel-verifyAccount-invalid');
    this.errorVerifyAccountMismatch = page.locator('#validationModel-verifyAccount-mismatch');
    this.errorAmountEmpty     = page.locator('#validationModel-amount-empty');
    this.errorAmountInvalid   = page.locator('#validationModel-amount-invalid');
    
    this.resultContainer      = page.locator('#billpayResult');
    this.resultPayeeName      = page.locator('#payeeName');
    this.resultAmount         = page.locator('#billpayResult #amount');
    this.resultFromAccountId  = page.locator('#billpayResult #fromAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Registration' page`, async () => {
      await this.page.goto('/parabank/billpay.htm', { waitUntil: 'domcontentloaded' });
    });
  }
  async fillAccountNumber(accountNumber) {
    await this.step(`Fill account number`, async () => {
      await this.accountNumberInput.fill(accountNumber);
    });
  }
  async fillVerifyAccountNumber(verifyAccountNumber) {
    await this.step(`Fill verify account number`, async () => {
      await this.verifyAccountInput.fill(verifyAccountNumber);
    });
  }
  async fillAmount(amount) {
    await this.step(`Fill amount`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }
  async fillBillPayForm(payeeData, fromAccountId, toAccountId, amount) {
    await this.step(`Fill Bill Pay form for ${payeeData.name}`, async () => {
      await this.payeeNameInput.fill(payeeData.firstName);
      await this.addressInput.fill(payeeData.address);
      await this.cityInput.fill(payeeData.city);
      await this.stateInput.fill(payeeData.state);
      await this.zipCodeInput.fill(payeeData.zipCode);
      await this.phoneNumberInput.fill(payeeData.phone);
      await this.accountNumberInput.fill(toAccountId);
      await this.verifyAccountInput.fill(toAccountId);
      await this.amountInput.fill(String(amount));
      
      if (fromAccountId) {
        await this.fromAccountSelect.selectOption({ value: String(fromAccountId) });
      }
    });
  }

  async clickSendPayment() {
    return await this.step("Click 'Send Payment' button", async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertPaymentSuccess(payeeName, amount, fromAccountId) {
    await this.step(`Assert payment to ${payeeName} was successful`, async () => {
      await expect(this.resultContainer).toBeVisible();
      await expect(this.resultPayeeName).toHaveText(payeeName);
      await expect(this.resultAmount).toContainText(String(amount));
      await expect(this.resultFromAccountId).toContainText(String(fromAccountId));
    });
  }

  async assertErrorMessage(locator, expectedText) {
    await this.step(`Assert error message "${expectedText}" is visible`, async () => {
      await expect(locator).toBeVisible();
      await expect(locator).toHaveText(expectedText);
    });
  }
  async assertEmptyPayeeNameErrorMessage(messageText) {
    await this.step(`Assert empty payee name error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorName, messageText);
    });
  }
  async assertEmptyAddressErrorMessage(messageText) {
    await this.step(`Assert empty address error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAddress, messageText);
    });
  }
  async assertEmptyCityErrorMessage(messageText) {
    await this.step(`Assert empty city error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorCity, messageText);
    });
  }
  async assertEmptyStateErrorMessage(messageText) {
    await this.step(`Assert empty state error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorState, messageText);
    });
  }
  async assertEmptyZipCodeErrorMessage(messageText) {
    await this.step(`Assert empty zip code error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorZipCode, messageText);
    });
  }
  async assertEmptyPhoneErrorMessage(messageText) {
    await this.step(`Assert empty phone error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorPhone, messageText);
    });
  }
  async assertEmptyAccountNumberErrorMessage(messageText) {
    await this.step(`Assert empty account number error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAccountNumberEmpty, messageText);
    });
  }
  async assertEmptyVerifyAccountErrorMessage(messageText) {
    await this.step(`Assert empty verify account error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorVerifyAccountEmpty, messageText);
    });
  }
  async assertEmptyAmountErrorMessage(messageText) {
    await this.step(`Assert empty amount error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAmountEmpty, messageText);
    });
  }
  async assertInvalidAccountNumberErrorMessage(messageText) {
    await this.step(`Assert invalid account number error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAccountNumberInvalid, messageText);
    });
  }
  async assertInvalidVerifyAccountErrorMessage(messageText) {
    await this.step(`Assert invalid verify account error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorVerifyAccountInvalid, messageText);
    });
  }
  async assertInvalidAmountErrorMessage(messageText) {
    await this.step(`Assert invalid amount error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAmountInvalid, messageText);
    });
  }
  async assertAccountNumberMismatchErrorMessage(messageText) {
    await this.step(`Assert account number mismatch error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorAccountNumberMismatch, messageText);
    });
  }
  async assertVerifyAccountNumberMismatchErrorMessage(messageText) {
    await this.step(`Assert verify account number mismatch error message "${messageText}" is visible`, async () => {
      await this.assertErrorMessage(this.errorVerifyAccountMismatch, messageText);
    });
  }
}
