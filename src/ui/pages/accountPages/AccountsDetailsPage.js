import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountsDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.goButton = page.getByRole('button', { name: 'Go' });
    this.transactionTypeDropdown = page.locator('#transactionType');
    this.accountDetails = this.page.getByRole('heading', { name: `Account Details` });

  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

     async open(accountNumber) {
     await this.step(`Open account details for ${accountNumber}`, async () => {
       await this.page.goto(`/parabank/activity.htm?id=${accountNumber}`);
     });
   }

   async assertAccountDetailsAreShown(accountNumber) {
    await this.step(`Assert account details for ${accountNumber} are opened`, async () => {
      await expect(this.accountDetails).toBeVisible();
    });
  }

  async selectTransactionType(transactionType) {
    await this.step(`Select transaction type: ${transactionType}`, async () => {
      await this.transactionTypeDropdown.selectOption(transactionType);
    });
  }

  async clickFirstTransaction() {
  await this.step('Click first transaction', async () => {
    await this.page.locator('#transactionTable a').first().click();
  });
}
  async clickGoButton() {
    await this.step(`Click "Go" button`, async () => {
      await this.goButton.click();
    });
  }

  async assertTransactionsTableIsShown() {
    await this.step(`Assert transactions table is shown`, async () => {
      const transactionsTable = this.page.locator('#transactionTable');
      await expect(transactionsTable).toBeVisible();
    });
  }

  async assertOnlyDebitTransactionsShown() {
  await this.step('Assert only debit transactions are shown', async () => {
    const rows = this.page.locator('#transactionTable tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const creditCell = rows.nth(i).locator('td').nth(3);
      await expect(creditCell).toBeEmpty();
    }
  });
}

  async assertOnlyCreditTransactionsShown() {
  await this.step('Assert only credit transactions are shown', async () => {
    const rows = this.page.locator('#transactionTable tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const debitCell = rows.nth(i).locator('td').nth(2);
      await expect(debitCell).toBeEmpty();
    }     
  
  });
  }

  async getTransactionDate() {
  return await this.step('Get transaction date', async () => {
    return await this.page.locator('#transactionTable tbody tr').first().locator('td').first().textContent();
  });
}
}