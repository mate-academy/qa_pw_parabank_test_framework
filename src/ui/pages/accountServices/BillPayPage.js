import {expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, BILL_PAY_ERROR_MESSAGES, BILL_PAY_ERROR_ID_MAP } from '../../../constants/index.js';
import { checkInvalidAmountValidation, hasValidationErrors } from '../../../common/helpers/validationHelpers';

export class BillPayPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.title = page.locator('#rightPanel h1.title').first();
    
    this.payeeNameInput = page.locator('[name="payee.name"]');
    this.addressInput = page.locator('[name="payee.address.street"]');
    this.cityInput = page.locator('[name="payee.address.city"]');
    this.stateInput = page.locator('[name="payee.address.state"]');
    this.zipCodeInput = page.locator('[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('[name="payee.accountNumber"]');
    this.verifyAccountNumberInput = page.locator('[name="verifyAccount"]');
    this.amountInput = page.locator('[name="amount"]');
    this.fromAccountSelect = page.locator('[name="fromAccountId"]');

    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    
    this.errorMessage = page.locator('[id="rightPanel"] p.error');
    this.successTitle = page.locator('#billpayResult h1.title');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Bill Pay page`, async () => {
      await this.page.goto('/parabank/billpay.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }
  
  async fillPayeeNameInput(payeeName) {
    await this.step(`Fill Payee Name input`, async () => {
      await this.payeeNameInput.fill(payeeName);
    });
  }

  async fillAddressInput(address) {
    await this.step(`Fill Address input`, async () => {
      await this.addressInput.fill(address);
    });
  }

  async fillCityInput(city) {
    await this.step(`Fill City input`, async () => {
      await this.cityInput.fill(city);
    });
  }

  async fillStateInput(state) {
    await this.step(`Fill State input`, async () => {
      await this.stateInput.fill(state);
    });
  }

  async fillZipCodeInput(zipCode) {
    await this.step(`Fill Zip Code input`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  async fillPhoneNumberInput(phoneNumber) {
    await this.step(`Fill Phone Number input`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  async fillAccountNumberInput(accountNumber) {
    await this.step(`Fill Account Number input`, async () => {
      await this.accountNumberInput.fill(accountNumber);
    });
  }

  async fillVerifyAccountNumberInput(verifyAccountNumber) {
    await this.step(`Fill Verify Account Number input`, async () => {
      await this.verifyAccountNumberInput.fill(verifyAccountNumber);
    });
  }

  async fillAmountInput(amount) {
    await this.step(`Fill Amount input`, async () => {
      await this.amountInput.fill(amount);
    });
  }

  async fillFromAccountSelect(fromAccount) {
    await this.step(`Fill From Account input`, async () => {
      await this.fromAccountSelect.selectOption(fromAccount);
    });
  }

  async fillBillPayForm(payeeData, amount = null, exceptField = null) {
    await this.step(`Fill bill pay form (except: ${exceptField || 'none'})`, async () => {
      if (exceptField !== 'payeeName') await this.fillPayeeNameInput(payeeData.payeeName);
      if (exceptField !== 'address') await this.fillAddressInput(payeeData.address);
      if (exceptField !== 'city') await this.fillCityInput(payeeData.city);
      if (exceptField !== 'state') await this.fillStateInput(payeeData.state);
      if (exceptField !== 'zipCode') await this.fillZipCodeInput(payeeData.zipCode);
      if (exceptField !== 'phoneNumber') await this.fillPhoneNumberInput(payeeData.phoneNumber);
      if (exceptField !== 'accountNumber') {
        await this.fillAccountNumberInput(payeeData.accountNumber);
        await this.fillVerifyAccountNumberInput(payeeData.accountNumber);
      }
      if (exceptField !== 'amount' && amount !== null) await this.fillAmountInput(amount);
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click Send Payment button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.sendPaymentButton.click(),
      ]);
    });
  }

  async assertErrorMessageContainsText(fieldNameError) {
    await this.step(`Assert validation error for ${fieldNameError}`, async () => {
      this.logger?.debug(`Checking validation error for field: ${fieldNameError}`);
      
      const errorId = BILL_PAY_ERROR_ID_MAP[fieldNameError];
      const errorLocator = errorId 
        ? this.page.locator(`#${errorId}`)
        : this.errorMessage;
      
      await expect(errorLocator).toBeVisible();
      this.logger?.debug(`Validation error confirmed for field: ${fieldNameError}`);
    });
  }

  async assertSuccessTitleContainsText() {
    const titleText = PAGE_TITLES.BILL_PAY_SUCCESS;
    await this.step(`Assert the '${titleText}' title is shown`, async () => {
      await expect(this.successTitle).toContainText(titleText);
    });
  }

  async assertBillPaymentFailedWithInvalidAmount(amount) {
    await this.step(`Assert bill payment FAILED with invalid amount: ${amount}`, async () => {
      await checkInvalidAmountValidation(
        this.page,
        this.successTitle,
        amount,
        this.logger,
        'bill payment'
      );
      
      const hasValidation = await hasValidationErrors(this.page);
      const hasError = await this.errorMessage.isVisible().catch(() => false);
      
      expect(hasError || hasValidation).toBe(true);
    });
  }
}
