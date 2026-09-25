import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class AccountDetailsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.accountDetailsHeading = page.getByRole('heading', {
      name: 'Account Details',
    });
    this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');

    this.accountActivityHeading = page.getByRole('heading', {
      name: 'Account Activity',
    });
    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.filterButton = page.getByRole('button', { name: 'Go' });
    this.transactionTable = page.locator('#transactionTable');
  }

  async assertAccountDetailsAreDisplayed(accountNumber) {
    await this.step(
      'Verify that the account details are displayed',
      async () => {
        await expect(this.accountDetailsHeading).toBeVisible();
        await expect(this.accountId).toHaveText(accountNumber);
        await expect(this.accountType).toHaveText(/CHECKING|SAVINGS|LOAN/);
        await expect(this.balance).toHaveText(/\$\d+\.\d{2}/);
        await expect(this.availableBalance).toHaveText(/\$\d+\.\d{2}/);
      },
    );
  }

  async assertAccountTypeIs(accountType) {
    await this.step(
      `Verify that the account type is ${accountType}`,
      async () => {
        await expect(this.accountType).toHaveText(accountType);
      },
    );
  }

  async filterAccountActivity(month, transactionType) {
    await this.step(
      `Filter account activity by ${transactionType}`,
      async () => {
        await this.monthSelect.selectOption({
          label: month,
        });
        await this.transactionTypeSelect.selectOption({
          label: transactionType,
        });
        await this.filterButton.click();
      },
    );
  }

  async assertActivityFilterIsApplied(month, transactionType) {
    await this.step(
      `Verify the ${transactionType} activity filter`,
      async () => {
        await expect(this.accountActivityHeading).toBeVisible();
        await expect(this.monthSelect).toHaveValue(month);
        await expect(this.transactionTypeSelect).toHaveValue(transactionType);
        await expect(this.transactionTable).toBeVisible();
      },
    );
  }
}
