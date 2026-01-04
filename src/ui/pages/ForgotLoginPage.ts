import { Page } from '@playwright/test';

export class ForgotLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę Forgot Login
  async open() {
    await this.page.click('a[href="forgot.htm"]');
    await this.page.waitForURL('**/forgot.htm', { timeout: 10000 });
  }

  // Wypełnij formularz odzyskiwania loginu
  async recoverLogin(firstName: string, lastName: string, ssn: string) {
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.fill('input[name="ssn"]', ssn);
  }

  // Kliknij przycisk Submit
  async submit() {
    await this.page.click('input[value="Find My Login Info"]');
  }

  // Weryfikacja komunikatu sukcesu lub błędu
  async verifySuccess() {
    await this.page.waitForSelector(
      'text=Your login information was located successfully',
      { timeout: 10000 },
    );
  }

  async verifyFailure() {
    await this.page.waitForSelector(
      'text=The information provided could not be verified',
      { timeout: 10000 },
    );
  }
}
