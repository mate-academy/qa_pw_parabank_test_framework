import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });

    this.updateProfileTitle = page.getByRole('heading', {
      name: 'Update Profile',
    });

    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberInput = page.locator('#customer\\.phoneNumber');

    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });

    this.profileUpdatedTitle = page.getByRole('heading', {
      name: 'Profile Updated',
    });

    this.successMessage = page.getByText(
      'Your updated address and phone number have been added to the system.',
    );

    this.firstNameError = page.locator('#firstName-error');
    this.lastNameError = page.locator('#lastName-error');
    this.addressError = page.locator('#street-error');
    this.cityError = page.locator('#city-error');
    this.stateError = page.locator('#state-error');
    this.zipCodeError = page.locator('#zipCode-error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateContactInfoLink() {
    await this.step(`Click 'Update Contact Info' link`, async () => {
      await this.updateContactInfoLink.click();
    });
  }

  async assertUpdateProfileTitleIsVisible() {
    await this.step(`Assert 'Update Profile' title is visible`, async () => {
      await expect(this.updateProfileTitle).toBeVisible();
    });
  }

  async fillFirstNameInput(firstName) {
    await this.step(`Fill 'First Name' field`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastNameInput(lastName) {
    await this.step(`Fill 'Last Name' field`, async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillAddressInput(address) {
    await this.step(`Fill 'Address' field`, async () => {
      await this.addressInput.fill(address);
    });
  }

  async fillCityInput(city) {
    await this.step(`Fill 'City' field`, async () => {
      await this.cityInput.fill(city);
    });
  }

  async fillStateInput(state) {
    await this.step(`Fill 'State' field`, async () => {
      await this.stateInput.fill(state);
    });
  }

  async fillZipCodeInput(zipCode) {
    await this.step(`Fill 'Zip Code' field`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  async fillPhoneNumberInput(phoneNumber) {
    await this.step(`Fill 'Phone Number' field`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertProfileUpdatedSuccessfully() {
    await this.step(`Assert profile was updated successfully`, async () => {
      await expect(this.profileUpdatedTitle).toBeVisible();
      await expect(this.successMessage).toBeVisible();
    });
  }

  async assertFirstNameErrorContainsText(message) {
    await this.step(`Assert first name error`, async () => {
      await expect(this.firstNameError).toContainText(message);
    });
  }

  async assertLastNameErrorContainsText(message) {
    await this.step(`Assert last name error`, async () => {
      await expect(this.lastNameError).toContainText(message);
    });
  }

  async assertAddressErrorContainsText(message) {
    await this.step(`Assert address error`, async () => {
      await expect(this.addressError).toContainText(message);
    });
  }

  async assertCityErrorContainsText(message) {
    await this.step(`Assert city error`, async () => {
      await expect(this.cityError).toContainText(message);
    });
  }

  async assertStateErrorContainsText(message) {
    await this.step(`Assert state error`, async () => {
      await expect(this.stateError).toContainText(message);
    });
  }

  async assertZipCodeErrorContainsText(message) {
    await this.step(`Assert zip code error`, async () => {
      await expect(this.zipCodeError).toContainText(message);
    });
  }
}
