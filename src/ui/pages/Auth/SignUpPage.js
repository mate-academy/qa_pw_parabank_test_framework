import { expect, testStep } from '../../../common/helpers/pwHelpers';
export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneNumberField = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnField = page.locator('[id="customer\\.ssn"]');
    this.userNameField = page.locator('[id="customer\\.username"]');
    this.passwordField = page.locator('[id="customer\\.password"]');
    this.repeatedPasswordField = page.locator('#repeatedPassword');
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.passwordErrorMessage = page.getByText('Password is required.');
    this.confirmPasswordErrorMessage = page.getByText(
      'Password confirmation is',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`Fill the 'First name' field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'address' field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(cityName) {
    await this.step(`Fill the 'city' field`, async () => {
      await this.cityField.fill(cityName);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'state' field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'zip code' field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'phone' field`, async () => {
      await this.phoneNumberField.fill(phone);
    });
  }

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.userNameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async confirmPasswordField(password) {
    await this.step(`Fill 'confirm' field`, async () => {
      await this.repeatedPasswordField.fill(password);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click Register Button`, async () => {
      await this.registerBtn.click();
    });
  }

  async waitForSuccessMessage(userName) {
    await expect(
      this.page.getByRole('heading', { name: `Welcome ${userName}` }),
    ).toBeVisible();
  }

  async confirmErrorMessageIsDisplayed(errorMessage) {
    await this.step(`Check confirm password error message`, async () => {
      await expect(this.confirmPasswordErrorMessage).toHaveText(errorMessage);
    });
  }

  async checkUserExists(errorMessage) {
    await this.step(`Check error message that user ist exist`, async () => {
      await expect(
        this.page.getByText('This username already exists.'),
      ).toHaveText(errorMessage);
    });
  }
}
