import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('input[name="customer.firstName"]');
    this.lastNameField = page.locator('input[name="customer.lastName"]');
    this.streetField = page.locator('input[name="customer.address.street"]');
    this.cityField = page.locator('input[name="customer.address.city"]');
    this.stateField = page.locator('input[name="customer.address.state"]');
    this.zipCodeField = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumberField = page.locator('input[name="customer.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });

    this.successTitle = page.locator('#updateProfileResult h1.title');
    this.successMessage = page.locator('#updateProfileResult p');
    this.errorMessage = page.locator('#updateProfileError');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillFirstNameField(value) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(value);
    });
  }

  async fillLastNameField(value) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(value);
    });
  }

  async fillStreetField(value) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.streetField.fill(value);
    });
  }

  async fillCityField(value) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(value);
    });
  }

  async fillStateField(value) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(value);
    });
  }

  async fillZipCodeField(value) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(value);
    });
  }

  async fillPhoneNumberField(value) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.phoneNumberField.fill(value);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click the 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async submitContactInfoForm(customer) {
    if (customer.firstName != null)
      await this.fillFirstNameField(customer.firstName);
    if (customer.lastName != null)
      await this.fillLastNameField(customer.lastName);
    if (customer.street != null) await this.fillStreetField(customer.street);
    if (customer.city != null) await this.fillCityField(customer.city);
    if (customer.state != null) await this.fillStateField(customer.state);
    if (customer.zipCode != null) await this.fillZipCodeField(customer.zipCode);
    if (customer.phoneNumber != null)
      await this.fillPhoneNumberField(customer.phoneNumber);
    await this.clickUpdateProfileButton();
  }

  async assertProfileUpdatedSuccessfully() {
    await this.step(`Assert the profile was updated successfully`, async () => {
      await expect(this.successTitle).toHaveText('Profile Updated');
      await expect(this.successMessage).toBeVisible();
    });
  }

  async assertFieldErrorIsVisible(field, message) {
    await this.step(
      `Assert '${field}' field error is '${message}'`,
      async () => {
        await expect(this.page.locator(`#${field}-error`)).toHaveText(message);
      },
    );
  }
}
