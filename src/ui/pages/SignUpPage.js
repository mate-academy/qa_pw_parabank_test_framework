import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnField = page.locator('[id="customer\\.ssn"]');
    this.usernameField = page.locator('[id="customer\\.username"]');
    this.passwordField = page.locator('[id="customer\\.password"]');
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto(
        'https://parabank.parasoft.com/parabank/register.htm',
      );
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
  async fillZipCodeField(zip) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(zip);
    });
  }
  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone #' field`, async () => {
      await this.phoneField.fill(phone);
    });
  }
  async fillSSNField(ssn) {
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

  async fillConfirmPasswordField(password) {
    await this.step(`Fill the 'Confirm' field`, async () => {
      await this.confirmPasswordField.fill(password);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click Register`, async () => {
      await this.registerButton.click();
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
      await this.fillSSNField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillConfirmPasswordField(user.password);
      await this.clickRegisterButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
