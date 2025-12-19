import { Page } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę "Open New Account"
  async openPage() {
    await this.page.click('a[href="openaccount.htm"]');
    await this.page.waitForURL('**/openaccount.htm', { timeout: 10000 });
  }

  // Wybierz typ konta i załóż konto
  async openNewAccount(
    accountType: string = 'SAVINGS',
    fromAccountId?: string,
  ) {
    await this.page.selectOption('#type', accountType);

    if (fromAccountId) {
      await this.page.selectOption('#fromAccountId', fromAccountId);
    }

    await this.page.click('input[value="Open New Account"]');

    // Poczekaj na potwierdzenie
    await this.page.waitForSelector('text=Account Opened!', { timeout: 10000 });
  }

  // Pobierz numer nowo utworzonego konta
  async getNewAccountId() {
    return this.page.locator('#newAccountId').textContent();
  }
}
