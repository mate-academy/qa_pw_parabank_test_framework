import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, UPDATE_CONTACT_INFO_ERROR_MESSAGES } from '../../../constants/index.js';
import { fillFormExcept } from '../../../common/helpers/formHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.title = page.locator('#updateProfileForm h1.title');
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberInput = page.locator('#customer\\.phoneNumber');
    this.updateProfileButton = page.locator('input[type="button"][value="Update Profile"]');
    
    this.resultContainer = page.locator('#updateProfileResult');
    this.successTitle = page.locator('#updateProfileResult h1.title');
    this.successMessage = page.locator('#updateProfileResult p');
    
    this.errorContainer = page.locator('#updateProfileError');
    this.errorMessage = page.locator('#updateProfileError p.error');
    
    this.firstNameError = page.locator('#firstName-error');
    this.lastNameError = page.locator('#lastName-error');
    this.streetError = page.locator('#street-error');
    this.cityError = page.locator('#city-error');
    this.stateError = page.locator('#state-error');
    this.zipCodeError = page.locator('#zipCode-error');
    
    this.errorFieldMap = {
      firstName: this.firstNameError,
      lastName: this.lastNameError,
      address: this.streetError,
      city: this.cityError,
      state: this.stateError,
      zipCode: this.zipCodeError,
    };
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Update Contact Info page`, async () => {
      await this.page.goto('/parabank/updateprofile.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillUpdateForm(userData) {
    await this.step(`Fill update profile form`, async () => {
      this.logger?.debug(`Filling update form with user data`);
      
      await this.firstNameInput.fill(userData.firstName);
      await this.lastNameInput.fill(userData.lastName);
      await this.addressInput.fill(userData.address);
      await this.cityInput.fill(userData.city);
      await this.stateInput.fill(userData.state);
      await this.zipCodeInput.fill(userData.zipCode);
      
      if (userData.phoneNumber) {
        await this.phoneNumberInput.fill(userData.phoneNumber);
      }
      
      this.logger?.debug(`Update form filled successfully`);
    });
  }

  async fillUpdateFormExcept(userData, exceptField) {
    await this.step(`Fill update profile form except ${exceptField}`, async () => {
      this.logger?.debug(`Filling update form, clearing field: ${exceptField}`);
      
      const fieldMap = {
        firstName: (val) => this.firstNameInput.fill(val),
        lastName: (val) => this.lastNameInput.fill(val),
        address: (val) => this.addressInput.fill(val),
        city: (val) => this.cityInput.fill(val),
        state: (val) => this.stateInput.fill(val),
        zipCode: (val) => this.zipCodeInput.fill(val),
        phoneNumber: (val) => this.phoneNumberInput.fill(val),
      };
      
      await fillFormExcept(fieldMap, userData, exceptField, '');
      this.logger?.debug(`Update form filled successfully`);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click Update Profile button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.updateProfileButton.click(),
      ]);
    });
  }

  async assertProfileUpdated() {
    await this.step(`Assert profile was updated successfully`, async () => {
      this.logger?.debug(`Checking if profile was updated`);
      await expect(this.successTitle).toContainText('Profile Updated');
      await expect(this.successMessage).toBeVisible();
      this.logger?.debug(`Profile update confirmed`);
    });
  }

  async assertInlineErrorShown(errorField) {
    const errorLocator = this.errorFieldMap[errorField];
    const errorMessage = UPDATE_CONTACT_INFO_ERROR_MESSAGES[errorField];
    
    await this.step(`Assert '${errorMessage}' error is shown`, async () => {
      this.logger?.debug(`Checking inline error for field: ${errorField}`);
      await expect(errorLocator).toBeVisible();
      this.logger?.debug(`Inline error confirmed for field: ${errorField}`);
    });
  }
}
