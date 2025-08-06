import { testStep, expect } from '../../../common/helpers/pwHelpers';
import {
  ACCOUNT_TYPES,
  MONTH_NAMES,
  TRANSACTION_TYPES,
} from '../../constants/accountActions';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Account Details
    this.accountNumber = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');

    // Account Activity
    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });
    this.noTransactionsMessage = page.locator('#noTransactions');
    this.transactionTable = page.locator('#transactionTable');
    this.transactionRows = page.locator('#transactionTable tbody tr');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async openAccount(accountNumber) {
    await this.step(`Open Account Number ${accountNumber} page`, async () => {
      await this.page.goto(`parabank/activity.htm?id=${accountNumber}`);
    });
  }

  // Important to all parsers
  async getAccountNumber() {
    const locator = this.accountNumber;
    await locator.waitFor({ state: 'visible' });
    // Spike: waiting until details are received from backend
    await expect(locator).toHaveText(/\S+/, { timeout: 5000 });
    return await locator.textContent();
  }

  async getAccountType() {
    return await this.accountType.textContent();
  }

  async getBalance() {
    return await this.balance.textContent();
  }

  async getAvailableBalance() {
    return await this.availableBalance.textContent();
  }

  async clickGoButton() {
    await this.step(`Click on 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async selectMonth(label) {
    if (!label) {
      label = MONTH_NAMES[12];
    } else if (!MONTH_NAMES.includes(label)) {
      throw new Error(
        `Invalid month: "${label}". Must be one of: ${MONTH_NAMES}`,
      );
    }

    await this.monthSelect.selectOption({ label });
  }

  async selectTransactionType(label) {
    if (!label) {
      label = TRANSACTION_TYPES[0];
    } else if (!TRANSACTION_TYPES.includes(label)) {
      throw new Error(
        `Invalid transaction type: "${label}".
        /nMust be one of: ${TRANSACTION_TYPES}`,
      );
    }

    await this.transactionTypeSelect.selectOption({ label });
  }

  async submitAccountActivityFilters(month, transaction) {
    await this.step('Apply Account activity filter', async () => {
      this.selectMonth(month);
      this.selectTransactionType(transaction);
      this.clickGoButton();
    });
  }

  async getTransactionsData(waitAccountNumber = true) {
    return await this.step('Get transactions table data', async () => {
      await expect(this.transactionTable).toBeVisible({ timeout: 5000 });
      let accountNumber = null;
      if (waitAccountNumber) accountNumber = await this.getAccountNumber();

      const rows = await this.transactionRows.all();

      return await Promise.all(
        rows.map(async row => {
          const tds = row.locator('td');
          const date = await tds.nth(0).innerText();
          const description = await tds.nth(1).locator('a').innerText();
          const href = await tds.nth(1).locator('a').getAttribute('href');
          const debit = await tds.nth(2).innerText();
          const credit = await tds.nth(3).innerText();

          return {
            account: accountNumber,
            date,
            description,
            transactionId: href?.split('id=').pop(),
            debit: debit.trim() || null,
            credit: credit.trim() || null,
          };
        }),
      );
    });
  }

  async assertAccountDetailsIsCorrect(
    { account, balance, available },
    accountType,
  ) {
    await this.step('Check Account details fields', async () => {
      expect(await this.getAccountNumber()).toBe(account);
      expect(await this.getBalance()).toBe(balance);
      expect(await this.getAvailableBalance()).toBe(available);

      const displayedAccountType = await this.getAccountType();
      if (accountType) {
        expect(displayedAccountType).toBe(ACCOUNT_TYPES[accountType]);
      } else {
        expect(Object.values(ACCOUNT_TYPES)).toContain(displayedAccountType);
      }
    });
  }

  async assertTransactionDateIsToday(dateString) {
    await this.step('Transaction date is today', async () => {
      const [month, day, year] = dateString.split('-').map(Number);
      const rowDate = new Date(year, month - 1, day);

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      expect(rowDate.getTime()).toBe(today.getTime());
    });
  }

  async assertNoTransactionIsVisible() {
    await this.step(`'No transactions' empty state is shown`, async () => {
      await expect(this.noTransactionsMessage).toBeVisible({ timeout: 5000 });
    });
  }

  async assertTransactionDataById(expectedTransaction) {
    const expectedTransactionId = expectedTransaction.transactionId;
    return await this.step(
      `Assert: check transaction by id: ${expectedTransactionId}`,
      async () => {
        const allTransactions = await this.getTransactionsData(false);

        const actual = allTransactions.find(
          t => t.transactionId === expectedTransactionId,
        );

        expect(actual).toBeTruthy();

        if (expectedTransaction.date !== undefined) {
          expect(actual.date).toBe(expectedTransaction.date);
        }

        if (expectedTransaction.description !== undefined) {
          expect(actual.description).toBe(expectedTransaction.description);
        }

        if (expectedTransaction.debit !== undefined) {
          expect(actual.debit).toBe(expectedTransaction.debit);
        }

        if (expectedTransaction.credit !== undefined) {
          expect(actual.credit).toBe(expectedTransaction.credit);
        }
      },
    );
  }
}
