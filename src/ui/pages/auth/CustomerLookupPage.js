import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import {
  CUSTOMER_LOOKUP_SUCCESS_MESSAGE,
  CUSTOMER_NOT_FOUND_ERROR,
} from '../../../common/constants/authMessages';

export class CustomerLookupPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Customer Lookup' });
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.streetInput = page.locator('[id="address\\.street"]');
    this.cityInput = page.locator('[id="address\\.city"]');
    this.stateInput = page.locator('[id="address\\.state"]');
    this.zipCodeInput = page.locator('[id="address\\.zipCode"]');
    this.ssnInput = page.locator('#ssn');
    this.findMyLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.notFoundText = page.getByText(CUSTOMER_NOT_FOUND_ERROR);
    this.successText = page.getByText(CUSTOMER_LOOKUP_SUCCESS_MESSAGE);
  }

  fieldError(message) {
    return this.page.getByText(message);
  }

  usernameResultText(username) {
    return this.page.getByText(`Username: ${username}`);
  }

  passwordResultText(password) {
    return this.page.getByText(`Password: ${password}`);
  }

  async open() {
    await this.step('Open Customer Lookup page', async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step('Click Find My Login Info button', async () => {
      await this.findMyLoginInfoButton.click();
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

  async fillSsn(value) {
    await this.step(`Fill SSN with "${value}"`, async () => {
      await this.ssnInput.fill(value);
    });
  }

  async assertOpened() {
    await this.step('Assert Customer Lookup page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertFieldError(message) {
    await this.step(`Assert field error "${message}"`, async () => {
      await expect(this.fieldError(message)).toBeVisible();
    });
  }

  async assertNotFound() {
    await this.step('Assert customer not found', async () => {
      await expect(this.errorHeading).toBeVisible();
      await expect(this.notFoundText).toBeVisible();
    });
  }

  async assertLoginInfoFound(username, password) {
    await this.step(`Assert login info found for "${username}"`, async () => {
      await expect(this.successText).toBeVisible();
      await expect(this.usernameResultText(username)).toBeVisible();
      await expect(this.passwordResultText(password)).toBeVisible();
    });
  }
}
