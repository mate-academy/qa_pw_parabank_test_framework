import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionsPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.findTransactionLink = page.getByRole('link', {name: 'Find Transactions'});
    this.accountDropdown = page.locator('#accountId');
    this.transactionField = page.locator('#transactionId');
    this.dateField = page.locator('#transactionDate');
    this.dateRangeFromField = page.locator('#fromDate');
    this.dateRangeToField = page.locator('#toDate');
    this.amountField = page.locator('#amount');

    this.transactionButton = page.locator('#findById');
    this.dateButton = page.locator('#findByDate');
    this.dateRangeButton = page.locator('#findByDateRange');
    this.amountButton = page.locator('#findByAmount');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToFindTransactionPage() {
    await this.step(`go to fing transaction page`, async () => {
      await this.findTransactionLink.click();
    });
  }

  async selectOptionFromAccountDropdown(option) {
    await this.step(`select ${option} from account dropdown`, async () => {
      await this.accountDropdown.selectOption(option.toString());
    });
  }

  async findTransactionById(value) {
    await this.step('Find transaction by id', async () => {
      await this.transactionField.fill(value.toString());
      await this.transactionButton.click();
    });
  }

  async findTransactionByDate(value) {
    await this.step('Find transaction by date', async () => {
      await this.dateField.fill(value);
      await this.dateButton.click();
    });
  }

  async findTransactionByDateRange(fromDate, toDate) {
    await this.step('Find transaction by date range', async () => {
      await this.dateRangeFromField.fill(fromDate);
      await this.dateRangeToField.fill(toDate);
      await this.dateRangeButton.click();
    });
  }

  async findTransactionByAmount(value) {
    await this.step('Find transaction by amount', async () => {
      await this.amountField.fill(value);
      await this.amountButton.click();
    });
  }
}
