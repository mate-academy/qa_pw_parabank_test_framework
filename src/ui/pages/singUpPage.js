import * as allure from 'allure-js-commons';
import { expect } from 'allure-playwright';

export class SingUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
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
    this.replacePasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.userNameSingIn = page.locator('input[name="username"]');
    this.passwordSingIn = page.locator('input[name="password"]');
    this.singInButton = page.getByRole('button', { name: 'Log In' });
    this.customerLogoutText = page.getByRole('heading', {
      name: 'Customer Login',
    });
  }

  async step(title, stepToRun) {
    return await allure.step(title, stepToRun);
  }
  async open() {
    await this.step(`Open 'Sing Up' page`, async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }
  async fillFirstNameField(user) {
    await this.step(`Fill first name field`, async () => {
      await this.firstNameField.fill(user.firstName);
    });
  }
  async fillLastNameField(user) {
    await this.step(`Fill last name field`, async () => {
      await this.lastNameField.fill(user.lastName);
    });
  }

  async fillAddressField(user) {
    await this.step(`fill addres field`, async () => {
      await this.addressField.fill(user.address);
    });
  }
  async fillCityField(user) {
    await this.step(`Fill City field`, async () => {
      await this.cityField.fill(user.city);
    });
  }
  async fillStateField(user) {
    await this.step(`Fill state field`, async () => {
      await this.stateField.fill(user.state);
    });
  }
  async fillZipCodeField(user) {
    await this.step(`Fill Zip-Code field`, async () => {
      await this.zipCodeField.fill(user.zipCode);
    });
  }
  async fillPhoneNumberField(user) {
    await this.step(`Fill phone number field`, async () => {
      await this.phoneNumberField.fill(user.phone);
    });
  }
  async fillSsnField(user) {
    await this.step(`Fill SSN field`, async () => {
      await this.ssnField.fill(user.ssn);
    });
  }
  async fillUserNameField(user) {
    await this.step(`Fill user name field`, async () => {
      await this.userNameField.fill(user.username);
    });
  }
  async fillPasswordField(user) {
    await this.step(`Fill password field`, async () => {
      await this.passwordField.fill(user.password);
    });
  }
  async fillReplacePasswordField(user) {
    await this.step('Fill password confirmation field', async () => {
      await this.replacePasswordField.fill(user.confirmPassword);
    });
  }
  async clickRegisterButton() {
    await this.step(`Click register`, async () => {
      await this.registerButton.click();
    });
  }
  async sibmitSingUpForm(user) {
    await this.step(`Fill the 'Sing Up' form`, async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneNumberField.fill(user.phone);
      await this.ssnField.fill(user.ssn);
      await this.userNameField.fill(user.username);
      await this.passwordField.fill(user.password);
      await this.replacePasswordField.fill(user.password);
      await this.registerButton.click();
    });
  }

  async assertErrorMessageContainsText(expectedText) {
    await this.step('Assert Error Message', async () => {
      await expect(this.page.getByText(expectedText)).toBeVisible();
    });
  }
  async fillUserNameSingInInput(page2, user) {
    await this.step('Input user name in sign in field', async () => {
      await page2.locator('input[name="username"]').fill(user.username);
    });
  }
  async fillPasswordSingInField(page2, user) {
    await this.step(`Fill password field`, async () => {
      await page2.locator('input[name="password"]').fill(user.password);
    });
  }
  async clickSingInButton(page2) {
    await this.step(`Click Sing In button`, async () => {
      await page2.getByRole('button', { name: 'Log In' }).click();
    });
  }
  async fillUserNameSingIn(user) {
    await this.step('Input user name in sign in field', async () => {
      await this.userNameSingIn.fill(user.username);
    });
  }
  async fillPasswordSingIn(user) {
    await this.step(`Fill password field`, async () => {
      await this.passwordSingIn.fill(user.password);
    });
  }
  async clickSingInButtonNegative() {
    await this.step(`Click Sing In button`, async () => {
      await this.singInButton.click();
    });
  }
  async assertErrorMessageSingIn(expectedText) {
    await this.step('Assert Error Message', async () => {
      await expect(this.page.getByText(expectedText)).toBeVisible();
    });
  }
  async assertCustomerLogoutTextVisible() {
    await this.step(`Assert log out is positive`, async () => {
      await expect(this.customerLogoutText).toBeVisible();
    });
  }
  async clickForgotloginInfoButton(page) {
    await this.step(`Click forgot login info button`, async () => {
      await page.getByRole('link', { name: 'Forgot login info?' }).click();
    });
  }
}
