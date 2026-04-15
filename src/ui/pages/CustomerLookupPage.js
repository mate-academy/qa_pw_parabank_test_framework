import { expect, testStep } from '../../common/helpers/pwHelpers';

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="firstName"]');
    this.lastNameField = page.locator('[id="lastName"]');
    this.addressField = page.locator('[id="address.street"]');
    this.cityField = page.locator('[id="address.city"]');
    this.stateField = page.locator('[id="address.state"]');
    this.zipCodeField = page.locator('[id="address.zipCode"]');
    this.ssnField = page.locator('[id="ssn"]');
    this.findMyLoginInfoButton = page.getByRole('button', { name: 'Find My Login Info' });

    this.firstNameError  = page.locator('[id="firstName.errors"]');
    this.lastNameError   = page.locator('[id="lastName.errors"]');
    this.addressError    = page.locator('[id="address.street.errors"]');
    this.cityError       = page.locator('[id="address.city.errors"]');
    this.stateError      = page.locator('[id="address.state.errors"]');
    this.zipCodeError    = page.locator('[id="address.zipCode.errors"]');
    this.ssnError        = page.locator('[id="ssn.errors"]');

    this.logoutButton = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Registration' page`, async () => {
      await this.page.goto('/parabank/register.htm', { waitUntil: 'domcontentloaded' });
    });
  }
  getLoginMessage(messageText) {
    return this.page.getByText(messageText);
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

  async clickFindMyLoginInfoButton() {
    await this.step(`Click the 'Find My Login Info' button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

  async assertFirstNameErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.firstNameError).toContainText(messageText);
    });
  }

  async assertLastNameErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.lastNameError).toContainText(messageText);
    });
  }

  async assertAddressErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.addressError).toContainText(messageText);
    });
  }

  async assertCityErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.cityError).toContainText(messageText);
    });
  }

  async assertStateErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.stateError).toContainText(messageText);
    });
  }

  async assertZipCodeErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.zipCodeError).toContainText(messageText);
    });
  }

  async assertSsnErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.ssnError).toContainText(messageText);
    });
  }

  async assertLoginMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.getLoginMessage(messageText)).toContainText(messageText);
    });
  }
}