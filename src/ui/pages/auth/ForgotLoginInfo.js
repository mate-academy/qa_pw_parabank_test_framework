import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginInfo{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressStreetField = page.locator('#address\\.street');
    this.addressCityField = page.locator('#address\\.city');
    this.addressStateField = page.locator('#address\\.state');
    this.addressZipCodeField = page.locator('#address\\.zipCode');
    this.ssnField = page.locator('#ssn');
    this.findMyLoginInfoButton = page.getByRole('button', { name: 'Find My Login Info' });
    this.loginWasLocated = page.locator('#rightPanel').getByText('Your login information was located successfully.');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Forgot Login Info' page`, async () => {
      await this.page.goto('lookup.htm');
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
 
  async fillAddressCityField(addressCity) {
    await this.step(`Fill the 'Address City' field`, async () => {
      await this.addressCityField.fill(addressCity);
    });
  }

  async fillAddressStateField(addressState) {
    await this.step(`Fill the 'Address State' field`, async () => {
      await this.addressStateField.fill(addressState);
    });
  }

  async fillAddressZipCodeField(addressZipCode) {
    await this.step(`Fill the 'Address Zip Code' field`, async () => {
      await this.addressZipCodeField.fill(addressZipCode);
    });
  }

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`Click the 'Find My Login Info' button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

   

  async assertLoginWasLocatedIsVisible() {
    await this.step(`Assert the 'Your login information was located successfully.' is visible`, async () => {
      await expect(this.loginWasLocated).toBeVisible();
    });
  }
}