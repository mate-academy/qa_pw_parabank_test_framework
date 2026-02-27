import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class AccountsActivityFilteringAndDetailsPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');

    
    this.transactionTable = page.locator('#transactionTable');

    this.firstRow = this.transactionTable.getByRole('row').nth(0); // header row
    this.secondRow = this.transactionTable.getByRole('row').nth(1); // first transaction row

   
    this.dateHeader = this.firstRow.getByRole('cell').nth(0);        // Date
    this.transactionHeader = this.firstRow.getByRole('cell').nth(1); // Transaction
    this.debitHeader = this.firstRow.getByRole('cell').nth(2);       // Debit (-)
    this.creditHeader = this.firstRow.getByRole('cell').nth(3);      // Credit (+)

  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }



  async assertAccountDetails(accountNumber) {
    await this.step(`Assert Account Number is ${accountNumber}`, async () => {
      await expect(this.accountId).toHaveText(String(accountNumber));
    });
  }

  async assertAccountTypeIsValid() {
    await this.step(`Assert Account Type is valid`, async () => {
      const type = (await this.accountType.textContent()).trim();
      expect(['CHECKING', 'SAVINGS']).toContain(type);
    });
  }

  async assertAccountBalance(mainAccountBalance) {
    await this.step(`Assert account balance is correct`, async () => {
      await expect(this.balance).toHaveText(String(mainAccountBalance));
    });
  }

  async assertAccountAvailableBalance(mainAccountBalanceAvailableAmount) {
    await this.step(`Assert available account balance is correct`, async () => {
      await expect(this.availableBalance).toHaveText(String(mainAccountBalanceAvailableAmount));
    });
  }

  

  async assertDateHeader() {
    await this.step(`Assert 'Date' header is correct`, async () => {
      await expect(this.dateHeader).toHaveText('Date');
    });
  }

  async assertTransactionHeader() {
    await this.step(`Assert 'Transaction' header is correct`, async () => {
      await expect(this.transactionHeader).toHaveText('Transaction');
    });
  }

  async assertDebitHeader() {
    await this.step(`Assert 'Debit (-)' header is correct`, async () => {
      await expect(this.debitHeader).toHaveText('Debit (-)');
    });
  }

  async assertCreditHeader() {
    await this.step(`Assert 'Credit (+)' header is correct`, async () => {
      await expect(this.creditHeader).toHaveText('Credit (+)');
    });
  }

}