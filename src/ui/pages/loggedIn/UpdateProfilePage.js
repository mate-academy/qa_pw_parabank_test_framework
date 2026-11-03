import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import {
  LOOKUP_PAGE_ERROR_MESSAGES,
  UPDATE_PROFILE_SUCCESS_MESSAGE,
} from '../../../common/constants/errors';

export class UpdateProfilePage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'updateprofile.htm';
    this.pageName = 'Update Profile page';

    const updateProfileForm = this.page.locator('#updateProfileForm');
    this.updateProfileForm = {
      root: updateProfileForm,
      firstNameField: updateProfileForm.locator('[id="customer.firstName"]'),
      lastNameField: updateProfileForm.locator('[id="customer.lastName"]'),
      addressField: updateProfileForm.locator('[id="customer.address.street"]'),
      cityField: updateProfileForm.locator('[id="customer.address.city"]'),
      stateField: updateProfileForm.locator('[id="customer.address.state"]'),
      zipCodeField: updateProfileForm.locator(
        '[id="customer.address.zipCode"]',
      ),
      phoneField: updateProfileForm.locator('[id="customer.phoneNumber"]'),
      updateProfileButton: updateProfileForm.getByRole('button', {
        name: 'Update Profile',
      }),

      errors: {
        firstNameRequiredError: updateProfileForm.locator('#firstName-error'),
        lastNameRequiredError: updateProfileForm.locator('#lastName-error'),
        addressRequiredError: updateProfileForm.locator('#street-error'),
        cityRequiredError: updateProfileForm.locator('#city-error'),
        stateRequiredError: updateProfileForm.locator('#state-error'),
        zipCodeRequiredError: updateProfileForm.locator('#zipCode-error'),
      },
    };

    const updateProfileResult = this.page.locator('#updateProfileResult');
    this.updateProfileResult = {
      root: updateProfileResult,
      title: updateProfileResult.getByRole('heading', {
        name: 'Profile Updated',
        exact: true,
      }),
      message: updateProfileResult.getByText(UPDATE_PROFILE_SUCCESS_MESSAGE),
    };

    this.updateProfileError = {
      root: this.page.locator('#updateProfileError'),
    };
  }

  async submitProfile(profile = {}) {
    await this.open();
    await this.step('Wait for profile to load', async () => {
      await expect
        .poll(() => this.updateProfileForm.firstNameField.inputValue())
        .not.toBe('');
    });

    const fields = [
      ['firstNameField', profile.firstName, 'First Name'],
      ['lastNameField', profile.lastName, 'Last Name'],
      ['addressField', profile.address, 'Address'],
      ['cityField', profile.city, 'City'],
      ['stateField', profile.state, 'State'],
      ['zipCodeField', profile.zipCode, 'Zip Code'],
      ['phoneField', profile.phone, 'Phone'],
    ];

    for (const [field, value, title] of fields) {
      if (value !== undefined) {
        await this.fillField(this.updateProfileForm[field], String(value), title);
      }
    }

    await this.click(this.updateProfileForm.updateProfileButton, 'Update Profile');
  }

  async assertProfile(profile) {
    await this.step('Assert saved profile', async () => {
      await expect
        .poll(() => this.updateProfileForm.firstNameField.inputValue())
        .toBe(profile.firstName);
      await expect(this.updateProfileForm.lastNameField).toHaveValue(profile.lastName);
      await expect(this.updateProfileForm.addressField).toHaveValue(profile.address);
      await expect(this.updateProfileForm.cityField).toHaveValue(profile.city);
      await expect(this.updateProfileForm.stateField).toHaveValue(profile.state);
      await expect(this.updateProfileForm.zipCodeField).toHaveValue(profile.zipCode);
      await expect(this.updateProfileForm.phoneField).toHaveValue(profile.phone);
    });
  }

  async assertProfileUpdated() {
    await this.step('Assert profile is updated', async () => {
      await expect(this.updateProfileResult.title).toBeVisible();
      await expect(this.updateProfileResult.message).toBeVisible();
      await expect(this.updateProfileForm.root).toBeHidden();
      await expect(this.updateProfileError.root).toBeHidden();
    });
  }

  async assertUpdateRejected(visibleErrors) {
    await this.step('Assert profile update was rejected', async () => {
      await expect(this.updateProfileForm.root).toBeVisible();
      await expect(this.updateProfileResult.root).toBeHidden();
      await expect(this.updateProfileError.root).toBeHidden();

      for (const [field, locator] of Object.entries(this.updateProfileForm.errors)) {
        if (visibleErrors.includes(field)) {
          await expect(locator).toHaveText(LOOKUP_PAGE_ERROR_MESSAGES[field]);
        } else {
          await expect(locator).toBeHidden();
        }
      }
    });
  }
}
