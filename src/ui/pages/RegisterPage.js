import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RegisterPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('[id="repeatedPassword"]');

    this.firstNameError = page.locator('[id="customer.firstName.errors"]');
    this.lastNameError = page.locator('[id="customer.lastName.errors"]');
    this.addressError = page.locator('[id="customer.address.street.errors"]');
    this.cityError = page.locator('[id="customer.address.city.errors"]');
    this.stateError = page.locator('[id="customer.address.state.errors"]');
    this.zipCodeError = page.locator('[id="customer.address.zipCode.errors"]');
    this.ssnError = page.locator('[id="customer.ssn.errors"]');
    this.usernameError = page.locator('[id="customer.username.errors"]');
    this.passwordError = page.locator('[id="customer.password.errors"]');
    this.confirmPasswordError = page.locator('[id="repeatedPassword.errors"]');

    this.registerButton = page.getByRole('button', {
      name: 'Register',
    });

    this.registrationSuccessMessage = page.getByText(
      'Your account was created successfully. You are now logged in.',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Register' page`, async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillFirstNameInput(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastNameInput(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillAddressInput(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressInput.fill(address);
    });
  }

  async fillCityInput(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityInput.fill(city);
    });
  }

  async fillStateInput(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateInput.fill(state);
    });
  }

  async fillZipCodeInput(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  async fillPhoneNumberInput(phoneNumber) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  async fillSsnInput(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnInput.fill(ssn);
    });
  }

  async fillUsernameInput(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPasswordInput(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async fillConfirmPasswordInput(password) {
    await this.step(`Fill the 'Confirm' field`, async () => {
      await this.confirmPasswordInput.fill(password);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async assertRegistrationSuccessMessageIsVisible() {
    await this.step(
      `Assert registration success message is visible`,
      async () => {
        await expect(this.registrationSuccessMessage).toBeVisible();
      },
    );
  }

  async assertRequiredFieldErrorsAreVisible() {
    await this.step(`Assert required field errors are visible`, async () => {
      await expect(this.firstNameError).toHaveText('First name is required.');
      await expect(this.lastNameError).toHaveText('Last name is required.');
      await expect(this.addressError).toHaveText('Address is required.');
      await expect(this.cityError).toHaveText('City is required.');
      await expect(this.stateError).toHaveText('State is required.');
      await expect(this.zipCodeError).toHaveText('Zip Code is required.');
      await expect(this.ssnError).toHaveText(
        'Social Security Number is required.',
      );
      await expect(this.usernameError).toHaveText('Username is required.');
      await expect(this.passwordError).toHaveText('Password is required.');
      await expect(this.confirmPasswordError).toHaveText(
        'Password confirmation is required.',
      );
    });
  }

  async assertFirstNameErrorContainsText(message) {
    await this.step(`Assert First Name error message`, async () => {
      await expect(this.firstNameError).toContainText(message);
    });
  }

  async assertCityErrorContainsText(message) {
    await this.step(`Assert City error message`, async () => {
      await expect(this.cityError).toContainText(message);
    });
  }

  async assertStateErrorContainsText(message) {
    await this.step(`Assert State error message`, async () => {
      await expect(this.stateError).toContainText(message);
    });
  }

  async assertZipCodeErrorContainsText(message) {
    await this.step(`Assert Zip Code error message`, async () => {
      await expect(this.zipCodeError).toContainText(message);
    });
  }

  async assertPasswordErrorContainsText(message) {
    await this.step(`Assert Password error message`, async () => {
      await expect(this.passwordError).toContainText(message);
    });
  }

  async assertConfirmPasswordErrorContainsText(message) {
    await this.step(`Assert Confirm Password error message`, async () => {
      await expect(this.confirmPasswordError).toContainText(message);
    });
  }
  async assertLastNameErrorContainsText(message) {
    await this.step(`Assert Last Name error message`, async () => {
      await expect(this.lastNameError).toContainText(message);
    });
  }

  async assertAddressErrorContainsText(message) {
    await this.step(`Assert Address error message`, async () => {
      await expect(this.addressError).toContainText(message);
    });
  }

  async assertSsnErrorContainsText(message) {
    await this.step(`Assert SSN error message`, async () => {
      await expect(this.ssnError).toContainText(message);
    });
  }

  async assertUsernameErrorContainsText(message) {
    await this.step(`Assert Username error message`, async () => {
      await expect(this.usernameError).toContainText(message);
    });
  }

  async assertPasswordMismatchErrorContainsText(message) {
    await this.step(`Assert password mismatch error message`, async () => {
      await expect(this.confirmPasswordError).toContainText(message);
    });
  }

  async assertExistingUsernameErrorContainsText(message) {
    await this.step(`Assert existing Username error message`, async () => {
      await expect(this.usernameError).toContainText(message);
    });
  }
}
