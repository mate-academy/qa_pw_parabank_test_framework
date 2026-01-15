import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { FORGOT_LOGIN_ERROR_MESSAGES } from '../../../constants/index.js';
import { getFieldErrorLocator } from '../../../common/helpers/validationHelpers';
import { fillFormExcept } from '../../../common/helpers/formHelpers';

export class ForgotLoginPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.title = page.locator('h1.title');
    
    this.firstNameInput = page.locator('[id="firstName"]');
    this.lastNameInput = page.locator('[id="lastName"]');
    this.addressInput = page.locator('[id="address.street"]');
    this.cityInput = page.locator('[id="address.city"]');
    this.stateInput = page.locator('[id="address.state"]');
    this.zipCodeInput = page.locator('[id="address.zipCode"]');
    this.ssnInput = page.locator('[id="ssn"]');
    
    this.findLoginButton = page.getByRole('button', { name: 'Find My Login Info' });
    
    this.errorMessage = page.locator('#rightPanel p.error');
    this.successMessage = page.locator('#rightPanel').locator('text=/successfully/i');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Forgot Login page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async fillFirstNameInput(firstName) {
    await this.step(`Fill First Name input`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastNameInput(lastName) {
    await this.step(`Fill Last Name input`, async () => {
      await this.lastNameInput.fill(lastName);
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

  async fillSsnInput(ssn) {
    await this.step(`Fill SSN input`, async () => {
      await this.ssnInput.fill(ssn);
    });
  }

  async clickFindLoginButton() {
    await this.step(`Click Find My Login Info button`, async () => {
      await this.findLoginButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillLookupForm(userData) {
    await this.step('Fill lookup form', async () => {
      await this.fillFirstNameInput(userData.firstName);
      await this.fillLastNameInput(userData.lastName);
      await this.fillAddressInput(userData.address);
      await this.fillCityInput(userData.city);
      await this.fillStateInput(userData.state);
      await this.fillZipCodeInput(userData.zipCode);
      await this.fillSsnInput(userData.ssn);
    });
  }

  async fillLookupFormExcept(userData, exceptField) {
    await this.step(`Fill lookup form except ${exceptField}`, async () => {
      this.logger?.debug(`Filling lookup form, skipping field: ${exceptField}`);
      
      const fieldMap = {
        firstName: (val) => this.fillFirstNameInput(val),
        lastName: (val) => this.fillLastNameInput(val),
        address: (val) => this.fillAddressInput(val),
        city: (val) => this.fillCityInput(val),
        state: (val) => this.fillStateInput(val),
        zipCode: (val) => this.fillZipCodeInput(val),
        ssn: (val) => this.fillSsnInput(val),
      };
      
      await fillFormExcept(fieldMap, userData, exceptField);
      this.logger?.debug(`Lookup form filled successfully`);
    });
  }

  async assertTitleContainsText() {
    await this.step(`Assert the 'Customer Lookup' title is shown`, async () => {
      await expect(this.title).toContainText('Customer Lookup');
    });
  }

  async assertErrorMessageIsVisible() {
    await this.step(`Assert error message is visible`, async () => {
      await expect(this.errorMessage).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(fieldNameError) {
    const messageText = FORGOT_LOGIN_ERROR_MESSAGES[fieldNameError] || fieldNameError;
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      const errorLocator = getFieldErrorLocator(this.page, fieldNameError);
      await expect(errorLocator).toContainText(messageText);
    });
  }

  async assertSuccessMessageIsVisible() {
    await this.step(`Assert success message is visible`, async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }
}
