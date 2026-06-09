import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class UpdateInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');
    this.updateInfoButton = page.getByRole('button',
      { name: 'Update Profile' });

  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneField.fill(phone);
    });
  }

  async clickUpdateInfoButton() {
    await this.step(`Click on Update Info button`, async () => {
      await this.updateInfoButton.click();
    });
  }

  async assertSuccessTextShown() {
    await this.step(`Assert that profile is updated`, async () => {
      await expect(
        this.page.getByText(
          'Your updated address and phone ' +
          'number have been added to the system. ',
        ),
      ).toBeVisible();
    });
  }
}
