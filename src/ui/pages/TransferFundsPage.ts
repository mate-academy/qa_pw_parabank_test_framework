import { Page } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Otwórz stronę Transfer Funds
  async open() {
    await this.page.click('a[href="transfer.htm"]');
    await this.page.waitForURL('**/transfer.htm', { timeout: 10000 });
  }

  // Wypełnij formularz przelewu automatycznie
  async transferFunds(amount: string = '50') {
    // Poczekaj aż selecty będą wypełnione opcjami
    await this.page.waitForSelector('#fromAccountId option', {
      timeout: 10000,
    });
    await this.page.waitForSelector('#toAccountId option', { timeout: 10000 });

    // Pobierz dostępne konta
    const fromOptions = await this.page.$$eval('#fromAccountId option', opts =>
      opts.map(o => (o as HTMLOptionElement).value),
    );
    const toOptions = await this.page.$$eval('#toAccountId option', opts =>
      opts.map(o => (o as HTMLOptionElement).value),
    );

    const fromAccount = fromOptions[0];
    const toAccount = toOptions[1] || fromOptions[0]; // jeśli drugi select nie ma opcji, użyj pierwszego

    // Wybierz konta
    await this.page.selectOption('#fromAccountId', fromAccount);
    await this.page.selectOption('#toAccountId', toAccount);

    // Wpisz kwotę i kliknij submit
    await this.page.fill('#amount', amount);
    await this.page.click('input[type="submit"]');
  }

  // Weryfikacja komunikatu sukcesu
  async verifySuccess() {
    await this.page.waitForSelector('text=Transfer Completed!', {
      timeout: 10000,
    });
  }
}
