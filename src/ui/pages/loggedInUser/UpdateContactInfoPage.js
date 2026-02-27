import { expect, testStep } from '../../../common/helpers/pwHelpers';



export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#customer\\.firstName');
    this.lastNameField = page.locator('#customer\\.lastName');
    this.addressStreetField = page.locator('#customer\\.address\\.street');
    this.addressCityField = page.locator('#customer\\.address\\.city');
    this.addressStateField = page.locator('#customer\\.address\\.state');
    this.addressZipCodeField = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberField = page.locator('#customer\\.phoneNumber');
    this.updateProfile = page.getByRole('button', { name: 'Update Profile' });
    this.profileUpdatedHeader = page.getByRole('heading', { name: 'Profile Updated' });
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.updateContactInfo = page.getByRole('link', { name: 'Update Contact Info' });
    this.rightPanel = page.locator('#rightPanel');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateContactInfo() {
    await this.step(`Click the 'Update Contact Info' link`, async () => {
      await this.updateContactInfo.click();
    });
  }

 

  async fillFirstNameField(name) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(name);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressStreetField(addressStreet) {
    await this.step(`Fill the 'Address Street' field`, async () => {
      await this.addressStreetField.fill(addressStreet);
    });
  }
 
  async fillAddressCityFieldField(addressCity) {
    await this.step(`Fill the 'Address City' field`, async () => {
      await this.addressCityField.fill(addressCity);
    });
  }

  async fillAddressStateFieldField(addressState) {
    await this.step(`Fill the 'Address State' field`, async () => {
      await this.addressStateField.fill(addressState);
    });
  }

  async fillAddressZipCodeFieldField(addressZipCode) {
    await this.step(`Fill the 'Address Zip Code' field`, async () => {
      await this.addressZipCodeField.fill(addressZipCode);
    });
  }

  async fillPhoneNumberFieldField(phoneNumber) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.phoneNumberField.fill(phoneNumber);
    });
  }

  
  async clickUpdateProfile() {
    await this.step(`Click the 'Update Profile' button`, async () => {
      await this.updateProfile.click();
      await expect(this.profileUpdatedHeader).toBeVisible({ timeout: 15000 });
    });
  }

  async assertProfileUpdatedHeaderIsVisible() {
    await this.step(`Assert the 'Update Profile' header is visible`, async () => {
      await expect(this.profileUpdatedHeader).toBeVisible({ timeout: 15000 });
    });
  }
   

 

  async clickAccountsOverviewLinkLink() {
    await this.step(`Click the 'Update Contact Info' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }



 

  async assertFirstNameFieldValue(firstName) {
    await this.step(`Assert the 'First Name' field value is "${firstName}"`, async () => {
      await expect(this.firstNameField).toHaveValue(firstName);
    });
  }

  async assertLastNameFieldValue(lastName) {
    await this.step(`Assert the 'First Name' field value is "${lastName}"`, async () => {
      await expect(this.lastNameField).toHaveValue(lastName);
    });
  }

  async assertAddressStreetFieldValue(street) {
    await this.step(`Assert the 'Address Street' field value is "${street}"`, async () => {
      await expect(this.addressStreetField).toHaveValue(street);
    });
  }

  async assertAddressCityFieldValue(city) {
    await this.step(`Assert the 'Address City' field value is "${city}"`, async () => {
      await expect(this.addressCityField).toHaveValue(city);
    });
  }

  async assertAddressStateFieldValue(state) {
    await this.step(`Assert the 'Address State' field value is "${state}"`, async () => {
      await expect(this.addressStateField).toHaveValue(state);
    });
  }

  async assertAddressZipCodeFieldValue(zipCode) {
    await this.step(`Assert the 'Address Zip Code' field value is "${zipCode}"`, async () => {
      await expect(this.addressZipCodeField).toHaveValue(zipCode);
    });
  }

  async assertPhoneNumberFieldValue(phone) {
    await this.step(`Assert the 'Phone Number' field value is "${phone}"`, async () => {
      await expect(this.phoneNumberField).toHaveValue(phone);
    });
  }


}