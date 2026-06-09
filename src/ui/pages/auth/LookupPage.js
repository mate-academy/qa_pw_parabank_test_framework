import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class LookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.findButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('[id="address.street"]');
    this.cityField = page.locator('[id="address.city"]');
    this.stateField = page.locator('[id="address.state"]');
    this.zipCodeField = page.locator('[id="address.zipCode"]');
    this.phoneField = page.locator('[name="customer.phoneNumber"]');
    this.ssnField = page.locator('#ssn');

    this.welcomeText = page.getByRole('heading', { level: 1 });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickFindButton() {
    await this.step(`Click on Find button`, async () => {
      await this.findButton.click();
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async assertUsernameTextVisible(username) {
    await this.step(`Assert the username is displayed`, async () => {
      await expect(this.page.getByText(`Username: ${username}`)).toBeVisible();
    });
  }

  async assertPasswordTextVisible(password) {
    await this.step(`Assert the password is displayed`, async () => {
      await expect(this.page.getByText(`Password: ${password}`)).toBeVisible();
    });
  }
}
