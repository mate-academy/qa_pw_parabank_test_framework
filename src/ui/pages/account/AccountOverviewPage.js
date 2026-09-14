import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { ACCOUNT_OVERVIEW_HEADERS } from '../../constants/accountOverview';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountsOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
      level: 1,
    });

    this.accountsTable = page.getByRole('table');
    this.balanceTable = page.getByRole('cell', { name: '$' }).first();

    this.total = page.getByRole('cell', { name: '$' }).nth(2);
  }

  locator(text) {
    return this.accountsTable.getByRole('columnheader', {
      name: text,
    });
  }

  get accountNumberLink() {
    return this.accountsTable.getByRole('link');
  }

  async getAccountNumber() {
    return this.accountNumberLink.first().innerText();
  }

  async clickAccountNumber() {
    await this.step('Click account number', async () => {
      await this.accountNumberLink.click();
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountColumnHeaderIsVisible() {
    await this.step(
      `Assert the '${ACCOUNT_OVERVIEW_HEADERS.ACCOUNT}' header is shown`,
      async () => {
        await expect(
          this.locator(ACCOUNT_OVERVIEW_HEADERS.ACCOUNT),
        ).toBeVisible();
      },
    );
  }

  async assertBalanceColumnHeaderIsVisible() {
    await this.step(
      `Assert the '${ACCOUNT_OVERVIEW_HEADERS.BALANCE}' header is shown`,
      async () => {
        await expect(
          this.locator(ACCOUNT_OVERVIEW_HEADERS.BALANCE),
        ).toBeVisible();
      },
    );
  }

  async assertAvailableAmountColumnHeaderIsVisible() {
    await this.step(
      `Assert the '${ACCOUNT_OVERVIEW_HEADERS.AVAILABLE_AMOUNT}' header is shown`,
      async () => {
        await expect(
          this.locator(ACCOUNT_OVERVIEW_HEADERS.AVAILABLE_AMOUNT),
        ).toBeVisible();
      },
    );
  }

  async assertAccountsOverviewHeadingIsVisible() {
    await this.step(
      `Assert the 'Accounts Overview' header is shown`,
      async () => {
        await expect(this.accountsOverviewHeading).toBeVisible();
      },
    );
  }

  async assertTotalNotEmpty() {
    await this.step(`Assert the 'Total' is shown`, async () => {
      await expect(this.total).not.toBeEmpty();
    });
  }
  async assertBalanceIsNotEmpty() {
    await this.step(`Assert the 'Total' is shown`, async () => {
      await expect(this.balanceTable).not.toBeEmpty();
    });
  }

  async assertAccountOverviewPageIsDisplayed() {
    await this.step(
      `Assert the 'Account Overview Page' is displayed`,
      async () => {
        await this.assertAccountsOverviewHeadingIsVisible();
        await this.assertAccountColumnHeaderIsVisible();
        await this.assertBalanceColumnHeaderIsVisible();
        await this.assertAvailableAmountColumnHeaderIsVisible();
        await this.assertTotalNotEmpty();
        await this.assertBalanceIsNotEmpty();
      },
    );
  }
}
