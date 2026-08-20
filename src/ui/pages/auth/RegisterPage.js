import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RegisterPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('input[name="customer.firstName"]');
    this.lastNameField = page.locator('input[name="customer.lastName"]');
    this.streetField = page.locator('input[name="customer.address.street"]');
    this.cityField = page.locator('input[name="customer.address.city"]');
    this.stateField = page.locator('input[name="customer.address.state"]');
    this.zipCodeField = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumberField = page.locator('input[name="customer.phoneNumber"]');
    this.ssnField = page.locator('input[name="customer.ssn"]');
    this.usernameField = page.locator('input[name="customer.username"]');
    this.passwordField = page.locator('input[name="customer.password"]');
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successMessage = page.getByText(
      'Your account was created successfully. You are now logged in.',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Register' page`, async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }

  async fillFirstNameField(value) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(value);
    });
  }

  async fillLastNameField(value) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(value);
    });
  }

  async fillStreetField(value) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.streetField.fill(value);
    });
  }

  async fillCityField(value) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(value);
    });
  }

  async fillStateField(value) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(value);
    });
  }

  async fillZipCodeField(value) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(value);
    });
  }

  async fillPhoneNumberField(value) {
    await this.step(`Fill the 'Phone #' field`, async () => {
      await this.phoneNumberField.fill(value);
    });
  }

  async fillSsnField(value) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(value);
    });
  }

  async fillUsernameField(value) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(value);
    });
  }

  async fillPasswordField(value) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(value);
    });
  }

  async fillConfirmPasswordField(value) {
    await this.step(`Fill the 'Confirm' field`, async () => {
      await this.confirmPasswordField.fill(value);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async submitRegistrationForm(customer) {
    if (customer.firstName != null)
      await this.fillFirstNameField(customer.firstName);
    if (customer.lastName != null)
      await this.fillLastNameField(customer.lastName);
    if (customer.street != null) await this.fillStreetField(customer.street);
    if (customer.city != null) await this.fillCityField(customer.city);
    if (customer.state != null) await this.fillStateField(customer.state);
    if (customer.zipCode != null) await this.fillZipCodeField(customer.zipCode);
    if (customer.phoneNumber != null)
      await this.fillPhoneNumberField(customer.phoneNumber);
    if (customer.ssn != null) await this.fillSsnField(customer.ssn);
    if (customer.username != null)
      await this.fillUsernameField(customer.username);
    if (customer.password != null)
      await this.fillPasswordField(customer.password);
    if (customer.confirmPassword != null)
      await this.fillConfirmPasswordField(customer.confirmPassword);
    await this.clickRegisterButton();
  }

  async assertRegistrationSuccessMessageIsVisible() {
    await this.step(
      `Assert the registration success message is visible`,
      async () => {
        await expect(this.successMessage).toBeVisible();
      },
    );
  }

  async assertFieldErrorIsVisible(fieldName, expectedText) {
    await this.step(
      `Assert the '${fieldName}' field error is '${expectedText}'`,
      async () => {
        const fieldError = this.page.locator(
          `[id="customer.${fieldName}.errors"]`,
        );
        await expect(fieldError).toHaveText(expectedText);
      },
    );
  }

  async assertPasswordMismatchErrorIsVisible() {
    await this.step(
      `Assert the password mismatch error is visible`,
      async () => {
        const fieldError = this.page.locator('[id="repeatedPassword.errors"]');
        await expect(fieldError).toHaveText('Passwords did not match.');
      },
    );
  }
}
