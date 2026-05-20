import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountId = page.locator('#accountDetails #accountId');
    this.accountType = page.locator('#accountDetails #accountType');
    this.balance = page.locator('#accountDetails #balance');
    this.availableBalance = page.locator('#accountDetails #availableBalance');
    this.accountActivity = page.getByRole('heading', {
      name: 'Account Activity',
    });

    this.transactionTableRows = page.locator('#transactionTable tbody tr');
    this.dateCells = this.transactionTableRows.locator('td:nth-child(1)');
    this.transactionCells =
      this.transactionTableRows.locator('td:nth-child(2)');
    this.debitCells = this.transactionTableRows.locator('td:nth-child(3)');
    this.creditCells = this.transactionTableRows.locator('td:nth-child(4)');

    this.activityPeriod = page.locator('#month');
    this.transactionType = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(accountId) {
    await this.step(
      `Navigate to 'Accounts Details' page for ${accountId} account`,
      async () => {
        await this.page.goto(`activity.htm?id=${accountId}`);
      },
    );
  }

  async getTransactionDataFromTableRow(rowIndex) {
    return await this.step(
      `Get Transaction Data from row ${rowIndex}`,
      async () => {
        const transactionLink = await this.transactionCells
          .nth(rowIndex)
          .getByRole('link')
          .getAttribute('href');
        const transactionId = new URLSearchParams(
          transactionLink.split('?')[1],
        ).get('id');
        const date = await this.dateCells.nth(rowIndex).innerText();
        const debit = await this.debitCells.nth(rowIndex).innerText();
        const credit = await this.creditCells.nth(rowIndex).innerText();

        return {
          transactionId,
          date,
          debit,
          credit,
        };
      },
    );
  }

  async selectActivityPeriod(month) {
    await this.step(`Select '${month}' Activity Period'`, async () => {
      await this.activityPeriod.selectOption(month);
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select '${type}' Transaction Type`, async () => {
      await this.transactionType.selectOption(type);
    });
  }

  async clickGoButton() {
    await this.step(`Click 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertAccountIdHasText(accountId) {
    await this.step(`Assert Account ID=${accountId} is shown`, async () => {
      await expect(this.accountId).toHaveText(accountId);
    });
  }

  async assertAccountTypeContainsText(accountType) {
    await this.step(`Assert Account Type=${accountType} is shown`, async () => {
      await expect(this.accountType).toContainText(accountType);
    });
  }

  async assertBalanceContainsText(balance) {
    await this.step(`Assert Balance=${balance} is shown`, async () => {
      await expect(this.balance).toContainText(balance);
    });
  }

  async assertAvailableBalanceContainsText(availableBalance) {
    await this.step(
      `Assert Available Balance=${availableBalance} is shown`,
      async () => {
        await expect(this.availableBalance).toContainText(availableBalance);
      },
    );
  }

  async assertAccountActivityHeadingIsVisible() {
    await this.step(`Assert Account Activity banner is shown`, async () => {
      await expect(this.accountActivity).toBeVisible();
    });
  }

  async assertAccountActivityFiltering(activityPeriod, transactionType) {
    await this.step(
      `Assert Account Activity filters transactions by activityPeriod='${activityPeriod}', transactionType='${transactionType}'`,
      async () => {
        await this.assertActivityPeriodRowsAreVisible(activityPeriod);
        await this.assertTransactionTypeRowsAreVisible(transactionType);
      },
    );
  }

  async assertActivityPeriodRowsAreVisible(activityPeriod) {
    await this.step(
      `Assert Account Activity shows rows with activityPeriod='${activityPeriod}'`,
      async () => {
        const monthToNumeric = {
          January: '01',
          February: '02',
          March: '03',
          April: '04',
          May: '05',
          June: '06',
          July: '07',
          August: '08',
          September: '09',
          October: '10',
          November: '11',
          December: '12',
        };
        const monthNumeric = monthToNumeric[activityPeriod];

        if (activityPeriod === 'All') {
          return;
        }

        const cells = await this.dateCells.all();
        for (const cell of cells) {
          await expect(cell).toHaveText(new RegExp(`^${monthNumeric}-`));
        }
      },
    );
  }

  async assertTransactionTypeRowsAreVisible(transactionType) {
    await this.step(
      `Assert Account Activity shows rows with transactionType='${transactionType}'`,
      async () => {
        if (transactionType === 'All') {
          return;
        }

        let cells;

        switch (transactionType) {
          case 'Debit':
            cells = this.debitCells;
            break;
          case 'Credit':
            cells = this.creditCells;
            break;
          default:
            throw new Error(`Unknown transactionType: ${transactionType}`);
        }

        for (const cell of await cells.all()) {
          await expect(cell).not.toBeEmpty();
        }
      },
    );
  }
}
