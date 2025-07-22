import { expect, testStep } from '../../common/helpers/pwHelpers';

export class CustomerLookupPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('#address\\.street');
    this.cityField = page.locator('#address\\.city');
    this.stateField = page.locator('#address\\.state');
    this.zipCodeField = page.locator('#address\\.zipCode');
    this.phoneNumberField = page.locator('#phoneNumber');
    this.SSNField = page.locator('#ssn');
    this.findInfoButton = page.getByRole('button', {name: 'Find My Login Info'});
    this.loginLocatedInfo = page.locator('#rightPanel p').first();
    this.usernameLookUp = page.locator('#rightPanel p').nth(1);
    this.passwordLookUp = page.locator('#rightPanel p').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Costumer lookup' page`, async () => {
      await this.page.goto('lookup.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`fill first name field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`fill last name field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`fill address field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`fill city field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`fill state field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zip) {
    await this.step(`fill zip code field`, async () => {
      await this.zipCodeField.fill(zip);
    });
  }

  async fillSSNField(ssn) {
    await this.step(`fill ssn field`, async () => {
      await this.SSNField.fill(ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`click find my login info button`, async () => {
      await this.findInfoButton.click();
    });
  }

  async assertLoginLocatedInfoText(text) {
    await this.step(`login located info text is visible`, async () => {
      await expect(this.loginLocatedInfo).toHaveText(text);
    });
  }

  async assertUsernameIsVisible(username) {
    await this.step(`assert username is visible`, async () => {
      await expect(this.usernameLookUp).toContainText(username);
    });
  }

  async assertPasswordIsVisible(password) {
    await this.step(`assert password is visible`, async () => {
      await expect(this.passwordLookUp).toContainText(password);
    });
  }
}
