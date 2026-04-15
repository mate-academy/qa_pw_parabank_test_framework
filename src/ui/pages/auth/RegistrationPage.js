import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RegistrationPage {
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
    this.ssnField = page.locator('[id="customer.ssn"]');
    this.userNameField = page.locator('[id="customer.username"]');
    this.passwordField = page.locator('[id="customer.password"]');
    this.confirmPasswordField = page.locator('[id="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.firstNameError  = page.locator('[id="customer.firstName.errors"]');
    this.lastNameError   = page.locator('[id="customer.lastName.errors"]');
    this.addressError    = page.locator('[id="customer.address.street.errors"]');
    this.cityError       = page.locator('[id="customer.address.city.errors"]');
    this.stateError      = page.locator('[id="customer.address.state.errors"]');
    this.zipCodeError    = page.locator('[id="customer.address.zipCode.errors"]');
    this.phoneError      = page.locator('[id="customer.phoneNumber.errors"]');
    this.ssnError        = page.locator('[id="customer.ssn.errors"]');
    this.userNameError   = page.locator('[id="customer.username.errors"]');
    this.passwordError   = page.locator('[id="customer.password.errors"]');
    this.confirmPasswordError = page.locator('[id="repeatedPassword.errors"]');
    this.successMessage = page.locator('[id="rightPanel"] p');
    this.logoutButton = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Registration' page`, async () => {
      await this.page.goto('/parabank/register.htm', { waitUntil: 'domcontentloaded' });
    });
  }
  getWelcomeMessage(username) {
    return this.page.getByRole(`heading`, { level: 1, name: `Welcome ${username}` });
  }
  
  async fillFirstNameField(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneField.fill(phone);
    });
  }

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async fillUserNameField(userName) {
    await this.step(`Fill the 'User Name' field`, async () => {
      await this.userNameField.fill(userName);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }
  async fillRegistrationForm(user) {
    await this.fillFirstNameField(user.firstName);
    await this.fillLastNameField(user.lastName);
    await this.fillAddressField(user.address);
    await this.fillCityField(user.city);
    await this.fillStateField(user.state);
    await this.fillZipCodeField(user.zipCode);
    await this.fillPhoneField(user.phone);
    await this.fillSsnField(user.ssn);
    await this.fillUserNameField(user.username);
    await this.fillPasswordField(user.password);
    await this.fillConfirmPasswordField(user.password);
  }
  async fillConfirmPasswordField(confirmPassword) {
    await this.step(`Fill the 'Confirm Password' field`, async () => {
      await this.confirmPasswordField.fill(confirmPassword);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async clickLogoutButton() {
    await this.step(`Click the 'Log Out' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async assertFirstNameErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.firstNameError).toContainText(messageText);
    });
  }

  async assertLastNameErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.lastNameError).toContainText(messageText);
    });
  }

  async assertAddressErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.addressError).toContainText(messageText);
    });
  }

  async assertCityErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.cityError).toContainText(messageText);
    });
  }

  async assertStateErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.stateError).toContainText(messageText);
    });
  }

  async assertZipCodeErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.zipCodeError).toContainText(messageText);
    });
  }

  async assertSsnErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.ssnError).toContainText(messageText);
    });
  }

  async assertUserNameErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.userNameError).toContainText(messageText);
    });
  }

  async assertPasswordErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.passwordError).toContainText(messageText);
    });
  }

  async assertConfirmPasswordErrorMessage(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.confirmPasswordError).toContainText(messageText);
    });
  }
  async assertWelcomeMessage(username) {
    await this.step(`Assert the '${username}' welcome message is shown`, async () => {
      await expect(this.getWelcomeMessage(username)).toBeVisible();
    });
  }
  async assertSuccessMessage(messageText) {
    await this.step(`Assert the '${messageText}' success message is shown`, async () => {
      await expect(this.successMessage).toHaveText(messageText);
    });
  }
}
