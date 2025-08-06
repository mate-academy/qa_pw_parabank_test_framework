import { testStep, expect } from '../../../common/helpers/pwHelpers';

export class OverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.table = page.locator('#accountTable');
    this.dataRows = this.table.locator('tbody > tr:not(:last-child)');
    this.totalRow = this.table.locator('tbody > tr:last-child');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Accounts Overview' page`, async () => {
      await this.page.goto('parabank/overview.htm');
    });
  }

  async waitForTableData(timeout = 5_000) {
    // Here some delay from backend response,
    // so we will wait for the 'Total' row to be visible in the table
    await this.step(`Wait table data`, async () => {
      const totalRow = this.page.locator('#accountTable tbody tr', {
        hasText: 'Total',
      });
      await totalRow.waitFor({ state: 'visible', timeout });
    });
  }

  async getRowCount() {
    await this.waitForTableData();
    return await this.dataRows.count();
  }

  async getRow(i) {
    const row = this.dataRows.nth(i);
    return {
      row,
      account: row.locator('td:nth-child(1) a'),
      balance: row.locator('td:nth-child(2)'),
      available: row.locator('td:nth-child(3)'),
    };
  }

  async getAllRowsData() {
    const rowCount = await this.getRowCount();
    const rowsData = [];
    await this.step(`Parsing table data: ${rowCount} row(s)`, async () => {
      for (let i = 0; i < rowCount; i++) {
        const { account, balance, available } = await this.getRow(i);
        rowsData.push({
          account: await account.innerText(),
          balance: await balance.innerText(),
          available: await available.innerText(),
        });
      }
    });
    return rowsData;
  }

  async findRowIndexByAccount(accountText) {
    const count = await this.getRowCount();

    for (let i = 0; i < count; i++) {
      const { account } = await this.getRow(i);
      const text = await account.innerText();
      if (text === accountText) {
        return i;
      }
    }

    return -1;
  }

  async clickAccountLinkByAccountText(accountText = 0) {
    const lable = accountText ? accountText : 'first';
    await this.step(`Click on the ${lable} account link`, async () => {
      const rowIndex = accountText
        ? await this.findRowIndexByAccount(accountText)
        : 0;
      if (rowIndex === -1) {
        throw new Error(`Row with account "${accountText}" not found`);
      }
      const row = this.dataRows.nth(rowIndex);
      const link = row.locator('td:nth-child(1) a');
      await link.click();
    });
  }

  async getTotalBalanceText() {
    await this.waitForTableData();
    return await this.totalRow.locator('td:nth-child(2) b').innerText();
  }

  async assertTotalBalanceMatchesSum() {
    await this.step(`Check account table data: total balance`, async () => {
      const rows = await this.getAllRowsData();
      const expectedTotal = rows.reduce((acc, row) => {
        return acc + parseFloat(row.balance.replace('$', '').replace(',', ''));
      }, 0);

      const actualTotalText = await this.getTotalBalanceText();
      const actualTotal = parseFloat(
        actualTotalText.replace('$', '').replace(',', ''),
      );

      expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    });
  }

  async assertTotalBalanceCheck(balance, difference = 0) {
    await this.step(`Assert: Total balance is correct`, async () => {
      const initialBalance = Number(balance.replace('$', ''));
      const expectedBalance = initialBalance + Number(difference);

      const balanceText = await this.getTotalBalanceText();
      const actualBalance = Number(balanceText.replace('$', ''));

      expect(actualBalance).toBe(expectedBalance);
    });
  }

  async assertCheckAccountAndBalance(accountRows, totalBalance) {
    await this.step(
      `Check accounts: count: ${accountRows.length}, balance: ${totalBalance}`,
      async () => {
        expect((await this.getAllRowsData()).length).toBe(accountRows.length);
        expect(await this.getTotalBalanceText()).toBe(totalBalance);
      },
    );
  }

  async assertCheckAmountDifference(
    oldAccountRows,
    newAccountRows,
    amount,
    fromAccount,
    toAccount,
  ) {
    await this.step(`Check accounts update`, async () => {
      const parseMoney = value => parseFloat(value.replace(/[$,]/g, ''));

      const getBalance = (rows, accountNumber) => {
        const row = rows.find(({ account }) => account === accountNumber);
        if (!row) throw new Error(`Account ${accountNumber} not found`);
        return parseMoney(row.balance || row.available);
      };

      const oldFrom = getBalance(oldAccountRows, fromAccount);
      const newFrom = getBalance(newAccountRows, fromAccount);

      const oldTo = getBalance(oldAccountRows, toAccount);
      const newTo = getBalance(newAccountRows, toAccount);

      expect(newFrom).toBeCloseTo(oldFrom - amount, 2);
      expect(newTo).toBeCloseTo(oldTo + amount, 2);
    });
  }
}
