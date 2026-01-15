import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { REGISTER_ERROR_MESSAGES, REGISTER_SUCCESS_MESSAGES } from '../../../constants/index.js';
import { getFieldErrorLocator } from '../../../common/helpers/validationHelpers';
import { fillFormExcept } from '../../../common/helpers/formHelpers';

export class RegisterPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;

    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('[id="repeatedPassword"]');
    
    this.registerButton = page.getByRole('button', { name: 'Register' });
    
    this.registrationSuccessMessage = page
      .locator('#rightPanel p')
      .filter({ hasText: 'successfully' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Register page`, async () => {
      await this.page.goto('/parabank/register.htm');
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

  async fillPhoneNumberInput(phoneNumber) {
    await this.step(`Fill Phone Number input`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  async fillSsnInput(ssn) {
    await this.step(`Fill SSN input`, async () => {
      await this.ssnInput.fill(ssn);
    });
  }

  async fillUsernameInput(username) {
    await this.step(`Fill Username input`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPasswordInput(password) {
    await this.step(`Fill Password input`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async fillConfirmPasswordInput(confirmPassword) {
    await this.step(`Fill Confirm Password input`, async () => {
      await this.confirmPasswordInput.fill(confirmPassword);
    });
  }

  async fillRegistrationForm(userData) {
    await this.step('Fill registration form', async () => {
      await this.fillFirstNameInput(userData.firstName);
      await this.fillLastNameInput(userData.lastName);
      await this.fillAddressInput(userData.address);
      await this.fillCityInput(userData.city);
      await this.fillStateInput(userData.state);
      await this.fillZipCodeInput(userData.zipCode);
      await this.fillPhoneNumberInput(userData.phoneNumber);
      await this.fillSsnInput(userData.ssn);
      await this.fillUsernameInput(userData.username);
      await this.fillPasswordInput(userData.password);
      await this.fillConfirmPasswordInput(userData.password);
    });
  }

  async fillRegistrationFormExcept(userData, exceptField) {
    await this.step(`Fill registration form except ${exceptField}`, async () => {
      this.logger?.debug(`Filling registration form, skipping field: ${exceptField}`);
      
      const fieldMap = {
        firstName: (val) => this.fillFirstNameInput(val),
        lastName: (val) => this.fillLastNameInput(val),
        address: (val) => this.fillAddressInput(val),
        city: (val) => this.fillCityInput(val),
        state: (val) => this.fillStateInput(val),
        zipCode: (val) => this.fillZipCodeInput(val),
        phoneNumber: (val) => this.fillPhoneNumberInput(val),
        ssn: (val) => this.fillSsnInput(val),
        username: (val) => this.fillUsernameInput(val),
        password: (val) => this.fillPasswordInput(val),
        confirmPassword: (val) => this.fillConfirmPasswordInput(val || userData.password),
      };
      
      await fillFormExcept(fieldMap, userData, exceptField);
      this.logger?.debug(`Registration form filled successfully`);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click Register button`, async () => {
      await this.registerButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertErrorMessageContainsText(fieldNameError) {
    const messageText = REGISTER_ERROR_MESSAGES[fieldNameError];
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      const errorLocator = getFieldErrorLocator(this.page, fieldNameError, 'customer.');
      await expect(errorLocator).toContainText(messageText);
    });
  }

  async assertRegistrationSuccess() {
    const expectedMessage = REGISTER_SUCCESS_MESSAGES.REGISTRATION_SUCCESS;
    await this.step(`Assert registration success`, async () => {
      const successMessage = this.registrationSuccessMessage;
      await expect(successMessage).toContainText(expectedMessage);
    });
  }


  async assertPasswordMismatchError() {
    await this.step('Assert password mismatch error is shown', async () => {
      const errorLocator = getFieldErrorLocator(this.page, 'confirmPassword');
      await expect(errorLocator).toContainText('Passwords did not match.');
    });
  }
}
