import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#customer\\.firstName');
    this.lastNameField = page.locator('#customer\\.lastName');
    this.addressField = page.locator('#customer\\.address\\.street');
    this.cityField = page.locator('#customer\\.address\\.city');
    this.stateField = page.locator('#customer\\.address\\.state');
    this.zipCodeField = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberField = page.locator('#customer\\.phoneNumber');
    this.SSNField = page.locator('#customer\\.ssn');
    this.usernameField = page.locator('#customer\\.username');
    this.passwordField = page.locator('#customer\\.password');
    this.repeatePasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', {name: 'Register'});
    this.logoutButton = page.getByRole('link', {name: 'Log Out'});
    this.errorMessage = page.locator('.error');
    this.latestNewsPicture = page.locator('h4', {hasText: 'Latest News'});
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`fill first name field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`fill last name field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`fill address field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`fill city field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`fill state field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zip) {
    await this.step(`fill zip code field`, async () => {
      await this.zipCodeField.fill(zip);
    });
  }

  async fillPhoneNumberField(phoneNumber) {
    await this.step(`fill phone number field`, async () => {
      await this.phoneNumberField.fill(phoneNumber);
    });
  }

  async fillSSNField(ssn) {
    await this.step(`fill ssn field`, async () => {
      await this.SSNField.fill(ssn);
    });
  }

  async fillUsernameField(username) {
    await this.step(`fill username field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`fill password field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillConfirmPasswordField(repeatedPassword) {
    await this.step(`fill confirm password field`, async () => {
      await this.repeatePasswordField.fill(repeatedPassword);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click register button`, async () => {
      await this.registerButton.click();
    });
  }

  async clickLogoutButton() {
    await this.step(`Click logout button`, async () => {
      await this.logoutButton.click();
    });
  }

  async submitSignUpForm(user) {
    await this.step(`submit sign up form`, async () => {
      await this.open();
      await this.fillFirstNameField(user.firstname);
      await this.fillLastNameField(user.lastname);
      await this.fillAddressField(user.address);
      await this.fillCityField(user.city);
      await this.fillStateField(user.state);
      await this.fillZipCodeField(user.zip);
      await this.fillPhoneNumberField(user.phone);
      await this.fillSSNField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillConfirmPasswordField(user.password);
      await this.clickRegisterButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertErrorBySelector(errorSelector, expectedError) {
    await this.step(`Assert the '${expectedError}' by selector '${errorSelector}' is shown`, async () => {
      await expect(this.page.locator(errorSelector)).toContainText(expectedError);
    });
  }

  async assertErrorByText(expectedError) {
    await this.step(`Assert the '${expectedError}' by text is shown`, async () => {
      await expect(this.page.getByText(expectedError)).toBeVisible();
    });
  }
}
