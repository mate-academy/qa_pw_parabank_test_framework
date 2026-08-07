import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import {
  ACCOUNT_ACCESS_DENIED_ERROR,
  UPDATE_PROFILE_SUCCESS_MESSAGE,
} from '../../../common/constants/account/accountMessages';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Update Profile' });
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.streetInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberInput = page.locator('#customer\\.phoneNumber');
    this.firstNameError = page.locator('#firstName-error');
    this.lastNameError = page.locator('#lastName-error');
    this.streetError = page.locator('#street-error');
    this.cityError = page.locator('#city-error');
    this.stateError = page.locator('#state-error');
    this.zipCodeError = page.locator('#zipCode-error');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.successHeading = page.getByRole('heading', { name: 'Profile Updated' });
    this.successText = page.getByText(UPDATE_PROFILE_SUCCESS_MESSAGE);
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.errorText = page.getByText(ACCOUNT_ACCESS_DENIED_ERROR);
  }

  async open() {
    await this.step('Open Update Profile page', async () => {
      await this.page.goto('/parabank/updateprofile.htm');
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

  async clickUpdateProfileButton() {
    await this.step('Click Update Profile button', async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Update Profile page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertFieldValues({
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode,
    phoneNumber,
  }) {
    await this.step('Assert profile field values', async () => {
      await expect(this.firstNameInput).toHaveValue(firstName);
      await expect(this.lastNameInput).toHaveValue(lastName);
      await expect(this.streetInput).toHaveValue(street);
      await expect(this.cityInput).toHaveValue(city);
      await expect(this.stateInput).toHaveValue(state);
      await expect(this.zipCodeInput).toHaveValue(zipCode);
      await expect(this.phoneNumberInput).toHaveValue(phoneNumber);
    });
  }

  async assertUpdateSuccessful() {
    await this.step('Assert profile update was successful', async () => {
      await expect(this.successHeading).toBeVisible();
      await expect(this.successText).toBeVisible();
    });
  }

  async assertFieldError(fieldError, message) {
    await this.step(`Assert field error "${message}"`, async () => {
      await expect(fieldError).toHaveText(message);
    });
  }
}
