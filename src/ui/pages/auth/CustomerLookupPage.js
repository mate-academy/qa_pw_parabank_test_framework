import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('[id="address.street"]');
    this.cityField = page.locator('[id="address.city"]');
    this.stateField = page.locator('[id="address.state"]');
    this.zipCodeField = page.locator('[id="address.zipCode"]');
    this.ssnField = page.locator('#ssn');
    this.findMyLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.firstNameErrorMessage = page.locator('[id="firstName.errors"]');
    this.lastNameErrorMessage = page.locator('[id="lastName.errors"]');
    this.addressErrorMessage = page.locator('[id="address.street.errors"]');
    this.cityErrorMessage = page.locator('[id="address.city.errors"]');
    this.stateErrorMessage = page.locator('[id="address.state.errors"]');
    this.zipCodeErrorMessage = page.locator('[id="address.zipCode.errors"]');
    this.ssnErrorMessage = page.locator('[id="ssn.errors"]');
    this.submitErrorMessage = page.locator('p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Customer Lookup' page`, async () => {
      await this.page.goto('lookup.htm');
    });
  }

  async fillForm(userData) {
    await this.step(`Fill 'Form' field`, async () => {
      await this.firstNameField.fill(userData.firstName);
      await this.lastNameField.fill(userData.lastName);
      await this.addressField.fill(userData.address);
      await this.cityField.fill(userData.city);
      await this.stateField.fill(userData.state);
      await this.zipCodeField.fill(userData.zipCode);
      await this.ssnField.fill(userData.ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`Click 'Find My Login Info' button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

  async assertErrorMessage(errorMessageFieldLocator, messageText) {
    await this.step(`Assert the ${messageText} error is shown`, async () => {
      await expect(errorMessageFieldLocator).toContainText(messageText);
    });
  }

  async assertSubmitErrorMessage(messageText) {
    await this.step(`Assert submit error message is shown`, async () => {
      await expect(this.submitErrorMessage).toContainText(messageText);
    });
  }

  async assertSuccessMessageContainsText(successMessageText) {
    await this.step(`Assert Success Message is shown`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(
        successMessageText,
      );
    });
  }

  async assertUsernameContainsText(username) {
    await this.step(`Assert Username text is shown`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(
        `Username: ${username}`,
      );
    });
  }

  async assertPasswordContainsText(password) {
    await this.step(`Assert Password text is shown`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(
        `Password: ${password}`,
      );
    });
  }
}
