import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly addressField: Locator;
  readonly cityField: Locator;
  readonly stateField: Locator;
  readonly zipField: Locator;
  readonly phoneField: Locator;
  readonly ssnField: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly confirmbutton: Locator;
  readonly registerBtn: Locator;
  readonly successMsg: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('input[name="customer.firstName"]');
    this.lastNameField = page.locator('input[name="customer.lastName"]');
    this.addressField = page.locator('input[name="customer.address.street"]');
    this.cityField = page.locator('input[name="customer.address.city"]');
    this.stateField = page.locator('input[name="customer.address.state"]');
    this.zipField = page.locator('input[name="customer.address.zipCode"]');
    this.phoneField = page.locator('input[name="customer.phoneNumber"]');
    this.ssnField = page.locator('input[name="customer.ssn"]');
    this.usernameField = page.locator('input[name="customer.username"]');
    this.passwordField = page.locator('input[name="customer.password"]');
    this.confirmbutton = page.locator('input[name="repeatedPassword"]');
    this.registerBtn = page.locator('input[value="Register"]');
    this.successMsg = page.locator('p:has-text("Your account was created")');
    this.errorMsg = page.locator('.error');
  }

  async open(): Promise<void> {
    await this.page.goto('/parabank/register.htm');
  }

  async registerUser(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirm: string;
  }): Promise<void> {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.addressField.fill(data.address);
    await this.cityField.fill(data.city);
    await this.stateField.fill(data.state);
    await this.zipField.fill(data.zip);
    await this.phoneField.fill(data.phone);
    await this.ssnField.fill(data.ssn);
    await this.usernameField.fill(data.username);
    await this.passwordField.fill(data.password);
    await this.confirmbutton.fill(data.confirm);
    await this.registerBtn.click();
  }

  async assertRegistrationSuccessful(): Promise<void> {
    await expect(this.successMsg).toBeVisible({ timeout: 15000 });
  }

  async assertRegistrationError(): Promise<void> {
    await expect(this.errorMsg).toBeVisible();
  }
}
