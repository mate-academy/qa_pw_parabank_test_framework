import { expect, testStep } from '../../../common/helpers/pwHelpers';
import {
  UPDATE_PROFILE_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_LAST_NAME_REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_ADDRESS_REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_CITY_REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_STATE_REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
} from '../../../ui/constants/accountMessages';

export class UpdateProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');

    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });

    this.firstNameErrorMessage = page.locator('#firstName-error');
    this.lastNameErrorMessage = page.locator('#lastName-error');
    this.addressErrorMessage = page.locator('#street-error');
    this.cityErrorMessage = page.locator('#city-error');
    this.stateErrorMessage = page.locator('#state-error');
    this.zipCodeErrorMessage = page.locator('#zipCode-error');

    this.updateProfileResult = page.locator('#updateProfileResult p');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Update Profile' page`, async () => {
      await this.page.goto('updateprofile.htm');
    });
  }

  async fillForm(userData) {
    await this.step(`Fill form fields`, async () => {
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
    await this.step(`Click 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertAllRequiredFieldsErrors() {
    await this.step(`Assert all required fields show errors`, async () => {
      await expect(this.firstNameErrorMessage).toHaveText(
        UPDATE_PROFILE_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
      );
      await expect(this.lastNameErrorMessage).toHaveText(
        UPDATE_PROFILE_LAST_NAME_REQUIRED_ERROR_MESSAGE,
      );
      await expect(this.addressErrorMessage).toHaveText(
        UPDATE_PROFILE_ADDRESS_REQUIRED_ERROR_MESSAGE,
      );
      await expect(this.cityErrorMessage).toHaveText(
        UPDATE_PROFILE_CITY_REQUIRED_ERROR_MESSAGE,
      );
      await expect(this.stateErrorMessage).toHaveText(
        UPDATE_PROFILE_STATE_REQUIRED_ERROR_MESSAGE,
      );
      await expect(this.zipCodeErrorMessage).toHaveText(
        UPDATE_PROFILE_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
      );
    });
  }

  async assertUpdateProfileResultHasText(messageText) {
    await this.step(
      `Assert Update Profile Result shows '${messageText}' message`,
      async () => {
        await expect(this.updateProfileResult).toHaveText(messageText);
      },
    );
  }
}
