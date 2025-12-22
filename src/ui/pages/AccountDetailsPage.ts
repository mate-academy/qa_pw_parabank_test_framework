import { Page } from '@playwright/test';

export class AccountDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwiera szczegóły pierwszego konta w Account Overview
  async openFirstAccountDetails() {
    // poczekaj aż tabela kont będzie widoczna
    await this.page.waitForSelector('#accountTable', {
      state: 'visible',
      timeout: 10000,
    });

    // kliknij pierwszy link w tabeli kont
    await this.page.click('#accountTable a');

    // poczekaj aż URL zmieni się na stronę aktywności konta
    await this.page.waitForURL('**/activity.htm', { timeout: 10000 });
  }

  // Filtrowanie transakcji po dacie
  async filterTransactions(fromDate: string, toDate: string) {
    await this.page.fill('input[name="criteria.fromDate"]', fromDate);
    await this.page.fill('input[name="criteria.toDate"]', toDate);
    await this.page.click('input[value="Go"]');
  }

  // Pobranie liczby wyświetlonych transakcji
  async getTransactionsCount() {
    return this.page.locator('#transactionTable tbody tr').count();
  }
}
