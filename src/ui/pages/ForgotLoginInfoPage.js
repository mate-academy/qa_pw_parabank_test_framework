import { expect, testStep } from '../../common/helpers/pwHelpers';

export class ForgotLoginInfoPage {
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
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickFindMyLoginInfo() {
    await this.step('Click Find My Login Info button', async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

  async clearField(field) {
    await this.step(`Clear ${field} field`, async () => {
      await this[field].fill('');
    });
  }

  async fillLookupForm(user) {
    await this.step('Fill customer lookup form', async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.ssnField.fill(user.ssn);
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
