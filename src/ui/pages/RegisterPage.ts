import { Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę rejestracji
  async open() {
    await this.page.click('a[href="register.htm"]');
    await this.page.waitForURL('**/register.htm', { timeout: 10000 });
  }

  // Wypełnij formularz rejestracji
  async registerUser(user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.page.fill('input[name="customer.firstName"]', user.firstName);
    await this.page.fill('input[name="customer.lastName"]', user.lastName);
    await this.page.fill('input[name="customer.address.street"]', user.address);
    await this.page.fill('input[name="customer.address.city"]', user.city);
    await this.page.fill('input[name="customer.address.state"]', user.state);
    await this.page.fill(
      'input[name="customer.address.zipCode"]',
      user.zipCode,
    );
    await this.page.fill('input[name="customer.phoneNumber"]', user.phone);
    await this.page.fill('input[name="customer.ssn"]', user.ssn);
    await this.page.fill('input[name="customer.username"]', user.username);
    await this.page.fill('input[name="customer.password"]', user.password);
    await this.page.fill(
      'input[name="repeatedPassword"]',
      user.confirmPassword,
    );
  }

  // Kliknij przycisk Register
  async submit() {
    await this.page.click('input[value="Register"]');
  }

  // Weryfikacja, że rejestracja zakończyła się sukcesem
  async verifySuccess() {
    await this.page.waitForSelector(
      'text=Your account was created successfully',
      { timeout: 10000 },
    );
  }
}
