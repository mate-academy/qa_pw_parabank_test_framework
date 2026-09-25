import { testStep, expect } from '../../common/helpers/pwHelpers';

export class UpdateProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.pageTitle = page.getByRole('heading', { name: 'Update Profile' });

    this.fieldsMap = {
      firstName: page.locator('[id="customer\\.firstName"]'),
      lastName: page.locator('[id="customer\\.lastName"]'),
      address: page.locator('[id="customer\\.address\\.street"]'),
      city: page.locator('[id="customer\\.address\\.city"]'),
      state: page.locator('[id="customer\\.address\\.state"]'),
      zipCode: page.locator('[id="customer\\.address\\.zipCode"]'),
      phone: page.locator('[id="customer\\.phoneNumber"]'),
    };

    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.successMessage = page.getByText(
      'Your updated address and phone number have been added to the system.',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageTitleIsVisible() {
    await this.step(
      'Checking the visibility and data loading of "Update Profile"',
      async () => {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.fieldsMap.firstName).not.toHaveValue('');
      },
    );
  }

  async updateField(fieldName, value) {
    await this.step(`Update ${fieldName} with value: ${value}`, async () => {
      const fieldLocator = this.fieldsMap[fieldName];
      await fieldLocator.fill(value);
    });
  }

  async clickUpdateProfileButton() {
    await this.step('Click "Update Profile" button', async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertProfileUpdatedMessageIsVisible() {
    await this.step(
      'Checking success message after profile update',
      async () => {
        await expect(this.successMessage).toBeVisible();
      },
    );
  }
}
