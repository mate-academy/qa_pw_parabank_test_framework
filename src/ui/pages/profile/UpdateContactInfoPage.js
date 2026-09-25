import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });
    this.updateProfileHeading = page.getByRole('heading', {
      name: 'Update Profile',
    });
    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="customer.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.successHeading = page.getByRole('heading', {
      name: 'Profile Updated',
    });
    this.successMessage = page.getByText(
      'Your updated address and phone number have been added to the system.',
    );
  }

  async open() {
    await this.step('Open the update contact information page', async () => {
      await this.updateContactInfoLink.click();

      await expect(this.updateProfileHeading).toBeVisible();
      await expect(this.firstNameInput).not.toHaveValue('');
      await expect(this.lastNameInput).not.toHaveValue('');
    });
  }

  async updateContactInformation(contactData) {
    await this.step('Update the contact information', async () => {
      await this.addressInput.fill(contactData.address);
      await this.cityInput.fill(contactData.city);
      await this.stateInput.fill(contactData.state);
      await this.zipCodeInput.fill(contactData.zipCode);
      await this.phoneNumberInput.fill(contactData.phoneNumber);
    });
  }

  async submitContactInformation() {
    await this.step('Submit the updated contact information', async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertProfileWasUpdated() {
    await this.step('Verify that the profile was updated', async () => {
      await expect(this.successHeading).toBeVisible();
      await expect(this.successMessage).toBeVisible();
    });
  }

  async assertContactInformationIsSaved(contactData) {
    await this.step(
      'Verify that the contact information was saved',
      async () => {
        await expect(this.addressInput).toHaveValue(contactData.address);
        await expect(this.cityInput).toHaveValue(contactData.city);
        await expect(this.stateInput).toHaveValue(contactData.state);
        await expect(this.zipCodeInput).toHaveValue(contactData.zipCode);
        await expect(this.phoneNumberInput).toHaveValue(
          contactData.phoneNumber,
        );
      },
    );
  }
}
