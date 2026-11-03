import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import {
  CUSTOMER_NOT_FOUND_ERROR_MESSAGE,
  ERROR_TITLE,
  LOOKUP_PAGE_ERROR_MESSAGES,
} from '../../../common/constants/errors';

export class LookupPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'lookup.htm';
    this.pageName = 'Lookup page';

    const lookupForm = this.page.locator('#lookupForm');
    this.lookupForm = {
      firstNameField: lookupForm.locator('#firstName'),
      lastNameField: lookupForm.locator('#lastName'),
      addressField: lookupForm.locator('[id="address.street"]'),
      cityField: lookupForm.locator('[id="address.city"]'),
      stateField: lookupForm.locator('[id="address.state"]'),
      zipCodeField: lookupForm.locator('[id="address.zipCode"]'),
      ssnField: lookupForm.locator('#ssn'),
      findLoginInfoButton: lookupForm.getByRole('button', {
        name: 'Find My Login Info',
      }),

      errors: {
        firstNameRequiredError: lookupForm.locator('[id="firstName.errors"]'),
        lastNameRequiredError: lookupForm.locator('[id="lastName.errors"]'),
        addressRequiredError: lookupForm.locator('[id="address.street.errors"]'),
        cityRequiredError: lookupForm.locator('[id="address.city.errors"]'),
        stateRequiredError: lookupForm.locator('[id="address.state.errors"]'),
        zipCodeRequiredError: lookupForm.locator('[id="address.zipCode.errors"]'),
        ssnRequiredError: lookupForm.locator('[id="ssn.errors"]'),
      },
    };

    const rightPanel = this.page.locator('#rightPanel');
    this.lookupTitle = rightPanel.getByRole('heading', {
      name: 'Customer Lookup',
      exact: true,
    });
    this.lookupResult = {
      successMessage: rightPanel.getByText(
        'Your login information was located successfully. You are now logged in.',
        { exact: true },
      ),
      credentials: rightPanel.locator('p').filter({ hasText: 'Username' }).filter({ hasText: 'Password' }),
    };
    this.lookupError = {
      errorTitle: rightPanel.getByRole('heading', {
        name: ERROR_TITLE,
        exact: true,
      }),
      customerNotFoundMessage: rightPanel.locator('p.error').getByText(
        CUSTOMER_NOT_FOUND_ERROR_MESSAGE,
        { exact: true },
      ),
    };
  }

  async assertCustomerFound(username, password) {
    await this.step('Assert customer was found', async () => {
      await expect(this.lookupTitle).toBeVisible();
      await expect(this.lookupResult.successMessage).toBeVisible();
      await expect(this.lookupResult.credentials).toContainText(`Username: ${username}`);
      await expect(this.lookupResult.credentials).toContainText(`Password: ${password}`);
    });
  }

  async assertErrorMessage(field) {
    const errorKey = `${field}RequiredError`;

    await super.assertErrorMessage(
      this.lookupForm.errors[errorKey],
      LOOKUP_PAGE_ERROR_MESSAGES[errorKey],
    );
  }

  async assertLookupRejected(field) {
    await this.step('Assert lookup was rejected', async () => {
      await expect(this.lookupTitle).toBeVisible();
      await expect(this.lookupResult.successMessage).toBeHidden();
      await expect(this.lookupResult.credentials).toBeHidden();
      await expect(this.loginPanel.root).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Log Out', exact: true })).toBeHidden();
    });
    await this.assertErrorMessage(field);
  }

  async assertCustomerNotFound() {
    await this.step('Assert customer was not found', async () => {
      await expect(this.lookupError.errorTitle).toBeVisible();
      await expect(this.lookupError.customerNotFoundMessage).toBeVisible();
      await expect(this.lookupResult.successMessage).toBeHidden();
      await expect(this.lookupResult.credentials).toBeHidden();
    });
  }

  async fillLookupForm(user) {
    await this.step(`Fill lookup form`, async () => { 
    await this.lookupForm.firstNameField.fill(user.firstName);
    await this.lookupForm.lastNameField.fill(user.lastName);
    await this.lookupForm.addressField.fill(user.address);
    await this.lookupForm.cityField.fill(user.city);
    await this.lookupForm.stateField.fill(user.state);
    await this.lookupForm.zipCodeField.fill(user.zipCode);
    await this.lookupForm.ssnField.fill(user.ssn);
    });
  }

  async submitLookupForm(user) {
    await this.step(`Submit lookup form`, async () => {
      await this.fillLookupForm(user);
    await this.lookupForm.findLoginInfoButton.click();
    });
  }
}