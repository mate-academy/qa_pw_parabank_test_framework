import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import {REGISTER_PAGE_ERROR_MESSAGES} from '../../../common/constants/errors';

export class RegisterPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'register.htm';
    this.pageName = 'Register page';

    const customerForm = this.page.locator('#customerForm');
    this.customerForm = {
      firstNameField: customerForm.locator('[id="customer.firstName"]'),
      lastNameField: customerForm.locator('[id="customer.lastName"]'),
      addressField: customerForm.locator(
        '[id="customer.address.street"]',
      ),
      cityField: customerForm.locator('[id="customer.address.city"]'),
      stateField: customerForm.locator('[id="customer.address.state"]'),
      zipCodeField: customerForm.locator(
        '[id="customer.address.zipCode"]',
      ),
      phoneField: customerForm.locator('[id="customer.phoneNumber"]'),
      ssnField: customerForm.locator('[id="customer.ssn"]'),
      usernameField: customerForm.locator('[id="customer.username"]'),
      passwordField: customerForm.locator('[id="customer.password"]'),
      confirmPasswordField: customerForm.locator('#repeatedPassword'),
      registerButton: customerForm.getByRole('button', {
        name: 'Register',
      }),

      errors: {
        firstNameRequiredError: customerForm.locator(
          '[id="customer.firstName.errors"]',
        ),
        lastNameRequiredError: customerForm.locator(
          '[id="customer.lastName.errors"]',
        ),
        addressRequiredError: customerForm.locator(
          '[id="customer.address.street.errors"]',
        ),
        cityRequiredError: customerForm.locator(
          '[id="customer.address.city.errors"]',
        ),
        stateRequiredError: customerForm.locator(
          '[id="customer.address.state.errors"]',
        ),
        zipCodeRequiredError: customerForm.locator(
          '[id="customer.address.zipCode.errors"]',
        ),
        ssnRequiredError: customerForm.locator('[id="customer.ssn.errors"]'),
        usernameRequiredError: customerForm.locator(
          '[id="customer.username.errors"]',
        ),
        usernameAlreadyExistsError: customerForm.locator(
          '[id="customer.username.errors"]',
        ),
        passwordRequiredError: customerForm.locator(
          '[id="customer.password.errors"]',
        ),
        confirmPasswordRequiredError: customerForm.locator(
          '[id="repeatedPassword.errors"]',
        ),
        passwordMismatchError: customerForm.locator(
          '[id="repeatedPassword.errors"]',
        ),
      },
    };

    const rightPanel = this.page.locator('#rightPanel');
    this.signUpTitle = rightPanel.getByRole('heading', {
      name: 'Signing up is easy!',
      exact: true,
    });
    this.registrationResult = {
      root: rightPanel,
      welcomeTitle: rightPanel.getByRole('heading', { name: /^Welcome\s/ }),
      successMessage: rightPanel.getByText(
        'Your account was created successfully. You are now logged in.',
        { exact: true },
      ),
    };
  }

  async fillSignUpFormFields(user) {
    await this.fillField(this.customerForm.firstNameField, user.firstName, 'First Name');
    await this.fillField(this.customerForm.lastNameField, user.lastName, 'Last Name');
    await this.fillField(this.customerForm.addressField, user.address, 'Address');
    await this.fillField(this.customerForm.cityField, user.city, 'City');
    await this.fillField(this.customerForm.stateField, user.state, 'State');
    await this.fillField(this.customerForm.zipCodeField, user.zipCode, 'Zip Code');
    await this.fillField(this.customerForm.phoneField, user.phone, 'Phone');
    await this.fillField(this.customerForm.ssnField, user.ssn, 'SSN');
    await this.fillField(this.customerForm.usernameField, user.username, 'Username');
    await this.fillField(this.customerForm.passwordField, user.password, 'Password');
    await this.fillField(
      this.customerForm.confirmPasswordField,
      user.confirmPassword ?? user.password,
      'Confirm Password',
    );
  }
  async clickRegisterButton() {
    await this.click(this.customerForm.registerButton, 'Register');
  }

  async submitSignUpForm(user) {
    await this.fillSignUpFormFields(user);
    await this.clickRegisterButton();
  }

  async assertAccountCreated(username) {
    await this.step('Assert account created message is visible', async () => {
      await expect(this.registrationResult.welcomeTitle).toBeVisible();
      await expect(this.registrationResult.welcomeTitle).toContainText(
        `Welcome ${username}`,
      );
      await expect(this.registrationResult.successMessage).toBeVisible();
    });
  }

  async assertRegistrationRejected(field) {
    await this.step('Assert registration was rejected', async () => {
      await expect(this.signUpTitle).toBeVisible();
      await expect(this.registrationResult.welcomeTitle).toBeHidden();
      await expect(this.registrationResult.successMessage).toBeHidden();
    });
    await this.assertErrorMessage(field);
  }

  async assertErrorMessage(field) {
    const errorKey = REGISTER_PAGE_ERROR_MESSAGES[`${field}Error`]
      ? `${field}Error`
      : `${field}RequiredError`;
    const message = REGISTER_PAGE_ERROR_MESSAGES[errorKey];

    if (!message) {
      await this.step('Assert error message is visible', async () => {
        await expect(this.customerForm.errors[errorKey]).toBeVisible();
      });
      return;
    }

    await super.assertErrorMessage(this.customerForm.errors[errorKey], message);
  }
}
