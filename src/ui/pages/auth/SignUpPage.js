import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.firstNameField = page.locator('[name="customer.firstName"]');
    this.lastNameField = page.locator('[name="customer.lastName"]');
    this.addressField = page.locator('[name="customer.address.street"]');
    this.cityField = page.locator('[name="customer.address.city"]');
    this.stateField = page.locator('[name="customer.address.state"]');
    this.zipCodeField = page.locator('[name="customer.address.zipCode"]');
    this.phoneField = page.locator('[name="customer.phoneNumber"]');
    this.ssnField = page.locator('[name="customer.ssn"]');
    this.usernameField = page.locator('[name="customer.username"]');
    this.passwordField = page.locator('[name="customer.password"]');
    this.repeatedPasswordField = page.locator('[name="repeatedPassword"]');
    this.welcomeText = page.getByRole('heading', { level: 1 });
    this.errorMessage = page.locator('.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Register page`, async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }

  async clickRegisterButton() {
    await this.step(`Click on Register button`, async () => {
      await this.registerButton.click();
    });
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

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillRepeatedPasswordField(password) {
    await this.step(`Fill the 'Repeated Password' field`, async () => {
      await this.repeatedPasswordField.fill(password);
    });
  }

  async submitSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      await this.fillFirstNameField(user.firstName);
      await this.fillLastNameField(user.lastName);
      await this.fillAddressField(user.address);
      await this.fillCityField(user.city);
      await this.fillStateField(user.state);
      await this.fillZipCodeField(user.zipCode);
      await this.fillPhoneField(user.phone);
      await this.fillSsnField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillRepeatedPasswordField(
        user.passwordConfirmation,
      );
      await this.clickRegisterButton();
    });
  }


  async assertWelcomeTextVisible(username) {
    await this.step(`Assert the welcome text is displayed`, async () => {
      await expect(this.welcomeText).toHaveText(`Welcome ${username}`);
    });
  }

  async assertErrorMessageVisible(fieldName, errorText) {
    await this.step(`Assert '${fieldName}' field error message`, async () => {
      await expect(this.errorMessage).toHaveText(errorText);
    });
  }
}
