import { Page } from '@playwright/test';

export class FindTransactionsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę "Find Transactions"
  async openPage() {
    await this.page.click('a[href="findtransactions.htm"]');
    await this.page.waitForURL('**/findtransactions.htm', { timeout: 10000 });
  }

  // Wyszukaj transakcje po numerze konta
  async searchByAccount(accountId: string) {
    await this.page.fill('input[name="accountId"]', accountId);
    await this.page.click('button[value="Find Transactions"]');
    await this.page.waitForSelector('#transactionTable', { timeout: 10000 });
  }

  // Pobierz liczbę wyników wyszukiwania
  async getResultsCount() {
    return this.page.locator('#transactionTable tbody tr').count();
  }

  // Opcjonalnie: filtruj po dacie
  async searchByDate(fromDate: string, toDate: string) {
    await this.page.fill('input[name="criteria.fromDate"]', fromDate);
    await this.page.fill('input[name="criteria.toDate"]', toDate);
    await this.page.click('button[value="Find Transactions"]');
    await this.page.waitForSelector('#transactionTable', { timeout: 10000 });
  }
}
