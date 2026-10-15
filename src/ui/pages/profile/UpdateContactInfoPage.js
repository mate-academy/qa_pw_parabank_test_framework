import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });

    this.updateProfileHeading = page.getByRole('heading', {
      name: 'Update Profile',
    });

    this.firstNameField = page.locator('#customer\\.firstName');
    this.lastNameField = page.locator('#customer\\.lastName');
    this.addressField = page.locator('#customer\\.address\\.street');
    this.cityField = page.locator('#customer\\.address\\.city');
    this.stateField = page.locator('#customer\\.address\\.state');
    this.zipCodeField = page.locator('#customer\\.address\\.zipCode');
    this.phoneField = page.locator('#customer\\.phoneNumber');

    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });

    this.profileUpdatedHeading = page.getByRole('heading', {
      name: 'Profile Updated',
    });

    this.profileUpdatedMessage = page.getByText(
      'Your updated address and phone number have been added to the system.',
    );

    this.errorMessages = page.locator('#rightPanel .error:visible');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Update Contact Info page', async () => {
      await this.updateContactInfoLink.click();

      await expect(this.updateProfileHeading).toBeVisible();

      await expect(this.firstNameField).toBeVisible();

      await expect
        .poll(
          async () => {
            const firstName = await this.firstNameField.inputValue();
            const lastName = await this.lastNameField.inputValue();
            const address = await this.addressField.inputValue();

            return (
              firstName.trim().length > 0 &&
              lastName.trim().length > 0 &&
              address.trim().length > 0
            );
          },
          {
            message: 'Wait for customer profile data to load',
            timeout: 15000,
          },
        )
        .toBeTruthy();
    });
  }

  async fillContactInfo(contactInfo) {
    await this.step('Fill updated contact information', async () => {
      await this.firstNameField.fill(contactInfo.firstName);
      await this.lastNameField.fill(contactInfo.lastName);
      await this.addressField.fill(contactInfo.address);
      await this.cityField.fill(contactInfo.city);
      await this.stateField.fill(contactInfo.state);
      await this.zipCodeField.fill(contactInfo.zipCode);
      await this.phoneField.fill(contactInfo.phone);

      await expect(this.firstNameField).toHaveValue(contactInfo.firstName);
      await expect(this.lastNameField).toHaveValue(contactInfo.lastName);
      await expect(this.addressField).toHaveValue(contactInfo.address);
      await expect(this.cityField).toHaveValue(contactInfo.city);
      await expect(this.stateField).toHaveValue(contactInfo.state);
      await expect(this.zipCodeField).toHaveValue(contactInfo.zipCode);
      await expect(this.phoneField).toHaveValue(contactInfo.phone);
    });
  }

  async clickUpdateProfileButton() {
    await this.step('Click Update Profile button', async () => {
      await expect(this.updateProfileButton).toBeEnabled();

      await this.updateProfileButton.click();

      await expect
        .poll(
          async () => {
            const updated = await this.profileUpdatedHeading.isVisible();

            const hasVisibleErrors = (await this.errorMessages.count()) > 0;

            return updated || hasVisibleErrors;
          },
          {
            message: 'Wait for profile update result',
            timeout: 15000,
          },
        )
        .toBeTruthy();
    });
  }

  async assertProfileUpdatedSuccessfully() {
    await this.step('Assert profile was updated', async () => {
      await expect(this.profileUpdatedHeading).toBeVisible({
        timeout: 15000,
      });

      await expect(this.profileUpdatedMessage).toBeVisible();

      await expect(this.errorMessages).toHaveCount(0);
    });
  }

  async assertContactInfoValues(contactInfo) {
    await this.step('Assert updated contact information', async () => {
      await expect(this.firstNameField).toHaveValue(contactInfo.firstName);
      await expect(this.lastNameField).toHaveValue(contactInfo.lastName);
      await expect(this.addressField).toHaveValue(contactInfo.address);
      await expect(this.cityField).toHaveValue(contactInfo.city);
      await expect(this.stateField).toHaveValue(contactInfo.state);
      await expect(this.zipCodeField).toHaveValue(contactInfo.zipCode);
      await expect(this.phoneField).toHaveValue(contactInfo.phone);
    });
  }
}
