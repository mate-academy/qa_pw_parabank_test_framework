import { expect, testStep } from '../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[name="customer.firstName"]');
    this.lastNameField = page.locator('[name="customer.lastName"]');
    this.addressField = page.locator('[name="customer.address.street"]');
    this.cityField = page.locator('[name="customer.address.city"]');
    this.stateField = page.locator('[name="customer.address.state"]');
    this.zipCodeField = page.locator('[name="customer.address.zipCode"]');
    this.phoneField = page.locator('[name="customer.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.successMessage = page.getByText('Your updated address and phone number have been added to the system.');

  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
  await this.step(`Open "Update Contact Info" page`, async () => {
    await this.page.getByRole('link', { name: 'Update Contact Info' }).click();
  });
}

  async fillForm(userData) {
    await this.step('Update contact information', async () => {
      await this.firstNameField.fill(userData.firstName);
      await this.lastNameField.fill(userData.lastName);
      await this.addressField.fill(userData.address);
      await this.cityField.fill(userData.city);
      await this.stateField.fill(userData.state);
      await this.zipCodeField.fill(userData.zipCode);
      await this.phoneField.fill(userData.phone);
  });
}

  async clickUpdateProfileButton() {
    await this.step(`Click "Update Profile" button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertSuccessfulUpdateMessageIsShown() {
    await this.step(`Assert successful update message is shown`, async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }

  async assertInfoIsUpdated(userData) {
    await this.step(`Assert contact information is updated`, async () => {
      await expect(this.firstNameField).toHaveValue(userData.firstName);
      await expect(this.lastNameField).toHaveValue(userData.lastName);
      await expect(this.addressField).toHaveValue(userData.address);
      await expect(this.cityField).toHaveValue(userData.city);
      await expect(this.stateField).toHaveValue(userData.state);
      await expect(this.zipCodeField).toHaveValue(userData.zipCode);
      await expect(this.phoneField).toHaveValue(userData.phone);
    });
  }

  async assertErrorMessageIsShown(errorMessage) {
    await this.step(`Assert "${errorMessage}" is displayed`, async () => {
      await expect(this.page.getByText(errorMessage)).toBeVisible();
    });
  }
}