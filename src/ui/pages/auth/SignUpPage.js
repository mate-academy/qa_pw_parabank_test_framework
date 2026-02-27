import { expect, testStep } from '../../../common/helpers/pwHelpers';



export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#customer\\.firstName');
    this.lastNameField = page.locator('#customer\\.lastName');
    this.addressStreetField = page.locator('#customer\\.address\\.street');
    this.addressCityField = page.locator('#customer\\.address\\.city');
    this.addressStateField = page.locator('#customer\\.address\\.state');
    this.addressZipCodeField = page.locator('#customer\\.address\\.zipCode');
    this.phoneNumberField = page.locator('#customer\\.phoneNumber');
    this.ssnField = page.locator('#customer\\.ssn');
    this.usernameField = page.locator('#customer\\.username');
    this.passwordField = page.locator('#customer\\.password');
    this.repeatedPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    
    
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillFirstNameField(name) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(name);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressStreetField(addressStreet) {
    await this.step(`Fill the 'Address Street' field`, async () => {
      await this.addressStreetField.fill(addressStreet);
    });
  }
 
  async fillAddressCityField(addressCity) {
    await this.step(`Fill the 'Address City' field`, async () => {
      await this.addressCityField.fill(addressCity);
    });
  }

  async fillAddressStateField(addressState) {
    await this.step(`Fill the 'Address State' field`, async () => {
      await this.addressStateField.fill(addressState);
    });
  }

  async fillAddressZipCodeField(addressZipCode) {
    await this.step(`Fill the 'Address Zip Code' field`, async () => {
      await this.addressZipCodeField.fill(addressZipCode);
    });
  }

  async fillPhoneNumberField(phoneNumber) {
    await this.step(`Fill the 'Phone Number' field`, async () => {
      await this.phoneNumberField.fill(phoneNumber);
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

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

   welcomeUserHeading(username) {
    return this.page.getByRole('heading', {
      name: `Welcome ${username}`,
    });
  }

  async assertWelcomeUserHeadingIsVisible(username) {
    await this.step(`Assert the 'Welcome User Head' is visible`, async () => {
      await expect(this.welcomeUserHeading(username)).toBeVisible();
    });
  }


  async submitSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      
      await this.fillFirstNameField(user.firstName);
      await this.fillLastNameField(user.lastName);
      await this.fillAddressStreetField(user.street);
      await this.fillAddressCityField(user.city);
      await this.fillAddressStateField(user.state);
      await this.fillAddressZipCodeField(user.zipCode);
      await this.fillPhoneNumberField(user.phone);
      await this.fillSsnField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillRepeatedPasswordField(user.repeatedPassword ?? user.password);
      
    });
  }

 

  
  errorMessage(message) {
    return this.page.locator('#customerForm').getByText(message);
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the "${message}" is visible`, async () => {
      await expect(this.errorMessage(message)).toBeVisible();
    });
  }



}