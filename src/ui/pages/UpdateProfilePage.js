import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToUpdateProfile() {
    await this.step('Go to Update Profile', async () => {
      await this.page.goto('updateprofile.htm');
    });
  }

  async fillProfileForm(user) {
    await this.step('Fill profile form', async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneField.fill(user.phone);
    });
  }

  async clickUpdateProfile() {
    await this.step('Click Update Profile button', async () => {
      await this.updateProfileButton.click();
    });
  }

  async verifyProfileForm(user) {
    await this.step('Verify profile information', async () => {
      await expect(this.firstNameField).toHaveValue(user.firstName);
      await expect(this.lastNameField).toHaveValue(user.lastName);
      await expect(this.addressField).toHaveValue(user.address);
      await expect(this.cityField).toHaveValue(user.city);
      await expect(this.stateField).toHaveValue(user.state);
      await expect(this.zipCodeField).toHaveValue(user.zipCode);
      await expect(this.phoneField).toHaveValue(user.phone);
    });
  }

  async clearField(field) {
    await this.step(`Clear ${field} field`, async () => {
      await this[field].fill('');
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
