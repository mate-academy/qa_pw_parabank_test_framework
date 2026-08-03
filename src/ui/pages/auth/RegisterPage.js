import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import { REGISTRATION_SUCCESS_MESSAGE } from '../../../common/constants/authMessages';

export class RegisterPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Signing up is easy!' });
    this.firstNameInput = page.locator('[id="customer\\.firstName"]');
    this.lastNameInput = page.locator('[id="customer\\.lastName"]');
    this.streetInput = page.locator('[id="customer\\.address\\.street"]');
    this.cityInput = page.locator('[id="customer\\.address\\.city"]');
    this.stateInput = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeInput = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer\\.ssn"]');
    this.usernameInput = page.locator('[id="customer\\.username"]');
    this.passwordInput = page.locator('[id="customer\\.password"]');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.registrationSuccessText = page.getByText(REGISTRATION_SUCCESS_MESSAGE);
  }

  welcomeHeading(username) {
    return this.page.getByRole('heading', { name: `Welcome ${username}` });
  }

  fieldError(message) {
    return this.page.getByText(message);
  }

  async open() {
    await this.step('Open Register page', async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }

  async clickRegisterButton() {
    await this.step('Click Register button', async () => {
      await this.registerButton.click();
    });
  }

  async fillFirstName(value) {
    await this.step(`Fill First Name with "${value}"`, async () => {
      await this.firstNameInput.fill(value);
    });
  }

  async fillLastName(value) {
    await this.step(`Fill Last Name with "${value}"`, async () => {
      await this.lastNameInput.fill(value);
    });
  }

  async fillStreet(value) {
    await this.step(`Fill Address with "${value}"`, async () => {
      await this.streetInput.fill(value);
    });
  }

  async fillCity(value) {
    await this.step(`Fill City with "${value}"`, async () => {
      await this.cityInput.fill(value);
    });
  }

  async fillState(value) {
    await this.step(`Fill State with "${value}"`, async () => {
      await this.stateInput.fill(value);
    });
  }

  async fillZipCode(value) {
    await this.step(`Fill Zip Code with "${value}"`, async () => {
      await this.zipCodeInput.fill(value);
    });
  }

  async fillPhoneNumber(value) {
    await this.step(`Fill Phone # with "${value}"`, async () => {
      await this.phoneNumberInput.fill(value);
    });
  }

  async fillSsn(value) {
    await this.step(`Fill SSN with "${value}"`, async () => {
      await this.ssnInput.fill(value);
    });
  }

  async fillUsername(value) {
    await this.step(`Fill Username with "${value}"`, async () => {
      await this.usernameInput.fill(value);
    });
  }

  async fillPassword(value) {
    await this.step('Fill Password', async () => {
      await this.passwordInput.fill(value);
    });
  }

  async fillConfirmPassword(value) {
    await this.step('Fill Confirm Password', async () => {
      await this.confirmPasswordInput.fill(value);
    });
  }

  async assertOpened() {
    await this.step('Assert Register page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertRegistrationSuccessful(username) {
    await this.step(`Assert registration successful for "${username}"`, async () => {
      await expect(this.welcomeHeading(username)).toContainText(username);
      await expect(this.registrationSuccessText).toBeVisible();
    });
  }

  async assertFieldError(message) {
    await this.step(`Assert field error "${message}"`, async () => {
      await expect(this.fieldError(message)).toBeVisible();
    });
  }
}
