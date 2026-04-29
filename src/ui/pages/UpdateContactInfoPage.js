import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
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
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.successTitle = page.getByText('Profile Updated');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Update Contact Info' page`, async () => {
      await this.page.goto('updateprofile.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.clear();
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.clear();
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressField.clear();
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.clear();
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.clear();
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.clear();
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneField.clear();
      await this.phoneField.fill(phone);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click the 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async submitUpdateContactInfoForm(user) {
    await this.step(`Fill and submit the 'Update Contact Info' form`, async () => {
      await this.fillFirstNameField(user.firstName);
      await this.fillLastNameField(user.lastName);
      await this.fillAddressField(user.address);
      await this.fillCityField(user.city);
      await this.fillStateField(user.state);
      await this.fillZipCodeField(user.zipCode);
      await this.fillPhoneField(user.phone);
      await this.clickUpdateProfileButton();
    });
  }

  async assertProfileUpdated() {
    await this.step(`Assert profile was updated successfully`, async () => {
      await expect(this.successTitle).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
