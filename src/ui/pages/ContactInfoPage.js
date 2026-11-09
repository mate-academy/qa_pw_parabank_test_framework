import { expect, testStep } from '../../common/helpers/pwHelpers';

export class ContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('[id="customer\\.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.textProfileUpdate = page.getByRole('heading', {
      name: 'Profile Updated',
    });
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async fillFirstNameField(user2) {
    await this.step(`Fill first name field`, async () => {
      await this.firstNameField.fill(user2.firstName);
    });
  }
  async fillLastNameField(user2) {
    await this.step(`Fill last name field`, async () => {
      await this.lastNameField.fill(user2.lastName);
    });
  }
  async fillAddressField(user2) {
    await this.step(`Fill Address field`, async () => {
      await this.addressField.fill(user2.address);
    });
  }
  async fillCityField(user2) {
    await this.step(`Fill city field`, async () => {
      await this.cityField.fill(user2.city);
    });
  }
  async fillStateField(user2) {
    await this.step(`Fill state field`, async () => {
      await this.stateField.fill(user2.state);
    });
  }
  async fillZipCodeField(user2) {
    await this.step(`Fill Zip Code Field`, async () => {
      await this.zipCodeField.fill(user2.zipCode);
    });
  }
  async fillPhoneNumberField(user2) {
    await this.step(`Fill Phone number field`, async () => {
      await this.phoneField.fill(user2.phone);
    });
  }
  async clickUpdateProfileButton() {
    await this.step(`Click Update Profile button`, async () => {
      await this.updateProfileButton.click();
    });
  }
  async assertProfileUpdate() {
    await this.step(`Assert text profile update`, async () => {
      await expect(this.textProfileUpdate).toBeVisible();
    });
  }
}
