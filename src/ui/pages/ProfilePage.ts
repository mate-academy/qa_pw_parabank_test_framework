import { Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę Update Contact Info
  async openUpdateContactInfoPage() {
    await this.page.click('a[href="updateprofile.htm"]');
    await this.page.waitForURL('**/updateprofile.htm', { timeout: 10000 });
  }

  // Zaktualizuj dane kontaktowe
  async updateContactInfo(details: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
  }) {
    if (details.firstName)
      await this.page.fill(
        'input[name="customer.firstName"]',
        details.firstName,
      );
    if (details.lastName)
      await this.page.fill('input[name="customer.lastName"]', details.lastName);
    if (details.address)
      await this.page.fill(
        'input[name="customer.address.street"]',
        details.address,
      );
    if (details.city)
      await this.page.fill('input[name="customer.address.city"]', details.city);
    if (details.state)
      await this.page.fill(
        'input[name="customer.address.state"]',
        details.state,
      );
    if (details.zipCode)
      await this.page.fill(
        'input[name="customer.address.zipCode"]',
        details.zipCode,
      );
    if (details.phone)
      await this.page.fill('input[name="customer.phoneNumber"]', details.phone);

    await this.page.click('input[value="Update Profile"]');
    await this.page.waitForSelector('text=Profile Updated', { timeout: 10000 });
  }

  // Wyloguj użytkownika
  async logout() {
    await this.page.click('a[href="logout.htm"]');
    await this.page.waitForURL('**/parabank/index.htm', { timeout: 10000 });
  }
}
